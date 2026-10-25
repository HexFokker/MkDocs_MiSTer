MiSTer でゲームを遊ぶ標準的な方法は microSD カードからです。このガイドではカードへ直接、またはネットワーク経由でゲームをコピーする方法を説明します。NAS や USB ストレージについては[高度なネットワーク](../advanced/network.md)を参照してください。

## games フォルダー
ROM は通常 `/games/` に置きます。たとえば NES の ROM は `/games/NES/` です。各コアが想定するフォルダーを使ってください。

## ファイル形式

* **CD イメージ：** 対応フォーマットはコアによって異なります。CUE/BIN と CHD が一般的ですが、ISO など他の形式を受け付けるコアもあります。CD イメージは ZIP アーカイブに入れられません。マルチディスク対応、フォルダー構成、セーブの扱い、ディスク交換の手順もコアによって異なります。詳しくは [CD ベースのゲーム](../basics/cd.md)とコアの readme を参照してください。
* **VHD（仮想ハードドライブ）ファイル：** ZIP アーカイブに入れないでください。
* **その他の ROM：** 多くの ROM は ZIP アーカイブに入れられますが、アーカイブ対応と必要なファイル構成はコアによって異なります。対応ファイル形式や命名要件は GitHub のコア readme を確認してください。`/games/` 以下の各フォルダーにドキュメントを置くコアもあります。

## FTP/SFTP/SCP でネットワーク経由の ROM 転送
MiSTer には FTP と SSH サーバーが標準で有効になっています。SFTP と SCP は SSH 経由で動作します。接続方法は [ネットワークアクセス](../advanced/network.md#network-access)を参照してください。

## Samba/SMB でネットワーク経由の ROM 転送
MiSTer には Samba サーバーも付属しています。有効化すれば、MiSTer の SD カードがネットワーク上の普通の共有フォルダーのように見えます：

1. Menu コアの Scripts メニューで `samba_on` を実行します。
2. Windows では、エクスプローラーのアドレスバーに `\\MiSTer\sdcard\` と入力して Enter。
3. macOS では、Finder で **移動 → サーバへ接続** を開き、`smb://MiSTer/sdcard` と入力します。Linux では、ファイルマネージャーのネットワーク共有ダイアログで同じ SMB アドレスを使います。

![MiSTer FPGA Samba Server File Explorer](img/samba.png)

この例では、NES コア用に `/games/NES/` フォルダーへ ROM をコピーしています：

![ROM Transfer to MiSTer FPGA folder from Windows](img/rom-transferred.png)

## microSD カードに直接 ROM を転送する
MiSTer の電源を切って microSD カードを抜き、カードリーダーでコンピューターに接続する方法もあります。`MiSTer` という名前の exFAT パーティション内の適切なフォルダーにゲームをコピーし、カードをコンピューターから抜く前に安全に取り出してください。

ゲームをカードに入れたら、次のステップへ：[ゲームを遊ぶ](play.md)。
