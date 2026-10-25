MiSTer uses quite complex hardware, but thanks to open source, developers with different levels of hardware and software knowledge can develop for the platform. Many MiSTer cores share a common, nearly identical block of code, called the **Framework**, that simplifies access to the hardware and firmware.

This guide uses the [ZX Spectrum](https://github.com/MiSTer-devel/ZX-Spectrum_MISTer){target=_blank} core as an example.

## Framework
Most of the Framework's sources are located in the [sys](https://github.com/MiSTer-devel/ZX-Spectrum_MISTer/tree/master/sys){target=_blank} folder.

For a new project, you typically need to copy the following files/folders:

* sys folder
* jtag.cdf
* jtag_lite.cdf
* zxspectrum.qpf (project file — keep it read-only so switching between full and lite versions doesn't automatically change it and spam your change history)
* zxspectrum.qsf
* zxspectrum.srf (warning ignores)
* zxspectrum-lite.qsf
* zxspectrum-lite.srf (warning ignores)

Then make some changes:

* Rename the zxspectrum.* files for your new project.
* Inside the files, find the word "zxspectrum" and replace it with your project's name.
* At the end of the *.qsf files you'll find the list of project files — remove files not related to your project.

The initial set of files for the new project is now ready, and you can open the project in Quartus 17.0.2 (standard MiSTer projects) — projects with a `*_Q13` Quartus project file use Quartus 13.x instead.

Assuming you are porting an existing core to MiSTer, the top module entity should be renamed to `emu`. See zxspectrum.sv and its input/output signals:

```Verilog
module emu
(
	//Master input clock
	input         CLK_50M,

	//Async reset from top-level module.
	//Can be used as initial reset.
	input         RESET,

	//Must be passed to hps_io module
	inout  [45:0] HPS_BUS,

	//Base video clock. Usually equals to CLK_SYS.
	output        CLK_VIDEO,

	//Multiple resolutions are supported using different CE_PIXEL rates.
	//Must be based on CLK_VIDEO
	output        CE_PIXEL,

	//Video aspect ratio for HDMI. Most retro systems have ratio 4:3.
	//if VIDEO_ARX[12] or VIDEO_ARY[12] is set then [11:0] contains scaled size instead of aspect ratio.
	output [12:0] VIDEO_ARX,
	output [12:0] VIDEO_ARY,

	output  [7:0] VGA_R,
	output  [7:0] VGA_G,
	output  [7:0] VGA_B,
	output        VGA_HS,
	output        VGA_VS,
	output        VGA_DE,    // = ~(VBlank | HBlank)
	output        VGA_F1,
	output [1:0]  VGA_SL,
	output        VGA_SCALER, // Force VGA scaler
	output        VGA_DISABLE, // analog out is off

	input  [11:0] HDMI_WIDTH,
	input  [11:0] HDMI_HEIGHT,
	output        HDMI_FREEZE,
	output        HDMI_BLACKOUT,
	output        HDMI_BOB_DEINT,

	output        LED_USER,  // 1 - ON, 0 - OFF.

	// b[1]: 0 - LED status is system status OR'd with b[0]
	//       1 - LED status is controlled solely by b[0]
	// hint: supply 2'b00 to let the system control the LED.
	output  [1:0] LED_POWER,
	output  [1:0] LED_DISK,

	// I/O board button press simulation (active high)
	// b[1]: user button
	// b[0]: osd button
	output  [1:0] BUTTONS,

	input         CLK_AUDIO, // 24.576 MHz
	output [15:0] AUDIO_L,
	output [15:0] AUDIO_R,
	output        AUDIO_S,   // 1 - signed audio samples, 0 - unsigned
	output  [1:0] AUDIO_MIX, // 0 - no mix, 1 - 25%, 2 - 50%, 3 - 100% (mono)

	//ADC
	inout   [3:0] ADC_BUS,

	//SD-SPI
	output        SD_SCK,
	output        SD_MOSI,
	input         SD_MISO,
	output        SD_CS,
	input         SD_CD,

	//High latency DDR3 RAM interface
	//Use for non-critical time purposes
	output        DDRAM_CLK,
	input         DDRAM_BUSY,
	output  [7:0] DDRAM_BURSTCNT,
	output [28:0] DDRAM_ADDR,
	input  [63:0] DDRAM_DOUT,
	input         DDRAM_DOUT_READY,
	output        DDRAM_RD,
	output [63:0] DDRAM_DIN,
	output  [7:0] DDRAM_BE,
	output        DDRAM_WE,

	//SDRAM interface with lower latency
	output        SDRAM_CLK,
	output        SDRAM_CKE,
	output [12:0] SDRAM_A,
	output  [1:0] SDRAM_BA,
	inout  [15:0] SDRAM_DQ,
	output        SDRAM_DQML,
	output        SDRAM_DQMH,
	output        SDRAM_nCS,
	output        SDRAM_nCAS,
	output        SDRAM_nRAS,
	output        SDRAM_nWE,

	input         UART_CTS,
	output        UART_RTS,
	input         UART_RXD,
	output        UART_TXD,
	output        UART_DTR,
	input         UART_DSR,

	// Open-drain User port (SNAC and other I/O board peripherals)
	input   [6:0] USER_IN,
	output  [6:0] USER_OUT,

	input         OSD_STATUS,

    // there are more needed signals - see the Template_MiSTer repository
);
```
These signals are the main connections to MiSTer. You need to modify your core according to these signals.

## API
Most top-level signals should be self-explanatory and more or less familiar to core developers, so this section only covers the important parts that need attention to make your core work.

```verilog
input   RESET
```

This signal is asserted while the ARM side is initializing. It can be used as an initial reset. It won't be asserted again during the entire runtime of the core except when the user chooses another core from the OSD. Then the ARM will assert RESET in the existing core to let it stop any activity before switching to another core (cores loaded through USB Blaster won't get this "bye-bye" RESET).

If the core uses DDR3 memory (the scaler doesn't count), the initial and bye-bye RESETs are crucial for correct operation. You will get a hard hang if DDR3 is accessed during RESET.

```verilog
inout  [45:0] HPS_BUS
```

Pass it as-is to the `hps_io` module.

```verilog
output        CLK_VIDEO,
output        CE_PIXEL,
output  [12:0] VIDEO_ARX,
output  [12:0] VIDEO_ARY,
output        VGA_DE,
```

Besides other well-known VGA_* signals, these signals are important in MiSTer to get a proper display. CLK_VIDEO and CE_PIXEL are used to sample the pixels. If the pixel rate equals CLK_VIDEO, then set CE_PIXEL=1. Many cores have a common system clock where the pixel frequency is the system clock divided by some number. In this case, set CLK_VIDEO to the system clock and assert CE_PIXEL at clock cycles where a new pixel is produced. Look in zxspectrum.sv to see how it's done.

Without `CLK_VIDEO`, you can still have VGA output, but the OSD won't work.

**VIDEO_ARX** and **VIDEO_ARY** define aspect ratio on HDMI output. It doesn't affect VGA output. Usually VIDEO_ARX=4, VIDEO_ARY=3 or VIDEO_ARX=16, VIDEO_ARY=9. Other values are possible, but extreme values may cause video problems.

**VGA_DE** is another crucial part for MiSTer. It's the inverse of the blank signals — `~(VBlank | HBlank)` — with caveats: the HDMI video scaler detects the horizontal resolution from the first active video line, so make sure the first line isn't cut by misaligned `VBlank` and `HBlank` signals, or you'll get messed-up HDMI video.

**VGA_HS** and **VGA_VS** should have positive pulse polarity.

```verilog
output        AUDIO_S
```

Make sure you set the correct signed/unsigned mode, otherwise audio will be distorted.

**DDRAM_\*** signals belong to DDR3 memory. If the core can use this memory instead of SDRAM, it won't require an SDRAM board.

**SDRAM_\*** signals belong to SDR SDRAM memory. The core will require an SDRAM board if it uses these signals.

## HPS_IO
The supplementary module `hps_io.sv` is also required in the same entity (see `zxspectrum.sv`). It provides I/O control to and from the ARM side. Most signals are the same as or similar to MiST signals (the `user_io`+`data_io` or `mist_io` modules), so cores ported from MiST usually connect 1:1.

MiSTer has some changes/improvements over original MiST io modules:

* Supports up to 10 images mounted at the same time (MiST has only 1). Set the module parameter `VDNUM` to 2..10 if more than one mounted image is required. If `VDNUM=1`, the related signals are the same as in MiST.
* Because the SD card on MiSTer uses multiple partitions and holds other parts vital to MiSTer, cores cannot access the whole SD card — only image files. Cores requiring direct access to the whole SD card should be redesigned to access images only.
* The Main MiSTer file system on the SD card is exFAT, which supports files larger than 4 GB.
* OSD supports up to 16 lines (versus 7 in MiST), which is handy for many cores.
* ARM↔FPGA communication runs over a parallel bus, which speeds it up. It supports 16-bit I/O.

The firmware has other under-the-hood improvements, like keyboard/mouse/joystick setup.
