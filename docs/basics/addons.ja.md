<figure markdown>
  ![MiSTer FPGA Sandwich Punk Style Art by hewhoisred](img/misterpunk.png){ align=center width="400" }
  <figcaption>Artwork by Hewhoisred</figcaption>
</figure>

MiSTer には、どちらかと言えば任意の拡張ボードがいくつかあります。たとえば 128 MB SDRAM ボードはすべてのコアを動かすために必要で、Analog I/O ボードがあれば MiSTer を昔ながらの CRT テレビやモニターに簡単に接続できます。これらのボードはさまざまなオンライン販売店から買えますし、PCB を基板メーカーに発注して部品を買い揃え、自分ではんだ付けして組み立てることもできます。

## [128MB SDRAM 拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/sdram_xsds_2.9.pdf){target=_blank} { #128mb-sdram-addon-board }

<figure markdown>
  ![MiSTer FPGA 128MB SDRAM Add-on Board](img/sdram.png){ align=center }
</figure>

ゲームを読み込むだけでも 128 MB SDRAM ボードが必要なコアはいくつかあります。32 MB SDRAM ボードは安価な代替ですが、Neo Geo・Game Boy Advance など一部のコアでは、小さいモジュールでは動かないゲームがあります。

SDRAM ボードを差し込むときは、DE10-Nano を下から親指で支えてください。支えずに無理に押し込むと DE10-Nano の基板が反り、永久的に破損する恐れがあります。

![How to Insert MiSTer FPGA SDRAM Module Add-On Board the right way](img/sdramdiy1.gif)

SDRAM ボードを外すのは、GPIO コネクターによっては難しいことがあり、ただ引くだけでは外れないこともあります。力任せに引くと GPIO ヘッダーを曲げがちです。非常にきついコネクターでは、SDRAM ボードを前後に揺らしながら少しずつゆっくり外してください。

![How to remove MiSTer FPGA SDRAM Module Add-On Board the right way](img/sdramdiy2.gif)

## [USB Hub 拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/USBHub_2.1.pdf){target=_blank} { #usb-hub-addon-board }

<figure markdown>
  ![MiSTer FPGA USB Hub Add-on Board](img/usbhub.png){ align=center }
</figure>

USB Hub 拡張ボードは OTG USB ハブで、背面に給電専用 USB ポート1つ、他の3面に USB 2.0 ポート6つを備えます。DE10-Nano との接続方法は2通りあり、内部ヘッダーに挿すスリムな外部ボード型か、2つの MicroUSB ポートをブリッジで繋ぐ型です。

このハブは独自に給電が必要なため、DE10-Nano とハブの両方に電源を供給する電源分岐が必要になることがあります。Digital I/O ボードを使う場合は、DC-DC ジャンパーケーブル1本で Digital I/O ボードのバレルジャックに繋げばスタック全体に給電できます。

## [Digital I/O 拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/iobrd_dig_1.2.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA Digital I/O Add-on Board](img/digitalio.png){ align=center }
</figure>

以下のような機能が少し欲しい場合にこのボードを選びます。一般的に Analog I/O ボードより安価で、将来のコアが必要とするかもしれない 2 枚目の SDRAM スロットを空けておけます。

