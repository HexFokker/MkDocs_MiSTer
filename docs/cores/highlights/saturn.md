The Sega Saturn MiSTer core, originally developed by [srg320 (Sergey Dvodnenko)](https://www.patreon.com/srg320/){target=_blank}, is a suitable modern replacement for the original hardware for the vast majority of the Sega Saturn library.

## Controller/Accessories Support

- USB/Bluetooth:

    - Supported (maximum 2 controllers):

        - Control Pad (the default controller)
        - Mouse
        - Light guns
 
    - Not supported:

        - Full 3D Control Pad support [^1]
        - Twin-Stick
        - MIDI
        - Keyboard + FDD Operator
        - Video Card
        - NetLink
        - Floppy Disk Drive
        - Keyboard
        - Multitap

- [SNAC](./../../basics/input.md#serial-native-accessory-converter-snac): 
    - Supported:

        - Control Pad
        - 3D Pad
        - Virtua Gun (aka _Stunner_)
        - Twin-Stick (with Cyber Troopers Virtual-On)
        - Shuttle Mouse

    - Not currently supported:

        - Saturn MIDI Interface Box
        - Multitap (via SNAC) [^2]

## Media support

- Multi-disc support
- BIN/CUE and CHD support (see [CD support](../../basics/cd.md#cuebin-folders-and-chd-files))
- Multiple region support and automatic region detection

## BIOS and region selection

### Single BIOS

Place a BIOS file named `boot.rom` in the `games/Saturn` folder, and the core loads it automatically at startup. For the best experience, use a region-free BIOS if you have one.

### Multiple BIOS

To use multiple BIOSes and/or control which one is used per game (automatically when opening the core), place files named `cd_bios.rom` in either:

- the same folder as the game
- a parent folder of the game (e.g. a folder for Japanese releases containing the Japanese Saturn BIOS, with the games in subfolders)

### OSD options

The core's OSD menu also allows:

- manual loading of BIOS (when named with a `*.bin` extension)
- setting automatic region detection

## Options

This page documents a key option; see the core's OSD for the others.

### "Fast timings"

After loading the core, the `Timing` option in the OSD menu `Hardware` offers these settings:

- `Original` (default)
- `Fast` (commonly referred to as "fast timings")

While `Fast` is available, it can break some titles (e.g. freezes and graphical glitches) and is best not used as the default[^3]. It exists to address issues in the `Original` mode of the released core. This option is only present in single-SDRAM builds; Dual SDRAM builds always use fast timings.

## FAQ

### Dual SDRAM vs Single SDRAM builds

MiSTer systems are expected to have a single 128 MB SDRAM module, and official core releases target at most one module.

As part of their development workflow, developers can start with two SDRAM modules on their development hardware for convenience (at the expense of losing some analog functionality). This provides extra bandwidth before the core is optimized for the official single-SDRAM releases that end users run.

During development, before a core reaches that stage, or when it reaches the limits of the hardware, Dual SDRAM variants of cores may be distributed unofficially in the community. Some enthusiasts also build dual-SDRAM stacks while using experimental builds.

For the Saturn core, Dual SDRAM builds are still made and discussed because the official single-SDRAM build has a few outstanding, but generally minor, issues. Some of these can currently be mitigated with the [fast timings](#fast-timings) option, but not all. The Dual SDRAM releases are not official, and using the single-SDRAM builds is still encouraged.

More info [here](https://github.com/MiSTer-devel/Saturn_MiSTer/issues/251#issuecomment-2482401756){target=_blank} from the developer.

## Known issues

Limitations are documented per feature throughout this page.

The remaining [GitHub issues](https://github.com/MiSTer-devel/Saturn_MiSTer){target=_blank} cover these more thoroughly[^4].

## Source code

Available [here](https://github.com/MiSTer-devel/Saturn_MiSTer){target=_blank}.


[^1]: Analog triggers (to replicate the 3D Control Pad) are not currently supported. If set to the 3D Control Pad, the core simply does not feed input to the triggers (e.g. to map digital input to analog signals, or to use the 3D Control Pad's digital compatibility mode, which would be equivalent to the already supported Control Pad mode).
[^2]: Support for multitap is not currently included in the core as of January 2026, although it was implemented previously and may be re-added at some point
[^3]: See these comments: [1](https://github.com/MiSTer-devel/Saturn_MiSTer/issues/251#issuecomment-2481394472){target=_blank}, [2](https://github.com/MiSTer-devel/Saturn_MiSTer/issues/251#issuecomment-2481418725){target=_blank}
[^4]: Some issues may be out of date and no longer apply (and/or require more testing before closing)