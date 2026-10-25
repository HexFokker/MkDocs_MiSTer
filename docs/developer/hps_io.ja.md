HPS は Hard Processor System の略で、MiSTer FPGA の ARM 部分です。`hps_io.sv` ファイルには `hps_io` モジュールが含まれ、ARM 側の MiSTer バイナリーと通信します。コアが必要とするさまざまな種類の I/O を抽象化する便利な信号を提供します。

## hps_io のインスタンス化

モジュールには設定に使ういくつかのパラメーターがあります：

* `CONF_STR` - HPS が OSD 設定文字列を読み込む方法
* `CONF_STR_BRAM` - 1 のとき、設定文字列をオンデマンドでストリームする代わりに FPGA ブロック RAM に格納する
* `PS2DIV` - `clk_sys` を分周してレガシー PS/2 信号用の遅いクロック（`ps2_kbd_clk_out` など）を作る
* `WIDE` - `ioctl` データと `sd_buff` 信号を 8ビット（`WIDE=0`）または 16ビット（`WIDE=1`）にする。wide のとき `ioctl_addr` は2ずつインクリメントされる
* `VDNUM` - Virtual Device Number。1〜10 で、追加の仮想ブロックデバイスを作成
* `BLKSZ` - Block Size。ブロックデバイスのブロックサイズを設定：0 = 128、1 = 256、2 = 512（デフォルト）、…7 = 16384
* `PS2WE` - PS/2 Write Enable。双方向 PS/2 通信を使うオプション。ao486 コアを参照。
* `F12KEYMOD` - フレームワークメニューの修飾キー。0（デフォルト）は F12 でメニューを開く。1 は F12 をコアに渡し、F12 + (L/R)GUI でメニューを開く

`clk_sys` はシステムクロックです。これらの信号を読むときは同じクロックを使ってください。
`HPS_BUS` はトップレベル `emu` からパススルーすべきです。

```Verilog
//
// Use buffer to access SD card. It's time-critical part.
//
// WIDE=1 for 16 bit file I/O
// VDNUM 1..10
// BLKSZ 0..7: 0 = 128, 1 = 256, 2 = 512(default), .. 7 = 16384
//
module hps_io #(parameter CONF_STR, CONF_STR_BRAM=0, PS2DIV=0, WIDE=0, VDNUM=1, BLKSZ=2, PS2WE=0, STRLEN=$size(CONF_STR)>>3, F12KEYMOD=0)
(
	input             clk_sys,
	inout      [45:0] HPS_BUS,

```

## ジョイスティック入力

MiSTer は別々のジョイスティックで最大6プレイヤーに対応します。`joystick_0`〜`joystick_5` はデジタルジョイスティックです。最初の4ビットは方向、残りは `CONF_STR` の `J` オプションでマッピングできるボタンです。 

* `joystick_x[0]` = 右
* `joystick_x[1]` = 左
* `joystick_x[2]` = 下
* `joystick_x[3]` = 上

アナログジョイスティックは `joystick_l_analog_x` / `joystick_r_analog_x` で対応します。値はアナログ -127..+127、Y: `[15:8]`、X: `[7:0]` です。値の使い方によっては再正規化が必要かもしれません。-128 は省略されているため方向の反転が容易です。`l` は左スティック、`r` は PlayStation スタイルコントローラーの右スティックです。

パドル — `paddle_x` — は 0〜255 の範囲を持つ入力デバイスです。完全には回転しません。

スピナー — `spinner_x` — はパドルに似ていますが、ハードウェアにストッパーがなく自由に回転します。更新ごとにトグルする追加ビット8を使います。値はビット 0:7 にあり、-128..+127 の範囲で相対値、通常 -8〜8 です。

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

	// rumble output for cores that support force feedback
	input      [15:0] joystick_0_rumble, // 15:8 - 'large' rumble motor magnitude, 7:0 'small' rumble motor magnitude
	input      [15:0] joystick_1_rumble,
	input      [15:0] joystick_2_rumble,
	input      [15:0] joystick_3_rumble,
	input      [15:0] joystick_4_rumble,
	input      [15:0] joystick_5_rumble,
```

## ボタン

トップレベル `emu` からのボタンはハードウェアが見るものです。`hps_io` からのボタンは OSD、HPS などからのエミュレートされたボタン押下を含められます。

* `buttons[1]` はユーザーボタン
* `buttons[0]` は OSD ボタン

```Verilog
	// I/O board button press simulation (active high)
	// b[1]: user button
	// b[0]: osd button
	output      [1:0] buttons,
```
## 強制スキャンダブラー

`forced_scandoubler` はユーザーがスキャンダブラーをオンにしたいとき 1 にセットされます。

```Verilog
	output            forced_scandoubler,
