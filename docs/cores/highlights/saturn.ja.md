Sega Saturn の MiSTer コアは、[srg320 (Sergey Dvodnenko)](https://www.patreon.com/srg320/){target=_blank} 氏が開発を始めたもので、Sega Saturn ライブラリーの大多数において実機に代わる現代的な選択肢です。

## コントローラー／周辺機器対応

- USB/Bluetooth:

    - 対応（最大2台）：

        - Control Pad（デフォルトコントローラー）
        - Mouse
        - ライトガン
 
    - 非対応：

        - 3D Control Pad の完全対応 [^1]
        - Twin-Stick
        - MIDI
        - Keyboard + FDD Operator
        - Video Card
        - NetLink
        - Floppy Disk Drive
        - Keyboard
        - Multitap

- [SNAC](./../../basics/input.md#serial-native-accessory-converter-snac): 
    - 対応：

        - Control Pad
        - 3D Pad
        - Virtua Gun（別名 _Stunner_）
        - Twin-Stick（Cyber Troopers Virtual-On 使用時）
        - Shuttle Mouse

    - 現在未対応：

        - Saturn MIDI Interface Box
        - Multitap（SNAC 経由）[^2]

## メディア対応

- マルチディスク対応
- BIN/CUE と CHD 対応（[CD 対応](../../basics/cd.md#cuebin-folders-and-chd-files)を参照）
- 複数リージョン対応とリージョン自動検出

## BIOS とリージョン選択

### シングル BIOS

`boot.rom` という名前の BIOS ファイルを `games/Saturn` フォルダーに置くと、コアは起動時に自動で読み込みます。最良の体験には、お持ちならリージョンフリー BIOS を使ってください。

### 複数 BIOS

複数の BIOS を使う、またはゲームごとに使う BIOS を（コアを開くとき自動で）制御するには、`cd_bios.rom` という名前のファイルを次のどちらかに置きます：

- ゲームと同じフォルダー
- ゲームの親フォルダー（例：日本リリース用のフォルダーに日本版 Saturn BIOS を置き、ゲームはサブフォルダーに入れる）

### OSD オプション

コアの OSD メニューでは次も可能です：

- BIOS の手動読み込み（`*.bin` 拡張子の場合）
- リージョン自動検出の設定

## オプション

このページでは主要なオプションを文書化しています。その他はコアの OSD を参照してください。

### "Fast timings" { #fast-timings }

コアを読み込んだ後、OSD メニュー `Hardware -> Timings` には次の設定があります：

- `Normal`（デフォルト）
- `Fast`（一般に "fast timings" と呼ばれる）

`Fast` は使えますが、一部のタイトルを壊すことがあり（フリーズやグラフィックの乱れなど）、デフォルトとしては使わないのが良いです[^3]。これはリリース版コアの `Normal` モードの問題に対処するために存在します。

## FAQ

### デュアル SDRAM ビルド vs シングル SDRAM ビルド

MiSTer システムは 128 MB SDRAM モジュール1枚を前提としており、公式コアリリースは最大1枚を対象としています。

開発ワークフローの一環として、開発者は開発ハードウェアに SDRAM モジュール2枚で始めることがあります（一部のアナログ機能を失う代わりに、便利さを得るため）。これにより、エンドユーザーが動かす公式のシングル SDRAM リリース向けに最適化する前の段階で、余分な帯域が得られます。

開発中、その段階に達する前、あるいはハードウェアの限界に達したとき、コアのデュアル SDRAM バリアントがコミュニティで非公式に配布されることがあります。実験的ビルドを使う愛好家がデュアル SDRAM スタックを組むこともあります。

Saturn コアでは、公式のシングル SDRAM ビルドにいくつかの未解決（ただし一般的に軽微な）問題があるため、デュアル SDRAM ビルドが現在も作られ議論されています。一部は現在 [fast timings](#fast-timings) オプションで緩和できますが、すべてではありません。デュアル SDRAM リリースは非公式であり、シングル SDRAM ビルドの使用が依然として推奨されています。

詳細は開発者による[こちら](https://github.com/MiSTer-devel/Saturn_MiSTer/issues/251#issuecomment-2482401756){target=_blank}を参照。

## 既知の問題

制限はこのページ全体で機能ごとに文書化しています。

残りの問題は [GitHub issues](https://github.com/MiSTer-devel/Saturn_MiSTer){target=_blank} がより網羅的に扱っています[^4]。

## ソースコード

[こちら](https://github.com/MiSTer-devel/Saturn_MiSTer){target=_blank}から入手可能です。


[^1]: アナログトリガー（3D Control Pad を再現するもの）は現在未対応です。3D Control Pad に設定しても、コアは単純にトリガーへ入力を供給しません（デジタル入力をアナログ信号にマップしたり、3D Control Pad のデジタル互換モードを使うこともありません。後者はすでに対応済みの Control Pad モードと同等になります）。
[^2]: 2026年1月時点で、マルチタップ対応はコアに含まれていません。以前は実装されていたため、将来再追加される可能性はあります。
[^3]: これらのコメントを参照：[1](https://github.com/MiSTer-devel/Saturn_MiSTer/issues/251#issuecomment-2481394472){target=_blank}、[2](https://github.com/MiSTer-devel/Saturn_MiSTer/issues/251#issuecomment-2481418725){target=_blank}
[^4]: 一部の issue は古く、もはや当てはまらない可能性があります（クローズには追加テストが必要な場合もあります）。
