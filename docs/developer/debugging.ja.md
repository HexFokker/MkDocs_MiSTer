コア開発中は、Quartus から USB Blaster（JTAG）ポート経由で直接アップロードすると便利です。MiSTer は USB Blaster に対応し、アップロードされたコア用に Linux 部分を自動的に再読み込みします。Linux は再起動が必要なため（安定性向上のため）、起動時間が長くなるのに気づくかもしれません。これは正常です。ブートプロセスを制御するために MiSTer にコンソールを接続しておくことをおすすめします。コアが RBF 形式にコンパイルされ SD カードに置かれたら、読み込みは速くなります。

## Linux での USB Blaster 設定
Linux ではドライバーは不要ですが、デフォルトでは root ユーザーのみがケーブルにアクセスできます。一般ユーザーとして使うには、次の内容の `/etc/udev/rules.d/92-usbblaster.rules` というファイルを追加してください：

```
# USB-Blaster 
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6001", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6002", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6003", MODE="0666"

# USB-Blaster II
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6010", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6810", MODE="0666"
```
