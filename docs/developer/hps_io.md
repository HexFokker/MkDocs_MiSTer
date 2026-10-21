HPS stands for Hard Processor System — the ARM part of the MiSTer FPGA. The `hps_io.sv` file contains the `hps_io` module, which talks to the MiSTer binary on the ARM side. It provides convenient signals that abstract the different types of I/O a core might need.

## Instantiating hps_io

The module has a few parameters that are used to set it up:

* `CONF_STR` - how the HPS reads the OSD configuration string
* `PS2DIV` - divides `clk_sys` to create a slower clock for the legacy PS/2 signals (`ps2_kbd_clk_out`, etc.)
* `WIDE` - makes the `ioctl` data and `sd_buff` signals 8-bit (`WIDE=0`) or 16-bit (`WIDE=1`); when wide, `ioctl_addr` is incremented by 2
* `VDNUM` - Virtual Device Number — can be 1 to 10, creating extra virtual block devices
* `BLKSZ` - Block Size — sets the block size of the block device: 0 = 128, 1 = 256, 2 = 512 (default), ... 7 = 16384
* `PS2WE` - PS/2 Write Enable — option to use two-way PS/2 communication. See the ao486 core.

`clk_sys` is the system clock — make sure to use the same clock when reading from these signals.
`HPS_BUS` should be passed through from the top-level `emu`.

```Verilog
//
// Use buffer to access SD card. It's time-critical part.
//
// WIDE=1 for 16 bit file I/O
// VDNUM 1..10
// BLKSZ 0..7: 0 = 128, 1 = 256, 2 = 512(default), .. 7 = 16384
//
module hps_io #(parameter CONF_STR, CONF_STR_BRAM=1, PS2DIV=0, WIDE=0, VDNUM=1, BLKSZ=2, PS2WE=0)
(
	input             clk_sys,
	inout      [48:0] HPS_BUS,

```

## Joystick input

MiSTer supports up to 6 players on separate joysticks. `joystick_0`–`joystick_5` are digital joysticks: the first 4 bits are the directions, and the rest are buttons that can be mapped with the `J` option in `CONF_STR`. 

* `joystick_x[0]` = right
* `joystick_x[1]` = left
* `joystick_x[2]` = down
* `joystick_x[3]` = up

Analog joysticks are supported via `joystick_l_analog_x` / `joystick_r_analog_x`. The values are analog -127..+127, Y: `[15:8]`, X: `[7:0]`. Depending on how you want to use the values, you may need to renormalize them. -128 is omitted so it's easier to invert the direction. `l` is the left stick and `r` the right stick on a PlayStation-style controller.

Paddles — `paddle_x` — are input devices that have a range from 0 to 255. They do not spin fully.

Spinners — `spinner_x` — look like paddles, but have no stop in the hardware and spin freely. They use an extra bit 8 that toggles with each update. The value is in bits 0:7, ranging -128..+127 — relative, and usually between -8 and 8.

```Verilog
	// buttons up to 32
	output reg [31:0] joystick_0,
	output reg [31:0] joystick_1,
	output reg [31:0] joystick_2,
	output reg [31:0] joystick_3,
	output reg [31:0] joystick_4,
	output reg [31:0] joystick_5,
	
	// analog -127..+127, Y: [15:8], X: [7:0]
	output reg [15:0] joystick_l_analog_0,
	output reg [15:0] joystick_l_analog_1,
	output reg [15:0] joystick_l_analog_2,
	output reg [15:0] joystick_l_analog_3,
	output reg [15:0] joystick_l_analog_4,
	output reg [15:0] joystick_l_analog_5,

	output reg [15:0] joystick_r_analog_0,
	output reg [15:0] joystick_r_analog_1,
	output reg [15:0] joystick_r_analog_2,
	output reg [15:0] joystick_r_analog_3,
	output reg [15:0] joystick_r_analog_4,
	output reg [15:0] joystick_r_analog_5,

	// paddle 0..255
	output reg  [7:0] paddle_0,
	output reg  [7:0] paddle_1,
	output reg  [7:0] paddle_2,
	output reg  [7:0] paddle_3,
	output reg  [7:0] paddle_4,
	output reg  [7:0] paddle_5,

	// spinner [7:0] -128..+127, [8] - toggle with every update
	output reg  [8:0] spinner_0,
	output reg  [8:0] spinner_1,
	output reg  [8:0] spinner_2,
	output reg  [8:0] spinner_3,
	output reg  [8:0] spinner_4,
	output reg  [8:0] spinner_5,
```

## Buttons

Buttons from the top-level `emu` are what the hardware sees. Buttons from `hps_io` can include emulated button presses from the OSD, HPS, etc.

* `buttons[1]` is the user button
* `buttons[0]` is the OSD button

