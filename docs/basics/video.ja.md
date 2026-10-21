MiSTer には基本的な映像カスタマイズ機能がいくつかあります：

* 解像度の調整（`video_mode`）
* 入力レイテンシーと映像のカクつきを抑えるフレームバッファー設定（`vsync_adjust`）
* スキャンラインを含むビデオフィルター
* シャドウマスク
* ガンマ補正
* 5x オーバースキャンモード。1200p の画像を 1080p に押し込み、ゲームの解像度に応じて正方形ピクセルと CRT に近いオーバースキャンを実現

## ビデオプリセット

ビデオプリセットは、見栄えが良くほとんどの場面で動く設定済み構成を読み込めるもので、最初の足がかりにぴったりです。OSD を開いて右を押し、Video Processing → Load Preset から好みのものを選んでください：

![type:video](videos/presets.mp4)

## MiSTer.ini の映像設定

[MiSTer.ini](../advanced/ini.md){target=_blank} ファイルには多くの映像設定がありますが、このページではその一部だけを扱います。CRT 固有の設定は[詳細設定 - CRT](../advanced/crt.md){target=_blank}を参照してください。

`MiSTer.ini` はどんなテキストエディターでも編集できます（Windows メモ帳、Visual Studio Code、Notepad++ など）。また scripts フォルダーの `ini-settings.sh` スクリプトを使えば、簡単なインターフェースでオプションを変更できます。

### video_mode

`video_mode` オプションは出力解像度を設定します。利用可能なプリセットは、設定行の上のコメントに一覧があります：

```
; 0 - 1280x720@60
; 1 - 1024x768@60
; 2 - 720x480@60
; 3 - 720x576@50
; 4 - 1280x1024@60
; 5 - 800x600@60
; 6 - 640x480@60
; 7 - 1280x720@50
; 8 - 1920x1080@60
; 9 - 1920x1080@50
;10 - 1366x768@60
;11 - 1024x600@60
;12 - 1920x1440@60
;13 - 2048x1536@60
;14 - 2560x1440@60 (Pixel Repetition)
```

たとえば `video_mode=0` は 1280x720@60 です。ほとんどの人は 1920x1080@60 を使うでしょうから、おすすめは `video_mode=8` です。`ini-settings.sh` スクリプトでも、どの値がどの解像度か分かるようになっています。

ビデオモードの詳しい説明は[詳細設定 - ビデオモード](../advanced/videomodes.md)を参照（Wickerwaka 氏に感謝）。

### vsync_adjust

最近のディスプレイは 60 Hz で問題なく動くものが多いですが、ゲームによってはアーケード版ドンキーコングの 60.6 Hz のような「非標準」リフレッシュレートで動きます。これに対応するため、MiSTer はフレームバッファーを使います。ゲームは 60.6 Hz で動き続け、フレームは 60 Hz でディスプレイに送られます。ゲーム側がフレームを送るよりわずかに速く生成するため、フレームバッファーは時々調整しなければならず、小さなカクつきが生じます。フレームバッファーを使うと最小限のラグが加わります。`vsync_adjust` はこの動作を制御します：

```ini
vsync_adjust=0
```
モニターのリフレッシュレート（例：60 Hz）で出力し、約1〜2フレームのラグがあります。コアはネイティブのレート（ちょうど 60 Hz ではない）で動き続けるため、映像が少し震えることがあります。
```ini
vsync_adjust=1
```
ゲームのフレームレートそのまま（例：60.6 Hz）で出力し、1フレームのラグです。映像は非常に滑らかですが、最近のテレビとの相性はやや悪いモードです。
```ini
vsync_adjust=2
```
できるだけ速く映像を画面に描き、一貫したサブフレームラグを実現できます（コントローラーやディスプレイ自体のラグは別として）。映像は非常に滑らかです。ただし最も相性の悪いモードで、コアとテレビの組み合わせによっては遊べないほどの問題が出ることもあります。このモードの仕組み上、スケーリング後の出力のリフレッシュレートはコアの元の映像出力とも異なります。

目安として、まず `vsync_adjust=2` で最も滑らかな映像と最小のラグを試してください。遊びたいコアが動かなければ 1 か 0 に下げます。結果はディスプレイとコアによって異なります。

### 可変リフレッシュレート（VRR）

MiSTer は可変リフレッシュレート（VRR）に対応しています。コアが非標準リフレッシュレートを出力する際、低ラグの `vsync_adjust`（`1` または `2`）を使ったときの、ディスプレイでの同期ずれを VRR が抑えます。

