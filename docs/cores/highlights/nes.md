The Nintendo Entertainment System (NES) MiSTer core is packed with features:

* Automatic Famicom Disk System (FDS) disk swapping
* Custom palette loading
* Overscan and screen-edge masking
* An extra sprites hack
* SNAC support, so you can use an original Zapper lightgun on a CRT over analog video output

## Extra Sprites mode
The NES could only show a limited number of sprites on screen at once. Some games displayed more sprites than this, making the sprites flicker so that all of them stayed on screen. The NES core can partly remove this limit, which reduces flicker when many sprites are on screen, in games like Rygar. This doesn't work with every game that flickers: some flicker was added intentionally by the original developers for other reasons.

### Extra Sprites (deflicker) Example Video
![type:video](videos/nes-flicker.mp4)

## Palettes
The NES core has built-in palettes and can also load custom palettes. The NES has no native color palette, because it didn't output colors as red, green, and blue values like other consoles. Emulators therefore need palettes that approximate the original viewing experience as closely as possible. Since that experience sometimes varied depending on the TV, several palettes are available. This also makes fun and ridiculous palettes possible, such as RetroSho's Virtual Boy palette. For more on NES palettes, watch [this YouTube video by NesHacker](https://www.youtube.com/watch?v=7Co_8dC2zb8) (and read the pinned comment, as a few details were technically inaccurate).

### Palettes Example Video
![type:video](videos/palettes.mp4)

## Famicom Disk System BIOS boot
[Download the blank FDS boot2.rom](files/boot2.rom){target=_blank} and place it in `./games/NES/`. When you start the core (assuming the FDS BIOS is already there as `boot0.rom`), it boots to the FDS BIOS as if a blank disk were inserted.

### Famicom Disk System Blank Disk Boot Example Video
![type:video](videos/fdsbios.mp4)