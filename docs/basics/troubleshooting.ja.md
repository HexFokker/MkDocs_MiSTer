## DE10-Nano 上の MiSTer FPGA の正しい DIP スイッチ設定

キーボードなどの低レベルハードウェアが動かない場合、DE10-Nano の DIP スイッチが1つ以上誤って設定されている可能性があります。

### 上段の DIP スイッチ

図のとおりになっているか確認してください：  
![MiSTer FPGA DIP Switches Correct Configuration - Small DIPS - Terasic DE10-Nano](img/dips1.png)

### 下段の DIP スイッチ

I/O ボードが 9.2 ベースの [I/O ボード](../assets/92_io_board.png)と [AV メザニンボード](../assets/92_av_board.png)なら、下段のスイッチは一切設定不要です。フレームワークがこれらのボード構成を自動検出します。それ以前のボードの設定は以下のとおりです。

??? note "9.2 より前の I/O ボード"

    ![MiSTer FPGA DIP Switches Correct Analog I/O board Configuration - Big DIPS - Terasic DE10-Nano](img/dips2.png)

    Digital I/O ボードで 2 枚目の SDRAM モジュールを搭載している場合、上の 2 枚目の写真のように DIP スイッチ SW3 を On（上）にし、残りを Off（下）にします：  
    ![MiSTer FPGA DIP Switches Correct Digital I/O board Configuration - Big DIPS - Terasic DE10-Nano](img/dips3.png)  
    *2 枚目と 3 枚目の写真は [MiSTerFPGA.co.uk](https://misterfpga.co.uk){target=_blank} の Nat 氏提供*

    | ボード      | SW0 | SW1 | SW2 | SW3 |
    | ---------- | --- | --- | --- | --- |
    | Analog I/O  | Off | Off | Off | Off |
    | Digital I/O | Off | Off | Off | On  |

## ゲームパッドが動かない

メニューでゲームパッドが動かない場合は、まず[入力を定義](../setup/controller.md){target=_blank}したか確認してください。メニューでは動くのにコアで動かない場合は、そのコアの2番目の OSD メニューでゲームパッドを定義します。どちらでも動かない場合は、上記のとおり DIP スイッチが正しいか確認してください。

## キーボードが正しく動かない

マクロや RGB イルミネーションが多いゲーミングキーボードの場合、付属電源では電力が足りないことがあります。[Mean Well GST18A05-P1J](https://www.amazon.com/MEAN-WELL-GST18A05-P1J-Desktop-Adaptor/dp/B01LZ0LJXQ){target=_blank} など、電流容量の大きい電源を検討すると直るかもしれません。この [DigiKey の検索結果](https://www.digikey.com/short/33rwd9pm)が必要な仕様の目安になります。一般的には、付属の 2 A を上回る 5 V 電源で、センタープラス・2.1 mm × 5.5 mm × 11.0 mm のバレルプラグが必要です。Mean Well や Triad がよく推奨されますが、取り扱いがなければ他の選択肢でも構いません。

## MiSTer のランプは点くが、HDMI から映像が出ない

MiSTer は起動しているように見えるのに HDMI から映像が出ない場合：

1. ケーブルが正常で、MiSTer 側とディスプレイ側の両方にしっかり接続されているか確認。
2. 念のため別のケーブルを試す。
3. SD カードを抜き差しする。カードが読めないか空の場合、起動が完全に失敗します。

MiSTer が起動できたか確認するには、[SSH または FTP](../advanced/network.md#network-access)で接続を試してください。接続できれば起動しています。

## 証明書がない場合の直し方

`wget` が失敗する場合、セキュリティ証明書ファイルがない可能性があります。デフォルトのシステムには証明書が入っていないため、`wget` は `--no-check-certificate` を付けないと HTTPS でダウンロードできません。証明書をインストールするには：

1. F9 で Linux ターミナルを開き、ユーザー `root`・パスワード `1` でログイン。
2. `cd /etc/ssl/certs`
3. `cp cacert.pem cacert.pem.bak`（既存証明書のバックアップ）
4. `wget --no-check-certificate https://curl.se/ca/cacert.pem -O cacert.pem`

ダウンロードが成功すれば `wget` は普通に動くようになります。

## WiFi で IP アドレスが2つ表示され、インターネットに繋がらない

MiSTer がインターネットに接続できず（たとえばアップデートできない）、`ip addr` で `wlan0` に2つの IP アドレスが表示される場合、これが原因かもしれません。一部の WiFi アダプターは普通の Linux コンピューターでもこうなることがあり、根本的な原因はよく分かっていません。2つのアドレスのうち一方が "APIPA" アドレス（169.254.x.x）の場合、多くのケースでインターネットに接続できません。一時的に直すには、アドレスをフラッシュして新しいリースを要求し、WiFi に再接続します：

`ip addr flush wlan0`

DHCP リースが切れて新しいアドレスが割り当てられると再発することがあります。一般的な家庭用ネットワークでは、DHCP サーバーはルーター／モデムです。

## MiSTer の Linux イメージ破損を直す

microSD カードは時間とともにデータが破損することがあります。まれに MiSTer の Linux ファイルが破損します。次のような低レベルの問題に気づいたら（これらに限りません）：

* HDMI 映像出力が動かなくなった
* USB コントローラーやキーボードすら動かない
* インターネットに繋がらなくなった
* HDMI から音が出ない
* WiFi が動かない

その場合は、Linux ファイルを再ダウンロードして上書きするのが最善です：

1. MiSTer から microSD カードを抜き、PC に挿入。
2. [https://github.com/MiSTer-devel/SD-Installer-Win64_MiSTer](https://github.com/MiSTer-devel/SD-Installer-Win64_MiSTer){target=_blank} から最新の sd-installer リリースアーカイブ（通常はリスト一番下の .7z）をダウンロードして PC で解凍。
3. アーカイブ内の `linux` フォルダーの中身を、microSD カードの `linux` フォルダーに上書きコピー。

これは実質的にアップデートスクリプトの "Linux Update" がやることと同じで、すべてを標準の初期状態に戻すはずです。WiFi を使っている場合は [WiFi のセットアップ](wifi.md)をやり直す必要があるかもしれません。