VRR には新しいビルドの [Main MiSTer バイナリー](https://github.com/MiSTer-devel/Main_MiSTer/){target=_blank}が必要です（新リリースは準備中。先行ビルドは [MiSTer FPGA Discord](https://discord.gg/misterfpga){target=_blank} の `#unstable-nightlies` チャンネルに投稿されています）。さらに、更新版の [MiSTer.ini](https://github.com/MiSTer-devel/Main_MiSTer/raw/master/MiSTer.ini){target=_blank} か、既存の ini への次の追記が必要です：

```ini
; Variable Refresh Rate control
; 0 - Do not enable VRR (send no VRR control frames)
; 1 - Auto Detect VRR from display EDID. 
; 2 - Force Enable Freesync
; 3 - Force Enable Vesa HDMI Forum VRR
vrr_mode=0
; Freesync min/max framerate parameter defaults to the min/max capability reported by the display
; Freesync minimum framerate. 
vrr_min_framerate=0
; Freesync maximum framerate
vrr_max_framerate=0
; VESA VRR base framerate. Normally set to the current video mode's output framerate
vrr_vesa_framerate=0
```

VRR は互換性を広く保ち、MiSTer を使いやすくするため、デフォルトではオフです。`vrr_mode=1` でディスプレイの対応を自動検出します。結果はまちまちで、この設定では同期できないディスプレイもあります。自動検出が失敗したら `2`（FreeSync）または `3`（VESA HDMI Forum VRR）で強制有効にします。FreeSync を「AMD FreeSync」と表記するディスプレイもありますが、オープン標準であり AMD 製品専用ではありません。VESA VRR を「G-Sync」と表記するディスプレイもありますが、NVIDIA 独自の G-Sync 標準と必ずしも同一ではありません。

VRR の結果は環境によって異なります。この設定を変える前に、`MiSTer.ini` をすぐ編集できる状態にしておいてください。設定によっては、元に戻すまで映像が出なくなることがあります。MiSTer が報告するリフレッシュレートがテレビ側の表示と違うこともあります。これは正常です。テレビは独自の方法でリフレッシュレートを測っており、高価な測定機器がないと精度を検証できません。

VRR を有効にすると、測定できるほど滑らかな映像になるかもしれません。Ace 氏は、自分のディスプレイで見えていたフレームの繰り返しとスキップが消えたと報告しています。複数のテスターも、一部の非標準リフレッシュレートで同期安定性の向上を確認しています。お使いのディスプレイが同じように動く保証はありません。

### コアごとの例外設定

特定のコアだけ設定を上書きできます。たとえば、この節の著者のモニターは Genesis コアの低ラグ設定と相性が悪いため、`MiSTer.ini` の**ファイル末尾**に次を追加しています：

```ini
[Genesis]
vsync_adjust=0
```

これで、メイン部分の `vsync_adjust` が何に設定されていても、Genesis コアは常に最も互換性の高い `vsync_adjust=0` を使います。ワイルドカードを使えば1つの例外を複数コアに適用できます：

```ini
[dkong*]
vsync_adjust=1
```

このルールは名前が `dkong` で始まるすべてのコアに適用されます。すべてのアーケードコアへの例外も作れます：

```ini
[arcade]
vsync_adjust=1
```

例外に使う内部コア名は[開発者リファレンス - コア名](../developer/corenames.md)を参照。

**注意** — 個別のアーケードゲームへの例外には、内部コア名では**なく** MRA ファイルの `<setname>` 値を使います。たとえば `Arkanoid (Japan).mra` には次が含まれます：

```xml
<setname>arkanoidj</setname>
```

このゲームの例外は `[arkanoidj]` です。setname の一覧は[開発者リファレンス - MRA セット名](../developer/mrasetnames.md)を参照。

## ビデオ処理チュートリアル

このチュートリアルでは主なビデオ処理オプションを順に見ていきます。

### フィルターとスキャンライン

MiSTer はアップスケーリングフィルターやスキャンラインを適用して映像を向上させたり、レトロ CRT のように見せたりできます。映像出力を 1920x1080p に設定し、NES コアで Duck Tales（わんぱくダック夢冒険）を動かすと、デフォルトではこんな見た目になるはずです：

[![Duck Tales NES MiSTer FPGA 1920x1080@60 Default Video Output](img/default-video-nes.png)](img/default-video-nes.png){target=_blank}

これを改善するには、2番目の OSD メニューで "Video Processing" を開きます（F12 または割り当てたメニューボタンを押し、右を押す）：

![MiSTer FPGA Video Processing options selection](img/video-processing.png)

この画面で `Video Filter:` はデフォルトの `NearNeighbour`、つまりニアレストネイバーフィルターです。240p の映像を 1080p に拡大するには各ピクセルを引き伸ばす必要がありますが、240 は 1080 を割り切れません（1080 / 240 = 4.5）。そのため一部のピクセルは完全な正方形にできません。ニアレストネイバーは、実際よりも正方形に近く見えるよう目を誤魔化すのに役立ちます。

`Video Filter:` を選ぶとフィルターファイルを選択でき、表示名が `Horz filter:` に変わります。通常の（回転していない）ゲームでは、水平フィルターが画像を柔らかくしたりシャープにしたりするアップスケーリングフィルターです。

その下の `<none>` を選んでフィルターファイルを参照します。ここでは `Interpolation (Medium).txt` を選んでみます。正方形ピクセルの錯覚を保ちながらエッジが柔らかくなります。

![MiSTer FPGA Horizontal Interpolation filter horz filter:](img/horz-filter.png)

ピクセルが少し滑らかになりました：

[![MiSTer FPGA Horizontal Interpolation Medium filter horz filter: NES duck tales](img/interpolation-medium.png)](img/interpolation-medium.png){target=_blank}

補間を使うと、デフォルトのニアレストネイバーのようなシャープなフィルターよりも、スクロールが滑らかに見えます。

CRT のようなスキャンライン（一部のエミュレーターのスキャンラインオプションのようなもの）には、同じ要領で `Vert Filter:` を設定します。これは水平方向のラインを上から下へ、つまり垂直にフィルターします。`Vert Filter` の `From File` で `Scanlines - Brighter.txt` を選んでください。設定はこうなるはずです：

[![MiSTer FPGA's Vertical filter Scanlines - Brighter vert filter](img/scanlines-brighter.png)](img/scanlines-brighter.png){target=_blank}

### 5x Vertical Crop（1080p のみ）

**注意：この機能は MiSTer.ini の出力解像度が 1080p モードのときだけ動作します。**

スキャンラインフィルターを有効にすると、一部のスキャンラインが他より暗く見えることがあります。240p（このゲームの解像度）は 1080p を割り切れませんが、1200 は割り切れます（5 × 240 = 1200）。スキャンラインを均等にするには、すべてのピクセルが完全な正方形になるよう画像を縦に引き伸ばします。コアの通常メニューで `Video & Audio` → `Vertical Crop` を選び、`Disabled` を `(216p)5X` に変えます。すべてのコアにこのオプションがあるわけではありませんが、NES コアにはあります。

[![MiSTer FPGA Vertical Crop 5x mode 1080p to 1200p 216p to 5x with overscan](img/5x-vertical-crop.png)](img/5x-vertical-crop.png){target=_blank}

上下の数ラインが切り落とされますが、問題ありません。実機の CRT も同程度を切り落としていましたし、ほとんどのゲームは上下端に情報を置いていません。`Scanlines - Brighter.txt` のスキャンラインが均等に並び、ずっと見栄えが良くなるはずです。

この動画で 5x モードを実演しています：

![type:video](videos/5x.mp4)

### シャドウマスク

シャドウマスクはさらに一段のオプションです。赤・緑・青の各チャンネルを変更して、古い CRT 画面のグリルやマスク、昔の液晶携帯機のピクセル配列のような効果を作ります。シャドウマスクは多数ありますが、ここでは `Squished VGA Bright v2.txt` を使います。著者の意見では、最も汎用性の高いカラーシャドウマスクの一つです。これは、特定パターンで配列された赤・緑・青の蛍光体を持つ民生コンピューターモニターや一部テレビに似せようとするものです。このシャドウマスクを加えると、同じゲームはこう見えます：

[![MiSTer FPGA Shadowmasks / Shadow Masks Squished VGA Bright v2.txt 1200p 5x overscan to 1080p with scanlines - brighter.txt](img/squished-vga-bright-v2.png)](img/squished-vga-bright-v2.png){target=_blank}

### ガンマカーブ

古い CRT では、ガンマは電圧と明るさの関係を指します。横軸に電圧、縦軸に明るさ（正確には輝度）を取ったグラフを想像してください。モダンなテレビでは、理想的には直線になります。古い CRT では曲線になり、中間の電圧では明るさが予想よりずっと低くなります。

![MiSTer FPGA documentation gamma explanation graph example](img/gamma-curve.png)  
[画像出典](https://www.japanistry.com/understanding-gamma-in-photography/){target=_blank}

MiSTer は直線のカーブを出力するため、ガンマフィルターで古いテレビで見慣れたものに近い曲線を復元できます。「brighter」系のスキャンラインと（CRT の蛍光体を模した）シャドウマスクを足した後には特に有効です。ガンマは好みの問題なので、試して自分で判断してください。

この例では `Pure_Gamma` フォルダーの `gamma_113.txt` という非常に弱いガンマカーブを適用しています。これは典型的な民生 CRT のガンマカーブに近いとされています。

[![MiSTer FPGA Gamma curve explanation with Shadow Masks Squished VGA Bright v2.txt 1200p 5x overscan to 1080p with scanlines - brighter.txt](img/pure_gamma-gamma_113.png)](img/pure_gamma-gamma_113.png){target=_blank}

この動画でガンマ調整を実演しています：

![type:video](videos/gamma.mp4)
