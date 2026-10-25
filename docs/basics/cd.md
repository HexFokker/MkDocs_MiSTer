CD image format support depends on the core. CUE/BIN and CHD are common, but some cores also accept ISO or other formats. Check the core's readme for the supported formats. This page explains how to store CD images and whether USB CD drives are supported.

## Will MiSTer ever support USB CD drives?

The short answer is no. The long answer is that:

1. There is too much hardware variation in CD drives and their drivers for support to be worth it.
2. Everything added to the MiSTer's Linux image and Main binary must be very carefully considered, because the goal is to keep them lightweight.

Drive support is also not a priority, as properly dumped CD-ROM images are bit-perfect where it counts (excluding randomized subchannel data and garbage-data fill-in).

## CUE/BIN folders and CHD files

CUE/BIN is widely supported. Place each CUE/BIN game in its own folder, separate from other CUE/BIN games.

Many CD-based cores also support CHD. CHD files do not generally require separate folders, but follow any core-specific folder requirements. For example, PSX uses the game's folder name when creating its save file.

## Multi-disc games

Some CD-based cores support multi-disc games, but folder layout, save handling, and disc-changing procedures vary by core.

**PSX:** Place each game in its own folder, and keep all discs of a multi-disc game in that folder. The core names the save file after the subfolder, so all discs share one save file. You can switch discs by loading another disc image for the same game without resetting the core:

```
./Valkyrie Profile (USA)/Valkyrie Profile (USA) (Disc 1).chd
./Valkyrie Profile (USA)/Valkyrie Profile (USA) (Disc 2).chd
```

**3DO:** When the game prompts you to change discs, save NVRAM, then load the next disc.

For other cores, check the core's readme for supported image formats and multi-disc instructions.
