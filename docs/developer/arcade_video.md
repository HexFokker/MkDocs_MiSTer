`arcade_video` is used mostly in arcade cores. It provides helpers to optionally enable the scandoubler (based on ini settings), handle rotation on HDMI, and optionally handle gamma and different color widths.

## Instantiating arcade_video

Set up the module with these parameters:

* WIDTH - the width of one scanline
* DW - pixel width in bits. Most arcades don't use a full 24 bits
    *  6 : 2R 2G 2B
    *  8 : 3R 3G 2B
    *  9 : 3R 3G 3B
    * 12 : 4R 4G 4B
    * 18 : 6R 6G 6B
    * 24 : 8R 8G 8B
* GAMMA - allow gamma controls

`clk_video` is the video clock (above 40 MHz); `ce_pix` is a clock-enable pulse, not a clock. A typical setup drives ce_pix once every 4 clk_video cycles.

```verilog

	input         clk_video,
	input         ce_pix,
```

The `fx` input is driven by `status[5:3]`, using a config string such as `"O35,Scandoubler Fx,None,HQ2x,CRT 25%,CRT 50%,CRT 75%;",`

## Rotating vertical games 

Optionally add `screen_rotate` and pass whether the game needs to rotate counterclockwise (`ccw`) or clockwise (`cw`).

`screen_rotate` uses DDRAM for the rotation framebuffer. If your core needs DDRAM for something else, see [MCR3](https://github.com/MiSTer-devel/Arcade-MCR3_MiSTer){target=_blank} for an example that shares DDRAM between an audio file and `screen_rotate`; use its [ddram](https://github.com/MiSTer-devel/Arcade-MCR3_MiSTer/blob/master/rtl/ddram.sv){target=_blank} module to share DDRAM between `screen_rotate` and your own hardware, instead of giving `screen_rotate` exclusive use of it.

```verilog
screen_rotate screen_rotate
(
		  .*,
		  .rotate_ccw(ccw)
);

module arcade_video #(parameter WIDTH=320, DW=8, GAMMA=1)
(
	input         clk_video,
	input         ce_pix,

	input[DW-1:0] RGB_in,
	input         HBlank,
	input         VBlank,
	input         HSync,
	input         VSync,

	output        CLK_VIDEO,
	output        CE_PIXEL,
	output  [7:0] VGA_R,
	output  [7:0] VGA_G,
	output  [7:0] VGA_B,
	output        VGA_HS,
	output        VGA_VS,
	output        VGA_DE,
	output  [1:0] VGA_SL,

	input   [2:0] fx,
	input         forced_scandoubler,
	inout  [21:0] gamma_bus
);
```
