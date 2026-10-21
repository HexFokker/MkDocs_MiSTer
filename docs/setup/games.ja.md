MiSTer でゲームを遊ぶには、microSD カードにゲームを転送します。NAS や USB ドライブから読み込む方法もあります（[高度なネットワークのページ](../advanced/network.md)参照）が、このガイドでは最も基本的な方法だけを扱います。

## games フォルダー
ROM は `/games/` フォルダーに置きます。たとえば NES の ROM は `/games/NES` です。各コアは決められたフォルダーから ROM を探すので、正しい場所に入れておくのが一番です。

## ファイル形式

* **CD イメージ** は CUE/BIN または CHD 形式で、zip には入れられません。他の ROM とは扱いが異なります。CD ゲームはタイトルごとに専用フォルダーに入れ、複数ディスクのゲームは全ディスクを同じフォルダーにまとめます（例：`Final Fantasy VII` のディスク1〜3を1つの `Final Fantasy VII` フォルダーに）。こうするとコアをリセットせずにディスク交換でき、PSX コアではセーブがディスクをまたいで引き継がれます。詳しくは [CD ベースのゲーム](../basics/cd.md)を参照。
* **VHD（仮想ハードドライブ）ファイル** も zip 化してはいけません。
* **その他の ROM** は zip に入れて構いません。コア側で対応する拡張子が表示されます。ROM が読み込めない場合、そのコアで使えるファイル形式はコアの readme（GitHub または `/games/$CORE/` フォルダー内）に書かれているはずです。

## FTP/SFTP/SCP でネットワーク経由の ROM 転送
MiSTer には FTP と SSH サーバーが標準で有効になっています。接続方法は [ネットワークアクセス](../advanced/network.md#network-access)を参照してください。

## Samba/SMB でネットワーク経由の ROM 転送
MiSTer には Samba サーバーも付属しています。有効化すれば、MiSTer の SD カードがネットワーク上の普通の共有フォルダーのように見えます：

1. Menu コアの Scripts メニューで `samba_on` を実行します。
2. Windows では、エクスプローラーのアドレスバーに `\\MiSTer\sdcard\` と入力して Enter。Linux や macOS では、普段ネットワーク共有にアクセスしている方法で開きます。

![MiSTer FPGA Samba Server File Explorer](img/samba.png)

この例では、NES コア用に `/games/NES/` フォルダーへ ROM をコピーしています：

![ROM Transfer to MiSTer FPGA folder from Windows](img/rom-transferred.png)

## microSD カードに直接 ROM を転送する
MiSTer の電源を切って microSD カードを抜き、コンピューターに挿す方法もあります。カードには "MiSTer" という exFAT パーティションがあり、ほとんどの OS で読み書きできます。

ゲームをカードに入れたら、次のステップへ：[ゲームを遊ぶ](play.md)。
