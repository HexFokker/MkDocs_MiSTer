MiSTer は Bluetooth アダプターと Bluetooth 接続のコントローラーに対応しています。

## 対応アダプター

一般的に、Bluetooth 4.0 アダプターの多くは CSR8510 または BCM20702 という似たチップのどちらかを使っており、どちらも対応しています。Bluetooth 5.0 アダプターは少し事情が違いますが、多くはやはり動きます。動作確認済みのアダプター：

* [ASUS USB-BT500 (5.0)](https://www.amazon.com/dp/B08DFBNG7F){target=_blank}
* [Edimax BT-8500 (5.0)](https://www.amazon.com/Edimax-BT-8500-Bluetooth-Supports-Controllers/dp/B08M1VJHVD/){target=_blank}
* [MiSTerAddons.com's Bluetooth 4.2 / WiFi AC600 Combo Adapter](https://misteraddons.com/collections/parts/products/wifi-bt-usb-adapter){target=_blank}
* [MiSTerFPGA.co.uk's CSR8510 Bluetooth 4.0 Adapter](https://misterfpga.co.uk/product/mister-fpga-bluetooth-adapter-dongle/){target=_blank}
* [MiSTerKits.com's CSR8510 Bluetooth 4.0 Adapter](https://www.misterkits.com/products/mister-bluetooth-adapter){target=_blank}
* [ZEXMTE Long Range USB Bluetooth (5.0)](https://www.amazon.com/ZEXMTE-Bluetooth-Adapter-Keyboard-Headphones/dp/B09D7W918Q){target=_blank}

これ以外にも多くのアダプターが動き、ほとんどは問題なく動作するようです。ただし、ここに挙げた機種でもハードウェアリビジョンによって互換性が変わることがあるため、結果は異なる場合があります。

## Bluetooth コントローラー／キーボードのペアリング方法

1. ペアリング画面を開く：MiSTer に繋いだキーボードで ++f11++ を押すか、Digital I/O／Analog I/O ボードがある場合は OSD ボタンを長押しします。
2. コントローラーをペアリングモードにして待ちます。MiSTer が検出して数秒以内に接続するはずです。
3. 有線で使ったことがあるコントローラーでも、入力の再定義が必要になることがあります。Bluetooth 経由では MiSTer に別のコントローラーとして認識されるためです。

## Bluetooth 接続が不安定？

Bluetooth 接続が不安定な場合（たとえばコントローラーがランダムに切断される）、USB 延長ケーブルやピグテールアダプターで Bluetooth アダプターを USB ハブから離してみてください。ユーザーによっては、USB ハブが干渉を起こし、場合によっては ASUS USB-BT500 など特定のアダプターを乱すことがあります。根本原因は今のところ不明です。