```Verilog
	// I/O board button press simulation (active high)
	// b[1]: user button
	// b[0]: osd button
	output      [1:0] buttons,
```
## Forced Scandoubler

`forced_scandoubler` is set to 1 when the user wants the scandoubler turned on.

```Verilog
	output            forced_scandoubler,
```
## Direct Video

`direct_video` is set to 1 when the MiSTer is using HDMI as a VGA port with a proper converter.

```Verilog
	output            direct_video,
```

## Status

The status bits are used by the OSD to provide the core with the values the user picks in the OSD. For example, the status string:

```
	"O1,Colors,NTSC,PAL;",
```

would set `status[1]` to 0 for NTSC and 1 for PAL.  See the [CONF_STR](conf_str.md) documentation for all of the OSD options.

* status_menumask - used to tell the OSD to turn options on and off via the H or h option. Set bit 0 to affect H0.
* status_in, status_set - when status_set is 1, the hps_io will grab the status_in and use it to change the status bits

```Verilog
	output reg [63:0] status,
	input      [63:0] status_in,
	input             status_set,
	input      [15:0] status_menumask,
```

## Info

* info - info string to display from CONF_STR
* info_req - ask HPS to display info string on OSD

```Verilog
	input             info_req,
	input       [7:0] info,
```

## Force a new Video mode

* new_vmode - if the core needs to force the system to change video modes, it can set this flag
```Verilog

	//toggle to force notify of video mode change
	input             new_vmode,
```

## Virtual Hard Drives and Block Devices

Hard drive images are loaded with the `S` option in the OSD. Up to 10 images can be mounted at once if `VDNUM` is set to 10; 1–10 are valid values. 

When an image is mounted, a bit is set in img_mounted, and img_readonly and img_size become valid for that img_mounted bit. Save these values into registers if you'll need them later.

These are block devices, so to read or write you first specify the block, then assert rd or wr — addresses start streaming through sd_buff_addr. 

There is no wait line, because it's assumed you'll write one block of data into DPRAM and it writes immediately. 

To read data, set the sb_lba to the block number you want to seek to. Then set the correct bit in sd_rd to 1, and the HPS will respond by raising the correct bit in sd_ack, and keeping it high for the duration of the read. The HPS will then use sd_buff_addr and sd_buff_dout and sd_buff_wr to count from 0 to BLKSZ and send a byte per clock.  After reaching the last byte, it will clear the sd_ack.

To write data, set the sb_lba to the block number you want to seek to. Then set the correct bit in sd_wr to 1. Similar to a read, it will raise the sd_ack bit, and count the sd_buff_addr - the core will respond by setting each sd_buff_din to the data it wants to write. After the block is written (sd_buff_addr reaches BLKSZ) sd_ack will be cleared.

When the user unmounts the image from the OSD, img_mounted will go high, and the img_size will be set to zero. That is how the core knows to unmount the current image.

* `sd_lba[VDNUM]` - logical block address - this is the block we want to start accessing
* `sd_blk_cnt` - number of blocks
* `sd_rd` - read number of blocks starting at address
* `sd_wr` - write number of blocks starting at address
* `sd_ack` - data read on the sd_buff_out is valid OR that write data must be valid on sd_buff_in[VDNUM]

* `sd_buff_addr` - byte address
* `sd_buff_dout` - data from disk
* `sd_buff_din[VDNUM]` - data to disk
* `sd_buff_wr` - Typically the read data from the blk interface is written into a FIFO or other DPRAM construct.  This is a supplied control signal for the write signal to that FIFO

```Verilog
	// SD config
	output reg [VD:0] img_mounted,  // signaling that new image has been mounted
	output reg        img_readonly, // mounted as read only. valid only for active bit in img_mounted
	output reg [63:0] img_size,     // size of image in bytes. valid only for active bit in img_mounted


	// SD block level access
	input      [31:0] sd_lba[VDNUM],
	input       [5:0] sd_blk_cnt[VDNUM], // number of blocks-1, total size ((sd_blk_cnt+1)*(1<<(BLKSZ+7))) must be <= 16384!
	input      [VD:0] sd_rd,
	input      [VD:0] sd_wr,
	output reg [VD:0] sd_ack,

	// SD byte level access. Signals for 2-PORT altsyncram.
	output reg [AW:0] sd_buff_addr,
	output reg [DW:0] sd_buff_dout,
	input      [DW:0] sd_buff_din[VDNUM],
	output reg        sd_buff_wr,
```

## ROM and File loading, NVRAM saving

Boot ROMs are automatically loaded using the `ioctl` lines. You can also have ROMs loaded via the `F` option in the OSD, or via an MRA.  