```
## Direct Video

`direct_video` は MiSTer が適切なコンバーターで HDMI を VGA ポートとして使っているとき 1 にセットされます。

```Verilog
	output            direct_video,
```

`video_rotated` は別の入力で、HDMI 出力がフレームワークによって回転されていることをコアに伝えます（縦画面アーケードゲームで使用）。

## ステータス

ステータスビットは、OSD がユーザーが選んだ値をコアに提供するために使います。たとえば次のステータス文字列：

```
	"O1,Colors,NTSC,PAL;",
```

は、NTSC で `status[1]` を 0 に、PAL で 1 にセットします。すべての OSD オプションは [CONF_STR](conf_str.md) ドキュメントを参照。

* status_menumask - H または h オプション経由でオプションをオン・オフするよう OSD に伝えるために使用。H0 に影響するにはビット0をセット。
* status_in、status_set - status_set が 1 のとき、hps_io は status_in を取り込んでステータスビットを変更する

```Verilog
	output reg [127:0] status,
	input      [127:0] status_in,
	input             status_set,
	input      [15:0] status_menumask,
```

## Info

* info - CONF_STR から表示する情報文字列
* info_req - HPS に情報文字列を OSD に表示するよう要求

```Verilog
	input             info_req,
	input       [7:0] info,
```

## 新しいビデオモードの強制

* new_vmode - コアがシステムにビデオモード変更を強制する必要がある場合、このフラグをセットできる
```Verilog

	//toggle to force notify of video mode change
	input             new_vmode,
```

## 仮想ハードドライブとブロックデバイス

ハードドライブイメージは OSD の `S` オプションで読み込まれます。`VDNUM` を 10 に設定すれば最大10イメージを同時にマウントできます。1〜10 が有効値です。 

img_mounted はマウント／アンマウントイベント発生時に1クロックだけパルスします。該当デバイスのビットがそのサイクルのみハイになり、img_readonly と img_size はそのビットがアクティブな間だけ有効です。後で必要ならこれらの値をレジスターに保存してください。

これらはブロックデバイスなので、読み書きにはまずブロックを指定し、次に rd または wr をアサートします。アドレスは sd_buff_addr を通じてストリーミングされます。 

ウェイトラインはありません。1ブロックのデータを DPRAM に書き込み、すぐ書き込まれることを前提としているためです。 

データを読むには、sd_lba をシークしたいブロック番号に設定します。次に sd_rd の正しいビットを 1 にセットすると、HPS は sd_ack の正しいビットを上げて応答し、読み込み中それをハイに保ちます。HPS は次に sd_buff_addr、sd_buff_dout、sd_buff_wr を使い、ブロック全体（128 << BLKSZ バイト、最終アドレスはブロックサイズ−1）にわたりクロックごとに1バイトを送ります。最後のバイトの後に sd_ack をクリアします。

データを書くには、sd_lba をシークしたいブロック番号に設定します。次に sd_wr の正しいビットを 1 にセットします。読み込みと同様に sd_ack ビットが上がり、sd_buff_addr がカウントされます。コアは書き込みたいデータを各 sd_buff_din に設定して応答します。ブロックが書き込まれると（sd_buff_addr がブロックの最終バイトに達する）sd_ack がクリアされます。

ユーザーが OSD からイメージをアンマウントすると、img_mounted が再びパルスし、img_size は 0 に設定されます。これがコアが現在のイメージをアンマウントすべきことを知る方法です。

* `sd_lba[VDNUM]` - logical block address。アクセスするブロック。マウント済みイメージごとに [31:0] 要素1個のアンパック配列（インデックス 0〜VDNUM-1）
* `sd_blk_cnt` - ブロック数
* `sd_rd` - アドレスから始まるブロック数の読み込み
* `sd_wr` - アドレスから始まるブロック数の書き込み
* `sd_ack` - sd_buff_out のデータ読み込みが有効、または sd_buff_in[VDNUM] の書き込みデータが有効でなければならないことを示す

* `sd_buff_addr` - バイトアドレス
* `sd_buff_dout` - ディスクからのデータ
* `sd_buff_din[VDNUM]` - ディスクへのデータ
* `sd_buff_wr` - 通常、blk インターフェースからの読み込みデータは FIFO や他の DPRAM 構造に書き込まれます。これはその FIFO への書き込み信号用の供給制御信号です

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

## ROM・ファイル読み込み、NVRAM 保存

ブート ROM は `ioctl` ラインで自動的に読み込まれます。OSD の `F` オプションや MRA 経由で ROM を読み込むこともできます。  

* `ioctl_download` - データがダウンロード中のとき 1。 
* `ioctl_index` - `[15:6]` はファイルタイプ、`[5:0]` はファイル番号。`F` で読み込むファイルでは、タイプフィールドは拡張子インデックス。`boot1.rom` はタイプ 1、マウントイメージは `S` スロットクラスを使い、特殊転送は専用の値を使う（アーケード DIP データはインデックス 254 で送られる）。
* `ioctl_wr` - 各バイトが有効なときハイ。 
* `ioctl_addr` - ファイルからの・ファイルへのバイトのアドレス。wide に設定されていると2ずつカウント
* `ioctl_dout` - HPS からコアへのデータ（ROM）
* `ioctl_din` - コアから HPS へのデータ。例：NVRAM 保存用
* `ioctl_upload` - アクティブなアップロードがあることを示す
* `ioctl_upload_req` - HPS にバックアップデータのアップロード（保存）を要求。autosave 用。RTL はこの信号のエッジ検出のみ行い、実際に HPS がいつ応答するかは各コアの実装次第。オートセーブ用。HPS は OSD が開いているときのみこれを読む
* `ioctl_rd` - データが読み込み有効
* `ioctl_file_ext` - 文字列としてのファイル拡張子 
* `ioctl_wait` - コアが HPS からの次のバイトを処理する準備ができていない場合にこのフラグを 1 にセット（フロー制御）

```Verilog
	// ARM -> FPGA download
	output reg        ioctl_download = 0, // signal indicating an active download
	output reg [15:0] ioctl_index,        // menu index used to upload the file
	output reg        ioctl_wr,
	output reg [26:0] ioctl_addr,         // in WIDE mode address will be incremented by 2
	output reg [DW:0] ioctl_dout,
	output reg        ioctl_upload = 0,   // signal indicating an active upload
	input             ioctl_upload_req,   // request to save (must be supported on HPS side for specific core)
	input       [7:0] ioctl_upload_index,
	input      [DW:0] ioctl_din,
	output reg        ioctl_rd,
	output reg [31:0] ioctl_file_ext,
	input             ioctl_wait,
