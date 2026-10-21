各コアは、コア名と同じ名前のフォルダーの中にゲームを探します。このページではそのフォルダーを置ける場所と、複数存在する場合にどちらが使われるかを説明します。

## 標準のコアパス
`/media/fat/games/<CORE>` の形式です。`<CORE>` はそのシステムの[内部コア名](../developer/corenames.md)です。適切なフルパスは各コアの README を確認してください。

## 標準 USB コアパス
`/media/usb<0..5>/games/<CORE>` の形式です。`<0..5>` は OS がマウントした USB ドライブの番号を示します。

## 標準 CIFS コアパス
`/media/fat/cifs/games/<CORE>` の形式です。

## その他のパス
後方互換性とテストのために、他にも有効なパスが存在します。できるだけ標準パスを使ってください。

## パスの優先順位
コアパスには優先順位があります。`/games/PSX` フォルダーを含む USB ドライブを挿すと（`/media/usb<0..5>/games/PSX` としてマウント）、MiSTer PSX コアは microSD 上のローカル `/media/fat/games/PSX` ではなくそちらを参照します。[Main_MiSTer の file_io.cpp](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/file_io.cpp#L922){target=_blank} による優先順位（高→低）：

1. `/media/usb<0..5>`
2. `/media/usb<0..5>/games`
3. `/media/network`
4. `/media/network/games`
5. `/media/fat/cifs`
6. `/media/fat/cifs/games`
7. `/media/fat`
8. `/media/fat/games`

これらのどこにもコアのフォルダーが見つからない場合、コアが自動で作成するはずです。
