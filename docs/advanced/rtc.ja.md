![MiSTer FPGA RTC Add-on board](img/rtc1.jpg)

一部のコア（ao486、Minimig）は時計を使うため、MiSTer はそれらに実時刻を供給します。インターネット接続があればネットから時刻を取得できますが、RTC ボードがあればオフラインでも供給できます。

![MiSTer FPGA RTC Add-on board assembled correctly](img/rtc2.jpg)

このシンプルなボードは、インターネット接続なしで実時刻を供給します。2種類のバッテリーホルダーと複数の RTC IC に対応し、LTC コネクターに挿します。

## 組み立てのコツ { #assembly-notes }

* スルーホール型バッテリーホルダーを使う場合は、そのプラスチックのピンをすべて切り、ホルダーが基板に隙間なく完全に乗るようにしてください。さもないと I/O ボードに触れてショートする可能性があります。
* スルーホール型ホルダーでは、ピンもできるだけ短く切ってください。基板の下に突き出るとショートの原因になります。
* 基板にはコネクターと反対側に穴があります。そこにプラスチック（または非導電性）のネジを脚として入れ、基板がたわんでメインボードに触れるのを防ぎます。
* SMD ホルダー（左の写真）の方が薄いのでおすすめです。

## 使用上の注意

実時刻を RTC に保存するには、MiSTer をインターネットに接続して約15分動かすか、コンソールから更新します（下記コマンド参照）。

デフォルトのタイムゾーンは UTC です。ローカルのタイムゾーンにするには：

* FTP/SFTP で MiSTer に接続。
* `/usr/share/zoneinfo/posix` フォルダーに移動し、お住まいの場所またはタイムゾーン名のファイルを探す。
* そのファイルを `timezone` という名前でコンピューターにコピー。
* それを MiSTer の `/media/fat/linux` フォルダーに `timezone` の名前のままコピーし戻す。

コンソールからハードウェアクロックを強制更新し、時刻を読み出すこともできます：

* **RTC に日時を保存**：`hwclock -wu`
* **RTC を読む**：`hwclock -u`

## RTC 拡張ボード DIY 組み立て

このページは参考用です。最新でない可能性があり、最新 PCB バージョンの BOM を含まないことがあります。回路図と必要な部品は自分で確認してください！

以下では、自作 MiSTer RTC ボードの作り方を説明します。PCB と部品の注文先、必要な機材、組み立て手順です。

![picture](img/RTC_Board_DIY.png)

### 1. PCB を注文

#### PCB メーカーの例

* [PCBway](https://www.pcbway.com/setinvite.aspx?inviteid=43024){target=_blank} - [RTC v1.2 クイックオーダー](https://www.pcbway.com/project/shareproject/RTC_for_MiSTer_v1_2.html){target=_blank} - [RTC v1.3（温度センサー付き）クイックオーダー](https://www.pcbway.com/project/shareproject/W43024ASU40_rtc_1_3.html){target=_blank}
* [EasyEDA](https://easyeda.com/){target=_blank}
* [JLCPCB](https://jlcpcb.com/){target=_blank}
* [OSH Park](https://oshpark.com/){target=_blank}

#### PCB レイアウト（Gerber ファイル）
最新の PCB ファイルは MiSTer ハードウェアリポジトリーを確認：[MiSTer_Hardware](https://github.com/MiSTer-devel/Hardware_MiSTer){target=_blank}

### 2. 部品を注文

部品の概要です。MiSTer RTC ボード **バージョン 1.2** の組み立てに実際に使われた参考部品を含みます。

#### 共通部品
共通部品です。これに加えて、次の表から RTC チップとクリスタルの組み合わせを選ぶ必要があります。

| 名前 | 部品 | パッケージ | 値 | 参考部品 |
|---|---|:---:|:---:|---|
| C1 | Capacitor (Ceramic) | 0805 | 10uF | [KEMET <br> C0805C106K8PACTU](https://www.digikey.com/products/en?keywords=399-4925-1-ND){target=_blank} |
| R1, R2 | Resistor 1% 1/8W | 0805 | 4.7K | [Yageo <br> RC0805FR-074K7L](https://www.digikey.com/products/en?keywords=311-4.70KCRCT-ND){target=_blank} |
| B1 | Coin Cell Holder for CR1220 | 12 mm | - | [MPD <br> BK-885](https://www.digikey.com/products/en?keywords=BK-885-ND){target=_blank} |
| P1 | GPIO Connector | 2 mm | 18-pin | [Amphenol <br> 63453-118LF](https://www.digikey.com/products/en?keywords=%09609-2663-ND){target=_blank} |

#### RTC／クリスタル表
この表の RTC チップ（U1）／クリスタル（X1）の組み合わせは、RTC ボード バージョン 1.2 を実際に組み立てたユーザーによって確認されています。

| 名前 | 部品 | パッケージ | 値 | 参考部品 |
|---|---|:---:|:---:|---|
| U1 | I2C RTC Chip: <br> M41T81 | 8-SOIC | - | [ST <br> M41T81M6F](https://www.digikey.com/products/en?keywords=497-4709-1-ND){target=_blank} |
| X1 | Crystal: <br> 32.768 kHz ±20 ppm, 12.5 pF, 50 kΩ  | Cylindrical Can | - | [Citizen <br> CMR200T32768DZFT](https://www.digikey.com/products/en?keywords=%09300-8340-6-ND){target=_blank} |

[Octopart 上の BOM 例](https://octopart.com/bom-tool/95qomeBj){target=_blank}

### 3. ボードを組み立てる

組み立て時は上記の[組み立ての注意点](#assembly-notes)に従ってください。