* ボタン3個：Reset、On-Screen Display（OSD）、User（キーボードなしでの各種操作用）
* ステータス LED 3個：Power、Disk、User
* 一部の古いコンピューターコアが必要とするサブ microSD スロット。一般的な microSD ストレージではなく、小さなフロッピードライブだと考えてください
* ミニ TOSLINK 光デジタル音声ポート
* フルサイズ TOSLINK 光デジタル音声ポート
* User IO ポート。USB 3.0 ポートに**見えますが違います！** 実際は [SNAC アダプター](https://github.com/blue212/SNAC){target=_blank}や [MT32-Pi](https://github.com/dwhinham/mt32-pi){target=_blank}のような周辺機器・アダプターとの直接シリアル通信用です
* ファン用電源ヘッダーと、冷却強化のためのファン取り付け穴
* DE10-Nano の2列目 2x20 ヘッダーを使わないため、Dual SDRAM 構成と互換

## [Analog I/O 拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/raw/master/releases/iobrd_6.1.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA Analog I/O Add-on Board](img/analogio.png){ align=center }
</figure>

CRT と HDMI ディスプレイへ同時に映像出力したい場合は、Digital I/O ボードではなくこちらを選びます。そうでなければ、安価な Digital I/O ボードで十分なはずです。

Digital I/O ボードと同じボタン3個・ステータス LED 3個・サブ microSD スロット・User IO ポート・ファン電源ヘッダー・ファン取り付け穴（上記参照）に加えて：

* 電源オン／オフスイッチ
* DE10-Nano に給電できるバレルジャック
* アナログ映像出力用 VGA ポート。接続方法は[詳細設定 - CRT](../advanced/crt.md)を参照
* アナログ映像と HDMI 映像の同時出力
* Sync-on-Green 強制／自動切り替えスイッチ
* ミニ TOSLINK 光デジタル音声兼用の 3.5 mm アナログ音声ポート
* ADC 入力用 3.5 mm 音声入力ポート（例：一部コンピューターコアのテープ入力）
* DE10-Nano の2列目 2x20 ヘッダーを使うため、Dual SDRAM 構成とは**非互換**

## [MT32-Pi Lite MiSTer 拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/MT32Pi_lite.pdf){target=_blank} { #mt32-pi-lite-mister-addon-board }

[MT32-Pi](https://github.com/dwhinham/mt32-pi/wiki){target=_blank} は Roland MT-32 音源モジュールのベアメタルエミュレーターです。この拡張ボードは新しい MT32-Pi 設計の Sorgelig 版で、Raspberry Pi Zero 2 W を使用します。MiSTer の側面、Digital I/O または Analog I/O ボードの User IO ポートに挿します。ao486 や X68000 など、対応コアやゲームで MIDI サウンドを強化したい場合にどうぞ。YouTuber の MiSTer Walrus FPGA が [MT32-Pi の音を紹介する動画](https://www.youtube.com/watch?v=q05ud_eNU8E){target=_blank}を公開しています。

## [MT32-Pi Raspberry Pi HAT 拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/MT32Pi_Main.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA MT32-Pi Raspberry Pi HAT Add-on Board](img/mt32pimain.png){ align=center }
</figure>

[MT32-Pi](https://github.com/dwhinham/mt32-pi/wiki){target=_blank} 用の Raspberry Pi HAT 拡張ボードです。正方形の形状から Raspberry Pi 3A+ 向けですが、3B や 4 でも使えます。この選択肢を選ぶ場合、短い USB 3.0 Type-A オス-オスケーブルも必要です。

## [リアルタイムクロック拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/rtc_1.3.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA Real Time Clock Add-on Board](img/rtc.png){ align=center }
</figure>

MiSTer にリアルタイムクロックを持たせたい場合に必要なボードで、[いくつかのコアが利用します](../cores/features/rtcsupport.md)。ボードの仕組みと使い方は[詳細設定 - RTC ボード](../advanced/rtc.md)を参照。

## [ADC アナログ音声入力拡張ボード](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/ADCin_1.1.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA ADC Analog Audio Input Add-on Board](img/adc.png){ align=center }
</figure>

ADC 拡張ボードを使うと、特定のコンピューターコアがアナログ音声入力経由でコンピューターのテープ音声からデータを読み込めます。録音データでも、実際のレトロテーププレーヤーからでも可能です。

## 購入先 { #where-to-buy }

はんだ付け自作ではなく販売店から買いたい場合、MiSTer FPGA フォーラムに専用の[ハードウェア販売者フォーラム](https://misterfpga.org/viewforum.php?f=34){target=_blank}があります。以下はそのフォーラムや他の場所の販売店です：

* [MiSTerAddons.com](https://misteraddons.com){target=_blank}（米国）
* [UltimateMiSTer.com](https://ultimatemister.com/){target=_blank}（ポルトガル）
* [MiSTerFPGA.co.uk](https://misterfpga.co.uk){target=_blank}（英国）
* [AntonioVillena.com](https://antoniovillena.com/){target=_blank}（スペイン）
* [LegacyPixels.com](https://www.legacypixels.com/mister/){target=_blank}（米国）
* [CAMInventions.com](https://www.caminventions.com/){target=_blank}（オーストラリア）
* [ManuFerHi.com](https://manuferhi.com/c/mister-fpga){target=_blank}（スペイン）
* [RetroCastle](https://www.retrocastlestore.com/){target=_blank}（中国）
* [RetroRemake](https://retroremake.co/pages/store){target=_blank}（中国）（注意：Terasic 製の本物の DE10-Nano ではなくクローンボードを使用）

これは販売店の公式推薦ではなく、単なるリンク集です。ハードウェアや配送の問題は、まず購入した販売店に問い合わせてください。
