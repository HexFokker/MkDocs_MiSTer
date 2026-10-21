Nintendo Entertainment System（NES）の MiSTer コアは機能満載です：

* Famicom Disk System（FDS）のディスク自動入れ替え
* カスタムパレット読み込み
* オーバースキャンと画面端のマスキング
* スプライト増量ハック
* SNAC 対応。アナログ映像出力経由で実機 Zapper ライトガンを CRT で使える

## Extra Sprites モード
NES は一度に表示できるスプライト数に制限がありました。この制限を超えるスプライトを表示するゲームは、すべてが画面上に残るようスプライトを点滅させていました。NES コアはこの制限を部分的に取り除け、Rygar のようなゲームで画面上のスプライトが多いときの点滅を減らします。点滅するすべてのゲームで効くわけではありません。中には当時の開発者が別の理由で意図的に点滅を入れたものもあります。

### Extra Sprites（点滅抑制）の例動画
![type:video](videos/nes-flicker.mp4)

## パレット
NES コアは内蔵パレットを持ち、カスタムパレットの読み込みもできます。NES には本来のカラーパレットが存在しません。他のコンソールのように赤・緑・青の値で色を出力しなかったためです。エミュレーターには、元の視覚体験にできるだけ近い近似パレットが必要です。テレビによって体験が違うこともあったため、複数のパレットが用意されています。RetroSho の Virtual Boy パレットのような、面白くてバカバカしいパレットも可能です。NES パレットの詳細は [NesHacker によるこの YouTube 動画](https://www.youtube.com/watch?v=7Co_8dC2zb8)をご覧ください（いくつかの細部は技術的に不正確なので、固定コメントも読んでください）。

### パレットの例動画
![type:video](videos/palettes.mp4)

## Famicom Disk System BIOS ブート
[空の FDS boot2.rom をダウンロード](files/boot2.rom){target=_blank}し、`./games/NES/` に置きます。コアを起動すると（FDS BIOS がすでに `boot0.rom` として置いてある前提）、空のディスクが挿さったように FDS BIOS が起動します。

### Famicom Disk System 空ディスクブートの例動画
![type:video](videos/fdsbios.mp4)
