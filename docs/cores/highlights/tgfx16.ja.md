[MiSTer TurboGrafx16 コア](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer){target=_blank}は、TurboGrafx-16 / PC-Engine 実装です。元は [Gregory "Torlus" Estrade 氏の FPGAPCE](https://github.com/Torlus/FPGAPCE){target=_blank} をベースにし、MiSTer 開発者と PC-Engine 専門家によってさらに開発が進められました。SuperGrafx、CD-ROM、Arcade Card に対応しています。

## コントローラーオプション

OSD で、お使いのコントローラーがどの実機コントローラーをシミュレートするか変更できます。たとえば Pachio-Kun は、パチンコ球を狙う角度付きスライダーのあるパチンコ式コントローラーで遊ばれていました。Special オプションで Pachinko を選び、この動きには代わりにアナログスティックまたはパドルが使えます。

コアはマルチコントローラーゲーム向けの TurboTap マルチタップ、2ボタン "turbo" ジョイパッド、6ボタンジョイパッドに対応しています。2ボタンターボでは、代替ボタンで連射を提供します（実機と同じ）：A/B が通常ボタン、X/Y が連射レベル1、L/R が連射レベル2です。

6ボタンオプションは対応ゲームでのみ有効にしてください。対応ゲームは少数のリスト（Street Fighter II、Fatal Fury、Ys IV など）に限られます。現在の対応ゲームリストは[コア README](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer#joystick){target=_blank}を参照してください。

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
