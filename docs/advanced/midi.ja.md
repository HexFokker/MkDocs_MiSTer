MiSTer で MIDI を使う方法は複数あります。


## [mt32-pi プロジェクト](https://github.com/dwhinham/mt32-pi/wiki){target=_blank}

Dale Whinham（別名 d0pefish）氏が作成した mt32-pi は、Raspberry Pi 用のオープンソース MIDI シンセサイザーです。最新の手順は [mt32-pi wiki の MiSTer FPGA セクション](https://github.com/dwhinham/mt32-pi/wiki/MiSTer-FPGA){target=_blank}を参照。MiSTer で mt32-pi を使うための [Sorgelig 設計の拡張ボードも2種類](../basics/addons.md#mt32-pi-lite-mister-addon-board){target=_blank}あります。

### 例動画
![type:video](videos/mt32-pi.mp4)

## MIDI 対応のコンピューターコア

ALSA 互換の USB MIDI デバイスを接続すると、Minimig と ao486 コアの 'UART Connection' メニューに、'None'、'PPP'、'Console' に加えて 'USBMIDI' と 'USBMIDI-38K' の2つのオプションが追加されます。

### Minimig

Amiga（Minimig）コアでは 'USBMIDI' を使います。UART 接続速度が標準 MIDI 速度の 31250 ボーに設定されます。

多くの Amiga アプリケーションとほとんどのゲームは追加の MIDI ドライバーを必要としません。一部の「新しめの」アプリケーションは [CAMD ドライバー](http://aminet.net/package/mus/midi/camd){target=_blank}（Aminet）が必要な場合があります。

### ao486

ao486 コアでは 'USBMIDI-38K' を使います。DOS PC の UART は標準 MIDI 速度の 31250 ボーで動かせなかったため、UART 接続速度が 38400 ボーに設定されます。

一部のシーケンサーアプリケーションや Microsoft Windows はシリアルポート上の MIDI をサポートするかもしれませんが、DOS ゲームは通常 MPU-401 インターフェースを必要とし、残念ながら ao486 にはそれがありません。ハードウェア MPU-401 の代わりに、[SoftMPU](http://bjt42.github.io/softmpu/){target=_blank} TSR を使うとかなりうまくいきます。

#### SoftMPU

SoftMPU は QEMM メモリーマネージャーが必要です（テストには QEMM 8.03 を使用）。QEMM の "stealth" オプションは ao486 と互換性がないようなので、optimize 処理のその部分はスキップすることをおすすめします。SoftMPU を AUTOEXEC.BAT に追加した後、QEMM の optimize を再度実行して、下位 640 KB のコンベンショナル RAM をできるだけ多く空けると良いでしょう。

あまり一般的ではありませんが、MPU-401 割り込みを必要とする DOS ゲームやアプリケーションもあります。これを有効にすると、割り込みを使わない他のソフトウェアとの互換性が損なわれることがあります。


MPU-401 割り込みなしで SoftMPU を起動：

    SOFTMPU.EXE /MPU:330 /OUTPUT:COM1

MPU-401 割り込みありで SoftMPU を起動：
       
    SOFTMPU.EXE /SB:220 /IRQ:5 /MPU:330 /OUTPUT:COM1  

テストに使った Rev.0 Roland MT-32 では、特定のゲームでバッファーオーバーフローを防ぐために 'DELAYSYSEX' スイッチが必要でしたが、Sierra のゲームでは SysEx コマンドの送信が極端に遅くなりました。General MIDI モジュールや新しいリビジョンの MT-32 では不要です。

    SOFTMPU.EXE /MPU:330 /DELAYSYSEX /OUTPUT:COM1

## MidiLink

[MidiLink](https://github.com/MiSTer-devel/MidiLink_MiSTer){target=_blank} デーモン（`midilink`）は MiSTer に同梱されており、複数の動作モードに対応します。Menu コアの Uartmode オプションまたはコマンドラインスイッチで選択できます：

* **Local / MUNT** — HPS ARM コア上で動く MUNT ソフトシンセ（USB MIDI アダプター不要。MT-32/CM-32 ROM は `/media/fat/linux/mt32-rom-data` に置く）
* **Local / FSYNTH** — FluidSynth ソフトシンセ（サウンドフォントは MidiLink.INI の `FSYNTH_SOUNDFONT` で指定）
* **Remote / UDP** — 別の MiSTer やコンピューターへの直接 MIDI 接続
* **Remote / TCP** — Hayes AT コマンドのサブセットによるモデムエミュレーション（デフォルト 115200 baud）
* **USBMIDI / SERMIDI** — USB MIDI アダプター（例：Roland UM-ONE MK2）、またはフォールバックとして USB シリアルアダプター

デフォルトのボーレートは 31250 です。ao486 コアは 38400 を使います。全スイッチと MidiLink.INI オプションは [MidiLink README](https://github.com/MiSTer-devel/MidiLink_MiSTer){target=_blank} を参照してください。

## 動作報告のある MIDI アダプター

* Creative EMU XMIDI（SYSEX メッセージを壊すことが知られている）
* Roland UM-ONE
* M-Audio Midisport Uno

