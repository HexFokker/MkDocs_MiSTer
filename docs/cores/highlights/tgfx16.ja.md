[MiSTer TurboGrafx16 コア](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer){target=_blank}は、極めて正確な TurboGrafx-16 / PC-Engine 実装です。元は [Gregory "Torlus" Estrade 氏の FPGAPCE](https://github.com/Torlus/FPGAPCE){target=_blank} をベースにし、MiSTer 開発者と PC-Engine 専門家によって高度な精度まで押し上げられました。SuperGrafx、CD-ROM、Arcade Card に対応しています。

## コントローラーオプション

OSD で、お使いのコントローラーがどの実機コントローラーをシミュレートするか変更できます。たとえば Pachio-Kun は、パチンコ球を狙う角度付きスライダーのあるパチンコ式コントローラーで遊ばれていました。Special オプションで Pachinko を選び、この動きには代わりにアナログスティックまたはパドルが使えます。

Turbo Tap コントローラーにも対応しています。これは MiSTer 内蔵の連射機能とは別物です。Turbo Tap は一部のゲームに合う特定の連射周波数を持っており、このオプションを有効にするとボタンがそのコントローラー本来の速度で連射します。

もう一つのオプションは、めったに使われなかった PC-Engine 6ボタンコントローラーへの切り替えです。"HORI Fighting Commander PC" など少数のコントローラーがこの I〜VI ボタン配置を持ち、各ボタンに連射機能がありました。対応したのは限られたゲームだけです：

* Advanced Variable Geo
* Art of Fighting
* Asuka 120% Maxima Burning Fest
* Fatal Fury 2
* Fatal Fury Special
* Flash Hiders
* Flash Hiders Taikenban (Demo)
* Kabuki Klash
* World Heroes II
* Ys IV - Dawn of Ys

## Arcade Card

少数の TurboGrafx16 ゲームは Arcade Card 拡張を必要としました。これらを動かすには "Hardware" サブメニューの "Arcade Card" オプションを "Enabled" にします。これで動くはずです。

## カラーパレットオプション

実機 TurboGrafx-16 のコンポジット映像エンコーダーは、生の RGB 値から色を変えていました。つまり当時 CRT で見た色は、今日エミュレーターや RGB 改造実機が表示する色とは違います。Kitrinx 氏と Artemio Urbina 氏は、コンポジット映像出力を再現する[数学的に導出された色補正パレット](https://www.retrorgb.com/pc-engine-palette-improvements-the-amazing-people-behind-the-technology.html){target=_blank}を開発しました。ゲームはおそらくこのコンポジット色を想定して作られていたため、デフォルトのままです。より鮮やかな色が良ければ、Audio & Video → Colors で Raw RGB に切り替えてください。違いを示す動画：

![type:video](videos/tgfx16-palette.mp4)

## オーバースキャンとボーダーカラー

実機 TurboGrafx-16 には CRT のベゼルでほぼ隠れていたボーダーがありました。MiSTer コアはモダンディスプレイですっきり見せるため、このオーバースキャン領域を隠しています。復元するには、Overscan と Border Color オプションを変更します。黒の代わりに実機の色を使うこともできます。

![type:video](videos/tgfx16-border.mp4)

## 1ラインあたりのスプライト増量

実機 TurboGrafx-16 ハードウェアには1ラインあたりのスプライト数にハードリミットがあり、超えるとスプライトが点滅・消失しました。MiSTer コアはこの制限に縛られません。デフォルトはハードウェア準拠ですが、OSD の Audio & Video サブメニューでこのオプションを "Extra" に設定し、ゲームが快適になるか試せます。例動画：

![type:video](videos/tgfx16-flicker.mp4)

## 音量ブーストオプション

ゲーム間、さらにゲーム内チャンネル間でも音声レベルにばらつきのあるゲームがありました。MiSTer TurboGrafx16 コアでは、CD Audio、ADPCM、全音声をそれぞれ段階的にブーストできます。ボーカルが音楽より小さい、効果音が小さすぎる、あるゲーム全体が他よりずっと小さい、といった場面で便利です。
