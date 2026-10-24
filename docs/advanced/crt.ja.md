MiSTer をクラシックな CRT ディスプレイに接続する方法はいくつかあります。主な2つは、Analog I/O ボードの VGA ポートと、DE10-Nano の HDMI ソケットに挿す Direct Video HDMI-to-VGA アダプターです。

*この内容の大部分は [MikeS11](https://github.com/MikeS11/){target=_blank} 氏と [ArchiveRL](https://github.com/ArchiveRL/){target=_blank} 氏が MiSTer FPGA GitHub Wiki に書いたガイドによるものです*

## MiSTer CRT 接続オプション

### ボード／アダプター

どちらの方法もほぼ同一の画像を生成し、多くの場合実機出力と 1:1 で一致するはずです。長所と短所：

* Analog I/O ボード
    * 長所：追加機能（ボタン、LED など）、コンポーネント出力に SoG 改造不要
    * 短所：高価、一部のコアで色深度が低い、デュアル SDRAM が使えない
* Direct Video
    * 長所：より良い色深度、はるかに安価
    * 短所：追加機能なし、コンポーネントには追加改造が必要、すべてのアダプターの動作保証なし

I/O ボードまたは Direct Video アダプターを入手したら、ケーブルでテレビに繋ぎ、`MiSTer.ini` の設定を調整します。

### ケーブル

* RGB SCART 付き民生テレビ（15 kHz）（I/O ボードまたは Direct Video 経由）— I/O ボードまたは Direct Video アダプターのほかに専用ケーブルが必要で、自作するかオンラインで購入します。[推奨](https://www.retrorgb.com/beware-of-mister-scart-cables.html){target=_blank}はコンポジット同期ラインに 470 オーム抵抗のあるケーブルです（販売者に抵抗内蔵か確認するのが最善）：
  
    * 購入先候補：[MiSTerAddons (US)](https://misteraddons.com/collections/parts/products/video-cables-hdmi-scart-ypbpr){target=_blank}、[Retro Access (UK)](https://retro-access.com/products/mister-io-scart?_pos=1&_sid=97cb11000&_ss=r){target=_blank}、[UltimateMiSTer (PT)](https://ultimatemister.com/product/rgb-scart-cable/){target=_blank}、[Wolfsoft (DE)](https://www.wolfsoft.de/shop/product_info.php/products_id/15401//mister-premium-rgb-kabel-2m.html){target=_blank}、[Antoniovillena (ES)](https://www.antoniovillena.es/store/product/vga-scart-cable/){target=_blank}。

    * MiST ケーブルも概ね動きますが、470 オーム抵抗がないことがあり、全般的に「保証なし」です：[Lotharek (PL)](https://lotharek.pl/productdetail.php?id=171){target=_blank}、[Amigastore (EU)](http://amigastore.eu/en/512-mist-scart-cable-mist-db15-f-to-scart-tv.html){target=_blank}。

    * 別の選択肢は VGA-SCART コンバーターと通常の SCART/VGA ケーブルを使うこと。候補：[Antoniovillena (SP)](https://www.antoniovillena.es/store/product/vga-scart-adapter/){target=_blank}、[Arcadeforge (DE)](https://arcadeforge.net/UMSA/UMSA-Ultimate-SCART-Adapter::57.html?language=en){target=_blank}、[Retro Upgrades (UK)](https://www.retroupgrades.co.uk/product/vga2scart/){target=_blank}。

    * 注意：民生 Trinitron では、くすんだ色や不正確な色を直すために追加の抵抗／ポテンショメーターが必要なこともあります（[フォーラムリンク](https://misterfpga.org/viewtopic.php?p=4162#p4162){target=_blank}）。

* YPbPr コンポーネント付き民生テレビ（15 kHz）（I/O ボード経由）— 標準の VGA-to-component ケーブルで足りるはずです。

* YPbPr コンポーネント付き民生テレビ（15 kHz）（Direct Video 経由）— Sync on Green（SoG）を追加するケーブル改造が必要。[Direct Video - YPbPr 信号のセットアップ](directvideo.md#setup-for-ypbpr-signals)またはこのフォーラムスレッドを参照：[Direct Video HDMI to Component CRT 480i TV by thorr](https://misterfpga.org/viewtopic.php?f=33&t=1471){target=_blank}。

* VGA モニター（31 kHz）— 標準の VGA ケーブルで足りるはずです。

* PVM/BVM モニター（I/O ボードまたは Direct Video 経由）— 標準の VGA-to-BNC ケーブル（3xRGB + HSync）で問題ないはずです。

* Commodore モニター — 1084S モニター用ケーブルは [UltimateMiSTer (PT)](https://ultimatemister.com/product/mister-commodore-1084s/){target=_blank} が販売しています。

### 設定

設定は SD カードの `/media/fat/` ディレクトリーにある `MiSTer.ini` で変更します。現在動作しているファイルをバックアップし、公式リポジトリーの新しい `MiSTer.ini`（[このリンクを右クリックして "Save file as" を選択](https://github.com/MiSTer-devel/Main_MiSTer/raw/master/MiSTer.ini){target=_blank}）から始めてください。以下の設定はこのデフォルトファイルを前提にしています。

#### Analog I/O ボード

* RGB SCART 付き民生テレビ（15 kHz）  
    `composite_sync=1`

* コンポーネント付き民生テレビ（15 kHz）  
    `vga_mode=ypbpr`  
    *I/O ボードの SoG スイッチを切り替える必要があるかもしれません*

* VGA モニター（31 kHz）  
    `forced_scandoubler=1`

#### Direct Video アダプター

* RGB SCART 付き民生テレビ（15 kHz）  
    `direct_video=1  `  
    `composite_sync=1`

* コンポーネント付き民生テレビ（15 kHz）  
    `direct_video=1  `  
    `composite_sync=1`  
    `vga_mode=ypbpr`

* VGA モニター（31 kHz）  
    `direct_video=1  `  
    `forced_scandoubler=1`

* PVM/BVM モニター  
    `direct_video=1  `  
    `composite_sync=1`

### コンポジット／S-Video への接続

対応コアは、S-Video またはコンポジット出力用のネイティブ Y/C 信号を生成できます。輝度（Y）はグリーン出力、色度（C）はレッド出力に生成されます。Y/C アダプターボードがこれらの信号を S-Video またはコンポジット端子へ送り、同期信号を供給します。S-Video は Y と C を分離したまま伝え、コンポジットは両者を1本の CVBS 信号に合成します。

#### アダプターボード

[MiSTerAddons - Active Y/C Adapter](https://misteraddons.com/collections/parts/products/yc-active-encoder-board/){target=_blank}、[Ultimate MiSTer - Active Adapter](https://ultimatemister.com/product/mikes11-active-composite-svideo/){target=_blank}、[Antonio Villena - Active Adapter](https://antoniovillena.com/product/mikes1-vga-composite-adapter/){target=_blank}、[UltimateMiSTer - Passive Adapter](https://ultimatemister.com/product/mikes1-yc-passive-board/){target=_blank}。自分で作れるオープンソース設計もあります：[GitHub](https://github.com/MikeS11/MiSTerCRT){target=_blank} / [フォーラムリンク](https://misterfpga.org/viewtopic.php?f=33&t=2894){target=_blank}。コンポジットと S-Video の両方で最高品質を求めるならアクティブアダプターが推奨ですが、パッシブアダプターも良い代替です。

#### 接続要件

実際の配線はアダプターとディスプレイによって異なります。以下はあくまで例であり、すべての構成で必要な部品ではありません。

* S-Video：Y と C はディスプレイまで常に別々の線で送る必要があります。アダプターとディスプレイによって、4ピン mini-DIN コネクターや個別の RCA 端子が使われます。Commodore 1702 のようなモニターは RCA 端子で Y/C を受けます。この場合「VGA-to-component」ケーブルは純粋に物理的な VGA→RCA ブレイクアウトとして使えます（信号はあくまで Y/C であり、YPbPr ではありません）。
* コンポジット：
    * アダプターに専用のコンポジット（CVBS）RCA 出力がある場合は、それをディスプレイのコンポジット入力に直接接続します。Y アダプターは不要です。
    * パッシブ構成では、VGA→RCA ブレイクアウトケーブルと 1オス→2メス RCA Y アダプターで Y と C を合成することもできます。この簡易な方法はルマトラップがなく、激しいレインボーアーティファクトが出ることがあるため、推奨されるコンポジット構成ではありません。

#### Analog I/O ボードでの設定 { #settings-with-the-analog-io-board }

* Sync-on-green スイッチ：OFF（アクティブまたはパッシブアダプターを使う場合、それが同期を生成します）
* INI 設定：
    * `vga_scaler=0`
    * `composite_sync=1`
    * `vga_mode=svideo`（`cvbs` も動きますが非推奨）
    * `ntsc_mode=0`（0 = 通常 NTSC、1 = PAL-60、2 = PAL-M。この設定は現状どのコアにも使われていません）

#### Direct Video アダプターでの設定

* sync-on-green 回路が必要。アクティブおよびパッシブアダプターには内蔵されています。ない場合は [Direct Video - YPbPr 信号のセットアップ](directvideo.md#setup-for-ypbpr-signals) を参照。I/O ボードの物理 SoG スイッチは適用されません。アダプターの回路がカバーします。
* INI 設定：
    * `direct_video=1`
    * `composite_sync=1`
    * `vga_mode=svideo`（`cvbs` でも動きますが推奨されません）
    * `ntsc_mode=0`（0 = 通常 NTSC、1 = PAL-60、2 = PAL-M。この設定は現状どのコアにも使われていません）

#### その他の RGB to コンポジット／S-Video コンバーター

MiSTer のネイティブ Y/C 出力に頼らず、RGB またはコンポーネント信号を取って S-Video またはコンポジットにトランスコードする外部コンバーターを使うこともできます。

**ここで報告されているコンバーターは一般に S-Video モードでは良好に動きましたが、そのコンポジット出力はレインボーアーティファクトや過剰なドットクロールが出やすい傾向にありました。**

選択肢の一つは [Axunworks コンバーター](https://www.axunworks.com/RGB-to-Composite-S-Video-p341706.html){target=_blank}です。BNC-to-RCA アダプター付きの VGA-to-BNC ケーブルが必要で、おそらくコンポジットでもアーティファクトが出ます（[フォーラムスレッド](https://shmups.system11.org/viewtopic.php?f=6&t=63452&start=270){target=_blank}）。良好に動くと報告された他の選択肢は、eBay 販売者 "wakabavideo" のコンバーターと "Keene SCART to S-Video" ブランドです。

## CRT ディスプレイの種類

CRT には3つの主要カテゴリーがあります。民生テレビ、コンピューターモニター、プロ用映像モニターです。ある種類の CRT 向けの信号は別の種類では理想的でないことが多く、MiSTer で CRT を使うのは万能の体験ではありません。

### 民生テレビ

ここで扱う民生 CRT 構成は主に 15 kHz モデルを使います。これは多くのレトロコンソールが使ったアナログレートで、240p と 480i の両方を含みます。後期の民生 CRT は、モデルによってはより高いレートのコンポーネントや HDMI 入力に対応するものもあります。1950年代から1980年代後半まで、ほとんどの民生テレビは [RF ビデオ](https://en.wikipedia.org/wiki/RF_connector){target=_blank}しか使っておらず、特に今日では干渉を受けやすいです。後に[コンポジットビデオ](https://en.wikipedia.org/wiki/Composite_video){target=_blank}（依然としてノイズは多いものの、RF より干渉に強い）が使われるようになりました。[S-Video](https://en.wikipedia.org/wiki/S-Video){target=_blank}（ずっとシャープで干渉に強い信号）対応のテレビもありましたが、あまり一般的ではありませんでした。多くの欧州各国では、[SCART コネクター](https://en.wikipedia.org/wiki/SCART){target=_blank}による RGB ビデオにも対応していました（ほぼ最高レベルです）。最後に、CRT テレビ末期の1990年代後半〜2000年代初頭には[コンポーネントビデオ](https://en.wikipedia.org/wiki/Component_video){target=_blank}や [HDMI](https://en.wikipedia.org/wiki/HDMI){target=_blank} さえ使われるようになりました。

今日（米国で）売られている中古 CRT テレビの多くは、コンポジットビデオかコンポーネントビデオを使っています。欧州では、保証はありませんが RGB SCART 対応の中古 CRT テレビがより一般的に見つかります。

### コンピューターモニター

コンピューターモニターは通常、より高解像度の 31 kHz 信号向けに設計されました。多くは [VGA コネクター](https://en.wikipedia.org/wiki/VGA_connector){target=_blank}のみで、[DVI](https://en.wikipedia.org/wiki/Digital_Visual_Interface){target=_blank} などの他の選択肢はごく少数でした。高解像度向けに作られているため、スキャンダブルして 31 kHz にしても、240p 信号を通すとジャッターやその他の望ましくない効果が出ることがあります。コンピューターモニターはレトロコンピューターの映像信号を良好に処理します。15 kHz（240p）アナログ信号をネイティブに扱える[マルチシンクモニター](https://en.wikipedia.org/wiki/Multisync_monitor){target=_blank}もあります。あまり一般的ではありませんが、CRT 愛好家コミュニティで非常に人気があります。1台のモニターですべての種類の信号を扱いたいなら、マルチシンクモニターの入手を検討してください。

### プロ用映像モニター

プロ用 CRT モニターには、Sony の PVM や BVM シリーズのほか、[放送用リファレンスモニター](https://en.wikipedia.org/wiki/Broadcast_reference_monitor){target=_blank}、医療用モニター、その他のプロ用ディスプレイが含まれます。これらのディスプレイは高品質部品を使ったプロ向けに設計され、当時としては非常に高価でした。プロ用リファレンスモニターは今日でも製造されていますが、現行モデルは一般に CRT ではなく OLED や LCD を使い、ニッチな業務用途向けです。昔の PVM は多様な接続を提供し、上記のすべてのコネクターに加えて、赤・緑・青・同期信号を別々のコネクターで運ぶ [BNC コネクター](https://en.wikipedia.org/wiki/BNC_connector){target=_blank}のような特殊コネクターもありました。モデルによって、プロ用モニターの BNC 入力は3本（RGB＋sync-on-green）、4本（RGB＋独立复合同期）、または5本（RGB＋独立水平同期・垂直同期）の場合があります。

レトロハードウェアでは、中古 PVM は民生 CRT テレビに対して次の利点があります：

* より高い TVL と精細な画像ディテール、より良い色、優れた表示技術を持つ非常に高品質な設計。ただし実際のシャープさはモデルと状態に依存します。
* 修理しやすい設計であることが多く、電磁干渉へのシールドも優れていました。
* 1980年代半ば頃から、ほとんどがネイティブ RGB 入力に対応していたようなので、理論上の映像品質ははるかに優れ得ます。
* 前面の多くのダイヤルとボタンで、画像を非常に細かく調整できるのが普通です。
* 多くが同時出力に対応し、画像を別のディスプレイにミラーリングできます。
* かなりの数がマルチシンクでもあり、15 kHz と 31 kHz 両方の信号に対応。多くのモデルは 50 Hz と 60 Hz の両方で動作しますが、PAL および NTSC への対応はモデルにより異なります。

残念ながら PVM は今日では非常に高価で、すでに持っていなければ今入手するのはかなり難しいかもしれません。モデルの人気、サイズ、機能次第で、中古 PVM が数百ドル以上で出品されるのは珍しくありません。
