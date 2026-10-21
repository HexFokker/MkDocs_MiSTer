# コンピューターコアのインターネット・コンソール接続

2018年5月7日のリリース以降、MiSTer は FPGA から Linux へのシリアル（UART）接続に対応しています。Linux はこの接続上で PPP またはコンソールデーモンを動かし、FPGA コアからインターネットや Linux シェルへアクセスできます。

## シリアル接続対応コア

* **Minimig**。[Roadshow TCP/IP](https://misterfpga.org/viewtopic.php?f=4&t=2063&p=18598&hilit=Roadshow#p18598){target=_blank}、AmiTCP、Miami でテスト済み。対応速度は 115200 または 230400 ボー。OSD 設定は必ずお使いの TCP/IP スタックと一致させてください！
    * AmiTCP は ftpd デーモンを含むより完全なソリューションで、多くの他社製アドオンもこれをベースにしています。おすすめのパッケージです。
    * Roadshow も非常に良く動き、AmiTCP と完全互換で追加の拡張もあります。完全なセットアップはこれらの[手順](https://misterfpga.org/viewtopic.php?f=4&t=2063&p=18598&hilit=Roadshow#p18598){target=_blank}に従ってください。現在も有償のサポート付き製品です。詳細は[こちら](http://roadshow.apc-tcp.de/index-en.php){target=_blank}。
    * Miami もテスト成功。動作した Miami 設定：serial.device 経由の PPP 接続を使い、ボーレートは 115200 または 230400、RTS/CTS をオン、8N1 を有効。モデムタイプは null modem に。LAN に適した末尾 254 の IP（例：192.168.1.254）を手動で入力。DNS サーバーも手動で追加（例：Google DNS の 8.8.8.8）。コンソール接続のテストには Term v4.7 を使用。より詳しい MiamiDX セットアップガイドは[こちら](https://www.geocities.ws/allforamiga/){target=_blank}。

* **ao486**。DOS 上で PPP とシリアル接続が動作し、mTCP と各種ターミナルソフトでテスト済み。PPP は Win3.11/Win95/Win98/NT 4.0 でも動作します。
DOS ツールはこちら：[dos_ftpd.zip](https://github.com/MiSTer-devel/ao486_MiSTer/raw/master/sw/dos_ftpd.zip){target=_blank}。付属の DOS FTP サーバーはパッシブモード非対応なので、クライアントはアクティブに設定してください。
* **PC XT**。DOS 上で PPP とシリアル接続が動作し、mTCP/DOS PPP と各種ターミナルソフトでテスト済み。
* **C64**。シリアル接続。
* **Tandy Color Computer 3 (CoCo3)**。シリアル接続。
* **Macintosh Plus**。シリアルと PPP 対応。
* **AtariST**。シリアルと PPP 対応。
* **Apple IIe**。シリアル接続。

これらのコアでは OSD に PPP と Console を切り替えるオプションがあります。
コンソールも PPP も、安定のためハードウェア RTS/CTS フロー制御付きの 115200 ボー、8N1 モードを使います。

## コンソール接続

この接続と対応ターミナルアプリケーションを FPGA コア上で使うと、Linux シェルにアクセスしてファイル管理や必要に応じた Linux 設定調整ができます。

Linux 側の特別な設定は不要です。

## PPP 接続 { #ppp-connection }

この接続で、コアはインターネットにアクセスできます。さらに重要なのは、コアが FTP デーモンを動かしてファイルシステムを公開できること。PC の FTP クライアントでエミュレートされたシステムとファイルをやり取りできます。

PPP デーモンは **/media/fat/linux/ppp_options** ファイル（PC からは `linux\ppp_options`）を使います。おそらく変更不要です。最近の更新で IP は自動割り当てになりました。コアは `<your_net>.254` の IP（例：192.168.1.254）を取得します。別の IP が欲しい、またはルーターがすでに .254 を使っている場合は ppp_options ファイルを変更してください。ファイル末尾の最終行のコメントを外して編集します：
```ini
# You may explicitly define local and remote IPs for PPP link.
# new MiSTer releases don't require it anymore.
# IPs entered here will override automatically assigned IPs.
#192.168.1.1:192.168.1.10
```

PPP を正しく動かすには、他のコアを起動する前に Menu コアでネットワークアイコンが見えていることを確認してください。見えないと PPP リンクが IP を取得しません。コアがすでに起動していた場合は、PPP に接続してから切断すれば、次の接続で正しい IP が取れます。OSD で UART モードを切り替えて IP を更新することもできます。

以下のすべての PPP ガイドは同じ最初のステップから始まります。MiSTer システムメニュー（++win+f12++）で "Uart Connection" を "PPP"、Baud を "115200" に設定して保存します。

### MS-DNS 設定 { #ms-dns-configuration }

Windows 95/98/NT は PPP 接続で DNS を自動取得せず、OS 側か MiSTer の SD カード上の `ppp_options` ファイルで手動設定が必要です。
後者が良い方法で、複数の Windows マシンを自動設定できます。

1. 有効な DNS サーバーアドレスを取得：
    * MiSTer または同じネットワークの他の Linux 機器で `cat /etc/resolv.conf | awk '/nameserver/ {print $2}'` を実行し、自動設定された DNS サーバーアドレスを取得
    * 同じネットワークのモダンな Windows 機器で `ipconfig /all` を実行し、出力の `DNS Servers` から自動設定されたアドレスを取得
    * あるいは、名前解決時間は長くなりますがパブリック DNS サーバー（`8.8.8.8`、`8.8.4.4`、`9.9.9.9`、`1.1.1.1` など）を使用
2. MiSTer SD カードの `ppp_options` を開いて編集：
    * MiSTer からアクセスする場合は `/media/fat/linux/ppp_options`
    * SD カードを別の機器に挿してアクセスする場合は `linux/ppp_options`
3. 取得した DNS サーバーアドレスで ms-dns エントリーを指定：
    * ms-dns 行の先頭の `#` を外してコメント解除
    * IP アドレスをステップ1で取得した有効な DNS サーバーアドレスに変更
    * たとえば DNS サーバーが `10.0.0.138` なら、`ppp_options` はこうなります：
   ```ini
   # Specify which DNS Servers the incoming Win95 or WinNT Connection should use
   # Two Servers can be remotely configured
   ms-dns 10.0.0.138
   # ms-dns 192.168.1.2
   ```

### ao486 の MS-DOS での PPP 接続 { #ppp-connection-in-ms-dos-on-ao486 }

1.  DOS PPPD ドライバーをダウンロード：DOSPPP06.ZIP（[こちら](https://www.ibiblio.org/pub/micro/pc-stuff/freedos/files/net/dosppp/){target=_blank}）。
2.  Michael Brutman 氏の MS-DOS 用 mTCP TCP/IP アプリケーション最新版を 'Downloads' セクションから入手（[こちら](http://www.brutman.com/mTCP/){target=_blank}）
3.  これらの zip ファイルを ao486 の仮想ハードドライブに転送し、任意のディレクトリーに解凍（例：C:\NETWORK）
4.  コア上の MS-DOS で mTCP 設定ファイルを編集。SAMPLES ディレクトリーの `sample.cfg`（先頭に MTCPSLIP 行を追加する必要あり）か、次の例（インストールフォルダーの `mtcp.cfg` というシンプルなテキストファイル）を使います：
```ini
SET MTCPSLIP=true
mtu 1500
packetint 0x60
hostname ao486_fpga
IPADDR 192.168.1.254 <- Change this to reflect your network. Only the first three octets (e.g. 192.168.1), the last .254 is the default IP assigned to the core !!!
NETMASK 255.255.255.0
GATEWAY 192.168.1.1 <- Change this to reflect your network.
NAMESERVER 8.8.8.8 <- You can change this to reflect your network if you want to.
LEASE_TIME 86400
IRCJR_USER FPGA_User
IRCJR_NICK fpga_user
IRCJR_NAME FPGA_User
```
5. AUTOEXEC.BAT を編集し、インストールフォルダーへのパスと MTCPCFG 変数を追加：
```bat
PATH C:\DOS;C:\NETWORK
SET MTCPCFG=C:\NETWORK\MTCP.CFG
```
6. DOS PPPD ドライバーアーカイブに含まれる ppp パケットドライバーを読み込み：
```bat
epppd com1 115200 local
```
7. MS-DOS 使用しながら telnet、FTP、IRC などのインターネットアプリをお楽しみください。telnet クライアントで telnet BBS を使う場合は、CONFIG.SYS で ANSI.SYS を読み込んでおいてください。元の議論は[こちら](https://misterfpga.org/viewtopic.php?t=896){target=_blank}。

### ao486 の Windows 3.11 での PPP 接続

1. Trumpet Winsock PPP クライアントを入手
    * ソフトウェアをダウンロード。新しいバージョンもありますが注意：**バージョン 3.0 のみ動作します**。
        * [Trumpet Winsock 3.0](https://winworldpc.com/product/trumpet-winsock/3x){target=_blank}
2. ソフトウェアのライセンス。現在も（期限付き）シェアウェアです。ライセンスを取得したら、Tcpman の "Special" メニューにある "Password registration" に詳細を入力。
3. ソフトウェアの設定  
    * Tcpman を起動
    * File-->PPP Options ですべてのチェックボックスを外し、テキストボックスを空にします。
    * File-->Setup で、LAN に適した "IP Address"（例：192.168.1.254）と "DNS Server(s)"（例：192.168.1.1）を入力
        * Driver セクションで PPP ラジオボタンを選び、"Dialer settings..." をクリック  
    * "Dialer settings..." で
        * "COMM port" COM1  
        * "Baud rate" 115200

### ao486 の Windows 95/98 での PPP 接続 { #ppp-connection-in-windows-9598-on-ao486 }

1. [こちら](https://github.com/MiSTer-devel/ao486_MiSTer/blob/master/releases/drv/modem9x.inf){target=_blank}からモデムドライバーを入手し、VHD またはフロッピーイメージに転送
    * Windows 95 の Start ボタン → Settings → Control Panel。"Add New Hardware" をダブルクリック
    * Windows が新しいハードウェアの検索を提案したら "No" を選択。Next を押し、次のページで Modem を選択。
    * "Don't detect my modem" にチェックし、次のページで "Have Disk"。modem9x.inf の場所へ移動してインストール。
2. Dial-Up Networking をインストール：
    * Start ボタン → Settings → Control Panel。"Add/Remove Programs" をダブルクリック。
    * Windows Setup タブをクリック。Communications を選択。Details を押し、Dial-Up Networking を選んで OK。
    * OK で Windows Setup ダイアログを閉じる。Dial-up networking が "My Computer" にできたはずです。
3. ダイヤルアップ接続を作成
    * My Computer → Dial-Up Networking を開き、Make New Connection をダブルクリック。
    * 好きな名前を付け、必ず Generic NULL Modem を選択。電話番号は何でも構いません。Next、Finish。
    * 新しい接続を右クリック → Properties：
        * **General** タブ - Generic Null Modem が選択され、COM 1、115200 ボーに設定されていることを確認
        * **Server Types** タブ - "PPP: Windows 95, Windows NT 3.5, Internet" を選択し、TCP/IP 以外すべてのチェックを外す
    * OK を押し、ダイヤルアップ接続をダブルクリックして接続。Win95/98 で PPP 接続が動くはずです。
4. **重要：** Windows 95（および Windows NT）は次のいずれかをしないと DNS を自動取得しません：
    * 上記 Server Types タブの TCP/IP Settings をクリックし、静的なネームサーバーを設定（ルーターの内部 IP。通常 .1。または Google の 8.8.8.8 のようなパブリック）
    * `ppp_options` の "ms-dns" 行を編集。[MS-DNS 設定](#ms-dns-configuration)参照

### ao486 の Windows NT 4.0 での PPP 接続

Windows NT 4.0 と PPP の完全なインストールガイドは [MiSTerFPGA フォーラム](https://misterfpga.org/viewtopic.php?t=4400)にあります：

1. [上記](#ppp-connection)の通り UART 接続を 115200 ボーの PPP に設定。**重要：Turbo ではなく普通の 115200！**
2. 上記の [Windows 95/98 ガイド](#ppp-connection-in-windows-9598-on-ao486)と同じ modem9x.inf ドライバーを入手し、VHD またはフロッピーイメージに転送
3. Windows NT 4.0 CD-ROM イメージをマウント 
4. My Computer を開き Dial-Up Networking をクリック。促されたら CD-ROM の /i386 フォルダーへ移動。そこに "rascfg" ファイルとセットアップに必要な残りがあります。
5. セットアップ中、**Remote Access Setup** がモデムの追加を求めたら **Yes**、次の画面で **"Don't detect my modem..."** にチェック。次の画面で **"Have disk"** をクリックし、modem9x ドライバーの場所を指定。
6. そこから先、セットアップは **Generic null modem** の使用を促します。**OK**、**Continue**、促されたら **TCP/IP** のみにチェック、再び **Continue**。セットアップの途中で再起動を求められます。
7. Dial-Up Networking インストール後、起動のたびに Event Error が出ます。PPP は壊れませんが、Service Pack 6 を再実行（misternt.iso CD-ROM をマウントして sp6ai386 を実行）し、再度促されたときに再起動すると消えます。
8. New Phonebook Entry Wizard が現れます。接続に名前を付け、"I know all about phonebook..." ボックスにチェックして完了へ進みます。番号は何でも構いません（例では 555-1234）。
9. **More** をクリックし **Edit entry and modem properties**
    * **Basic** タブ - "Dial using" が Generic NULL modem（COM1）、速度 115200 に設定されていることを確認
    * **Server** タブ - TCP/IP 以外すべてのチェックを外す。Dial up server type は "PPP: WinNT, 98 Plus, Internet"
10. **重要：** Windows NT（および Win95）は次のいずれかをしないと DNS を自動取得しません：
    * 上記 Server タブの TCP/IP Settings をクリックし、静的なネームサーバーを設定（ルーターの内部 IP。通常 .1。または Google の 8.8.8.8 のようなパブリック）
    * `ppp_options` の "ms-dns" 行を編集。[MS-DNS 設定](#ms-dns-configuration)参照

### PC XT の MS-DOS での PPP 接続

上記の [ao486 の MS-DOS](#ppp-connection-in-ms-dos-on-ao486) 手順に従いますが、2点違います：

* XT コアの PPP 接続は COM 1 ではなく COM 2 シリアルポートを使うため、パケットドライバーは `epppd com2 115200 local` で読み込みます。
* `mtcp.cfg` では、コアに適したホスト名を使ってください（例：`hostname PCXT_fpga`）。

## シリアル（モデム）接続

C64、CoCo3、Apple IIe コアは、MiSTer のモデムエミュレーション（"Uart Connection" を "Modem" に設定）経由で telnet BBS に接続できます。

### C64 でのシリアル接続

カスタムカーネルはこれに必要な機能を削除していることがあります。迷ったら内蔵カーネルを使ってください。

Striketerm 2014 と VIC-1011 2400 ボーモードで BBS に接続する例：

1. C64 コアを起動。
2. MiSTer C64 メニュー（++win+f12++）で "Hardware" へ行き、"Expansion" を "RS232"、"RS232 Connection" を "Internal"、"RS232 mode" を "VIC-1011" に設定して保存。
3. MiSTer システムメニュー（++win+f12++）で "Uart Connection" を "Modem"、Link を "TCP"、Baud を "2400" に設定して保存。
4. [こちら](https://csdb.dk/release/?id=130807){target=_blank}にある d64 から Striketerm 2014 を読み込み。
5. "Main Menu"（++f1++）はデフォルトのまま、2400 ボーで動いていることを確認。
6. "address book"（++f5++）に BBS を保存。[こちら](http://cbbsoutpost.servebbs.com){target=_blank}で探せます。
7. ゆっくりと BBS を巡りましょう…

CCGMS Ultimate と UP9600 モードで BBS に接続する例：

1. C64 コアを起動。
2. MiSTer C64 メニュー（++win+f12++）で "Hardware" へ行き、"Expansion" を "RS232"、"RS232 Connection" を "Internal"、"RS232 mode" を "UP9600" に設定して保存。
3. MiSTer システムメニュー（++win+f12++）で "Uart Connection" を "Modem"、Link を "TCP"、Baud を "9600" に設定して保存。
4. [こちら](https://csdb.dk/release/download.php?id=214853){target=_blank}にある d64 から CCGMS Ultimate を読み込み。
5. ++f7++ で設定ページを開き、++m++ でモデムを "UP9600/EZ232" に変更、++b++ でボー速度を "9600" に設定。++s++ で設定を保存。
6. 同じ設定ページから ++a++ で "Phonebook" を開き、[こちら](http://cbbsoutpost.servebbs.com){target=_blank}の BBS アドレスを保存。
7. より高速な BBS 体験をお楽しみください。

### Color Computer 3（CoCo3）でのシリアル接続

UltimaTerm 4.0 で BBS に接続する例：

1. CoCo3 コアを起動（Multi-pak Slot 4 Disk または Slot 2 CoCoSDC を使用）
2. MiSTer システムメニュー（++win+f12++）で "Uart Connection" を "Modem"、Link を "TCP"、Baud を "9600" に設定して保存。
3. [こちら](https://colorcomputerarchive.com/repo/Disks/Applications/Ultimaterm%204.0%20%28Ken%20Johnston%29%20%28Coco%203%29.zip){target=_blank}から入手できる UltimaTerm DSK ファイルをマウント。
4. `LOADM"ULTIMATE` を発行して UltimaTerm を読み込み。
5. ++alt+o++ で "Options" メニューを開き、++m++ で "Modem options" へ。++b++ でボーレートを変更（++left++/++right++ 矢印で値を変える）して 9600 に。残りの設定はデフォルトのまま（ワード長 8、パリティなし、ストップビット 1、デュプレックス full、ターミナルタイプ ANSI）。 
6. ++alt+d++、次に ++f1++ で変更を保存。
7. ++alt+a++ で "Phonebook" を開き、BBS を追加してダイヤル。
8. あるいは `ATDTBBS_Address:port` を発行して直接ダイヤルも可能。UltimaTerm 4.0 の完全なドキュメントは[こちら](https://colorcomputerarchive.com/repo/Documents/Manuals/Applications/Ultimaterm%20v4.0%20%28Ken%20Johnston%29.pdf){target=_blank}。

### Apple IIe でのシリアル接続

Apple IIe はスロット2のエミュレートされた Super Serial Card 経由でシリアル対応しています。理論上は最大 19200 ボーまで使えるプログラムもありますが、この節の著者は 1200 および／または 2400 ボーの方が安定していると感じました。

テスト済みターミナルプログラム：

* ACT - Apple Conference Terminal v.3.0.3 [こちら](https://mirrors.apple2.org.za/ftp.apple.asimov.net/images/communications/Apple%20Conference%20Terminal%20V3.0.3.dsk){target=_blank}
* Practical Peripherals Communication Program for Apple II v.1.01 [こちら](https://mirrors.apple2.org.za/ftp.apple.asimov.net/images/communications/Apple_II_Comm_Program.dsk){target=_blank}

1. Apple IIe コアを起動。
2. MiSTer システムメニュー（++win+f12++）で "Uart Connection" を "Modem"、Link を "TCP"、Baud を "1200" に設定して保存。
3. 上記のどちらかのターミナルプログラムを読み込み。どちらも直感的なメニューと 80 カラムモードがあります。
4. ターミナルのボーレートを先ほど設定したものに合わせます（例：1200 ボー、ワード長 8、ストップビット 1、パリティなし、Super Serial Card スロット2）。
5. ターミナルモードに入り、お気に入りの BBS に ATDT。
