[MiSTer.ini 設定ファイル](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank}にはグローバル設定があり、コア固有の設定も保存できます。このページではまずグローバル設定、次にコアごとの上書き方法、最後に特定コアにのみ適用される設定を説明します。

## 代替 MiSTer INI ファイル

MiSTer は最大4つの INI ファイルに対応しています。`MiSTer.ini` と、手動で作る3つの代替 INI ファイル（たとえば `MiSTer.ini` をコピーして作る）です。起動時に MiSTer は microSD カードのルート（リモートやターミナルからアクセスすると `/media/fat/`）から `MiSTer.ini` を読み込みます。

代替 INI ファイルへの切り替えは2つの方法でその場で行えます：

* ホットキー（下の表参照）。INI ファイル内の設定がディスプレイと非互換だと画面が使えなくなることがあるため、こちらが推奨の方法です。
* OSD で：左を押して Misc Options 画面を開き、INI ファイルを選択。

ファイル名が重要です。デフォルト名の場合、ホットキーは：

| ファイル名          | ホットキーの組み合わせ    |
| ------------------ | ------------------------ |
| `MiSTer.ini`       | コントローラー: Back + 右 |
| `MiSTer_alt_1.ini` | コントローラー: Back + 左 |
| `MiSTer_alt_2.ini` | コントローラー: Back + 上 |
| `MiSTer_alt_3.ini` | コントローラー: Back + 下 |

代替 INI ファイルは複数システムを遊ぶハイブリッドコアに便利です。たとえば Sega Master System コアは Game Gear ゲームも遊べます。Game Gear ゲームだけに `vscale_border` を付けたい場合、`MiSTer.ini` を `MiSTer_alt_1.ini` にコピーして、そのコピーの `vscale_border` だけを変えれば、その場で Game Gear ゲーム用にボーダーをオンにできます。同様に `video_mode`（画面解像度）や `vsync_adjust` もその場で切り替えられます。

### 代替 INI ファイルの命名

代替 INI ファイルにはカスタム名も付けられます。その名前は OSD Information 画面（ゲームパッド／キーボードで左を押す。IP アドレスと解像度が表示される場所）と、ファイルを選択できる config セクションに表示されます。通常の `MiSTer.ini` は "Main" と表示され、カスタムファイルはアンダースコー以降の文字列が使われます。たとえば `MiSTer_CRT.ini` は "Main" の隣に "CRT" と表示されます。

## 一般映像設定 

`vscale_mode` - 画面へのスケーリング方法を変更。0 は画面全体に画像をフィット、1 は 1:1 整数スケーリング、2 は 0.5 刻み、3 は 0.25 刻み。モード 4 と 5 は[ビデオスケーリング](videoscaling.md)を参照。

`vscale_border` - 画面にオーバースキャンボーダーをピクセルで設定（1-399）

`hdmi_limited` - HDMI 経由の出力色範囲を変更。0 = `0-255`、1 = `16-235`、2 = `16-255`。2 は一部の Direct Video アダプターで問題がある場合に有用。1 はダイナミックバックライトのある画面で画像を明るくすることも。

`hdmi_game_mode` - HDMI 出力のゲームモードを設定。一部のディスプレイで性能が改善するが、他では悪化する可能性も。0 - 非ゲーム（デフォルト）、1 - 有効。

`fb_size` - Linux フレームバッファーに描画される内容のスケーリングに影響（スクリプト実行時など）。自動の 0 のままが最善。

