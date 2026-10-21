MiSTer では、トップレベルは [sys/sys_top.v](https://github.com/MiSTer-devel/Template_MiSTer/blob/master/sys/sys_top.v){target=_blank} 内にあります。MiSTer コアを書く・移植するとき、Quartus はあなたのトップではなく `sys_top` を使い、`sys_top` はあなたが提供しなければならない `emu` という名前のモジュールを呼びます。このページでは、トップレベルが実装する必要のあるパラメーターを文書化します。`sys_top` はオーディオや HDMI 映像など多くの便利なことを処理します。

## コアのインスタンス化

コアは `emu` ブロック内に置くべきです。例は [Template Top Level](https://github.com/MiSTer-devel/Template_MiSTer/blob/master/mycore.sv){target=_blank} を参照。この記事の一部のコードは古いかもしれません。常に上記リンクのテンプレートを最新フレームワークバージョンとして参照してください。

## マスター入力クロック
```verilog
	//Master input clock
	input         CLK_50M,
```

ほとんどのコアは `sys` フォルダーからインスタンス化された PLL を使いますが、PLL はトップレベルの隣の `rtl` フォルダー（`sys` と同じレベル）に置く必要があります。そうすれば `sys` を更新しても PLL 設定が失われません。

注意：既存の sys アーキテクチャーとの完全な互換性のため、PLL 名は `pll`、インスタンス名も `pll` のままにしてください（下の例の通り）。MegaWizard で PLL を編集し、必要な周波数を変更します（出力の追加を含む）。PLL がなければ、作るかテンプレートのものを使ってください。sys_top.sdc は PLL 名とインスタンス名が正しいことを要求します。

```
wire clk_sys;
pll pll
(
	.refclk(CLK_50M),
	.rst(0),
	.outclk_0(clk_sys)
);
```

## リセット
```verilog
	//Async reset from top-level module.
	//Can be used as initial reset.
	input         RESET,
```

通常 `RESET` ラインは I/O ボードのボタンとステータスフラグと組み合わせて使います。ほとんどのコアはステータスビット0（ソフトリセット用に予約）と、`"R0,Reset;"` のようなオプションを含む `CONF_STR` を使います。

```verilog
wire reset = RESET | status[0] | buttons[1];
```

## HPS バス

HPS バスは ARM プロセッサーとの通信に使います。`hps_io` モジュールに渡してください。`hps_io` はコアの仕事の多くを行い、よりシンプルなインターフェースを提供します。`emu` モジュールに `hps_io` を含めてください。[hps_io](hps_io.md) を参照。

```verilog
	//Must be passed to hps_io module
	inout  [45:0] HPS_BUS,
```

## 映像信号

`emu` を呼ぶトップレベルモジュールには高品質 HDMI スケーラーが含まれており、MiSTer で映像を出力するかなりシンプルなインターフェースを提供します。適切な映像出力を提供するために他のヘルパーモジュールも含められます。

最もシンプルなレベルでは、`CLK_VIDEO` および／または `CE_PIXEL` を提供します（ビデオクロックが正しければ `CE_PIXEL` は 1 にタイできます）。すべての機能が動作するには、ビデオクロックが 40 MHz を超える必要があります。

一般的に、映像信号はエミュレートされたマシンのネイティブ解像度であるべきです。たとえば古い8ビットコンピューターは一般に 15 kHz 映像を出力します。オリジナル機器のネイティブ出力が 15 kHz より高い場合、VGA 信号でそのまま出力して構いません。スケーラーは `VGA_DE`（通常 `assign VGA_DE = ~(HBlank | VBlank);`）を使い、ini ファイル設定に従って画像を HDMI にスケーリングします。

VGA ポートで VGA 互換出力を求めるユーザー向けに、MiSTer には内蔵スキャンダブラーがあり、通常 `video_mixer` または `arcade_video` モジュール経由で含めます。これは `hps_io` の `forced_scandoubler` 信号で制御されます。15 kHz モニターで 15 kHz コアを動かすユーザーもいるため、コア自体に独自の内蔵スキャンダブラーを持つべきではありません。

### Video Mixer

ガンマ対応、スケーリング、スキャンダブルなどの MiSTer フレームワーク標準機能を追加するには [Video Mixer](video_mixer.md) モジュールを使います。

### Video Freak 

クロッピングとスケーリングを追加するには [Video Freak](video_freak.md) モジュールを使います。

### Arcade Video

アーケードコアで回転、スキャンダブル、`video_mixer` のほとんどの機能に対応するには [Arcade Video](arcade_video.md) モジュールを使います。このファイルには `screen_rotate` も含まれており、縦画面アーケードゲームに HDMI 回転を追加します。

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

	input  [11:0] HDMI_WIDTH,
	input  [11:0] HDMI_HEIGHT,
	output        HDMI_FREEZE,

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

## I/O ボードの LED

```verilog
	output        LED_USER,  // 1 - ON, 0 - OFF.

	// b[1]: 0 - LED status is system status OR'd with b[0]
	//       1 - LED status is controlled solely by b[0]
	// hint: supply 2'b00 to let the system control the LED.
	output  [1:0] LED_POWER,
	output  [1:0] LED_DISK,
```

## I/O ボードのボタン

```verilog
	// I/O board button press simulation (active high)
	// b[1]: user button
	// b[0]: osd button
	output  [1:0] BUTTONS,
```

## オーディオ
```verilog
	input         CLK_AUDIO, // 24.576 MHz
	output [15:0] AUDIO_L,
	output [15:0] AUDIO_R,
	output        AUDIO_S,   // 1 - signed audio samples, 0 - unsigned
	output  [1:0] AUDIO_MIX, // 0 - no mix, 1 - 25%, 2 - 50%, 3 - 100% (mono)
```

## アナログ-デジタルコンバーター

テープ入力などに使います。MiSTer の拡張モジュールがアナログオーディオジャックとデジタル信号への変換を提供します。

```verilog
	//ADC
	inout   [3:0] ADC_BUS,
```

## 2枚目の SD カードの信号

```verilog
	//SD-SPI
	output        SD_SCK,
	output        SD_MOSI,
	input         SD_MISO,
	output        SD_CS,
	input         SD_CD,
```

## DDR3 メモリーサブシステム

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

### DDR3 への書き込み

内部 DDR3 コントローラーは書き込みを非常に効率的に処理するため、通常バースト書き込みは不要です。
書き込むには、`DDRAM_BUSY` がローのとき `DDRAM_WE` を1クロックサイクルハイにします。
`DDRAM_DIN` のデータを `DDRAM_BE` に従って `DDRAM_ADDR` に書き込みます。
単一書き込みでは `DDRAM_BURSTCNT` は 1 にします。
`DDRAM_BURSTCNT = 1` のとき、複数の書き込みを休まず発行することもできます。

### DDR3 からの読み込み

1つ以上の64ビットワードを読むには、`DDRAM_BUSY` がローの間 `DDRAM_RD` を1クロックサイクルハイに保ちます。`DDRAM_ADDR` から始まる `DDRAM_BURSTCNT` 個の64ビットワードを読み（バーストではカウントアップ）、結果を `DDRAM_DOUT` に提示します。通常1クロックサイクルに1つ、読み込みが有効なとき `DDRAM_DOUT_READY = 1` になります。
すべての読み込みリクエストには複数サイクルのレイテンシーがあります。100 MHz で約20サイクルが典型ですが、もっと長くなることもあります。
可能な限り DDR3 の高帯域を活用するため、より大きな `DDRAM_BURSTCNT` 値を使ってください。

### DDR3 Busy 信号

`DDRAM_BUSY` はリクエストポートの無視信号として機能します。ハイの間はそのサイクルにリクエストを発行できません。
ただし、保留中のリクエストは問題を起こしません。たとえばクロックプロセスで `DDRAM_RD = 1` に設定し、`DDRAM_BUSY = 0` のときだけクリアしても構いません。
これによりリクエスト信号を組み合わせ回路ではなくクロック駆動にでき、より高いクロック速度と少ないタイミング収束問題が得られます。

## シングル・デュアル SDRAM インターフェース

SDRAM インターフェースの完全な理解には、SDRAM チップの仕様を参照してください。[ハードウェアリポジトリー](https://github.com/MiSTer-devel/Hardware_MiSTer){target=_blank}と[回路図](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/sdram_xsds_2.9.pdf){target=_blank}も役立つかもしれません。

[32 MB モジュールのデータシート](https://github.com/MiSTer-devel/Main_MiSTer/wiki/files/AS4C16M16SA-V3.0_March%202015.pdf){target=_blank}を見てください。64 MB モジュールのデータシートはそれほど詳しくありません。

既存コアでの SDRAM 使用例：

* シングルポート直接使用：[Gameboy](https://github.com/MiSTer-devel/Gameboy_MiSTer/blob/master/rtl/sdram.sv){target=_blank}
* マルチポートリクエスト／レスポンス：[Gameboy Advance](https://github.com/MiSTer-devel/GBA_MiSTer/blob/master/rtl/sdram.sv){target=_blank}
* 複雑なバンクマシン：[JT Frame](https://github.com/jotego/jtframe/blob/master/hdl/sdram/jtframe_sdram_bank.v){target=_blank}

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

## シリアル対応

シリアルは MiSTer の Linux ARM 側に渡され、そこのソフトウェアがデータをどうするか決めます。シェル、PPP、MIDI に送るなどです。

シリアル速度とオプションは [CONF_STR](conf_str.md) で設定します。

```verilog
	input         UART_CTS,
	output        UART_RTS,
	input         UART_RXD,
	output        UART_TXD,
	output        UART_DTR,
	input         UART_DSR,
```

## ユーザーポート（MiSTer の追加 USB 3.1 Type-A スタイルコネクター）


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

## OSD ステータス

`OSD_STATUS` は OSD が開いているとき 1 です。OSD が開いている間コアをポーズしたり、オートセーブに使えます。

```verilog
	input         OSD_STATUS
```
