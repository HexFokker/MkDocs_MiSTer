## Direct Video
2019年秋以降、*Direct Video* は I/O ボードなしでアナログ映像出力を提供してきました。I/O ボードの VGA 出力に匹敵する最小レイテンシーを提供します。使うには `MiSTer.ini` で Direct Video を有効にし、互換性のある HDMI-to-VGA DAC を DE10-Nano の HDMI ポートに接続します。

## 互換性

*Direct Video* のサポートはコアに依存します。対応する出力フォーマットは RGBS、RGBHV、RGsB、YPbPr、および対応コアでの S-Video・コンポジット用ネイティブ Y/C です。ネイティブ Y/C にはさらに Y/C アダプターボードが必要です。出力タイミングとフォーマットはコアによって異なります。必要な設定と外部ハードウェアは[アナログ映像設定表](crttable.md)を参照してください。

## 使い方

互換性のある HDMI-to-VGA DAC を使います。AG6200/AG6201 ベースのアダプターは動作報告があり、多くはアナログ音声も出力します。MiSTer が**オンの**間にアダプターの抜き差しをしないでください。ホットプラグで HDMI ポートを損傷する可能性があります。

![picture](img/direct-video-dac.jpg)

*このような HDMI-to-VGA コンバーターが使えます。*

次に [MiSTer.ini](ini.md) ファイルに次の行を追加します：

`direct_video=1`

これで起動時に *Direct Video* が有効になり、標準の HDMI ビデオスケーラーをバイパスして、コアのネイティブ映像タイミングを HDMI トランスミッター経由で出力し、DAC がそれを変換します。結果の信号は標準 HDMI ではないため、*Direct Video* が有効な間は通常の HDMI テレビやモニターは使えません。

ディスプレイはコアの水平・垂直スキャンレートと選択した信号フォーマットを受け付ける必要があります。コアのタイミングの不完全な一覧は[コアのデフォルト解像度](nativeres.md)を参照してください。どのアナログ信号が欲しいかによって、以下の追加設定が必要です。

## SCART 経由の RGBS のセットアップ

SCART 経由の RGBS 出力には、`MiSTer.ini` に `composite_sync=1` を設定し、RGB 対応 VGA-to-SCART ケーブルをテレビに接続します。

**警告：** 多くの HDMI-to-VGA DAC は VGA ピン13（HSync/CSYNC）に **3ボルト以上**を出力します。SCART では、同期信号に 470 Ω 抵抗を内蔵したケーブルを使うか、自分で追加して、ディスプレイの 75 Ω 入力に届く電圧を下げてください。高電圧同期は OSSC や XRGB Mini Framemeister のような機器を損傷する可能性があります。機器が DAC の同期電圧に耐えられることを確認できない限り、抵抗を省略しないでください。

## YPbPr 信号のセットアップ { #setup-for-ypbpr-signals }

*Direct Video* の YPbPr はディスプレイ互換性に限りがあります。HDMI-to-VGA DAC は YPbPr 色空間用に設計されておらず、わずかに規格外の出力を生成することがあるためです。正常に受け付けるディスプレイもあれば、[多くのディスプレイがそのような信号を処理する方式のため](https://github.com/MiSTer-devel/Main_MiSTer/issues/210#issuecomment-622672178){target=_blank}明るいピンクに見えるものもあります。その場合は、I/O ボードからの YPbPr か外部 RGB-to-YPbPr トランスコーダーを使ってください。

*Direct Video* モードで YPbPr を使うには、[MiSTer.ini](ini.md) ファイルに `composite_sync=1` と `vga_mode=ypbpr` を設定します。

VGA 接続に sync-on-green 回路を追加します。1N4148 ダイオードと 330 Ω 抵抗だけです。270〜390 Ω の範囲なら使用でき、範囲外では同期信号が弱すぎるか強すぎる可能性があります。

![picture](img/sync-on-green-circuit.png)

*VGA ピン13（HSync/CSYNC）をダイオードのアノードに接続。ダイオードのカソードを抵抗経由で VGA ピン2（グリーン）に接続。*

## 31 kHz 出力のためのスキャンダブル

15 kHz 映像を受け付けない VGA モニターがあります。対応コアでは `MiSTer.ini` に `forced_scandoubler=1` を設定すると、15 kHz 信号を約 31 kHz に倍化できます。コアの出力タイミングは[コアのデフォルト解像度](nativeres.md)を参照してください。

## 色深度

*Direct Video* は 24ビットのデジタル映像信号を伝送します。Analog I/O Board 6.x は 18ビットの VGA 出力で、I/O Board 9.2 with AV Board 1.2 も 24ビット出力を提供します。コア内部で生成されるカラーが 24ビット未満の場合があるため、24ビットの出力経路が必ずしもコアの生成する色数を増やすわけではありません。

## RGB 出力レンジ

AG6200 チップベースなど、ほとんどの安価な DAC はフルレンジ RGB を生成しません。代わりにリミテッドレンジ RGB（16-235）、またははるかに多い非規格のリミテッドレンジ変種（16-255）を生成します。補正するには、MiSTer.ini の `hdmi_limited` オプションで DAC に送る信号を調整すると良いでしょう。

- フルレンジ（0-255）：`hdmi_limited=0`
- リミテッドレンジ（16-235）：`hdmi_limited=1`
- リミテッドレンジの一般的な DAC 変種（16-255）：`hdmi_limited=2`

## 過去のアダプターテスト結果

HDMI-to-VGA DAC の互換性は、特に VGA-to-SCART ケーブルでばらつきがあります。背景は [Main_MiSTer issue #410](https://github.com/MiSTer-devel/Main_MiSTer/issues/410){target=_blank} を参照してください。これらは過去のテスト結果であり、同名製品で現在販売されているアダプターが同一のハードウェアを使っていることを保証するものではありません。

### 動作報告のあるアダプター

| 製品名                                             | 購入先 URL                                                                                  | テスト日   |
|----------------------------------------------------|---------------------------------------------------------------------------------------------|------------|
| ISY IAD-1007, HDMI Adapter                         | https://www.mediamarkt.de/de/product/_isy-iad-1007-hdmi-adapter-2737565.html                | 2022-12-20 |
| HAMA HDMI™-Stecker auf VGA-Buchse, Adapter, 0,15 m | https://www.mediamarkt.de/de/product/_hama-hdmi%E2%84%A2-stecker-auf-vga-buchse-2708216.html| 2022-12-20 |
| HDMI - VGA-adapter                                 | https://www.jula.se/hdmi-vga-adapter-003087/                                                | 2021-06-16 |


### 動かないと報告されたアダプター

| 製品名                                             | 購入先 URL                                   | テスト日   |
|----------------------------------------------------|----------------------------------------------|------------|
| HDMI till VGA 1080P                                | https://www.amazon.se/gp/product/B08HXRQGXM/ | 2021-06-16 |
| Rankie H001 1080P Aktiv HDTV HDMI till VGA-Adapter | https://www.amazon.se/gp/product/B00ZMV7RL2/ | 2021-06-16 |
| HDMI auf VGA Kabeladapter                          | https://www.amazon.de/dp/B09MF2HXGF          | 2022-08-04 |
