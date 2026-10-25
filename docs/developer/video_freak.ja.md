`video_freak` は画像のクロップとスケーリングに使います。

`video_freak` は元の `VGA_DE_IN` を受け取り、クロッピングパラメーターに基づいて新しい `VGA_DE` と `VIDEO_ARX`/`VIDEO_ARY` を出力します。
 
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


`VGA_DE_IN` はコアのディスプレイイネーブルで、このモジュールは変更した `VGA_DE` と調整済みの `VIDEO_ARX`/`VIDEO_ARY` アスペクト値を出力します。`CROP_SIZE` は垂直方向のクロップ高さを設定し、`CROP_OFF` はクロップしたウィンドウをずらす符号付きオフセット（-16 ～ +15）です。`SCALE` は整数スケーリングモードを選択します：0 = 通常、1 = 垂直整数、2 = HV 整数マイナス、3 = HV 整数プラス、4 = HV 整数。
