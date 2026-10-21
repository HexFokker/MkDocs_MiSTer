---
hide:
  - toc
---

*by Sorgelig*

アーケード筐体を組み立てて、ジョイスティックとボタンを接続したいですか？ 高価なアダプターは要りません。必要なのは分解できる USB キーボード1台だけです。

## 1. キーボードに配線する

キーボードを分解し、基板上で次のキーに対応する行・列の接点を探します：
```
		5,         1P coin
		1,         1P start (shift key)
		UP,        1P up
		DOWN,      1P down
		LEFT,      1P left
		RIGHT,     1P right
		LEFTCTRL,  1P button 1
		LEFTALT,   1P button 2
		SPACE,     1P button 3
		LEFTSHIFT, 1P button 4
		Z,         1P button 5
		X,         1P button 6
		C,         1P button 7
		V,         1P button 8

		6,         2P coin
		2,         2P start
		R,         2P up
		F,         2P down
		D,         2P left
		G,         2P right
		A,         2P button 1
		S,         2P button 2
		Q,         2P button 3
		W,         2P button 4
		I,         2P button 5
		K,         2P button 6
		J,         2P button 7
		L,         2P button 8

		9,         Test
		TAB,       Tab (shift + 1P right)
		ENTER,     Enter (shift + 1P left)
		P,         P (pause) (shift + 1P down)
		F1,        Service
		F2,        Test
		F3,        Tilt
```

接点はマルチメーターで探せます。上の表に従ってボタンとジョイスティックをこれらの接点に接続してください。これでハードウェア側は完成です。

## 2. MiSTer を設定する

1. 改造したキーボードを USB ポートに接続し、Menu コアを起動して `Define Joystick buttons` へ。任意のボタンを押すと画面に "Keyboard ID: XXXX:YYYY" と表示されます。XXXX:YYYY がキーボードのハードウェア ID です。ESC を押してダイアログを閉じます。
2. MiSTer.ini を開き、次のオプションを追加します。XXXX と YYYY にはさきほど見た ID を入れます：

        jamma_vid=XXXX
        jamma_pid=YYYY

3. ファイルを保存して Menu コアを再起動。
4. 再び `Define Joystick buttons` へ行き、P1 の操作でボタンを割り当てます。画面には "Keyboard ID" ではなく "Joystick ID: XXXX:YYYY" と表示されます。これは改造キーボードが JAMMA 2人用入力機器として認識されたことを意味します。P2 のボタンは P1 と同じ方式で自動的に割り当てられます。

これでアーケード入力機器の完成です。通常のゲームパッド／ジョイスティックと違い、どちらのプレイヤーが先にボタンを押しても、P1 と P2 の入力は常に固定的に割り当てられます。
