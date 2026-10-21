MiSTer には高度なネットワーク機能がいくつかあります。

## ネットワークアクセス { #network-access }
MiSTer ボードにはオンボード Ethernet ポート経由でアクセスできます。**FTP**、**SSH**、**SFTP** サービスが動いています。

ユーザー名: **root**  パスワード: **1**

ネットワーク経由で MiSTer に頻繁に接続するなら、MiSTer の IP アドレスを調べたり覚えたりしなくて済むよう、[ホスト名の設定](#hostname-configuration)を検討してください。

### FTP/SFTP
FTP を使うと、SD カードを抜かずにネットワーク経由で MiSTer へファイルをアップロード／ダウンロードできます。
SFTP は SSH 上で動く類似のファイル転送プロトコルです。すべての FTP クライアントが対応しているわけではないことに注意。

転送は ASCII ではなくバイナリーモードであれば、どんな FTP/SFTP クライアントでも使えます。
ASCII 転送はデータを破壊します。

MiSTer に接続すると、SD カードの内容は `/media/fat` にあります。

対応 FTP クライアントを持っていなければ [FileZilla](https://filezilla-project.org/download.php?type=client){target=_blank} を試してください。
すべてのモダン OS（Linux、macOS、Windows）で堅実な選択肢です。
`2.1.9a` のような古いバージョンの FileZilla は Windows 95/NT3.5+ と互換性があり、[PPP 接続の ao486 コア](computer.md#ppp-connection-in-windows-9598-on-ao486)内でも使えます。

モダン Windows 向けのもう一つの良い FTP クライアントは [WinSCP](https://winscp.net/eng/download.php){target=_blank} です。

いずれかのクライアントをインストールしたら、プログラムを実行して **Site Manager** ダイアログを開きます。

| FTP クライアント | Site Manager の場所                              |
|------------|-------------------------------------------|
| FileZilla  | **File** -> **Site Manager**              |
| WinSCP     | **Tabs** -> **Sites** -> **Site Manager** |

**Protocol** を `FTP` または `SFTP` に設定し、**Host**、**User**、**Password** を入力します。
例：MiSTer の IP アドレスが `192.168.2.8` で `root` としてログインする場合、
**Host** は `192.168.2.8`、**User** は `root`、**Password** はユーザーパスワードです。

オプションで **Default Remote Directory** を `/media/fat` に設定すると、接続後すぐに SD カードが開きます。
同様に **Default Local Directory** をローカルの MiSTer フォルダーに設定できます。

| FTP クライアント | Remote Directory の場所                                                    |
|------------|------------------------------------------------------------------------------|
| FileZilla  | **Site Manager** -> **Advanced** -> **Default Remote Directory:**            |
| WinSCP     | **Site Manager** -> **Advanced** -> **Directories** -> **Remote Directory:** |

**Connect** または **Login** をクリック。これでファイルのアップロード・ダウンロードができるはずです。

### SSH { #ssh }
Secure Shell（SSH）はネットワーク経由でコンピューターを遠隔操作する標準的なネットワークプロトコルで、MiSTer へのリモートテキストターミナルを提供します。

Linux と macOS では、ターミナルを開いて `ssh <user>@<MiSTer IP>` を実行。例：`ssh root@192.168.2.8` で `root` としてログイン。

Windows マシンのコマンドプロンプトに `ssh` がなければ、代わりに [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html){target=_blank} をダウンロードして実行できます。
上記と同じ例で、**Host Name** テキストフィールドに `root@192.168.2.8` と入力します。
**Port** が `22`、**Connection type** が `SSH` になっていることを確認して **Open** をクリック。

パスワードを入力すれば、MiSTer のコンソールと同じようにコマンドを実行できます。

## 共有のマウント
MiSTer は、別のコンピューターやサーバーのネットワーク共有をローカルストレージのようにマウントできます。CIFS と NFS 共有に対応。使うには、次のヘルパースクリプトを `/media/fat/Scripts` にダウンロードしてください。各 `*_umount.sh` スクリプトは共有をアンマウントします。

| 共有タイプ | マウントスクリプト | アンマウントスクリプト |
|------------|--------------|----------------|
| CIFS | [cifs_mount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/cifs_mount.sh){target=_blank} | [cifs_umount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/cifs_umount.sh){target=_blank} |
| NFS | [nfs_mount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/nfs_mount.sh){target=_blank} | [nfs_umount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/nfs_umount.sh){target=_blank} |

`cifs_mount.sh` は共有を `/media/fat/cifs` にマウントし、MiSTer はそこにマウントされたフォルダーを優先します。`nfs_mount.sh` は、microSD カードの `/media/fat` 内の同名フォルダーよりそのフォルダーが優先されるようマウントします。同名フォルダーは見えなくなります。この優先順位の仕組みは[コアのパス](../cores/paths.md)を参照。

### CIFS 共有のトラブルシューティング
[いくつかの未解決のバグ](https://bugzilla.samba.org/show_bug.cgi?id=12783)が原因で、特定のコア（少なくとも ao486 と NeoGeo）と特定の CIFS 共有設定の組み合わせで既知の問題があります。

CIFS 共有からゲームを読み込むと特定のコアが起動しないが、SD や USB からは正常に動く場合、共有で Kernel Oplocks が有効か確認してください。有効なら、次のいずれかを行います：

* 無効にする。
* Samba サーバー上でグローバルに有効にする。
* MiSTer のファイルを、Kernel Oplocks なしの MiSTer 専用共有に移す。

用途に最も合うものを選んでください。多くの NAS 機器には正当な理由で Kernel Oplocks がデフォルト有効になっています。共有が異なるプロトコル（CIFS と NFS など）で使われたり、NAS 上で動くソフトウェア（torrent クライアントなど）から使われたりする際の、ファイル同期不良・破損・データ損失を防ぐためです。

## RetroNAS
Dan Mons 氏のプロジェクト RetroNAS は、レトロゲーム機器との互換性に特化したネットワークアタッチトストレージ（NAS）機器を簡単に構築できます。MiSTer は主要な対象の一つで、非常に良く動きます。必要なのは Raspberry Pi 4 か 5 と外部ストレージドライブだけです。注意：NAS はバックアップではありません！ 重要なデータを NAS だけに置くと失う可能性があります。プロジェクトには簡単な[インストールガイド](https://github.com/danmons/retronas/wiki/Installing-RetroNAS){target=_blank}、[MiSTer 専用手順](https://github.com/danmons/retronas/wiki/MiSTer-FPGA){target=_blank}、[インストール](https://www.youtube.com/watch?v=szA-MSabplc){target=_blank}と [MiSTer FPGA 専用設定](https://www.youtube.com/watch?v=OrTctA-5kqk){target=_blank}の YouTube 動画ガイドがあります。

## Tailscale ネットワーキング

MiSTer を Tailnet に追加すると多くの利点があります。旅行中もゲームのある NAS へのアクセスを維持したり、技術に詳しくない友人の MiSTer を遠隔管理したり、スクリプト実行やコアインストールのためのリモート SSH/SFTP などです。

まだ Tailnet がなければ、[こちら](https://tailscale.com/kb/1017/install){target=_blank}の手順で始めてください。作成したら、少なくとも1台のコンピューター／NAS／スマホを Tailnet に追加しておきます。

MiSTer に Tailscale をインストールするには、[この簡単なスクリプトによる方法](https://github.com/davewongillies/MiSTer-tailscale#setup)を使うか、以下の手動手順に従います。

[Tailscale Package Repository](https://pkgs.tailscale.com/stable/#static){target=_blank}から ARMv7 バイナリーパッケージ（`arm: tailscale_x.xx.x_arm.tgz` のようなもの）をダウンロード。

コンピューターでアーカイブを展開し、ファイル（`tailscaled` と `tailscale`）を MiSTer に SFTP で転送。以下の例は `/media/fat/linux/tailscale/` を使いますが、`/media/fat/` 下のどのディレクトリーでも構いません。パスを適宜調整してください。

MiSTer に SSH で入り、展開した Tailscale ファイルを置いたディレクトリーに移動。起動時の Tailscale 状態を収めるディレクトリーを `mkdir .state` で作成。次のコマンドで Tailscale デーモンを起動：
```
# /media/fat/linux/tailscale/tailscaled --tun=userspace-networking --statedir=/media/fat/linux/tailscale/.state/
```
`--tun=userspace-networking` を付けるのは、MiSTer の Linux カーネルが TUN 対応なしでコンパイルされているためで、ユーザースペースで動かせばデーモンを起動できます。`--statedir=/media/fat/linux/tailscale/.state/` は、OS ルートディレクトリーが読み取り専用でマウントされるコールドブート時のデーモンエラーを防ぎます。

デーモンが起動したら、次のコマンドで MiSTer を tailnet に参加させます：
```
# /media/fat/linux/tailscale/tailscale up --accept-routes
```
`--accept-routes` は、Tailnet 上にサブネットルーターとして設定したマシンがある場合のみ必要です。

このコマンドが終わったら、出力の末尾にある URL をブラウザーに貼り付けて、機器を Tailnet に参加させます。

MiSTer が Tailnet に参加したら、tailscale ディレクトリーに次の内容の `tailstart.sh` ファイルを作成：
```
#/bin/sh

/media/fat/linux/tailscale/tailscaled --tun=userspace-networking --statedir=/media/fat/linux/tailscale/.state/ > /dev/null 2>&1 &
/media/fat/linux/tailscale/tailscale up --accept-routes > /dev/null 2>&1 &
```

ファイルを作ったら、実行：
```
# chmod +x tailstart.sh
```
起動時に Tailscale を動かすには、`/media/fat/linux/` の `user-startup.sh` ファイルを編集し、末尾に次の行を追加：
```
/media/fat/linux/tailscale/tailstart.sh
```

これで再起動のたびに MiSTer が Tailnet に接続します。

## ネットワーク設定と構成
デフォルトでは、MiSTer は `dhcpcd`（`dhcpd` と混同しないこと）を使い、DHCP サーバーからローカルネットワーク IP アドレスを取得します。
強力な DHCP クライアントで設定オプション（`dhcpcd.conf`）はここで網羅しきれないため、
この節では MiSTer でその挙動を変える最も可能性の高い理由だけを扱います。
完全なドキュメントは [dhcpcd.conf (5)](https://man.archlinux.org/man/dhcpcd.conf.5){target=_blank} を参照。

### MAC アドレス設定
MAC アドレス（Media Access Control address）は、すべてのネットワークインターフェースのハードウェアに割り当てられたネットワークアドレスです。
ネットワークスイッチがトラフィックの振り分け先を学習できるようにします。IP アドレスに似ていますが、ハードウェアに静的に割り当てられ、ローカルネットワーク内でのみ意味を持ちます。

IP アドレスと同様、ネットワークが正しく機能するには MAC アドレスも一意でなければなりません。
しかし IP アドレスと違い、DHCP サーバーによる動的割り当てはできません。MAC アドレスは設計上静的です。

[Mr Fusion](../setup/software.md#flash-mr-fusion-to-your-microsd-card) のようなインストーラーの中にはセットアップ時に MiSTer の MAC アドレスをランダム化するものがありますが、毎回同じ MAC アドレスを使うものもあります。
その結果、2台以上の MiSTer がオンボード Ethernet ポートで全く同じ MAC アドレスを持つのはよくあることです。

同じ MAC アドレスの MiSTer が2台、同時に同じネットワーク上にあると、
ネットワークスイッチが誤った MiSTer にパケットを送り始め、接続が失敗することがあります。
幸い、その場合はデフォルトの MAC アドレスを上書きできます。

#### MiSTer の Linux ターミナルにログイン { #log-in-to-the-linux-terminal-on-the-mister }
MiSTer のスタートアップメニューから ++F9++ を押して Linux ターミナルを開き、
root でログイン（デフォルトの認証情報は[ネットワークアクセス](#network-access)参照）。

#### MAC アドレスを変更
`nano /media/fat/linux/u-boot.txt` を実行して u-boot.txt を編集用に開きます。
ファイルには次のような行があるはずです：
```
ethaddr=EA:C8:21:56:E3:43
```

ネットワーク上で同じアドレスの MiSTer がいなくなるよう MAC アドレスを編集します。
MAC アドレスは `00`〜`FF` の範囲の2文字のセットが6つ、`:` 区切りで構成されます。
変更する際は、特別な意味を持つ以下のアドレスを避けてください：

* マルチキャスト（最初のセットが `1`、`3`、`5`、`7`、`9`、`B`、`D`、`F` で終わるアドレス）：
    * ❌ `EB:C8:21:56:E3:43`
    * ✔️ `EC:C8:21:56:E3:43`
* ブロードキャスト（`FF:FF:FF:FF:FF:FF`）
* オールゼロ（`00:00:00:00:00:00`）

完了したら ++Ctrl+o++ で保存し ++Ctrl+x++ で終了、
`reboot` を実行して新しい MAC アドレスで MiSTer を再起動します。

### ホスト名設定 { #hostname-configuration }
`dhcpcd` は、MiSTer が DHCP サーバーに希望の名前を提示するよう設定できますが、デフォルトでは無効です。
有効にすると、IP アドレスを調べる代わりに名前で MiSTer に接続できます。

#### MiSTer の Linux ターミナルにログイン
[上記](#log-in-to-the-linux-terminal-on-the-mister)の通り MiSTer の Linux ターミナルにログイン。

あるいは [SSH](#ssh) でリモートログインもできます。
コマンドを手打ちせずコピペできるため、可能ならこちらが推奨です。

#### ローカルネットワークにトップレベルドメインが割り当てられているか確認
この機能を有効にする前に、
ネットワークルーターがローカルネットワークのトップレベルドメイン（TLD）に対応していることを確認してください。

`dhcpcd -U | less` を実行し、
次のような `domain_name` エントリーが少なくとも1つあるか探します：
```
domain_name=lan
```
`=` の後の値を後のために覚えておき、++Q++ でターミナルに戻ります。
`domain_name` 値が複数見つかったら、すべて覚えてください。
結果に `domain_name` 値がなければ、ルーターがトップレベルドメインを提供していないため、続行する意味がありません。

あるいは、このコマンドで `domain_name` 値を検出・フィルターできます：
```bash
dhcpcd -U 2>/dev/null | grep domain_name= | cut -c13-
```
出力は次のようになります：
```
lan
```

#### DHCP サーバーへの希望名送信を有効化
`nano /etc/dhcpcd.conf` を実行して dhcpcd 設定ファイルを編集用に開きます。

++Down++ を押して次のテキストを探します：
```
# Request a hostname from the network
#option host_name
```
先頭の `#` を外してオプションのコメントを解除し、こうします：
```
# Request a hostname from the network
option host_name
```
完了したら ++Ctrl+o++ で保存し ++Ctrl+x++ で終了。

#### MiSTer の希望名を設定
名前そのものを設定するには `nano /etc/hostname` を実行。
ファイルに1つの単語（おそらく `MiSTer`）があるはずです。
MiSTer に付けたい名前に変更してください。
任意の名前を選べますが、他のネットワーク機器との互換性を最大にするには以下の制約に従ってください：

* 英数字のみ使用（A〜Z。漢字やキリル文字不可）
    * 名前は大文字小文字を区別しません。好きに混ぜて構いません
* 記号（`!`、`?`、`#`、`%` など）、特にピリオド（`.`）を避ける
* 数字（0〜9）で始まる名前を避ける
* スペースや複数単語を避ける
* 合計15文字以内の名前を選ぶよう努力

完了したら ++Ctrl+o++ で保存し ++Ctrl+x++ で終了。

`hostname` を実行して名前が変わったことを確認し、
`reboot` を実行して新しいネットワーク設定で MiSTer を再起動します。

#### 名前変更をテスト
> MiSTer の名前を `timemachine`、トップレベルドメインを `.home` と仮定します。
これらを先ほど見つけたドメインと実際に設定した名前に置き換えてください。

ネットワーク上の別のコンピューターから `ping timemachine.home` を実行。
応答があれば、ローカルネットワーク上で `timemachine.home` で MiSTer に到達できます。先ほど見つけたトップレベルドメインの少なくとも1つで MiSTer にアクセスできるはずです。

### 固定 IP アドレス設定
固定 IP アドレスを設定する前に、本当に必要か考えてください。
固定 IP は同じアドレスが割り当てられた別のネットワーク機器と競合する可能性があり、
ネットワークのサブネット範囲外のアドレスは MiSTer を何にも接続できなくします。
迷ったらまず[ホスト名設定](#hostname-configuration)を試してください。

#### MiSTer の Linux ターミナルにログイン
[上記](#log-in-to-the-linux-terminal-on-the-mister)の通り MiSTer の Linux ターミナルにログイン。

SSH 経由でもできますが非推奨です。IP アドレスが変わると、
MiSTer へのネットワークアクセス（つまり SSH 接続）を失う可能性があります。

#### ネットワークインターフェース名を確認
DE10-Nano の MiSTer には常に少なくとも2つのネットワークインターフェースがあります：

| インターフェース名 | 説明                                                     |
|----------------|---------------------------------------------------------|
| `lo`           | Linux 仮想ネットワークループバックデバイス（関係なし）  |
| `eth0`         | DE10-Nano 内蔵ギガビット Ethernet                       |

この2つのインターフェース名はすべての MiSTer で一貫しているはずです。
ただし、USB ネットワークカードに固定 IP を設定したい場合は、
まず Linux がそのインターフェースに付けた名前を知る必要があります。
`ip link` を実行。出力はこんな感じです：
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 01:02:03:04:05:06 brd ff:ff:ff:ff:ff:ff
```
必要なら代わりに `ip addr` を実行し、各インターフェースに現在割り当てられた IP アドレス（あれば）を確認：
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 01:02:03:04:05:06 brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.221/24 brd 10.0.0.255 scope global dynamic noprefixroute eth0
       valid_lft 40368sec preferred_lft 34968sec
```
MiSTer が認識した USB Wi-Fi および／または Ethernet アダプターごとに追加エントリーがあります。
続行前に、変更したいインターフェース名（大文字小文字を区別）を控えてください。

#### インターフェースに固定 IP アドレスを割り当て

> `eth0` という名前のネットワークインターフェースに固定 IP `192.168.0.128` を割り当てたいと仮定します。
これらの値を、前のステップで得たインターフェース名と設定したい IP アドレスに置き換えてください。

`nano /etc/dhcpcd.conf` を実行して dhcpcd 設定ファイルを開きます。
++Down++ でファイル末尾まで行き、次を入力：
```
interface eth0
static ip_address=192.168.0.128/24
```
これらの行は順序に敏感なので、必ずファイルの一番下に追加してください。
`interface` 行の下の行は、次の `interface` 行までそのインターフェースに適用されます。
最初の `interface` 行より上の行は、すべてのネットワークインターフェースに適用されます。

オプションでインターフェースに任意のオプションの組み合わせを指定できます。便利なもの：

| オプション                    | 説明                                              |
|-------------------------------|---------------------------------------------------|
| `static routers=`             | インターネットへのルーター／ゲートウェイを手動指定 |
| `static domain_name_servers=` | 名前解決する DNS サーバーを手動指定                |
| `ntp_servers=`                | 時刻取得する NTP サーバーを手動指定                |

これらを指定したインターフェース設定の例：
```
interface eth0
static ip_address=192.168.0.128/24
static routers=192.168.0.1
static domain_name_servers=8.8.8.8 1.1.1.1
ntp_servers=192.168.0.1 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org
```

完了したら ++Ctrl+o++ で保存し ++Ctrl+x++ で終了。
`reboot` を実行して新しいネットワーク設定で MiSTer を再起動します。

#### DHCP の再有効化
固定 IP 設定が動かない、または自動 DHCP に戻したい場合は、
`/etc/dhcpcd.conf` を再び開き、戻したい各行の先頭に `#` を付けます。
コメントアウトは削除と同等ですが、気が変わったとき後で復元できます。

すべての設定を戻すには、追加したすべての行を次のようにコメントアウト：
```
#interface eth0
#static ip_address=192.168.0.128/24
#static routers=192.168.0.1
#static domain_name_servers=8.8.8.8 1.1.1.1
#ntp_servers=192.168.0.1 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org
```
前と同じく：ファイルを保存して再起動すれば新しい設定が適用されます。