* `ioctl_download` - 1 when data is being downloaded. 
* `ioctl_index` - `[15:6]` is the file type, `[5:0]` the file number
* `ioctl_wr` - high when each byte is valid. 
* `ioctl_addr` - address of byte from / to file - counts by two if set to wide
* `ioctl_dout` - data going to core from HPS (ROM)
* `ioctl_din` - data going to HPS from core - e.g. to save NVRAM
* `ioctl_upload` - indicate there is an active upload
* `ioctl_upload_req` - set to 1 to ask the HPS to initiate an NVRAM save, for autosave, HPS only reads this when the OSD is open
* `ioctl_rd` - data is valid to read
* `ioctl_file_ext` - this is the file extension as a string 
* `ioctl_wait` - set this flag to 1 if the core isn't ready to process another byte from the HPS (flow control)

```Verilog
	// ARM -> FPGA download
	output reg        ioctl_download = 0, // signal indicating an active download
	output reg [15:0] ioctl_index,        // menu index used to upload the file
	output reg        ioctl_wr,
	output reg [26:0] ioctl_addr,         // in WIDE mode address will be incremented by 2
	output reg [DW:0] ioctl_dout,
	output reg        ioctl_upload = 0,   // signal indicating an active upload
	input             ioctl_upload_req,
	input      [DW:0] ioctl_din,
	output reg        ioctl_rd,
	output reg [31:0] ioctl_file_ext,
	input             ioctl_wait,
```

Note: boot.rom is sent via ioctl_index == 0, boot1.rom is sent with `[5:0]` set to 0 and `[15:6]` set to 1, boot2.rom and so on.

## SDRAM board size

```Verilog
	// [15]: 0 - unset, 1 - set. [1:0]: 0 - none, 1 - 32MB, 2 - 64MB, 3 - 128MB
	// [14]: debug mode: [8]: 1 - phase up, 0 - phase down. [7:0]: amount of shift.
	output reg [15:0] sdram_sz,
```

## RTC

The RTC will pass the core the time from the HPS. If the HPS doesn't have the optional RTC board, it will pick up the time from an NTP server. 

NOTE: the RTC only sends the time once, when the core starts. After that, the core is responsible for incrementing the seconds, or the seconds and the other fields of the RTC structure.

In BCD:

* `RTC[7:0]`  - seconds
* `RTC[15:8]` - minutes
* `RTC[23:16]` - hour
* `RTC[31:24]` - month day
* `RTC[39:32]` - month
* `RTC[47:40]` - year
* `RTC[55:48]` - week day

```Verilog
	// RTC MSM6242B layout
	output reg [64:0] RTC,

	// Seconds since 1970-01-01 00:00:00
	output reg [32:0] TIMESTAMP,
```

## UART Flags
```Verilog
	// UART flags
	output reg  [7:0] uart_mode,
	output reg [31:0] uart_speed,
```

## Keyboard emulation

The hps_io module has two ways of accessing the keyboard and mouse. It provides PS/2-compatible signals, useful for porting cores that expect a PS/2 keyboard, and an easier-to-use, more reliable interface.

To use the new interface, `ps2_key[10]` is toggled with each keypress and `ps2_key[9]` indicates whether the key is pressed. The rest of the bits are standard PS/2 bits, with bit 8 being the extended bit.

### Setting PS2 Keyboard lights

The HPS uses numlock and scrl_lock to indicate mouse/joystick1/2 emulation. If the core wants to set any of these three LEDs, it sets the corresponding bit in `ps2_kbd_led_use` to enable it, then uses `ps2_kbd_led_status` to turn the LED on/off. The LEDs are in the order:

```verilog
assign ps2_kbd_led_status = {scrl_lock,num_lock,caps_lock};
```

This control is quite slow, so the core shouldn't use it unless it's a pseudo-static indication.

```Verilog
	// ps2 keyboard emulation
	output            ps2_kbd_clk_out,
	output            ps2_kbd_data_out,
	input             ps2_kbd_clk_in,
	input             ps2_kbd_data_in,

	input       [2:0] ps2_kbd_led_status,
	input       [2:0] ps2_kbd_led_use,

	output            ps2_mouse_clk_out,
	output            ps2_mouse_data_out,
	input             ps2_mouse_clk_in,
	input             ps2_mouse_data_in,

	// ps2 alternative interface.

	// [8] - extended, [9] - pressed, [10] - toggles with every press/release
	output reg [10:0] ps2_key = 0,

	// [24] - toggles with every event
	output reg [24:0] ps2_mouse = 0,
	output reg [15:0] ps2_mouse_ext = 0, // 15:8 - reserved (additional buttons), 7:0 - wheel movements
```

## Gamma 

```Verilog
	inout      [21:0] gamma_bus,
```

## Extension Bus

This should be used sparingly — it is for exceptional cases that need CD access, as in the [TurboGrafx16 core](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer/blob/master/TurboGrafx16.sv#L531){target=_blank}. It requires code on the HPS in the MiSTer binary.

```Verilog
	// for core-specific extensions
	inout      [35:0] EXT_BUS
```
