MiSTer は多種多様な入力機器に対応し、設定オプションや、ほとんどの（場合によってはすべての）コアで使える便利機能も備えています。このページではスピナー・ゲームパッド・ジョイスティック・キーボードなどの機器の特殊な設定を説明します。

## どんな機器が使える？

基本的に、通常の USB HID 互換入力機器なら動くはずです。キーボード、アーケードスピナー、実機コントローラー用 USB アダプター（Raphnet や DaemonBite などのレトロアダプター）、PS5 DualSense のような現行機種のコントローラーまで対応します。Analog I/O または Digital I/O ボードがあれば、対応コアでは [SNAC](#serial-native-accessory-converter-snac) 経由で実機コントローラーも使えます。本来実機でしか動かないライトガンも使えます。

USB および Bluetooth のゲームコントローラーには、次の標準機能があります：

* 連射（オートファイア）
* ジョイスティックによるマウスエミュレーション
* 最大6人プレイ

## デフォルトのジョイスティックプレイヤー割り当て方法 { #default-joystick-player-assignment-method }

* コア起動後、接続中のコントローラーでボタンを押すと、それが Player 1 のゲームパッド／ジョイスティックになります。
* 2台目のコントローラーでボタンを押すと Player 2 に（コアが対応していれば）。
* Player 3、Player 4 も同様に続けます。
* 順番を間違えたら、OSD の2番目のメニュー（OSD を開いて右を押す）を開き、"Reset player assignment" でやり直します。
* コアをリセットするとプレイヤー割り当てもリセットされます。

コントローラーが動かないように見える場合は、未設定なら Menu コアに戻って入力を定義する必要があるかもしれません。また、接続した2台のコントローラーが Linux に同じ Vendor ID／Product ID を報告する場合、デフォルトでは1つのボタンマッピングを共有します。両方とも使えますし、必要なら USB ポートの位置で別プレイヤーに割り当てられます（後述）。

## 高度なジョイスティックプレイヤー割り当て方法

ジョイスティックプレイヤーは、機器を明示して手動で割り当てることもできます。たとえばアーケード筐体に USB エンコーダーのジョイスティックを2台入れていて、右側を常に Player 2 にしたい場合に便利です。各コントローラーの識別方法は3通りあります：

1. Bluetooth 無線機器：Bluetooth MAC アドレスで識別。
2. 有線機器：通常は VendorID と ProductID で識別。
3. VendorID/ProductID が同じ複数機器：USB ポートの位置で識別。

この情報を調べる一番簡単な方法は、MiSTer.ini で debug を有効にし、[コンソール接続](../advanced/console.md){target=_blank}または SSH で root ログインして `killall MiSTer; /media/fat/MiSTer` を実行することです。USB 機器を抜き差しするたびに、デバッグ出力に情報が表示されます。[デフォルトの MiSTer.ini](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank} の `Permanently assign specific controller to specific player` から始まるセクションの説明に従って入力してください。

## プレイヤー最大数

MiSTer フレームワークは、別々の USB または Bluetooth コントローラーで_最大_ 6 人まで対応しています。個々のコアはそれより少ないことがあり、たとえば 2026年1月時点で Saturn コアは最大2台の USB/Bluetooth コントローラーに対応しています。コアが [SNAC](#serial-native-accessory-converter-snac) に対応していれば、それ経由でプレイヤーを増やせる場合があります。

## 連射（オートファイア）

定義済みのすべてのボタンで連射が使えます。有効にするには、ボタンを押しながら、`BUTTON OSD`（ジョイスティック）または `KBD TOGGLE`（キーボード）に定義したボタンを素早く押して離します。繰り返すと次の連射速度に進みます。無効にするには、そのボタンの連射が無効になる表示が出るまで速度を進めてください。ボタンごとに連射速度を設定できます。

デフォルトの連射速度は 10、15、30 Hz です。カスタム速度は MiSTer.ini の `autofire_rates` 行で設定します。カスタム値は 60 Hz で綺麗に繰り返せる最も近い速度に切り下げられ、30 Hz を超える値は 30 Hz に制限されます。ゲームによっては特定の速度が適したり、逆に一部の速度（特に 30 Hz）が速すぎて処理できないゲームもあります。

`autofire_rates=7.5,10,15,20,30`

上級ユーザー向けに、ボタンの押し・離しパターンで連射速度を指定することもできます。パターンは `0b` で始め、ボタンを離すフレームを `0`、押し続けるフレームを `1` で表します。

`autofire_rates=0b000011111`

この例では、5フレーム押し・4フレーム離しのサイクルを繰り返す連射速度が1つ設定されます。autofire_rates 行では数値とパターンを自由に混在させられます。正しく処理できない速度は MiSTer が無視します。

### （上級）内蔵カスタム速度

シューティングゲームは特定の連射速度を好むことがよくあります。便利なように、そのような速度がキーワードで内蔵されており、計算したパターンの代わりにキーワードを `autofire_rates=` 行に書くだけで使えます。コミュニティの推薦や、連射機能のメンテナーがシューティングに強くなれば、今後追加されるかもしれません。

| 値          | 対象ゲーム     | 結果の速度   |
| ----------- | -------------- | -------------- |
| GUNFRONTIER | Gun Frontier   | 6.67 Hz        |
| GAREGGA     | Battle Garegga | 8.57 Hz        |

### 連射とジョイスティック／十字キー

デフォルトでは、連射は十字キー／ジョイスティックには適用されません。方向入力でも連射を有効にするには、MiSTer.ini に `autofire_on_directions=1` を追加してください。

## マウスエミュレーション

Menu コアで入力を設定したとき "Mouse Emu" ボタンを定義していれば、ジョイスティックでマウスをエミュレートできます。`Mouse Emu` と ++alt+m++ を同時に押すと、Mouse Left/Right/Middle Btn に定義したボタンがマウスボタンとして働き、左アナログスティック（定義済みの場合）がポインターを動かします。`Mouse Emu` を押しながら `BUTTON OSD` を押すと、マウスエミュレーションが常時オンになります。常時モードでは、`Mouse Emu` がポインターの移動量を小さくするスナイパーボタンになります。

マウス機能用に定義したボタンだけが切り替わり、他のボタンは通常のジョイスティックボタンのまま動きます。ボタンの多いゲームパッドは、マウスとジョイスティックを同時に兼ねられるわけです。Amiga の Walker のようなゲームで便利です。

## Serial Native Accessory Converter（SNAC） { #serial-native-accessory-converter-snac }

SNAC アダプターを使うと、実機のコントローラーや周辺機器を MiSTer コアに接続できます。SNAC 対応コアは、DE10-Nano の特定ピンにシリアル接続を出すよう特別に作られています。その結果、CRT に向けて NES Zapper のトリガーを引いたとき、信号は実機と同じようにほぼ即座に届きます。動作に最小限のレイテンシーが必要なライトガンのような機器では、これが重要です。

## ライトガンの使用 { #using-a-lightgun }

SNAC 経由の実機ライトガンのほか、MiSTer は GUN4IR、GunCon 2、GunCon 3、Wii リモコンなど複数の USB/Bluetooth ライトガンに対応しています。たとえば NES コアの Zapper や PSX コアの GunCon 1 として、さまざまなコアで使えます。GunCon 2 対応の詳細は [GunCon2-MiSTer リポジトリー](https://github.com/NolanNicholson/GunCon2-MiSTer){target=_blank}を参照。

### ライトガンのキャリブレーション

ライトガンはコアごとにキャリブレーションが必要です：

* OSD を開いた状態で ++f10++ を押すとキャリブレーション画面が出るので、指示に従って画像の各端を撃ちます。
* テレビ全体（ワイドスクリーン）の端ではなく、ゲームを読み込んでゲーム画像の端に合わせるのがおすすめです。
  
### ライトガンの Joy1/Joy2 割り当て

* この設定は、コア内でライトガンが割り当てられたプレイヤー番号と一致させる必要があります。[デフォルトのジョイスティックプレイヤー割り当て方法](#default-joystick-player-assignment-method)を参照。
* NES、SNES、Genesis などの機種では、ライトガンはプレイヤー2ポートに繋がりました。これらの機種の多くのゲームはライトガンをプレイヤー1（Joy1）でも動きますが、プレイヤー1に通常のコントローラー、プレイヤー2にライトガン（Joy2）を必要とするものもあります。


### PSX ライトガンマッピング
| GunCon    | Justifier   | マッピング            |
| --------- | ------------| --------------------- |
| Trigger   | Trigger     | O (Gun Fire:Negcon A) |
| A (Left)  | Start       | Start (Gun A)         |
| B (Right) | Rear Button | X (Gun B:Negcon I)    |

**OSD 設定**

* Pad1: GunCon または Justifier（ゲームに合わせて設定）

### SNES ライトガンマッピング

| Super Scope | Justifier | マッピング    |
| ---------- | --------- | ------------- |
| Fire       | Trigger   | A (SS Fire)   |
| Cursor     |           | B (SS Cursor) |
| Pause      | Start     | Y (SS Pause)  |

**OSD 設定**

* 'Input Options' メニュー
    * Super Scope: Joy2
    * Super Scope Btn: Joy
    * Gun Type: （ゲームに合わせて設定）

### NES ライトガンマッピング

| Zapper  | マッピング      |
| ------- | --------------- |
| Trigger | Zapper/Vaus BTN |

**OSD 設定**

* 'Input Options' メニュー
    * Periphery: Zapper (Joy2)
    * Zapper Trigger: Joystick

### Genesis / Sega CD ライトガンマッピング
| Menacer      | Justifier | マッピング |
| ------------ | --------- | ------- |
| Trigger      | Trigger   | A       |
| Top Button   |           | B       |
| Lower Button |           | C       |
| Pause        | Start     | Start   |

**OSD 設定**

* 'Input' メニュー
    * Gun Control: Joy2
    * Gun Fire: Joy

### Master System ライトガンマッピング

| Phaser  | マッピング |
| ------- | ------- |
| Trigger | Fire 1  |

**OSD 設定**

* 'Input' メニュー
    * Gun Control: Joy1
    * Gun Fire: Joy
    * Gun Port: Port 1

### Atari 7800 ライトガンマッピング

| XG-1 light gun | マッピング |
| -------------- | ------- |
| Trigger        | Fire 1  |

**OSD 設定**

* 'Peripherals' メニュー
    * Port1 Input: Lightgun
    * Gun Control: Joy1
    * Gun Fire: Joy
* 'Audio & Video' メニュー
    * Show Overscan: Yes

## マウスの使用

MiSTer はマウスに対応しており、主に実機にマウスがあったコンピューターコアで使います。

マウスはエミュレートされたライトガンとしても使えます。電源付きセンサーバーと Wii リモコンの組み合わせも同じ原理で、MiSTer にペアリングするとマウスとして使われます。

![type:video](videos/mouse-lightgun.mp4)

マウスはパドル型コントローラーとしても使えます。

## ゲーミングキーボードは買う価値がある？

ありません。高性能で高価なキーボードやマウスは、MiSTer では大小を問わず何の恩恵もありません。余計な機能や仮想デバイスを多く露出して入力サブシステムを煩雑にし、入力ラグの増加・機器の完全な無応答・ゲームパッドなど他の機器が動かなくなることさえあります。ゲーミングキーボードで問題が起きたら、もっとシンプルなキーボードを試してください。一般的なアドバイスとして、MiSTer のためだけに特別なゲーミングキーボードを買うのはやめましょう。無駄遣いになる可能性があります。

## 振動（ランブル）対応は？

振動（コントローラーのバイブレーション）は Game Boy、Game Boy Advance、PlayStation の各コアで対応しています。PlayStation コアでは、コントローラーの振動に対応しているか確認してください。Menu コアで "L" を押しながら "X" または "Y"（SNES 式配置）を押すと、2つのモーターをそれぞれテストできます。振動が確実に動くのは X-Input モードのコントローラーだけです。

## PlayStation 3〜5、Xbox 360/One、Switch、サードパーティ製 Bluetooth ゲームパッドは？

これらのゲームパッドの理想的なワイヤレス方法は、8BitDo レトロレシーバー（具体的には 8BitDo Wireless Bluetooth Adapter）のようなサードパーティ製 USB ドングル、または名のある Bluetooth 4.x/5.0 アダプターです。

8BitDo レシーバーは、MiSTer の Bluetooth 設定メニューを使わずに、PlayStation、Xbox、Wii、Switch、8BitDo の各 Bluetooth ゲームパッドに対応します。手軽さと素早いペアリングが最大の利点です。Bluetooth 5.0 アダプター（TP-Link や ASUS など）と比べた欠点：

* ラグが増える可能性があり、通信距離や見通しに制約がある場合もあります。
* 1台のレシーバーは一度に1台のコントローラーとしかペアリングしないため、複数プレイにはコントローラーごとにレシーバーが必要です。通常の Bluetooth ペアリングにはこの制限はありません。
* レシーバーはゲームパッドと USB ホストの間で互換レイヤーとして介在し、どのゲームパッドを繋いでも常に同じコントローラーとして見えます。そのため PS5 コントローラーのミュートボタンやタッチパッドなど一部機能が使えません。Bluetooth 5.0 アダプターはゲームパッドを MiSTer に直接ペアリングするので、この種の制限は少ないはずです。ただし、フレームワークと Linux 側の対応が入るまで使えない機能は残ります。

グレーとオレンジ（レンガ模様）の 8BitDo USB アダプターは、最新ファームウェアでは機能的に同じです。コントローラー機種によってはホットキーで入力モードを切り替えられます。8BitDo SN30 Pro 2 のように背面に切り替えスイッチがある機種もあります。8BitDo のサイトにはこれらのホットキーが載っていませんが、ファームウェア更新履歴には記載があります：

* X-Input モード：SELECT+UP を3秒長押し。
* PSC（PlayStation Classic）モード：SELECT+DOWN を3秒長押し。ボタンの少ないゲームパッド（合計12個。十字キーは4として数える）でも MiSTer OSD を開く必要がある場合に便利です。このモードでは、コア内で L+R+START が OSD を開きます。この組み合わせは MiSTer 側で 8BitDo アダプター専用にハードコードされているため、Menu コアでボタン設定する際に OSD ボタンを割り当てないでください。このモードでは連射やマウス機能が使えなくなることもあります。

SNES、NES、Genesis 用の 8BitDo Retro Receiver など、他の 8BitDo アダプターは Micro USB 接続時は常に X-Input モードです。

## JammaSD 対応

MiSTer は、押されたボタンが Player 1 と Player 2 のどちらのものかを判別して JammaSD に対応します。Menu コアで Player 1 をジョイパッドとして設定すると（必要ならコア内でもリマップ）、Player 2 の入力は2台目の同一ジョイパッドのように自動で定義されます。2台目の JammaSD を挿せば Player 3、4 用になります。JammaSD 対応は全機器で同じはずの VID/PID を使います。異なる場合は MiSTer.ini の `jamma_vid`/`jamma_pid`/`jamma2_vid`/`jamma2_pid` オプションで設定してください。
