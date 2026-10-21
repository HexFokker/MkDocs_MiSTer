まず、microSD カードにソフトウェアをインストールします。

## Mr. Fusion を microSD カードに書き込む { #flash-mr-fusion-to-your-microsd-card }
Mr. Fusion はコンパクトなイメージで、[balenaEtcher](https://www.balena.io/etcher/){target=_blank}、[Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/){target=_blank}、[Apple Pi Baker](https://www.tweaking4all.com/software/macosx-software/applepi-baker-v2/){target=_blank}、あるいは [dd](https://en.wikipedia.org/wiki/Dd_%28Unix%29){target=_blank} のようなツールで、どんなサイズの SD カードにも書き込めます。

このガイドでは balenaEtcher を使います。[お使いのコンピューター向けの最新リリースをダウンロード](https://www.balena.io/etcher/){target=_blank}してインストールしてください。

次に [Mr. Fusion の最新リリースをダウンロード](https://github.com/MiSTer-devel/mr-fusion/releases){target=_blank}します：

[![Download Mr. Fusion](img/dl-mr-fusion.png)](https://github.com/MiSTer-devel/mr-fusion/releases){target=_blank}

microSD カードをコンピューターに挿し、balenaEtcher を開きます。"Flash from file" を選び、先ほどダウンロードした Mr. Fusion のファイルを指定します。

![Flash from file](img/balena-1.png)

次に、書き込み先として microSD カードを選択します。

![Select target MicroSD](img/balena-2.png)
![Select the right one](img/balena-3.png)

"Flash!" をクリックします。

![Flash that card!](img/balena-4.png)

完了するまで待ちます。

![Successful flash :)](img/balena-5.png)

"Flash complete!" と "1 Successful target" が表示されれば書き込み成功です。失敗した場合はもう一度試すか、カードの不良の可能性を考えて別の microSD カードを試してください。

balenaEtcher を閉じて microSD カードを取り出せます。

## Mr. Fusion で DE10-Nano を起動する
microSD カードを DE10-Nano に丁寧に挿入します（**上に載っている I/O ボードの microSD スロットではありません！**）。

![Location of DE10-Nano MicroSD slot on the bottom](img/de10-nano-microsd.png)

DE10-Nano の電源を入れます。

Mr. Fusion のインストーラーには数分かかることがあります。焦らず待ってください。途中で止めると最初からやり直しになることがあります。

![Running Mr. Fusion](img/run-mr-fusion.png)

砂嵐のような画面の上に MiSTer のオンスクリーンディスプレイ（OSD）が表示されたら、microSD カードへの MiSTer ソフトウェアのインストールは完了です。

![Fuzzy Static Displaying Away!](img/static-menu.png)

サイドバーの次のチュートリアルに進んでください。
