---
hide:
  - toc
---


MiSTer の構成は、Terasic 製の DE10-Nano ボードに複数の[拡張ボード](../basics/addons.md)を組み合わせたものです。

## 完成品キットとクローン

これまでに、市場には2種類のハードウェアが登場しています：

- 完成品キット（DE10-Nano ベース）
- DE10-Nano のクローン[^1]（およびそれを使った完成品キット）

このガイドでは各選択肢とそのトレードオフは扱いません。MiSTer は DE10-Nano ボードと以下の構成で設計・テストされています。

[^1]: クローンボードは MiSTer プロジェクトとの互換性を目指していますが、ハードウェアの細かな差異によって時折非互換が起きることがあります（修正は可能ですが、MiSTer プロジェクトの範囲外です）。互換性とサポートについては各販売元にお問い合わせください。

## ゼロから組み立てる

MiSTer のセットアップに必要なもの：

* Terasic DE10-Nano
* microSD カード（4 GB 以上）と microSD カードリーダー
* USB OTG アダプター、または [MiSTer USB Hub 拡張ボード](../basics/addons.md#usb-hub-addon-board){target=_blank}（これがないと USB 機器は一切動きません）
* USB キーボード
* HDMI 対応ディスプレイと HDMI ケーブル

推奨：

* [MiSTer SDRAM 拡張ボード](../basics/addons.md#128mb-sdram-addon-board){target=_blank}（任意ですが、多くのコアで必須）
* USB ゲームパッド
* FPGA 用の冷却
* インターネット接続（初回アップデートに必要）

### 購入先
**DE10-Nano：**

* [Terasic](http://de10-nano.terasic.com){target=_blank}
* [Digikey](https://www.digikey.com/en/products/detail/terasic-inc/P0496/6817231){target=_blank}
* [Mouser](https://www.mouser.com/ProductDetail/Terasic-Technologies/P0496?qs=sGAEpiMZZMug%252BNZZT2EIMybLXjFfYtXHeZj9cpOi%2FsY%3D){target=_blank}

**SDRAM：**

MiSTer SDRAM 拡張ボードは、SNES・NES・PlayStation・Game Boy など多くのコアで必要になります。複数の販売店で扱っており、はんだ付けが得意なら自作も可能です。

**USB OTG アダプター／ハブ：**

MiSTer USB Hub 拡張ボードが推奨です。はんだ付けに自信があれば自作もできますし、[販売店から購入](../basics/addons.md#where-to-buy){target=_blank}することもできます。

とにかく安く済ませたい場合は、[MakerSpot Micro USB OTG Hub](https://www.amazon.com/MakerSpot-Accessories-Charging-Extension-Raspberry/dp/B01JL837X8){target=_blank} が最低限の選択肢として十分に機能します。

**冷却：**

DE10-Nano のプロセッサーは 21.5 mm × 21.5 mm なので、そのサイズ前後のヒートシンクが適しています。大きめのヒートシンクを使う場合は、プロセッサー以外の部品に触れないよう注意してください。

ヒートシンクを固定する機構はありません。「放熱両面テープ（adhesive thermal pad）」を使ってください。3M 製のものが品質が良く、このサイズのヒートシンクには通常付属しています。

強く押し付けないこと、部品に指で直接触れないこと。静電気で破損する恐れがあります。
