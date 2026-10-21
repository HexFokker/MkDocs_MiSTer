The [MiSTer TurboGrafx16 core](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer){target=_blank} is an extremely accurate TurboGrafx-16 / PC-Engine implementation. Originally based on [Gregory "Torlus" Estrade's FPGAPCE](https://github.com/Torlus/FPGAPCE){target=_blank}, it has been pushed even further to a high degree of accuracy by MiSTer devs and PC-Engine experts. It supports the SuperGrafx, CD-ROM, and Arcade Card.

## Controller Options

The OSD lets you change which original controller your controller simulates. For example, Pachio-Kun was played with a pachinko-style controller that had an angled slider for aiming the pachinko balls; you can use a mouse for this movement instead.

The Turbo Tap controller is also supported. This is separate from MiSTer's built-in turbo feature: the Turbo Tap had a specific turbo frequency that suits some games better, and enabling this option makes the buttons use turbo at that controller's original rate.

Another option switches to the rarely used PC-Engine 6-button controller. The "HORI Fighting Commander PC" and a few other controllers had this I–VI button layout, each with turbo tap functionality. Only a select few games supported it:

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

