Some MiSTer cores can apply cheats in-game. The cheats use a specific format and are downloaded automatically from [gamehacking.org](https://gamehacking.org/){target=_blank} when you run the downloader script. The cheat files follow specific rules, described below.

## Setup

Cheats should be stored in `cheats/system/rom_filename.zip`, where `system` is the core name (NES, SNES, Genesis, etc.).

For example: 

`cheats/NES/Taboo (USA).zip` for the NES ROM `Taboo (USA).nes`

The filename of the zip must match the ROM name exactly. Cheats will be loaded automatically when you load a ROM, and can be enabled and disabled from the menu in supported cores.

If the .zip cheat file does not match the ROM name, the cheat engine checks the ROM's CRC32 and selects the .zip cheat file with a matching CRC32. ROM name matching has priority over CRC32 checking.

Individual cheats are in .gg format and should be stored in zip files.

## How to use cheats with CD-ROM images

Because CD-ROM images are large, MiSTer intentionally doesn't check their CRC32 hash. To use cheats with a CD image, place the cheat zip in the same folder as your CUE/BIN or CHD file. Cheats are typically matched to the CD image by filename: the cheat zip's filename must match that of the CUE/BIN, CHD, or ISO. The PlayStation core uniquely also supports a second method, which loads cheats based on the game's internal Game ID (e.g. SCUS-94163); see [Using cheats on the MiSTer PSX core](../highlights/psx.md#using-cheats-on-the-mister-psx-core). If the cheats don't load, check the following:

1. The cheat zip file is in the same subfolder as the desired CUE/BIN, CHD, or ISO.
2. The filename of the zip file is identical to the filename of the CUE/BIN, CHD, or ISO.
3. **(for the PSX core only)** The Game ID of the desired game matches the target Game ID of the zip file.

If cheats for the CD game do not work when everything else looks correct, your version of the game may be different from the one the cheats were made for.

## Making your own codes

All types of cheat codes for 16-bit systems and earlier can be decoded into four pieces of information: an address, a compare value, a replace value, and usually a flag saying whether the compare value is used. A .gg file stores these in binary as four 32-bit integers in little-endian byte order. 

For example, if the address is `0xFF1CA0`, the compare value is `0xB5`, and the replace value is `0xFF`, the file would look like this:

`01 00 00 00  A0 1C FF 00  B5 00 00 00  FF 00 00 00`

The first four bytes are little-endian `0x00000001` for "compare enabled", the second four are the little-endian address, the third set is the compare value, and the fourth is the replace value. Note that not all codes use a compare value.

For cheats with multiple codes, add another 16 bytes at the end of the file in the same format as the first.

You can decode Game Genie codes into these values with tools like this:

[https://gamehacking.org/system/nes](https://gamehacking.org/system/nes){target=_blank}
