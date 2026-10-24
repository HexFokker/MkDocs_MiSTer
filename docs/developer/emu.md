On MiSTer, the top level is inside [sys/sys_top.v](https://github.com/MiSTer-devel/Template_MiSTer/blob/master/sys/sys_top.v){target=_blank}. When writing or porting a MiSTer core, Quartus uses `sys_top` rather than your own top, and `sys_top` calls a module named `emu` that you must provide. This page documents the parameters your top level needs to implement. `sys_top` handles a lot of useful things like audio and HDMI video.

## Instantiating your core

Your core should live inside an `emu` block — see the [Template Top Level](https://github.com/MiSTer-devel/Template_MiSTer/blob/master/mycore.sv){target=_blank} for an example. Some code in this article may be outdated; always reference the template linked above for the latest framework version.

## Master input clock
```verilog
	//Master input clock
	input         CLK_50M,
```

Most cores use the PLL instantiated from the `sys` folder, but the PLL must live in the `rtl` folder next to the top level (at the same level as `sys`), so that updating `sys` doesn't lose the PLL configuration.

NOTE: For full compatibility with the existing sys architecture, keep the PLL named `pll` and the instance named `pll` as shown below. Use the MegaWizard to edit the PLL and modify the required frequencies (including adding more outputs). If you don't have a PLL, create one or use the one from the template. sys_top.sdc requires the PLL name and instance name to be correct.

```
wire clk_sys;
pll pll
(
	.refclk(CLK_50M),
	.rst(0),
	.outclk_0(clk_sys)
);
```

## Reset
```verilog
	//Async reset from top-level module.
	//Can be used as initial reset.
	input         RESET,
```

Normally the `RESET` line is used in conjunction with the button on the I/O board, as well as a status flag. Most cores use status bit 0 (reserved for a soft reset), and a `CONF_STR` that includes an option like: `"R0,Reset;"`

```verilog
wire reset = RESET | status[0] | buttons[1];
```

## HPS Bus

The HPS bus is used to communicate with the ARM processor. Pass it into the `hps_io` module, which does a lot of the work for the core and provides a simpler interface. Include `hps_io` in the `emu` module. See [hps_io](hps_io.md).

```verilog
	//Must be passed to hps_io module
	inout  [45:0] HPS_BUS,
```

## Video Signals

The top-level module that calls `emu` includes the high-quality HDMI scaler, and provides a fairly simple interface to output video on MiSTer. Other helper modules can be included to provide proper video output.

At the simplest level, provide a `CLK_VIDEO` and/or `CE_PIXEL` (`CE_PIXEL` can be tied to 1 if your video clock is correct). The video clock needs to be above 40 MHz for all features to work.

Generally, the video signals should be at the emulated machine's native resolution; an old 8-bit computer, for example, generally outputs 15 kHz video. If the original device's native output was higher than 15 kHz, it's fine to output that natively through the VGA signals. The scaler uses `VGA_DE` (usually `assign VGA_DE = ~(HBlank | VBlank);`) to scale the image to HDMI according to the ini file settings.

For users who want VGA-compatible output on the VGA port, MiSTer has a built-in scandoubler, which you usually include through the `video_mixer` or `arcade_video` module. It is controlled by the `forced_scandoubler` signal from `hps_io`. Some users run 15 kHz cores on 15 kHz monitors, so the core itself shouldn't have its own built-in scandoubler.

### Video Mixer

Use the [Video Mixer](video_mixer.md) module to add MiSTer framework standard features like gamma support, scaling, and scandoubling.

### Video Freak 

Use the [Video Freak](video_freak.md) module to add cropping and scaling.

### Arcade Video

Use the [Arcade Video](arcade_video.md) module for arcade cores to support rotation, scandoubling, and most of the features in `video_mixer`. The file also includes `screen_rotate`, which adds HDMI rotation for vertical arcade games.

```verilog
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

	// Linux framebuffer input (linear framebuffer written by HPS)
	input   [5:0] LFB_FMT,
	input  [31:0] LFB_BASE,
	input  [11:0] LFB_WIDTH,
	input  [11:0] LFB_HEIGHT,
	input  [13:0] LFB_STRIDE,

`ifdef MISTER_FB
	// Use framebuffer in DDRAM (USE_FB=1 in qsf)
	// FB_FORMAT:
	//    [2:0] : 011=8bpp(palette) 100=16bpp 101=24bpp 110=32bpp
	//    [3]   : 0=16bits 565 1=16bits 1555
	//    [4]   : 0=RGB  1=BGR (for 16/24/32 modes)
	//
	// FB_STRIDE either 0 (rounded to 256 bytes) or multiple of pixel size (in bytes)
	output        FB_EN,
	output  [4:0] FB_FORMAT,
	output [11:0] FB_WIDTH,
	output [11:0] FB_HEIGHT,
	output [31:0] FB_BASE,
	output [13:0] FB_STRIDE,
	input         FB_VBL,
	input         FB_LL,
	output        FB_FORCE_BLANK,

`ifdef MISTER_FB_PALETTE
	// Palette control for 8bit modes.
	// Ignored for other video modes.
	output        FB_PAL_CLK,
	output  [7:0] FB_PAL_ADDR,
	output [23:0] FB_PAL_DOUT,
	input  [23:0] FB_PAL_DIN,
	output        FB_PAL_WR,
`endif
`endif
```

## LEDs on the I/O board

```verilog
	output        LED_USER,  // 1 - ON, 0 - OFF.

	// b[1]: 0 - LED status is system status OR'd with b[0]
	//       1 - LED status is controlled solely by b[0]
	// hint: supply 2'b00 to let the system control the LED.
	output  [1:0] LED_POWER,
	output  [1:0] LED_DISK,
```

## Buttons on I/O board

```verilog
	// I/O board button press simulation (active high)
	// b[1]: user button
	// b[0]: osd button
	output  [1:0] BUTTONS,
```

## Audio
```verilog
	input         CLK_AUDIO, // 24.576 MHz
	output [15:0] AUDIO_L,
	output [15:0] AUDIO_R,
	output        AUDIO_S,   // 1 - signed audio samples, 0 - unsigned
	output  [1:0] AUDIO_MIX, // 0 - no mix, 1 - 25%, 2 - 50%, 3 - 100% (mono)
```

## Analog-to-digital converter

Used for tape input and similar. An add-on module for MiSTer provides an analog audio jack with conversion to digital signals.

```verilog
	//ADC
	inout   [3:0] ADC_BUS,
```

## Signals for the second SD card

```verilog
	//SD-SPI
	output        SD_SCK,
	output        SD_MOSI,
	input         SD_MISO,
	output        SD_CS,
	input         SD_CD,
```

## DDR3 Memory Subsystem

```verilog
	//High latency DDR3 RAM interface
	//Use for non-critical time purposes
	output        DDRAM_CLK,          // any clock, no restrictions. Typically main core clock
	input         DDRAM_BUSY,         // every read and write request is only accepted in a cycle where busy is low
	output  [7:0] DDRAM_BURSTCNT,     // amount of words to be written/read. Maximum is 128
	output [28:0] DDRAM_ADDR,         // starting address for read/write. In case of burst, the addresses will internally count up
	input  [63:0] DDRAM_DOUT,         // data coming from (burst) read
	input         DDRAM_DOUT_READY,   // high for 1 clock cycle for every 64 bit dataword requested via (burst) read request
	output        DDRAM_RD,           // request read at DDRAM_ADDR and DDRAM_BURSTCNT length
	output [63:0] DDRAM_DIN,          // data word to be written
	output  [7:0] DDRAM_BE,           // byte enable for each of the 8 bytes in DDRAM_DIN, only used for writing. (1=write, 0=ignore)
	output        DDRAM_WE,           // request write at DDRAM_ADDR with DDRAM_DIN data and DDRAM_BE mask
```

### Writing to DDR3

The internal DDR3 controller handles writes very efficiently, so burst writes are typically not required.
To write, `DDRAM_WE` should be high for 1 clock cycle whenever `DDRAM_BUSY` is low. 
It writes the data in `DDRAM_DIN` to `DDRAM_ADDR` with respect to `DDRAM_BE`.
For a single write, `DDRAM_BURSTCNT` should be 1.
Multiple writes can also be issued without pausing when `DDRAM_BURSTCNT = 1`.

### Reading from DDR3

To read one or more 64-bit words, hold `DDRAM_RD` high for 1 clock cycle while `DDRAM_BUSY` is low. It reads `DDRAM_BURSTCNT` 64-bit words starting at `DDRAM_ADDR` (counting up for bursts) and presents the results at `DDRAM_DOUT` — typically one per clock cycle — with `DDRAM_DOUT_READY = 1` when the read is valid.
Every read request has multi-cycle latency: around 20 cycles at 100 MHz is typical, but it can be much longer.
Use higher `DDRAM_BURSTCNT` values to take advantage of DDR3's high bandwidth whenever possible.

### DDR3 Busy signal

`DDRAM_BUSY` acts as an ignore signal for the request ports: whenever it is high, no request can be issued that cycle.
However, a pending request causes no problem, so it's fine to e.g. set `DDRAM_RD = 1` in a clocked process and only clear it when `DDRAM_BUSY = 0`.
This lets the request signals be clocked rather than combinatorial, allowing higher clock speeds and fewer timing-closure problems.

## Single and Dual SDRAM interface

For a full understanding of the SDRAM interface, see the SDRAM chip's specifications. The [hardware repository](https://github.com/MiSTer-devel/Hardware_MiSTer){target=_blank} and [schematic](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/sdram_xsds_2.9.pdf){target=_blank} may also be useful.

Look through the [32 MB module's data sheet](https://github.com/MiSTer-devel/Main_MiSTer/wiki/files/AS4C16M16SA-V3.0_March%202015.pdf){target=_blank}; the 64 MB module's data sheet isn't as detailed.

Some examples of SDRAM usage in existing cores:

* Single-port direct usage: [Gameboy](https://github.com/MiSTer-devel/Gameboy_MiSTer/blob/master/rtl/sdram.sv){target=_blank}
* Multi-port request/response: [Gameboy Advance](https://github.com/MiSTer-devel/GBA_MiSTer/blob/master/rtl/sdram.sv){target=_blank}
* Complex bank machine: [JT Frame](https://github.com/jotego/jtframe/blob/master/hdl/sdram/jtframe_sdram_bank.v){target=_blank}

```verilog
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

`ifdef MISTER_DUAL_SDRAM
	//Secondary SDRAM
	//Set all output SDRAM_* signals to Z ASAP if SDRAM2_EN is 0
	input         SDRAM2_EN,
	output        SDRAM2_CLK,
	output [12:0] SDRAM2_A,
	output  [1:0] SDRAM2_BA,
	inout  [15:0] SDRAM2_DQ,
	output        SDRAM2_nCS,
	output        SDRAM2_nCAS,
	output        SDRAM2_nRAS,
	output        SDRAM2_nWE,
`endif
```

## Serial Support

Serial is passed to the MiSTer's Linux ARM side, where software decides what to do with the data — e.g. send it to the shell, PPP, or MIDI.

Serial speeds and options are configured via [CONF_STR](conf_str.md).

```verilog
	input         UART_CTS,
	output        UART_RTS,
	input         UART_RXD,
	output        UART_TXD,
	output        UART_DTR,
	input         UART_DSR,
```

## User port (extra USB 3.1 Type-A-style connector on MiSTer)


| USB  |  P7 |  Name  | PIN  |   MiSTer | emu wire |
|---|---|---|---|---|---|
|1  |  +5V |   +5V|
|2  |  2  |  TX   | SDA  |  AH9   | USER_IO[1] |
|3  |  1    |RX   | SCL   | AG11   | USER_IO[0] |
|4  |  GND   | GND|
|5  |  8   | DSR  |  IO10  |  AF15  |  USER_IO[5]|
|6  |  7   | DTR  |  IO11  | AG16   | USER_IO[4]|
|7  |  6   | CTS  |  IO12  |  AH11  |  USER_IO[3]|
|8  |  5   | RTS  |  IO13  |  AH12  |  USER_IO[2]|
|9  |  10  |  IO6 |   IO8  |  AF17  |  USER_IO[6]|
|10 |   Shield |   Shield |

```verilog
	// Open-drain User port.
	// 0 - D+/RX
	// 1 - D-/TX
	// 2..6 - USR2..USR6
	// Set USER_OUT to 1 to read from USER_IN.
	input   [6:0] USER_IN,
	output  [6:0] USER_OUT,
```

## OSD Status

`OSD_STATUS` is 1 when the OSD is open. It can be used to pause the core while the OSD is open, and/or for autosave.

```verilog
	input         OSD_STATUS
```
