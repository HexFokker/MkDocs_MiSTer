MiSTer についてよくある質問への回答です。何か不足していれば、右上の Edit（ペン）アイコンから GitHub 上でこのページを編集して貢献してください。

## MiSTer について

### MiSTer のセットアップは難しい？ 本当にいじくり回すのが好きな技術者向けなの？

いいえ、いいえ。いじるのが好きな人は MiSTer をもっと深く楽しめますが、最小構成は DE10-Nano に SDRAM ボードを付けて SD カードを用意するだけです。詳しくは[セットアップガイド](../setup/requirements.md)を参照してください。

### MiSTer コアの精度は、他の FPGA 製品と比べてどう？

ほとんどの MiSTer コアは、現在入手可能な主要な FPGA 製品と同等かそれ以上の精度です。ほとんどの人は、これらのコアと実機を区別できないでしょう。

### MiSTer にラグはある？

構成次第ですが、知覚できないほど低いものから約1フレームまで幅があります。特定の機器と調整でゼロに近いレイテンシーも可能です。詳しい説明は[入力レイテンシー](../advanced/lag.md)を参照。

### MiSTer がカートリッジや USB CD ドライブに対応するのはいつ？

公式には対応しません。このプロジェクトは、実機がなくても実機の体験を提供することを目指しています。カートリッジ対応は、FPGA から使える GPIO ピンの数を考えると物理的に非現実的です。USB CD ドライブはドライバー・レイテンシー・バッファリングがすべて機種ごとに異なり、現在の CD ゲーム読み込み方式と比べて予測不能なレイテンシーが加わります。[CD ベースのゲーム](cd.md#will-mister-ever-support-usb-cd-drives)も参照。

### MiSTer にはなぜ、パッケージ画像やメタデータ付きの立派な GUI がないの？

理由はいくつかあります：

1. MiSTer のメニューは、FPGA 上の占有面積と ARM プロセッサーのリソースを最小限に抑えるよう設計されています。
2. DE10-Nano には GPU がないため、立派な GUI は CPU によるソフトウェア描画で遅くなります（FPGA で描画しない限り）。
3. メニューは、非常に低解像度の多種多様なアナログディスプレイでも表示・操作できる必要があります。

### MiSTer コアにセーブステートは実装される？

Game Boy、GBA、Lynx、WonderSwan、NES、PSX の各コアはセーブステートに対応しています。

セーブステートを追加するには、コアを最初から対応前提で書くか、ポーズ機能に対応するよう大幅に作り替える必要があります。FPGA ベースのエミュレーターへの実装は、ソフトウェアエミュレーターほど簡単ではありません。現時点で他のコアへの追加予定はありませんが、いつか実現するかもしれません。

### DE10-Nano は補助金つきの部品を使っていると聞いた。それが止まったら MiSTer は終わり？

いいえ。DE10-Nano は学生向けに非常に大規模に製造され、広く入手可能です。生産終了になっても、オープンソースのコアとインフラは別の広く入手可能なボードに移植されます。

### 他の人には出ていない不具合が見える。別の DE10-Nano を買うべき？

いいえ。不具合を報告して修正を待ってください。特別に優れた DE10-Nano というものは存在しません。

### 他の Cyclone ベースの開発ボードが売っていた。WiFi 内蔵だけど MiSTer に使える？

基本的には無理です。誰かが別ボードへの移植に時間をかける可能性はありますが、ピン配置やメモリーが違うためコアはそのままでは動きませんし、そのボードが大幅なアップグレードでない限り公式サポートも得られません。別プラットフォームへの対応は大きな労力を要するため、複数の非公式ハードウェアをサポートする予定はありません。

## ハードウェア

### MiSTer に I/O ボードは必要？

いいえ。I/O ボードは任意ですが、3.5 mm・光デジタル音声、CRT 出力、テープ音声入力など、人によっては重要な機能を提供します。

### CRT にアナログ映像を出すのに I/O ボードは必要？

いいえ。HDMI→VGA アダプターでもできます。[Direct Video](../advanced/directvideo.md)を参照。

### どのコアに SDRAM が必要？

随時更新されている[コンソールコア](../cores/console.md)と[コンピューターコア](../cores/computer.md)のリストを参照。多くの[アーケードコア](../cores/arcade.md)も SDRAM を必要とします。

### なぜあるコアは SDRAM 拡張ボードを必要とし、他は不要なの？

多くの場合、そのコアがバグなく正しく動くために信頼できる読み書きタイミングを必要とするからです。たとえば実機の NES は ROM に直接アクセスするためタイミングが非常に厳しく、SDRAM が必須です。DE10-Nano 内蔵の DDR3 メモリーはランダムアクセスでレイテンシーが変動するため、確実なタイミングを要するシステムには適しません。

### 公式 USB Hub 拡張ボードは必要？

いいえ。ただし少なくとも安価な OTG ハブ（[MakerSpot Micro USB OTG Hub](https://www.amazon.com/MakerSpot-Accessories-Charging-Extension-Raspberry/dp/B01JL837X8){target=_blank} など）、または通常のハブ＋アダプターは欲しいところです。機器が多い場合はセルフパワーのハブを使ってください。

### MiSTer を使うのに USB キーボードは常備すべき？

はい、USB キーボードは常に用意しておくのがおすすめです。安くてコンパクトなワイヤレスキーボードなら場所を取りません。

### MiSTer と互換のある電源は？

DE10-Nano は 5 V・2 A 以上の電源が必要です。コネクターはセンタープラスの同軸「バレル」プラグで、外径 5.5 mm・内径 2.1 mm・長さ 11.0 mm です。

USB Hub 拡張ボードに電力を多く消費する周辺機器（WiFi、Bluetooth、複数コントローラー、機械式 HDD）を接続する場合は、電流容量の大きい（4〜5 A）同様の 5 V 電源を検討してください。通常これが必要になるのは、機械式 HDD がある、充電ポートを多用する、User IO ポートから MT32-Pi に給電する場合など、大きな電流を消費する構成だけです。

### MiSTer に冷却は必要？

ヒートシンク（パッシブ冷却）を推奨します。理想は 22 mm × 22 mm ですが、より一般的な 20 mm × 20 mm でも十分です。ファンによるアクティブ冷却も効果的ですが必須ではありません。ao486、SNES、N64、PSX などの高速で複雑なコアは発熱が大きいことがあります。

### DE10-Nano の動作保証は 100°C までで、実際そこまで熱くならない。本当にファンやヒートシンクは必要？

ao486 など複雑なコアは、発熱が要求される厳しいタイミングに影響するため、チップが冷えている方が有利です。起こり得るグリッチを避けるためにヒートシンクを推奨し、さらにファンを載せればより良いでしょう。何も付けなくても DE10-Nano が壊れることはありません。

### ファンの音がうるさい。何かできる？

おそらくできます。多くの（すべてではない）I/O ボードには、ファンコネクターの近くにファン電圧を 5 V から 3.3 V に切り替える[ジャンパー](https://en.wikipedia.org/wiki/Jumper_(computing)){target=_blank}があります。たいていファン電源コネクターの隣（[メザニンボード](../assets/92_av_board.png){target=_blank}を外さないと届かない場合があります）か、基板の裏面にあります。

基板表面のジャンパー：

![I/O board with the 5v jumper on the top side](../assets/jumper_top.png)

基板裏面のジャンパー：

![I/O board with the 5v jumper on the bottom side](../assets/jumper_bottom.png)

ジャンパーを反対側に差し替えればファンが低速になり静かになるはずです。

### MiSTer にケースが必要。どうすれば？

自作するか、オンラインの販売店から買うかです。DIY なら 3D プリント用ファイルがネット上にあります（例：[Thingiverse](https://www.thingiverse.com/search?q=mister+fpga){target=_blank}）。デザインやアイデアは[ケース](case.md)を参照。

### DE10-Nano の 14 mm 真鍮スペーサーに合うネジは？

M3 ネジ、8 mm 長が適しています。

## ソフトウェアとアップデート

### ニュースで "Update Framework" や "Update Sys" を見かけた。どういう意味？

「フレームワーク」（または "sys"）は、I/O やビデオスケーリングなど、すべてのコアに共通する部分を指します。そのコアのフレームワーク部分が更新された、という意味です。

### アップデート／downloader スクリプトで特定のものを無視するようカスタマイズできる？

はい。`/media/fat/downloader.ini` にフィルターを追加します。方法は[このガイド](https://github.com/MiSTer-devel/Downloader_MiSTer/blob/main/docs/download-filters.md){target=_blank}を参照。

### downloader スクリプトで現在以上に多くのコアをダウンロードできる？

はい。downloader スクリプトはカスタムデータベースに対応しています。[このガイド](https://github.com/MiSTer-devel/Downloader_MiSTer/blob/main/docs/custom-databases.md){target=_blank}を参照。

### unstable コアとは？ インストール方法は？

unstable コアはコアのリポジトリーへの最新コミットから自動ビルドされるもので、開発者の最新の変更が含まれ、新しいコードがプッシュされるたびに更新されます。バグや未完成の機能を含むことがありますが、最終的に安定版リリースへと成長します。アップデートスクリプトは意図的にこれらをインストールしませんが、バグ修正や新機能を試すなど、インストールする良い理由はあります。すべてのコアに unstable 自動ビルドがあるわけではありません。

unstable ビルドは [MiSTer-unstable-nightlies GitHub organization](https://github.com/MiSTer-unstable-nightlies) にアップされ、そこにはコアリポジトリーのフォークが置かれています。コアリポジトリーの Releases タブからダウンロードしてください。リポジトリーのファイルツリーにある `releases` フォルダーは無視してください。そこには安定版の上流ビルドが入っています。インストールは、その `.rbf` ファイルを MiSTer の microSD カードの適切なフォルダーにコピーするだけです。安定版コアと分けるため、専用の `/_Unstable/` フォルダーを使うとよいでしょう。

### 他のリポジトリーにあるコアが動かない。MiSTer って使いにくいの？

MiSTer のリポジトリーは自己完結しており、公式アップデーターは現行の公式 MiSTer リポジトリーからのみコアを取得します。他のリポジトリーのコアは完全には統合されていないため、結果はまちまちです。それらの開発者の中には、サポートを求められる独自の Discord サーバーやフォーラムを持っている人もいます。

### NES コアと特定のゲームで MiSTer を直接起動するには？

コアの自動起動と、指定 ROM でのコア起動、2つの設定を組み合わせます：

* `MiSTer.ini` で `bootcore=NES_20201102.rbf`（またはお持ちのコアのバージョン）を設定し、`;bootcore_timeout` をコメントアウトします。
* NES の games フォルダー（例：`/media/fat/games/NES/`）に、FDS BIOS を `boot0.rom`、起動したい `.nes` ROM を `boot1.rom` として置きます。

その他のオプションは [NES コアのドキュメント](https://github.com/MiSTer-devel/NES_MiSTer#installation){target=_blank}を参照。

## コントローラー

### 実機のコントローラーは使える？

はい。実機コントローラー用の USB アダプターが多数販売されています（下の USB コントローラー推奨を参照）。後述するように、I/O ボードの User ポート（SNAC）経由で直接接続することもできます。

### USB コントローラーのおすすめは？

ほぼすべての USB コントローラーが MiSTer で動き、ワイヤレスには Bluetooth または 2.4 GHz USB アダプターが使えます。多くのユーザーに好評で入力レイテンシーの低いコントローラー：

* [Sony DualSense（PS5 コントローラー）](https://www.playstation.com/en-us/accessories/dualsense-wireless-controller/){target=_blank} - 非常に低いラグ、高速ペアリング、タッチパッドをマウス対応コアでマウス入力として使える（例：SNES のライトガンゲームやスピナーとして）。
* [8BitDo M30 Bluetooth](https://www.8bitdo.com/m30/){target=_blank} と [8BitDo M30 2.4G](https://www.8bitdo.com/m30-2-4g-for-genesis-mini-mega-drive-mini/){target=_blank} - PlayStation 型よりボタンが少なくアナログスティックもないため、これだけしか持っていないと制約になる可能性があります。
* [8BitDo SN30 Pro 2](https://www.8bitdo.com/pro2/){target=_blank} - 多彩な接続方式と快適なデザイン。形状は PlayStation DualShock 系で、見た目とボタン配置は SNES 風。
* [8BitDo Arcade Stick](https://www.8bitdo.com/arcade-stick/){target=_blank} - 有線・無線ともに低ラグでばらつきも少ない。ボタンとスティックは交換可能（DIY）。
* [iBuffalo SNES Controller](https://www.amazon.com/Buffalo-iBuffalo-Classic-USB-Gamepad/dp/B002B9XB0E/){target=_blank} - 今では少し割高だが、テストされた中でも最もラグの少ないコントローラーの一つ。

他にも多数あります。[MiSTerAddons の入力レイテンシーテスト](https://rpubs.com/misteraddons/inputlatency){target=_blank}が選ぶ際の参考になります。最速の応答を求めるなら [USB オーバークロックの手順](../advanced/lag.md)も参照。

実機コントローラー用の優れた USB アダプター：

* [UltimateMiSTer.com の DaemonBite アダプター](https://ultimatemister.com/product-category/daemonbite-adapters/){target=_blank}（ポルトガル）- RP2040 チップと GP2040 ファームウェアで複数種類のコントローラーに対応。
* [MiSTerAddons.com の Reflex Adapt](https://misteraddons.com/products/reflex-adapt){target=_blank}（米国）- 本体1台に[別売りのアダプターケーブル](https://misteraddons.com/products/hdmi-controller-adapters){target=_blank}を組み合わせて複数種に対応。
* [Timville Triple Controller DaemonBite](https://www.tindie.com/products/timville/triple-controller-classic-gaming-usb-adapter/){target=_blank}（米国）- MickGuyver の DaemonBite アダプターの派生品で、NES・Genesis・SNES の実機コントローラーに対応。[これらの手順](https://github.com/timville85/TripleController){target=_blank}で自作も可能。3D プリントの筐体は購入も[ファイルから自分で印刷](https://www.thingiverse.com/thing:5011783){target=_blank}も可能。
* [2600-daptor D9](http://www.2600-daptor.com/){target=_blank}

### USB コントローラーのポーリングレートを上げて入力レイテンシーを改善できる？

はい。[入力レイテンシー](../advanced/lag.md)を参照。

### 2台目のコントローラーを MiSTer に追加するには？

コアを読み込んでいない状態でコントローラーを接続し、Menu コアで設定します。その後、必要に応じて各コアの OSD で定義してください。これは、コントローラーがすでに定義済みのものと異なるメーカー／型番（VendorID/ProductID が異なる）場合にのみ必要です。たとえば2台目の DualShock 4 は入力を再定義しなくて済むはずです。同じ理由で、VendorID/ProductID を共有する別機種は切り替えるたびに再設定が必要になることがあり、現状これを回避する方法はありません。複数コントローラーで共用する 8BitDo や Mayflash のアダプターは、ID がアダプター側に属するためこれに該当します。

### I/O 拡張ボードのシリアルポートにコントローラーを接続する方法は？

SNAC（Serial Native Accessory Converter）は、実機コントローラーを対応コア（SNES、Genesis、NES、TG16）に直接接続します。SNAC アダプターは複数の販売店から購入できます：

* [MiSTerFPGA.co.uk の SNAC アダプター](https://misterfpga.co.uk/product/mister-snac-controller-adapters/){target=_blank}（[SNAC 延長ケーブル](https://misterfpga.co.uk/product/mister-snac-extension-cable/){target=_blank}との併用がおすすめ）
* [UltimateMiSTer.com の SNAC アダプター](https://ultimatemister.com/product-category/mister-snac/){target=_blank}（[SNAC 延長ケーブル](https://ultimatemister.com/product/snac-extension-c64-iec-mt32-pi/){target=_blank}との併用がおすすめ）
* [MiSTerAddons.com の SNAC V1](https://misteraddons.com/products/mister-fpga-serial-native-accessory-converter-snac){target=_blank}、[SNAC V2](https://misteraddons.com/products/snax){target=_blank}、[SNAC V3](https://misteraddons.com/products/snax64){target=_blank}。いずれも専用の[外付けコントローラーアダプター](https://misteraddons.com/products/hdmi-controller-adapters){target=_blank}を別途使用。

SNAC の詳細は[こちらのページ](https://github.com/blue212/SNAC){target=_blank}。

### ライトガンは？

NES Zapper などの実機ライトガンはタイミングが厳しすぎて USB では動きませんが、I/O ボード経由（SNAC、上記参照）なら対応コアで問題なく動作します。

MiSTer は GunCon 2、GunCon 3、Gun4IR、Sinden など複数の USB ライトガンにも対応しています：

* GunCon 2 は CRT と、同期信号を取り出す手段が必要。
* GunCon 3 と Gun4IR はすべてのディスプレイで動作。
* Sinden はモダンなディスプレイと MiSTer 専用ファイルが必要。
* Reflex Adapt はオーバークロックした GunCon 1 に対応し、1 ms（1000 Hz）ポーリング有効時には GunCon 2 より優れた性能を発揮。

キャリブレーションはコアごとに必要です。実際にプレイする距離から照準合わせを行い、白い画面を使うと最も良い結果が得られます。

キャリブレーション値を 0 未満にしないでください。負の値で保存するとコアがクラッシュする可能性が高いです。直すには、microSD カードの "config" フォルダーからそのコアのライトガンキャリブレーションファイルを削除します。

## 映像

### 1080p・チラつきなしで遊ぶ設定は？

アップデータースクリプトを実行し、インストールされるビデオプリセットとフィルターを、2番目の OSD の Video Processing メニューから使います。詳しくは[映像設定](video.md)を参照。

### スキャンラインフィルターをきれいに見せるには？

動きのあるシーンでチラつきのない最良の結果を得るには、整数倍スケーリングを使います。`MiSTer.ini` で `vscale_mode=1` に設定するか、コア自体の整数倍スケーリングオプション（対応していれば 5x も）を使います。すべてのコアに整数倍スケーリングの OSD オプションがあるわけではありません。

"Integer scaling"（整数倍スケーリング）とは、ソース解像度（例：240p）をターゲット解像度（例：1080p）に整数倍（1、2、3、4…）のみで拡大することです。`MiSTer.ini` で MiSTer を 1080p に設定し、ネイティブ出力 240p のコアを使うと、整数倍スケーリングは 4 倍（4 × 240 = 960）に拡大します。残りの 120 ラインは画面上下の黒帯になります。

画面いっぱいに表示したければ他の設定も使えますが、ソース解像度がターゲット解像度を割り切れない限り（例：240p → 1200p で 5 倍）スキャンラインは「完璧」にはなりません。

### 4K や 1080p より高解像度のディスプレイを持っている。MiSTer は対応する？ より良いスケーリングを楽しみたい。

MiSTer は 4K にはわずかに届きません。解像度を変えるには SD カードの `MiSTer.ini` を編集します。例：`video_mode=12` で 1920x1440p、`video_mode=13` で 2048x1536p（ハードウェアの最大）。`video_mode=14` はディスプレイのピクセル繰り返し機能を使って 2560x1440p を出力しますが、その場合ディスプレイ側のアップスケーリングでティアリングやリサイズのアーティファクトが出ることがあります。これらの高解像度が使えるかどうかは、ディスプレイや信号経路に依存することがあります。

### 他のコアは動くのに、このコアだけ画面が真っ黒。どうする？

`vsync_adjust` を 0 にしてみてください（これがデフォルト設定でした）。お使いのディスプレイがすべてのリフレッシュレートに対応していない可能性があります。

## CD ゲーム

### CD ゲームが動かない！ 助けて！

解凍してください。CD ゲームは zip 化してはいけません。ISO/WAV/BIN/IMG + CUE ファイルまたは CHD を使います。格納方法は[CD ベースのゲーム](cd.md)を参照。

### マルチディスクのゲームはどう扱う？ ディスクを替えるとコアがリセットされる！

ゲームの全ディスクを同じサブフォルダーに入れてください。そうすれば次のディスクをマウントしてもコアはリセットしないはずです。例は[マルチディスクゲーム](cd.md#multi-disc-games)を参照。

### TurboGrafx-16 CD/PC Engine CD には CD カード BIOS のどのバージョンが必要？

日本版バージョン 3.0 を使います。一般的には `Super CD-ROM System (Japan) (v3.0).pce` という名前で見つかります。

## メニューとスクリーンショット

### MiSTer 起動時の Menu コアの壁紙／背景を変えるには？

デフォルトでは、Menu コアの背景は砂嵐のシミュレーションです。Menu コアで F1 を押すと、カラーバー→黒一色→壁紙と切り替わります。

壁紙設定は microSD カードのルート（MiSTer 起動中は `/media/fat/`）にある `menu.jpg` または `menu.png` を探します。どちらもなければ、`./wallpapers` フォルダーから Menu コア読み込みのたびにランダムな `.png` または `.jpg` を選びます。画像の EXIF 回転メタデータが向きに影響します。回転して表示される場合はオンラインの EXIF エディターでこの値を変更してください。

### MiSTer でスクリーンショットは撮れる？

はい。++win+prtsc++ でアップスケール済みのスクリーンショット、++shift+win+prtsc++ でコアの生出力（ゆがんでいたり変なアスペクト比の場合あり）を撮れます。スクリーンショットは `./screenshots` の、コア名のフォルダーに保存されます。
