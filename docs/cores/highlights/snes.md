The Super Nintendo Entertainment System (SNES) MiSTer core has many features, such as CPU and Super FX turbo modes, lightgun and mouse support, and a configurable WRAM initialization value. It also supports many of the enhancement chips released for the console. This very powerful core was primarily developed by [srg320](https://www.patreon.com/srg320){target=_blank}, who didn't even have the original hardware at the time.

## Enhancement chip support
Here are the currently supported SNES enhancement chips, with example games that used them:

* Super FX / GSU-1 (Star Fox, Star Fox 2, Stunt Race FX)
* Super FX 2 / GSU-2 (Super Mario World 2: Yoshi's Island, Doom)
* CX4 (only used in Mega Man X 2 and Mega Man X 3)
* DSP-1 (Super Mario Kart and Pilotwings)
* DSP-2 (only used in Dungeon Master)
* DSP-3 (only used in SD Gundam GX)
* DSP-4 (only used in Top Gear 3000)
* OBC-1 (only used in Metal Combat: Falcon's Revenge)
* S-DD1 (only used in Star Ocean and Street Fighter Alpha 2)
* SA-1 (Kirby series, Super Mario RPG)
* SPC7110 (Far East of Eden Zero, Momotarou Dentetsu Happy)
* ST010 (F1 ROC II: Race of Champions)
* MSU-1 (CD-quality audio and data expansion used by ROM hacks)
* S-RTC (Daikaijuu Monogatari II)

Enhancement chips not in the supported list include MX15001TFC (Nintendo Power Flash Cartridges), ST011 (Hayazashi Nidan Morita Shougi), and ST018 (Hayazashi Nidan Morita Shougi 2). Check the core's README for the current support list — FPGA space on the Cyclone V is tight.

### Enhancement chip example video
![type:video](videos/snes-chips.mp4)

## Satellaview Support
The core also supports the Satellaview: place the BSX/BS-X ROM in the `./games/SNES/` folder and rename it to `bsx_bios.rom`. The core used to require patched ROMs, but original Satellaview ROMs run without patches, except those that required an Internet connection, extra peripherals, or similar.

### BS-X Satellaview Example Video
![type:video](videos/snes-bs-x.mp4)

## Super FX Turbo
The Super FX Turbo option overclocks the Super FX chip, which can raise the framerate in games like Star Fox. This is distinct from CPU Turbo, which overclocks the main CPU and changes the game speed. These make games run faster than intended, so results may vary. Such hacks may also make bugs more likely, so please do not report bugs that occur while using Turbo options.

### Super FX Turbo example video
![type:video](videos/snes-fx-turbo.mp4)
