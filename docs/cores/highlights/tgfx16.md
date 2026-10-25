The [MiSTer TurboGrafx16 core](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer){target=_blank} is a TurboGrafx-16 / PC-Engine implementation. Originally based on [Gregory "Torlus" Estrade's FPGAPCE](https://github.com/Torlus/FPGAPCE){target=_blank}, it has been developed further by MiSTer devs and PC-Engine experts. It supports the SuperGrafx, CD-ROM, and Arcade Card.

## Controller Options

The OSD lets you change which original controller your controller simulates. For example, Pachio-Kun was played with a pachinko-style controller that had an angled slider for aiming the pachinko balls; select Pachinko in the Special option and use an analog stick or paddle for this movement instead.

The core supports the TurboTap multitap adapter for multi-controller games, the 2-button 'turbo' joypad, and the 6-button joypad. For 2-button turbo, turbo fire is provided through alternate buttons (matching the original system): A/B are the normal buttons, X/Y are turbo level 1, and L/R are turbo level 2.

The 6-button option should only be enabled for games that support it — it is a small list, such as Street Fighter II, Fatal Fury, and Ys IV. See the [core README](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer#joystick){target=_blank} for the current supported-game list.

## Arcade card

A few TurboGrafx16 games required the Arcade Card add-on. To run them, set the "Arcade Card" option in the "Hardware" sub-menu to "Enabled"; they should then work.

## Color palette options

The original TurboGrafx-16's composite video encoder altered the colors from their raw RGB values — so the colors you saw on a CRT back then differ from what emulators and even RGB-modded original hardware show today. Kitrinx and Artemio Urbina developed a [mathematically derived, color-corrected palette](https://www.retrorgb.com/pc-engine-palette-improvements-the-amazing-people-behind-the-technology.html){target=_blank} that represents the composite video output instead. Since games were likely developed with these composite colors in mind, it's kept as the default. For more vibrant colors, switch to Raw RGB via the Audio & Video → Colors option. A video demonstrating the difference:

![type:video](videos/tgfx16-palette.mp4)

## Overscan and border color

The original TurboGrafx-16 had a border that was mostly hidden by the CRT's bezel. The MiSTer core leaves this overscan area hidden for a cleaner look on modern displays. To restore it — and optionally use the original system's color instead of black — change the Overscan and Border Color options.

![type:video](videos/tgfx16-border.mp4)

## Extra sprites per line

The original TurboGrafx-16 hardware had a hard limit on sprites per line — games exceeding it made sprites flicker and disappear. The MiSTer core isn't bound by this limit. The default matches the hardware, but you can set this option to "Extra" in the OSD's Audio & Video sub-menu and see whether it makes the game more pleasant. Example video:

![type:video](videos/tgfx16-flicker.mp4)

## Audio boost options

Some games had inconsistent audio levels compared to each other, and even between their own channels. The MiSTer TurboGrafx16 core lets you boost CD Audio, ADPCM, and all audio by varying degrees — useful when vocals are quieter than the music, sound effects feel too quiet, or a whole game is much quieter than the others.

