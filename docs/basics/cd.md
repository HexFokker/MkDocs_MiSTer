MiSTer loads CD-based games from CUE/BIN and [CHD](https://github.com/rtissera/libchdr){target=_blank} images. This page explains how to store them, and whether USB CD drives are supported.

## Will MiSTer ever support USB CD drives?

The short answer is no. The long answer is that:

1. There is too much hardware variation in CD drives and their drivers for support to be worth it.
2. Everything added to the MiSTer's Linux image and Main binary must be very carefully considered, because the goal is to keep them lightweight.

Drive support is also not a priority, as properly dumped CD-ROM images are bit-perfect where it counts (excluding randomized subchannel data and garbage-data fill-in).

## CUE/BIN folders and CHD files

Every CD-based core currently supports CUE/BIN. Place each CUE/BIN game in its own folder, separate from your other CUE/BIN games.

CHD is a compressed CD image format that almost every CD-based core also supports. CHD files don't need separate folders.

## Multi-disc games

For multi-disc games (e.g. on PlayStation / PSX), place each disc's files in the same subfolder:

```
./Valkyrie Profile (USA)/Valkyrie Profile (USA) (Disc 1).chd
./Valkyrie Profile (USA)/Valkyrie Profile (USA) (Disc 2).chd
```

The MiSTer then names the save file after the subfolder (`Valkyrie Profile (USA).sav`), so all discs share one save. You can also switch discs by loading the other disc image, without resetting the core.
