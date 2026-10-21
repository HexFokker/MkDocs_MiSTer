---
hide:
  - toc
---

*by Sorgelig*

Assembled an arcade cabinet and looking to connect your joysticks and buttons? You don't need an expensive adapter — all you need is a USB keyboard you can disassemble.

## 1. Wire the keyboard

Disassemble the keyboard and find the row and column contacts on its board for the following keys:
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

You can use a multimeter to find the contacts. Connect your buttons and joystick to these contacts according to the table above. This completes the hardware part.

## 2. Configure MiSTer

1. Connect the modded keyboard to a USB port, start the Menu core, and go to `Define Joystick buttons`. Press any button: the screen shows "Keyboard ID: XXXX:YYYY", where XXXX:YYYY is the keyboard's hardware ID. Press ESC to exit this dialog.
2. Open MiSTer.ini and add the following options, where XXXX and YYYY are the IDs you just saw:

        jamma_vid=XXXX
        jamma_pid=YYYY

3. Save the file and restart the Menu core.
4. Go to `Define Joystick buttons` again and assign the buttons using the P1 controls. The screen now shows "Joystick ID: XXXX:YYYY" instead of "Keyboard ID", which means the modded keyboard is recognized as a JAMMA 2-player input device. The P2 buttons are assigned automatically, in the same way as P1.

Your arcade input device is now ready. Unlike normal gamepads/joysticks, it always assigns the P1 and P2 inputs statically, regardless of which player presses a button first.
