MiSTer の用語で「コア」とは、FPGA が現在シミュレートするよう設定されているシステムのことです。デフォルトでは、電源投入時に FPGA は "Menu" コアとして設定されます。OSD を開いて `_Console` → `NES` と選べば、FPGA は "NES" コアとして再設定されます。

ハードウェア記述言語（HDL）の開発者は、FPGA に書き込まれるもの全般を「コア」と呼びます。たとえば MiSTer FPGA フレームワークは Intel の "Altera PLL Core" を使っています。これは開発者がチップのクロック速度を設定できる、移植可能なロジックの塊です。HDMI コア、Ethernet コア、シリアルデータコアなどがあります。

ただし MiSTer でコアと言えば、エミュレートされるシステムのことです。[PSX（PlayStation）コア](https://github.com/MiSTer-devel/PSX_MiSTer){target=_blank}、[Minimig（Amiga）コア](https://github.com/MiSTer-devel/Minimig-AGA_MiSTer){target=_blank}、[SNES コア](https://github.com/MiSTer-devel/SNES_MiSTer){target=_blank}など多数あります。

## コアを読み込むと何が起きる？

コアを読み込むたびに、別のコンソール・コンピューター・アーケードシステムをテレビに繋ぎ替えていると想像してください。メニューで Genesis コアを選んで読み込むと、ケーブルを繋ぎ直す手間なく、実質的に Genesis をテレビに接続したことになります。実際に起きているのは、`.rbf` ファイルが FPGA チップを再プログラムすることです。NES 用のデジタルロジックが Genesis 用のデジタルロジックに置き換わります（どちらも MiSTer FPGA コアコンポーネントと結合されます）。

この繰り返しの書き換えが FPGA の寿命を縮めるのでは、と心配になるかもしれません。心配は無用です。このような SRAM ベースの FPGA は書き込み回数に制限がないと考えられており、同じ領域への数百万回の書き換えも普通です。

## コアの更新と不具合

MiSTer のコアは、長年にわたり複数の先行オープンソースプロジェクトをまたぐ、多くの人々のコラボレーションの成果です。ほとんどのコンソール・コンピューターコアは、音声キャプチャ比較など高精度な方法で実機と比較済みで、残っている少数の問題は各 GitHub リポジトリーページに文書化されています。issue を立てる前に、該当コアのページを確認してください。

コアリポジトリーの一覧は [MiSTer FPGA GitHub Organization](https://github.com/MiSTer-devel){target=_blank} を参照。各コアのページから、リリースフォルダー、Issues ページ、README（理想的にはそのコアの全機能と制限が詳しく記載されています）へ辿れます。

他にも非公式の MiSTer FPGA コアは存在しますが、ここには載せていません。正しく動かない可能性があり、リストも常に変わっているためです。
