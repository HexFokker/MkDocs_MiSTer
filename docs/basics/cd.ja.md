MiSTer は CD ベースのゲームを CUE/BIN と [CHD](https://github.com/rtissera/libchdr){target=_blank} イメージから読み込みます。このページではそれらの格納方法と、USB CD ドライブに対応するかどうかを説明します。

## MiSTer が USB CD ドライブに対応する日は来る？ { #will-mister-ever-support-usb-cd-drives }

端的に言えば、ありません。詳しく言うと：

1. CD ドライブとそのドライバーにはハードウェア差が大きすぎて、対応に見合う価値がありません。
2. MiSTer の Linux イメージと Main バイナリーに追加するものはすべて慎重に検討する必要があります。軽量に保つのが目標だからです。

ドライブ対応は優先度も高くありません。正しくダンプされた CD-ROM イメージは、重要な部分がビットパーフェクトだからです（ランダム化されたサブチャネルデータやゴミデータの埋め込みを除く）。

## CUE/BIN フォルダーと CHD ファイル { #cuebin-folders-and-chd-files }

現在、すべての CD ベースコアが CUE/BIN に対応しています。CUE/BIN のゲームはそれぞれ専用のフォルダーに入れ、他の CUE/BIN ゲームと分けてください。

CHD は圧縮された CD イメージフォーマットで、ほぼすべての CD ベースコアも対応しています。CHD ファイルに専用フォルダーは不要です。

## マルチディスクのゲーム { #multi-disc-games }

マルチディスクのゲーム（例：PlayStation / PSX）では、各ディスクのファイルを同じサブフォルダーに置きます：

```
./Valkyrie Profile (USA)/Valkyrie Profile (USA) (Disc 1).chd
./Valkyrie Profile (USA)/Valkyrie Profile (USA) (Disc 2).chd
```

こうすると MiSTer はセーブファイルをサブフォルダー名（`Valkyrie Profile (USA).sav`）で命名するため、全ディスクで1つのセーブを共有します。また、コアをリセットせずに別ディスクのイメージを読み込んでディスク交換できます。
