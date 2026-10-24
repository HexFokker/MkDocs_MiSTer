`arcade_video` は主にアーケードコアで使います。スキャンダブラーの有効化（ini 設定に基づく）、HDMI での回転処理、オプションのガンマや異なる色幅の処理を提供するヘルパーです。

## arcade_video のインスタンス化

次のパラメーターでモジュールを設定します：

* WIDTH - 1スキャンラインの幅
* DW - ビット単位のピクセル幅。ほとんどのアーケードはフル24ビットを使いません
    *  6 : 2R 2G 2B
    *  8 : 3R 3G 2B
    *  9 : 3R 3G 3B
    * 12 : 4R 4G 4B
    * 18 : 6R 6G 6B
    * 24 : 8R 8G 8B
* GAMMA - ガンマコントロールを許可

`clk_video` は `ce_pix` の4倍で、40 MHz 以上である必要があります。

```verilog

	input         clk_video,
	input         ce_pix,
```

`fx` 入力は `status[5:3]` によって駆動され、`"O35,Scandoubler Fx,None,HQ2x,CRT 25%,CRT 50%,CRT 75%;"` のような設定文字列を使います。

## 縦画面ゲームの回転 

オプションで `screen_rotate` を追加し、ゲームが反時計回り（`ccw`）か時計回り（`cw`）のどちらの回転を必要とするかを渡します。

`screen_rotate` は回転フレームバッファーに DDRAM を使います。コアが他の用途に DDRAM を必要とする場合は [MCR3](https://github.com/MiSTer-devel/Arcade-MCR3_MiSTer){target=_blank} を参照。オーディオファイルと `screen_rotate` で DDRAM を共有する例があります。その [ddram](https://github.com/MiSTer-devel/Arcade-MCR3_MiSTer/blob/master/rtl/ddram.sv){target=_blank} モジュールを使って `screen_rotate` と独自ハードウェアで DDRAM を共有し、`screen_rotate` に専有させないようにしてください。

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
