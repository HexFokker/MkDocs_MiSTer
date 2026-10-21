## Direct Video
2019年秋以降、*Direct Video* は I/O ボードなしでアナログ映像出力を提供してきました。I/O ボードの VGA ポートと**同じ**最小レイテンシーを持ち、一部のコアではさらに良い色深度を提供します。使うには `MiSTer.ini` ファイルでこの機能を有効にし、HDMI ポートに DAC を取り付けます。

![picture](img/direct-video-dac.jpg)

*このような HDMI-to-VGA コンバーターが使えます。*

*注意*：2021-06-27 時点で、VGA-to-SCART アダプターと互換性のある機器を見つけるのは非常に難しいようですが、VGA で動く機器はまだ容易に見つかります。詳細：[Main_MiSTer issue #410](https://github.com/MiSTer-devel/Main_MiSTer/issues/410){target=_blank}

## Direct Video で動作確認済みのアダプター

| 製品名                                             | 購入先 URL                                                                                  | テスト日   |
|----------------------------------------------------|---------------------------------------------------------------------------------------------|------------|
| ISY IAD-1007, HDMI Adapter                         | https://www.mediamarkt.de/de/product/_isy-iad-1007-hdmi-adapter-2737565.html                | 2022-12-20 |
| HAMA HDMI™-Stecker auf VGA-Buchse, Adapter, 0,15 m | https://www.mediamarkt.de/de/product/_hama-hdmi%E2%84%A2-stecker-auf-vga-buchse-2708216.html| 2022-12-20 |
| HDMI - VGA-adapter                                 | https://www.jula.se/hdmi-vga-adapter-003087/                                                | 2021-06-16 |


## Direct Video で動かないことが分かっているアダプター

| 製品名                                             | 購入先 URL                                   | テスト日   |
|----------------------------------------------------|----------------------------------------------|------------|
| HDMI till VGA 1080P                                | https://www.amazon.se/gp/product/B08HXRQGXM/ | 2021-06-16 |
| Rankie H001 1080P Aktiv HDTV HDMI till VGA-Adapter | https://www.amazon.se/gp/product/B00ZMV7RL2/ | 2021-06-16 |
| HDMI auf VGA Kabeladapter                          | https://www.amazon.de/dp/B09MF2HXGF          | 2022-08-04 |


## 互換性

*Direct Video* は現在のほとんどのコアと互換性があり、今後 MiSTer に登場するすべてのコアでサポートされます。

RGBs、RGsB、YPbPr に対応していますが、YPbPr は *Direct Video* モードでは I/O ボードからの YPbPr よりディスプレイ互換性が低くなります。

出力解像度とフォーマットはコアによって異なる場合があります。詳細は[アナログ映像設定表](crttable.md)を参照。

## 使い方

まず VGA 出力のあるシンプルな DAC が必要です。AG6200/AG6201 チップベースの DAC（写真のようなもの）は動作実績があり、比較的安価で入手しやすく、多くはアナログ音声も出力します。唯一の注意点は、MiSTer が**オンの**間にホットプラグしないこと。HDMI ポートを損傷する可能性があります。

次に [MiSTer.ini](ini.md) ファイルに次の行を追加します：

`direct_video=1`

これで起動時に *Direct Video* が有効になります。HDMI ポートはコアの生の未処理デジタル音声・映像信号を出力し、DAC がそれを変換します。このモードが有効な間、MiSTer は HD テレビやモニターでは動きません。標準 HDMI 信号が必要なためで、ゼロラグの *Direct Video* 信号は標準 HDMI **ではありません**。

DAC からのアナログ映像信号は、読み込んだコアが標準的な CRT リフレッシュ周波数を使っていれば、標準的な CRT で動くはずです（不完全な一覧は[コアのデフォルト解像度](nativeres.md)を参照。結果は異なる場合があります）。どの種類のアナログ信号が欲しいかによって、以下の追加設定が必要です。

## RGB 信号のセットアップ

アナログ RGB 出力には、`MiSTer.ini` で HSync 信号上のコンポジット同期を有効にし（`composite_sync=1`）、RGB 対応 VGA-SCART ケーブルをテレビに接続します。

最良の結果には、MiSTer 専用の SCART・BNC ケーブルを販売している [Retro Access](https://retro-access.com/products/mister-io-scart?_pos=1&_sid=97cb11000&_ss=r){target=_blank} があります。

**免責事項：** 多くの VGA DAC は、*Direct Video* モードで使ってもピン13（HSYNC/CSYNC）に **3ボルト_以上_** の同期信号を出力することがあります！ この信号をすべての映像機器に安全なレベルまで減衰させるため、対応する SCART 同期ピンに 470 オームの抵抗が必要です。各種プロ映像機器は高電圧同期信号に広い許容範囲を持つことがありますが、他の機器——特に OSSC や XRGB Mini Framemeister のような外部スケーラー——は繰り返しの曝露で損傷することがあります。お使いの機器が高電圧信号に耐えられると100%確信できない限り、470 オーム抵抗内蔵のケーブルを購入するか、自分で追加することを_強く_おすすめします。たとえば Retro Access の MiSTer SCART ケーブルはデフォルトで抵抗内蔵です。

## YPbPr 信号のセットアップ { #setup-for-ypbpr-signals }

YPbPr——コンポーネントビデオとも呼ばれます——は *Direct Video* モードで使えますが互換性に限りがあります。これは HDMI-to-VGA DAC の制限によるもので、YPbPr 色空間の信号を生成するよう設計されていないため、出力がわずかに規格外になります。お使いのディスプレイが *Direct Video* の YPbPr 信号を問題なく受け付ける可能性はありますが、[多くのディスプレイがそのような信号を処理する方式のため](https://github.com/MiSTer-devel/Main_MiSTer/issues/210#issuecomment-622672178){target=_blank}、明るいピンクに見えることもあります。YPbPr の互換性を高めるには、RGB モードと外部 RGB-to-YPbPr トランスコーダー、または I/O ボード経由の YPbPr が良いでしょう。

*Direct Video* モードで YPbPr を使うには、[MiSTer.ini](ini.md) ファイルに `composite_sync=1` と `vga_mode=ypbpr` を設定します。

また VGA 接続に sync-on-green 回路も必要です。非常にシンプルにでき、ダイオード（1N4148）と 330 オームの抵抗だけです（270〜390 オームの間ならどの値でも可。高すぎると同期信号が弱すぎ、低すぎると強すぎます）。

![picture](img/sync-on-green-circuit.png)

*接続：HSync -> ダイオードのアノード、ダイオードのカソード -> 抵抗、抵抗を Green 信号へ。*

## 周波数の2倍化

VGA 入力はあるが通常 15 kHz 信号を扱えず 31 kHz アナログ映像が必要なモダンモニターに便利です。`MiSTer.ini` で `forced_scandoubler=1` を設定すると、15 kHz 信号が 31 kHz になります（どのコアが 15 kHz 映像を出力するかは[コアのデフォルト解像度](nativeres.md)を参照）。


## 色深度

*Direct Video* は 24ビットカラー信号を生成し、I/O ボードの 18ビット信号より優れています。ただし 24ビットカラーを使うコアは少ないため、実行するコアによっては改善された色深度が大きな影響を持たないことがあります。

AG6200 チップベースなど、ほとんどの安価な DAC はフルレンジ RGB を生成しません。代わりにリミテッドレンジ RGB（16-235）、またははるかに多い非規格のリミテッドレンジ変種（16-255）を生成します。補正するには、MiSTer.ini の `hdmi_limited` オプションで DAC に送る信号を調整すると良いでしょう。

- フルレンジ（0-255）：`hdmi_limited=0`
- リミテッドレンジ（16-235）：`hdmi_limited=1`
- リミテッドレンジの一般的な DAC 変種（16-255）：`hdmi_limited=2`
