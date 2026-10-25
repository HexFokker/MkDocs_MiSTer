MiSTer には2つのネイティブアナログ出力経路があります。I/O ボードからの VGA 出力、または DE10-Nano の HDMI ポートに接続した互換性のある HDMI-to-VGA アダプター経由の Direct Video です。

*このページは MiSTer FPGA GitHub Wiki で [MikeS11](https://github.com/MikeS11/){target=_blank} と [ArchiveRL](https://github.com/ArchiveRL/){target=_blank} が書いた CRT ガイドに一部基づいており、大幅に改訂されています。*

## 出力経路

どちらの経路も最小限の処理でコアの映像を伝え、通常はほぼ同一の結果を生成します。

* **I/O ボードの VGA 出力** — Analog I/O Board 6.x、または I/O Board 9.2 with AV Board 1.2
    * 長所：ボタンや LED などの追加機能、コンポーネント出力用の同期回路を内蔵しているためケーブル改造が不要
    * 短所：より高価、VGA 出力を使う間は Dual SDRAM を使えない
* **Direct Video アダプター**
    * 長所：はるかに安い
    * 短所：追加機能なし、コンポーネント出力には追加の同期回路が必要、すべてのアダプターの動作が保証されているわけではない

## 標準 RGB／コンポーネント接続

`MiSTer.ini` は SD カードの `/media/fat/` にあります。動作中のファイルをバックアップし、公式リポジトリーの新しいコピー（[このリンクを右クリックして "Save file as" を選択](https://github.com/MiSTer-devel/Main_MiSTer/raw/master/MiSTer.ini){target=_blank}）から始めてください。以下の設定はこのデフォルトファイルを前提にしています。Direct Video アダプターでは常に `direct_video=1` を追加します。すべての出力モードとその完全な INI 値は [CRT 構成テーブル](crttable.md) のページに一覧があります。

* **RGB SCART 付き民生テレビ（15 kHz）** — コンポジット同期ラインに 470 オーム抵抗のある SCART ケーブル。抵抗が内蔵か販売者に確認するのが[推奨](https://www.retrorgb.com/beware-of-mister-scart-cables.html){target=_blank}です。購入先：[MiSTerAddons (US)](https://misteraddons.com/collections/parts/products/video-cables-hdmi-scart-ypbpr){target=_blank}、[Retro Access (UK)](https://retro-access.com/products/mister-io-scart?_pos=1&_sid=97cb11000&_ss=r){target=_blank}、[UltimateMiSTer (PT)](https://ultimatemister.com/product/rgb-scart-cable/){target=_blank}、[Wolfsoft (DE)](https://www.wolfsoft.de/shop/product_info.php/products_id/15401//mister-premium-rgb-kabel-2m.html){target=_blank}、[Antoniovillena (ES)](https://www.antoniovillena.es/store/product/vga-scart-cable/){target=_blank}。MiST ケーブルも概ね動きますが抵抗がないことがあります：[Lotharek (PL)](https://lotharek.pl/productdetail.php?id=171){target=_blank}、[Amigastore (EU)](http://amigastore.eu/en/512-mist-scart-cable-mist-db15-f-to-scart-tv.html){target=_blank}。別案として VGA-SCART コンバーター：[Antoniovillena](https://www.antoniovillena.es/store/product/vga-scart-adapter/){target=_blank}、[Arcadeforge](https://arcadeforge.net/UMSA/UMSA-Ultimate-SCART-Adapter::57.html?language=en){target=_blank}、[Retro Upgrades](https://www.retroupgrades.co.uk/product/vga2scart/){target=_blank}。民生用 Trinitron では、暗い・不正確な色を直すために追加の抵抗／ポテンショメーターが必要になることがあります（[フォーラムリンク](https://misterfpga.org/viewtopic.php?p=4162#p4162){target=_blank}）。
    INI：`composite_sync=1`

* **YPbPr コンポーネント付き民生テレビ（15 kHz）**
    * **Analog I/O Board 6.x または I/O Board 9.2 with AV Board 1.2** — 標準の VGA-to-component ケーブルを使います。INI：`composite_sync=0`、`vga_mode=ypbpr`、`vga_sog=1`。Analog I/O Board 6.x では SoG スイッチを **AUTO** にして `vga_sog` で SoG を制御します。I/O Board 9.2 with AV Board 1.2 には SoG スイッチがありません。
    * **Direct Video** — ケーブルに sync-on-green 回路を追加します。[Direct Video - YPbPr 信号のセットアップ](directvideo.md#setup-for-ypbpr-signals)または[このフォーラムスレッド](https://misterfpga.org/viewtopic.php?f=33&t=1471){target=_blank}を参照。INI：`direct_video=1`、`composite_sync=1`、`vga_mode=ypbpr`

* **VGA モニター（31 kHz）** — 標準の VGA ケーブル。
    INI：対応コアで `forced_scandoubler=1`（Direct Video では `direct_video=1` も追加）

* **RGBS 入力の PVM/BVM** — RGB と独立したコンポジット同期信号を運ぶ標準の VGA-to-BNC ケーブルを使います。
    INI：`composite_sync=1`（Direct Video では `direct_video=1` も追加）

* **Commodore モニター** — 1084S 用ケーブルが [UltimateMiSTer (PT)](https://ultimatemister.com/product/mister-commodore-1084s/){target=_blank} から販売されています。

## ネイティブ Y/C：S-Video とコンポジット

対応コアは、S-Video またはコンポジット出力用のネイティブ Y/C 信号を生成できます。輝度（Y）はグリーン出力、色度（C）はレッド出力に生成されます。Y/C アダプターボードがこれらの信号を S-Video またはコンポジット端子へ送り、同期信号を供給します。S-Video は Y と C を分離したまま伝え、コンポジットは両者を1本の CVBS 信号に合成します。

### アダプターボード

[MiSTerAddons - Active Y/C Adapter](https://misteraddons.com/collections/parts/products/yc-active-encoder-board/){target=_blank}、[Ultimate MiSTer - Active Adapter](https://ultimatemister.com/product/mikes11-active-composite-svideo/){target=_blank}、[Antonio Villena - Active Adapter](https://antoniovillena.com/product/mikes1-vga-composite-adapter/){target=_blank}、[UltimateMiSTer - Passive Adapter](https://ultimatemister.com/product/mikes1-yc-passive-board/){target=_blank}。自作できるオープンソース設計もあります：[GitHub](https://github.com/MikeS11/MiSTerCRT){target=_blank} / [フォーラムリンク](https://misterfpga.org/viewtopic.php?f=33&t=2894){target=_blank}。コンポジットと S-Video の両方で最高品質にはアクティブアダプターが推奨されますが、パッシブアダプターは安価な代替です。

### 配線

実際の配線はアダプターとディスプレイによって異なります。以下はあくまで例であり、すべての構成で必要な部品ではありません。

* **S-Video** — Y と C はディスプレイまで常に別々の線で送る必要があります。アダプターとディスプレイによって、4ピン mini-DIN コネクターや個別の RCA 端子が使われます。Commodore 1702 のようなモニターは RCA 端子で Y/C を受けます。この場合「VGA-to-component」ケーブルは純粋に物理的な VGA→RCA ブレイクアウトとして使えます（信号はあくまで Y/C であり、YPbPr ではありません）。
* **コンポジット** — アダプターに専用のコンポジット（CVBS）RCA 出力がある場合は、それをディスプレイのコンポジット入力に直接接続します。パッシブ構成では、VGA→RCA ブレイクアウトケーブルと 2メス→1オス RCA Y アダプターで Y と C を合成することもできます。この方法はルマトラップがなく、激しいレインボーアーティファクトが出ることがあるため、推奨されるコンポジット構成ではありません。

### INI 設定

* **Analog I/O Board 6.x または I/O Board 9.2 with AV Board 1.2** — Y/C アダプターが同期を生成します。Analog I/O Board 6.x では SoG スイッチを **AUTO** にします。**OVR** は SoG を強制的にオンにするため、この Y/C 接続では使えません。I/O Board 9.2 with AV Board 1.2 には SoG スイッチがありません：
    * `vga_scaler=0`
    * `vga_sog=0`
    * `composite_sync=1`
    * `vga_mode=svideo`（`cvbs` でも動きますが推奨されません）
    * `ntsc_mode=0`（0 = NTSC、1 = PAL-60、2 = PAL-M。Y/C の色符号化を変更しますが、ビデオタイミングは変更しません。PAL-60 または PAL-M が明確に必要な場合を除き 0 のままにします）

* **Direct Video アダプター** — sync-on-green 回路が必要です。アクティブおよびパッシブアダプターには内蔵されています。ない場合は [Direct Video - YPbPr 信号のセットアップ](directvideo.md#setup-for-ypbpr-signals) を参照。I/O ボードの物理 SoG スイッチは適用されません。アダプターの回路がカバーします：
    * `direct_video=1`
    * `composite_sync=1`
    * `vga_mode=svideo`（`cvbs` でも動きますが推奨されません）
    * `ntsc_mode=0`

### 外部 RGB→コンポジット／S-Video コンバーター

ネイティブ Y/C 出力の代わりに、RGB またはコンポーネント信号を S-Video またはコンポジットにトランスコードする外部コンバーターを使うこともできます。ここで報告されているコンバーターは一般に S-Video モードでは良好に動きましたが、そのコンポジット出力はレインボーアーティファクトや過剰なドットクロールが出やすい傾向にありました。例：[Axunworks コンバーター](https://www.axunworks.com/RGB-to-Composite-S-Video-p341706.html){target=_blank}（BNC-to-RCA アダプター付きの VGA-to-BNC ケーブルが必要。[フォーラムスレッド](https://shmups.system11.org/viewtopic.php?f=6&t=63452&start=270){target=_blank}）、eBay 販売者 "wakabavideo" のコンバーター、"Keene SCART to S-Video" ブランド。

## CRT ディスプレイの種類

* **民生テレビ** — 主に 15 kHz モデル（240p と 480i）。後期のモデルはより高いレートのコンポーネントや HDMI 入力を持つものもあります。入力対応は地域とモデルにより異なります。北米ではコンポジットが一般的で、欧州では RGB SCART がより一般的（ただし全てではない）でした。画質の順位はおおむね RF < コンポジット < S-Video < コンポーネント／RGB です。
* **コンピューターモニター** — 31 kHz 向けに設計され、通常は VGA のみ。240p 信号は 31 kHz にスキャンダブルしてもジャッターやその他のアーティファクトが出ることがあります。一部の[マルチシンクモニター](https://en.wikipedia.org/wiki/Multisync_monitor){target=_blank}は 15 kHz もネイティブに受け付けるため、さまざまなコンソールやビデオタイミングに対応できる柔軟な選択肢となります。
* **プロ用モニター** — Sony の PVM/BVM シリーズ、[放送用リファレンスモニター](https://en.wikipedia.org/wiki/Broadcast_reference_monitor){target=_blank}、医療用ディスプレイなど：高い TVL の高品質な設計（実際のシャープさはモデルと状態に依存）、80年代半ば以降の多くのモデルでネイティブ RGB 入力、豊富な前面パネルの画像調整、修理しやすくシールドも良好。多くがマルチシンクで、50/60 Hz 対応はモデルにより異なります。接続性は広範で BNC 入力も含みます。モデルによって、3本（RGB＋sync-on-green）、4本（RGB＋コンポジット同期）、5本（RGB＋独立水平同期・垂直同期）の BNC を使います。中古品は高めで、入手しやすさは地域によって異なります。
