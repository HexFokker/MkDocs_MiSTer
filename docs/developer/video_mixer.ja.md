`video_mixer` は、MiSTer フレームワークが提供する多くの映像機能（スキャンダブル、ガンマ、HQ2x スケーリング、フリーズなど）を提供するヘルパーモジュールです。
 
## `video_mixer` のインスタンス化

次のパラメーターでモジュールを設定します：

* `LINE_LENGTH`
* `HALF_DEPTH`
* `GAMMA`

```verilog
module video_mixer
#(
	parameter LINE_LENGTH  = 768,
	parameter HALF_DEPTH   = 0,
	parameter GAMMA        = 0
)
(
	input            CLK_VIDEO, // should be a multiple of (ce_pix*4)
	output reg       CE_PIXEL,  // output pixel clock enable

	input            ce_pix,    // input pixel clock or clock_enable

	input            scandoubler,
	input            hq2x, 	    // high quality 2x scaling

	inout     [21:0] gamma_bus,

	// color
	// DWIDTH はユーザーパラメーターではなく、現在の RTL では HALF_DEPTH ? 3 : 7 の localparam です。
	input [DWIDTH:0] R,
	input [DWIDTH:0] G,
	input [DWIDTH:0] B,

	// Positive pulses.
	input            HSync,
	input            VSync,
	input            HBlank,
	input            VBlank,

	// Freeze engine
	// HDMI: displays last frame 
	// VGA:  black screen with HSync and VSync
	input            HDMI_FREEZE,
	output           freeze_sync,

	// video output signals
	output reg [7:0] VGA_R,
	output reg [7:0] VGA_G,
	output reg [7:0] VGA_B,
	output reg       VGA_VS,
	output reg       VGA_HS,
	output reg       VGA_DE
);
```
