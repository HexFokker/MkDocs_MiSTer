**注意：** このコアは、Nukeykt 氏によるデキャップチップ解析から開発された新しいハードウェア正確な MegaDrive コアに置き換わりつつあります。ターボとスプライト制限機能は現在 MegaDrive コアでは使えません。

Genesis コアは [fpgagen](https://github.com/Torlus/fpgagen){target=_blank} コアの MiSTer への移植で、大幅な機能強化と追加がされています。オーディオフィルタリングオプションは [MDFourier](https://junkerhq.net/MDFourier/){target=_blank} による実機計測に基づいて調整されています。

## 機能

* Composite Blending エフェクト（例：Sonic の滝の透明表現）
* CPU Turbo オプション（例：Road Rash のゲームスピード）
* スプライト制限の緩和
* Model 1、Model 2、Minimal、No Filter のオーディオフィルタリングオプション
* YM2612（Model 1）／YM3438（Model 2/3）FM 音源の切り替え
* マルチタップ：4-way、Team Player、J-Cart
* SVP チップ（Genesis 版 Virtua Racing に対応）
* [新旧両スタイルを組み合わせた](https://plutiedev.com/rom-header#region){target=_blank}自動リージョンヘッダー検出
* 320x224 ゲーム解像度の補正アスペクト比オプション（例：Castlevania Moon）

## リージョン検出
リージョン検出には2つの方法があります。

1. ヘッダー：ROM ヘッダー内の文字からゲームの対象コンソールリージョン（日本、欧州、米国）を判定します。デフォルトかつ推奨の方法で、全商業タイトルで機能します。マルチリージョンゲーム（ヘッダーに複数リージョンコードを持つもの、例：`JUE`）は後述のリージョン優先設定を使います。

2. ファイル拡張子：ROM のファイル名拡張子でリージョンを変えます。
    * BIN = 日本
    * GEN = 米国
    * MD = 欧州

リージョン優先リストは、マルチリージョンゲーム（ヘッダーに複数リージョンコードを持つもの）をどのリージョンとして読み込むかを、優先順で制御します。たとえば US>JP>EU はまず US を試し、US コードがなければ JP、それもなければ EU となります。リストで最初に利用可能なリージョンが読み込み時に使われます。

## 例動画

### YM2612/YM3438 と Genesis Model 1/2 オーディオフィルタリング
![type:video](videos/genesis-filters.mp4)

### 補正アスペクト比
![type:video](videos/genesis-car.mp4)

### Composite エフェクト
![type:video](videos/genesis-comp.mp4)

### Turbo CPU
![type:video](videos/genesis-turbo.mp4)