```

注意：boot.rom は ioctl_index == 0 で送られ、boot1.rom は `[5:0]` を 0、`[15:6]` を 1 に設定して送られ、boot2.rom 以降も同様です。

## SDRAM ボードサイズ

```Verilog
	// [15]: 0 - unset, 1 - set. [1:0]: 0 - none, 1 - 32MB, 2 - 64MB, 3 - 128MB
	// [14]: debug mode: [8]: 1 - phase up, 0 - phase down. [7:0]: amount of shift.
	output reg [15:0] sdram_sz,
```

## RTC

RTC は HPS からコアに時刻を渡します。HPS がオプションの RTC ボードを持っていない場合、NTP サーバーから時刻を拾います。 

注意：RTC はコア起動時に1回だけ時刻を送ります。その後は、コアが秒をインクリメントするか、秒と RTC 構造の他のフィールドを更新する責任があります。

BCD で：

* `RTC[7:0]`  - 秒
* `RTC[15:8]` - 分
* `RTC[23:16]` - 時
* `RTC[31:24]` - 日
* `RTC[39:32]` - 月
* `RTC[47:40]` - 年
* `RTC[55:48]` - 曜日

```Verilog
	// RTC MSM6242B layout
	output reg [64:0] RTC,

	// Seconds since 1970-01-01 00:00:00
	output reg [32:0] TIMESTAMP,
```

## UART フラグ
```Verilog
	// UART flags
	output reg  [7:0] uart_mode,
	output reg [31:0] uart_speed,
```

## キーボードエミュレーション

hps_io モジュールにはキーボードとマウスへのアクセス方法が2つあります。PS/2 キーボードを期待するコアの移植に便利な PS/2 互換信号と、より使いやすく信頼性の高いインターフェースです。

新しいインターフェースを使うには、`ps2_key[10]` がキーの押下と解放のたびにトグルし、`ps2_key[9]` がキーが押されているかを示します。残りのビットは標準 PS/2 ビットで、ビット8が拡張ビットです。

### PS2 キーボードライトの設定

HPS は numlock と scrl_lock を使ってマウス／ジョイスティック1/2 エミュレーションを示します。コアがこれら3つの LED のいずれかを設定したい場合、`ps2_kbd_led_use` の対応するビットをセットして有効にし、`ps2_kbd_led_status` で LED をオン・オフします。LED の順序：

```verilog
assign ps2_kbd_led_status = {scrl_lock,num_lock,caps_lock};
```

この制御はかなり遅いため、擬似的に静的な表示でない限りコアは使うべきではありません。

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

## ガンマ 

```Verilog
	inout      [21:0] gamma_bus,
```

## 拡張バス

控えめに使うべきです。[TurboGrafx16 コア](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer/blob/master/TurboGrafx16.sv#L531){target=_blank}のような、CD アクセスが必要な例外的な場合向けです。MiSTer バイナリー内の HPS 側にコードが必要です。

```Verilog
	// for core-specific extensions
	inout      [35:0] EXT_BUS
```
