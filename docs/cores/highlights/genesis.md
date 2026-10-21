**Note:** This core is being deprecated in favor of the new hardware-accurate MegaDrive core by Nukeykt, developed from analysis of decapped chips. The turbo and sprite limit features are currently unavailable in the MegaDrive core.

The Genesis core is a port of the [fpgagen](https://github.com/Torlus/fpgagen){target=_blank} core to MiSTer, with significant enhancements and additions. The audio filtering options have been adjusted according to real hardware using [MDFourier](https://junkerhq.net/MDFourier/){target=_blank}.

## Features

* Composite Blending effect (e.g. Sonic Waterfall transparency)
* CPU Turbo option (e.g. Road Rash gameplay speed)
* Increased sprite limit
* Audio filtering options for Model 1, Model 2, Minimal, and No Filter
* Switch between YM2612 (Model 1) or YM3438 (Model 2/3) FM synth
* Multitap: 4-way, Team Player, J-Cart
* SVP chip (Virtua Racing for Genesis supported)
* Auto-region header detection using the [new style and the old style combined](https://plutiedev.com/rom-header#region){target=_blank}
* Corrected aspect ratio option for 320x224 game resolutions (e.g. Castlevania Moon)

## Region detection
There are two methods of region detection.

1. Header: Detects a character in the ROM header to determine the game's intended console region (Japanese, European, or American). This is the default and preferred method, as it works with the entire commercial lineup. Multi-region games (which have multiple region codes in the header, e.g. `JUE`) use the region priority setting described below.

2. File extension: Changes the region according to the ROM's filename extension.
    * BIN = Japanese
    * GEN = America
    * MD = Europe

The region priority list controls which region a multi-region game (with multiple region codes in its header) loads as, in order of preference. For example, US>JP>EU tries US first, falls back to JP if no US code is present, then EU. The first available region in the list is the one used on load.

## Example videos

### YM2612/YM3438 and Genesis Model 1/2 audio filtering
![type:video](videos/genesis-filters.mp4)

### Corrected aspect ratio
![type:video](videos/genesis-car.mp4)

### Composite effect
![type:video](videos/genesis-comp.mp4)

### Turbo CPU
![type:video](videos/genesis-turbo.mp4)
