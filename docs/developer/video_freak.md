`video_freak` is used to crop and scale the image.

`video_freak` takes the original `VGA_DE_IN` and outputs a new `VGA_DE` and `VIDEO_ARX`/`VIDEO_ARY` based on the cropping parameters.
 
```verilog
module video_freak
(
	input             CLK_VIDEO,
	input             CE_PIXEL,
	input             VGA_VS,
	input      [11:0] HDMI_WIDTH,
	input      [11:0] HDMI_HEIGHT,
	output            VGA_DE,
	output reg [12:0] VIDEO_ARX,
	output reg [12:0] VIDEO_ARY,

	input             VGA_DE_IN,
	input      [11:0] ARX,
	input      [11:0] ARY,
	input      [11:0] CROP_SIZE,
	input       [4:0] CROP_OFF, // -16...+15
	input       [2:0] SCALE     //0 - normal, 1 - V-integer, 2 - HV-Integer-, 3 - HV-Integer+, 4 - HV-Integer
);
```


`VGA_DE_IN` is the core's display-enable; the module emits a modified `VGA_DE` plus the adjusted `VIDEO_ARX`/`VIDEO_ARY` aspect values. `CROP_SIZE` sets the vertical crop height; `CROP_OFF` is a signed offset (-16 to +15) that shifts the cropped window. `SCALE` selects the integer-scaling mode: 0 = normal, 1 = vertical integer, 2 = HV-integer minus, 3 = HV-integer plus, 4 = HV-integer.