`video_mode` - HDMI と VGA_Scaler 出力の解像度を設定。0-14 の既成値かカスタムビデオモード。カスタムビデオモードの構文は [.ini](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank} 内の注記を参照。morf77 氏の便利なカスタムビデオモードツールが[こちら](https://morf77.pythonanywhere.com/){target=_blank}にあり、[モデルライン計算ツール](https://arachnoid.com/modelines/){target=_blank}と併用できます。

`hdr` - HDR の使用を設定。0 - 無効、1 - [HLG](https://en.wikipedia.org/wiki/Hybrid_log%E2%80%93gamma){target=_blank} による HDR を有効（ほとんどのユーザーに推奨）、2 - [DCI P3 色空間](https://en.wikipedia.org/wiki/DCI-P3){target=_blank}による HDR を有効（色調整はお好みで。推奨：`video_saturation` を 80 に）。

`video_info` - 解像度や周波数変更後、画面左上に映像情報を表示する秒数。

`vsync_adjust` - ディスプレイへ送るフレームのバッファー設定を調整。詳細は [vsync_adjust](../basics/video.md#vsync_adjust){target=_blank} を参照。値が高いほど互換性と引き換えにラグが減ります。0 が最も互換性が高く（かつ最大ラグの）設定、2 が最も低い。

`refresh_min` - 最小リフレッシュレートを強制。

`refresh_max` - 最大リフレッシュレートを強制。

## アナログ映像設定

`forced_scandoubler` - オンの場合、VGA 出力は常に 31 kHz モード（スキャンダブル）で動作。コンピューター CRT に便利。

`vga_mode` - VGA 出力フォーマットを設定：`rgb`（デフォルト）、`ypbpr`、`svideo`、`cvbs`。

`ntsc_mode` - `vga_mode` が `svideo` または `cvbs` のときのみ適用。0 - 通常 NTSC、1 - PAL-60、2 - PAL-M。注意：公式にこれらを使うコアはありません。

`composite_sync` - VGA 出力の HSync 上に同期信号を送出。特定の構成で必要。

`vga_scaler` - スケーラー出力を VGA ポート（Analog I/O または Direct Video）に送出。通常、240p TV 信号と非互換のコンピューター CRT や他の 31 kHz ディスプレイで使用。

`menu_pal` - Menu コアを PAL モードで動かすよう強制。

`direct_video` - HDMI 出力をアナログ信号に変更。AG62xx チップセット搭載の特定の Direct Video アダプターのみ対応。色の問題や映像が出ない場合は、`composite_sync` と `vga_mode=ypbpr` を確認し、`hdmi_limited` を `1` に設定するのも試してください。コンポーネントケーブルで `vga_mode=ypbpr` を使うには、Direct Video アダプターに HSYNC と Green を合成する改造が必要です（[Direct Video](directvideo.md#setup-for-ypbpr-signals)参照）。

`fb_terminal` - 1 のままが最善。CRT やアナログディスプレイでスクリプト実行に問題がある場合は 0 に切り替えてみてください。

`vga_sog` - Analog I/O ボード経由で sync-on-green を強制（ボードの SoG スイッチを無視）。

## 音声設定

`hdmi_audio_96k` - HDMI 音声サンプリングレートを 48 kHz（デフォルト）から 96 kHz に変更。TurboGrafx-16 の 32.088 kHz のような変則的なサンプリングレートを持つシステムの音声改善に役立つことがあります。

`dvi_mode` - HDMI 接続上の DVI モード。オンにすると HDMI 経由の音声伝送が無効になります。

## コントローラー設定

`mouse_throttle` - マウスの速度を変更可能（1-100）。非常に感度の高いマウスに。

`gamepad_defaults` - 1 にすると、SNES 式コントローラー配置を基準に位置でデフォルトのゲームパッドボタンをマップ。

`bt_auto_disconnect` - Bluetooth が自動切断するまでの無操作時間（分）。デフォルトは 0（オフ）。

`bt_reset_before_pair` - ペアリングダイアログの前に Bluetooth アダプターをリセット。有効にすると、一部の入力機器はリセット後にシャットダウンすることがあります。

## メニュー設定

`rbf_hide_datecode` - コア選択メニューでコア名の日付コードを隠す。

`osd_timeout` - 入力なしで表示されたとき OSD が表示される時間。0 - タイムアウトしない。範囲は 5-3600 秒。

`osd_rotate` - OSD を回転。特定のアーケードコア用にモニターを縦にするときに便利。0 - 回転なし、1 - 右回転（+90°）、2 - 左回転（-90°）。

## デバッグ設定

`log_file_entry` - 外部連携用に、ファイルブラウザーでカーソル下のファイル名を書き出す。

## コア固有設定の追加

コアごとに異なる設定を指定できます。たとえば Game Boy Advance コアだけに整数スケーリングを使い、滑らかなスクロールにビデオフィルターを不要にしたい場合。INI ファイル末尾にコア名を角括弧で囲んだセクションを追加し、その下に設定を書きます：

```
[GBA]
vscale_mode=1
```

あるいは、SNES コアに 8:7 アスペクト比を選択するオプションを追加したい場合：
```
[SNES]
custom_aspect_ratio_1=8:7
```

Menu コアも独自設定を持てます。`[Menu]` というセクションを作ってください。

`[arcade]` ヘッダーですべてのアーケードコアへの例外も作れます。縦向きアーケードコア用には `[arcade_vertical]` で別設定も可能。別のデフォルトビデオプリセットを使いたい場合などに便利です：

```
[arcade_vertical]
direct_video=0
```
