DE10-Nano ボードにはコンソールポートがあります。ネットワーク接続なしで Linux にログインでき、問題の追跡に役立つデバッグ／情報出力も得られます。

下の写真で、ボード右側の **UART-to-USB（USB Mini-B）** コネクターを確認してください：

![UART port location](img/layout_top.jpg)

## Windows で接続
**UART-to-USB（USB mini type B）** コネクター（micro-USB の隣）で DE10-Nano を PC に接続します。PC には仮想 COM ポートとして認識されます。任意のコンソールアプリで接続してください。おすすめは [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html){target=_blank} です。

COM ポート設定を確認：

* 速度（ボーレート）- 115200 bps
* データビット - 8
* ストップビット - 1
* パリティ - なし
* フロー制御 - なし

Windows での接続の短い動画：

![type:video](videos/console-connection.mp4)

## Linux で接続

1. **dialout** グループのメンバーであることを確認。
2. シリアルポートはおそらく **/dev/ttyUSB0**。
3. 設定：`stty -F /dev/ttyUSB0 115200 cs8 -cstopb -parenb -ixoff -ixon`
4. 出力を見ながらファイルにも書き出す：`cat /dev/ttyUSB0 | tee mr.log`

mr.log に画面に出たすべてのコピーが残ります。

## U-Boot コマンドプロンプト

接続した状態で PC キーボードの ESC を押しながら、DE10-Nano の電源を入れるかリブート（リセットボタン使用）すると U-Boot を中断できます。`=>` プロンプトが出たら、カーネルブートオプションなどを編集できます。
