MiSTer はかなり複雑なハードウェアを使っていますが、オープンソースのおかげで、ハードウェアとソフトウェアの知識レベルが異なる開発者でもこのプラットフォーム向けに開発できます。多くの MiSTer コアは、**フレームワーク**と呼ばれる共通のほぼ同一のコードブロックを共有しており、ハードウェアとファームウェアへのアクセスを簡素化しています。

新しいコアは現在の [Template_MiSTer](https://github.com/MiSTer-devel/Template_MiSTer){target=_blank} から始めてください。このガイドでは古い [ZX Spectrum](https://github.com/MiSTer-devel/ZX-Spectrum_MISTer){target=_blank} コアを歴史的な例として使います。

## フレームワーク

フレームワークのソースの大部分は [sys](https://github.com/MiSTer-devel/ZX-Spectrum_MISTer/tree/master/sys){target=_blank} フォルダーにあります。

新しいプロジェクトでは、通常以下のファイル／フォルダーをコピーする必要があります：

* sys フォルダー
* jtag.cdf
* jtag_lite.cdf
* zxspectrum.qpf（プロジェクトファイル。フル版とライト版の切り替えで自動的に変更されて変更履歴を汚さないよう、読み取り専用にしておく）
* zxspectrum.qsf
* zxspectrum.srf（警告の無視設定）
* zxspectrum-lite.qsf
* zxspectrum-lite.srf（警告の無視設定）

次にいくつか変更を加えます：

* zxspectrum.* ファイルを新しいプロジェクト用にリネーム。
* ファイル内で "zxspectrum" という単語を探し、プロジェクト名に置き換え。
* *.qsf ファイルの末尾にプロジェクトファイルのリストがあるので、プロジェクトに関係ないファイルを削除。

これで新しいプロジェクトの初期ファイルセットができ、Quartus 17.0.2（標準の MiSTer プロジェクト）でプロジェクトを開けます。`*_Q13` Quartus プロジェクトファイルを持つプロジェクトは Quartus 13.x を使います。

既存のコアを MiSTer に移植する場合、トップモジュールエンティティーは `emu` にリネームする必要があります。zxspectrum.sv とその入出力信号を見てください：

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

これらの信号が MiSTer への主な接続です。これらの信号に合わせてコアを修正する必要があります。

## API
ほとんどのトップレベル信号は自明で、コア開発者にはおおむね馴染みがあるはずなので、この節ではコアを動かすために注意が必要な重要部分だけを扱います。

```verilog
input   RESET
```

この信号は ARM 側の初期化中にアサートされます。初期リセットとして使えます。コアの実行中に再びアサートされることはありません。ただし、ユーザーが OSD から別のコアを選んだ場合は別です。その場合、ARM は既存のコアに RESET をアサートし、別のコアへ切り替える前にすべてのアクティビティーを止めさせます（USB Blaster 経由で読み込まれたコアはこの「さよなら」RESET を受け取りません）。

コアが DDR3 メモリーを使う場合（スケーラーは除く）、初期 RESET とさよなら RESET は正しい動作に不可欠です。RESET 中に DDR3 にアクセスするとハードハングします。

```verilog
inout  [45:0] HPS_BUS
```

そのまま `hps_io` モジュールに渡してください。

```verilog
output        CLK_VIDEO,
output        CE_PIXEL,
output  [12:0] VIDEO_ARX,
output  [12:0] VIDEO_ARY,
output        VGA_DE,
```

他のよく知られた VGA_* 信号のほか、これらの信号は MiSTer で正しい表示を得るのに重要です。CLK_VIDEO と CE_PIXEL はピクセルをサンプリングするために使います。ピクセルレートが CLK_VIDEO と等しいなら CE_PIXEL=1 に設定します。多くのコアは共通のシステムクロックを持ち、ピクセル周波数はシステムクロックをある数で割ったものです。この場合、CLK_VIDEO をシステムクロックに設定し、新しいピクセルが生成されるクロックサイクルで CE_PIXEL をアサートします。zxspectrum.sv でどうやっているか見てください。

`CLK_VIDEO` がなくても VGA 出力はできますが、OSD が動きません。

**VIDEO_ARX** と **VIDEO_ARY** は HDMI 出力のアスペクト比を定義します。VGA 出力には影響しません。通常は VIDEO_ARX=4、VIDEO_ARY=3、または VIDEO_ARX=16、VIDEO_ARY=9 です。他の値も可能ですが、極端な値は映像問題を起こすことがあります。

**VGA_DE** も MiSTer にとって重要な部分です。ブランク信号の反転 `~(VBlank | HBlank)` ですが、注意点があります。HDMI ビデオスケーラーは最初のアクティブビデオラインから水平解像度を検出するため、最初のラインがずれた `VBlank` と `HBlank` 信号に切り詰められないようにしてください。さもないと HDMI 映像が乱れます。

**VGA_HS** と **VGA_VS** は正パルス極性にしてください。

```verilog
output        AUDIO_S
```

正しい signed/unsigned モードを設定してください。さもないと音声が歪みます。

**DDRAM_\*** 信号は DDR3 メモリー用です。コアが SDRAM の代わりにこのメモリーを使えれば、SDRAM ボードは不要になります。

**SDRAM_\*** 信号は SDR SDRAM メモリー用です。コアがこれらの信号を使う場合、SDRAM ボードが必要です。

## HPS_IO
補助モジュール `hps_io.sv` も同じエンティティーに必要です（`zxspectrum.sv` 参照）。ARM 側への I/O 制御を提供します。ほとんどの信号は MiST の信号（`user_io`+`data_io` または `mist_io` モジュール）と同じか類似しているため、MiST から移植されたコアは通常 1:1 で接続できます。

MiSTer にはオリジナルの MiST io モジュールに対するいくつかの変更・改善があります：

* 同時に最大10のイメージをマウント可能（MiST は1つのみ）。複数のマウントイメージが必要な場合は、モジュールパラメーター `VDNUM` を 2..10 に設定します。`VDNUM=1` なら、関連する信号は MiST と同じです。
* MiSTer の SD カードは複数のパーティションを使い、MiSTer に不可欠な他の部分を保持しているため、コアは SD カード全体にはアクセスできず、イメージファイルのみアクセスできます。SD カード全体への直接アクセスが必要なコアは、イメージのみアクセスするよう再設計してください。
* MiSTer は SD カードの exFAT に対応しています。exFAT 使用時は 4 GiB を超えるファイルを扱えます。
* OSD は最大16行に対応（MiST は7行）。多くのコアで便利です。
* ARM↔FPGA 通信はパラレルバス上で行われ、高速化されています。16ビット I/O に対応。

ファームウェアには他にも内部改善があります。キーボード／マウス／ジョイスティックのセットアップなどです。
