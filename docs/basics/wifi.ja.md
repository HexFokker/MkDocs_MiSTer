WiFi は任意で、MiSTer では簡単に設定できます。必要なのは対応ドングル、`wifi.sh` スクリプト（Mr. Fusion イメージに付属）、そして WiFi パスワードを入力するためのキーボードだけです。

## 推奨 WiFi アダプター

DE10-Nano にも MiSTer 拡張ボードにも WiFi は内蔵されていないため、対応 USB WiFi アダプターが必要です。すべての機種が対応しているわけではありません。同じ型番でもハードウェアリビジョンで異なることがあります。動作報告のあるアダプター：

* ASUS USB AC53 nano rev A1
* TP-Link AC1300 Archer T3U または Nano AC600 Archer T2U
* CanaKit Raspberry Pi WiFi ドングル
* Edimax EW-7612UAn v2 または EW-7811UN または EW-7822ULC
* Netgear A6100 または A6150
* D-link AC1300 MU-MIMO Wi-Fi Nano USB Adapter DWA-181

ただし、これらのアダプターの新しいハードウェアリビジョンは未対応のことがあるため、結果は異なる場合があります。上級ユーザーであればドライバーを自分でコンパイルすることも可能です。

## スクリプトで WiFi を設定する { #set-up-wifi-with-a-script }

1. OSD（オンスクリーンディスプレイ）の scripts メニューを開く。
2. "wifi" スクリプトを選んで実行。
3. WiFi ネットワークの SSID（WiFi 名）を選択。
4. WiFi パスワードを入力して Enter。
5. 接続され、何かキーを押すよう促されます。

メインメニュー上部に小さな WiFi アイコンが表示されれば接続成功です。設定は保存され、アダプターが挿さっていてネットワークの範囲内であれば MiSTer は自動的に再接続します。

## 手動での WiFi 設定

スクリプトが動かない場合は、手動での設定を試せます。この方法は少し上級者向けなので、試す前にコミュニティに相談するのも手です：

1. Unix/Linux の改行コードに対応したテキストエディターで `/media/fat/linux/_wpa_supplicant.conf` を編集。
2. `put_your_SSID_here` を WiFi の SSID に、`put_your_password_here` を WiFi パスワードに置き換える。
3. 国コードを[お住まいの国に合わせる](https://www.arubanetworks.com/techdocs/InstantWenger_Mobile/Advanced/Content/Instant%20User%20Guide%20-%20volumes/Country_Codes_List.htm){target=_blank}（日本は `JP`）。
4. `_wpa_supplicant.conf` を `wpa_supplicant.conf` にリネーム。
5. MiSTer を再起動。

再起動後、メインメニューの OSD 上部に WiFi アイコンが出るはずです。接続はしばらく待ってください。接続が確立するまで時間がかかることがあります。
