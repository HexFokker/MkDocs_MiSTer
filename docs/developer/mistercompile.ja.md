MiSTer は複数のコンパイル済みコンポーネントを組み合わせています。カスタマイズされた最小限の Linux カーネル、ブートローダー、C++ で書かれた Main MiSTer バイナリー、そして VHDL、Verilog、SystemVerilog で MiSTer フレームワーク上に構築されたコアです。フルスタックのコンパイルには多様なツールが必要です。

## MiSTer FPGA コアのコンパイル

現在、MiSTer FPGA コアの大多数は Quartus 17.0.2 でコンパイルしています。Windows と Linux のダウンロードリンク：

| ダウンロード URL                                                                                                                           | SHA1 チェックサム                          |
|----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| [Linux](https://download.altera.com/akdlm/software/acdsinst/17.0std.2/602/ib_tar/Quartus-lite-17.0.2.602-linux.tar){target=_blank}     | `02aebab728d54e3ca8660d2646fdf93bc669b0ac` |
| [Windows](https://download.altera.com/akdlm/software/acdsinst/17.0std.2/602/ib_tar/Quartus-lite-17.0.2.602-windows.tar){target=_blank} | `01d1f9cea037cf4b8c666da1193f94ba626b6fb3` |

Linux 版は Ubuntu 18.04 LTS 向けです。より新しいバージョンや他のディストリビューションを使う場合、不足する依存関係を別途ダウンロードする必要があるかもしれません。

コンパイルしたい MiSTer コアの `.qpf` ファイルを Quartus で開き、Compile（再生ボタン）を押します。

## ARM クロスコンパイルの一般的な前提条件

これらの前提条件の一部だけが厳密に必須です。このガイドは WSL2 上の Ubuntu 20.04.5 LTS でテストしました。他のディストロでも動くかもしれませんが、結果は環境によります。Main MiSTer バイナリーと Linux カーネルのコンパイルに必要な前提条件は次のようにインストールします：

```sh
sudo apt update && sudo apt upgrade -y
sudo apt-get install build-essential git libncurses-dev flex bison openssl libssl-dev dkms libelf-dev libudev-dev libpci-dev libiberty-dev autoconf liblz4-tool bc curl gcc git libssl-dev libncurses5-dev lzop make u-boot-tools libgmp3-dev libmpc-dev
```

64ビット x86 ベースのシステムで ARM バイナリーをコンパイルするための正しいクロスコンパイラーをダウンロード：

```sh
wget -c https://developer.arm.com/-/media/Files/downloads/gnu-a/10.2-2020.11/binrel/gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf.tar.xz
```

このアーカイブを適当な場所に展開します。PATH に追加するため、ここでは `/opt` に展開：

```sh
sudo tar xf gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf.tar.xz -C /opt  # または自分の所有するディレクトリーに展開
```

コンパイルのたびにこれを一時的に PATH に追加：

```sh
export PATH=/opt/gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf/bin:$PATH
```

**注意：** WSL2（著者の環境）では、ログアウト後にこれらの export コマンドを再実行する必要があるかもしれません。あなたの環境では違うかもしれません。永続的に設定する方法もありますし、`make` にパラメーターとして渡すこともできます（例：`PATH=/opt/gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf/bin:$PATH make -j30`）。

## Main MiSTer バイナリー

Main MiSTer バイナリーはこのガイドの良い出発点です。

### Linux（WSL 含む）

Main_MiSTer リポジトリーをクローン：

```sh
git clone https://github.com/MiSTer-devel/Main_MiSTer.git
```

作成されたディレクトリーに `cd` して `make` を実行。

### macOS

Apple Silicon では、一般的に使われるツールチェーンが x86_64 向けにビルドされているため直接実行できません。

Main MiSTer リポジトリーには [devcontainer 設定](https://github.com/MiSTer-devel/Main_MiSTer/tree/master/.devcontainer){target=_blank}が含まれているため、[devcontainers 対応の IDE](https://containers.dev/supporting){target=_blank}を活用できます。

十分な RAM を確保しないと[切断](https://code.visualstudio.com/docs/remote/troubleshooting#_troubleshooting-hanging-or-failing-connections){target=_blank}が発生します。[Colima](https://github.com/abiosoft/colima){target=_blank} の場合、MiSTer を速くコンパイルするには以下で十分なようです： 
```
colima start --cpu 4 --memory 8
```

devcontainer のセットアップ後は、前と同様に `make` を実行できます。
