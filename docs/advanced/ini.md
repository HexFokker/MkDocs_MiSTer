The [MiSTer.ini configuration file](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank} contains global settings, and can also store settings for specific cores. This page describes the global settings, then core-specific override sections.

## Alternate MiSTer INI files

MiSTer supports up to 4 INI files: `MiSTer.ini` and 3 alternate INI files, which you create manually (for example, by copying `MiSTer.ini`). At boot, MiSTer loads `MiSTer.ini` from the root of the MicroSD card (`/media/fat/` when you access the MiSTer remotely or from its terminal).

You can switch to an alternate INI file on the fly in two ways:

* With a hotkey (see the table below). This is the preferred method, because the screen may become unusable if a setting in the INI file is incompatible with your display.
* In the OSD: press left to open the Misc Options screen and select the INI file.

The file names matter. With the default names, the hotkeys are:

| Filename           | Hotkey Combination       |
| ------------------ | ------------------------ |
| `MiSTer.ini`       | Controller: Back + Right |
| `MiSTer_alt_1.ini` | Controller: Back + Left  |
| `MiSTer_alt_2.ini` | Controller: Back + Up    |
| `MiSTer_alt_3.ini` | Controller: Back + Down  |

Alternate INI files are useful for hybrid cores that play multiple systems. For example, the Sega Master System core also plays Game Gear games. If you want a `vscale_border` only for Game Gear games, copy your `MiSTer.ini` to `MiSTer_alt_1.ini` and change `vscale_border` in that copy only; you can then switch the border on for Game Gear games on the fly. Similarly, you can switch your `video_mode` (screen resolution) or `vsync_adjust` setting on the fly.

### Naming alternate INI files

Alternate INI files can also have custom names. The name appears on the OSD Information screen (press Left on the gamepad/keyboard, where the IP address and resolution are shown) and in the config section, where you can select the file. The regular `MiSTer.ini` is called "Main", and a custom file is called whatever follows the underscore: `MiSTer_CRT.ini`, for example, appears as "CRT" next to "Main".

## General Video Settings 

`vscale_mode` - Changes how the image is scaled to the screen. 0 fits the whole image to the screen, 1 uses integer-multiple scaling, 2 scales in 0.5 steps, and 3 scales in 0.25 steps. Modes 4 and 5 are described in [Video Scaling](videoscaling.md).

`vscale_border` - Sets an overscan border on the screen in pixels (0-399; 0 disables). Only applies when `vscale_mode` is 0.

`hdmi_limited` - Changes the color range output over HDMI. 0 = `0-255`, 1 = `16-235`, and 2 = `16-255`. A setting of 2 can be useful if you have problems with some Direct Video adapters. Setting it to 1 can also brighten the image on screens with a dynamic backlight.

`hdmi_game_mode` - Configures game mode on the HDMI output. It may improve performance on some displays but worsen it on others. 0 - non-game (default), 1 - enabled.

`fb_size` - Affects the scaling of content drawn to the Linux framebuffer, such as when you run scripts. Best left at 0 for automatic.

`video_mode` - Sets the resolution for HDMI and VGA_Scaler output. This can be one of the premade values from 0-14 or a custom video mode. See the notes in the [.ini](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank} for custom video mode syntax. There is also a useful custom video mode tool by morf77 ([source](https://github.com/morfeus77/MiSTerTools){target=_blank}; the hosted version is offline) which can be used in conjunction with a [modeline calculator](https://arachnoid.com/modelines/){target=_blank}.

`hdr` - Configures the use of HDR. 0 - disabled, 1 - enables HDR using [HLG](https://en.wikipedia.org/wiki/Hybrid_log%E2%80%93gamma){target=_blank} (recommended for most users), 2 - enables HDR using the [DCI P3 color space](https://en.wikipedia.org/wiki/DCI-P3){target=_blank} (adjust color controls to taste; suggested: `video_saturation` set to 80).

`video_info` - Number of seconds to display the video info in the top-left corner of the screen after the resolution or frequency changes.

`vsync_adjust` - Adjusts the buffer settings for the frames sent to the display. For details, see [vsync_adjust](../basics/video.md#vsync_adjust){target=_blank}. Higher values reduce lag at the cost of compatibility — 0 is the most compatible (and highest-lag) setting, 2 the least. This setting is ignored when `direct_video` is enabled.

`refresh_min` - Forces a minimum refresh rate.

`refresh_max` - Forces a maximum refresh rate.

## Analog Video Settings

`forced_scandoubler` - On cores that support it, VGA output runs in 31 kHz mode (scandoubled) when this is turned on; useful for computer CRTs.

`vga_mode` - Sets the VGA output format: `rgb` (default), `ypbpr`, `svideo`, `cvbs`, or `subcarrier` (for external encoder boards).

`ntsc_mode` - Only applies when `vga_mode` is `svideo` or `cvbs`. 0 - NTSC, 1 - PAL-60, 2 - PAL-M. Changes Y/C color encoding, not video timing; leave at 0 unless you specifically need PAL-60 or PAL-M.

`composite_sync` - Sends composite sync (CSYNC) on the VGA HSync pin instead of separate horizontal sync; needed for certain configurations.

`vga_scaler` - Sends the scaler output to the analog video port of a compatible I/O board (Analog I/O Board 6.x, or I/O Board 9.2 with AV Board). This is usually used with computer CRTs and other 31 kHz displays that aren't compatible with 240p TV signals.

`menu_pal` - Forces the Menu core to run in PAL mode.

`direct_video` - Sends the core's unscaled native video over the HDMI port for HDMI-to-analog DAC adapters; requires a compatible adapter — Direct Video adapters with AG62xx chipsets (e.g. AG6200/AG6201) are the reported examples. Set `direct_video=2` to enable it automatically only when a known adapter is detected via EDID. If you have color problems or no image, check `composite_sync` and `vga_mode=ypbpr`, and also try setting `hdmi_limited` to `1`. To use `vga_mode=ypbpr` with component cables, the Direct Video adapter needs a modification that combines HSYNC and Green (see [Direct Video](directvideo.md#setup-for-ypbpr-signals)).

`fb_terminal` - Best left at 1. If you have issues running scripts on a CRT or analog display, set this to 2 to size the terminal for analog output, or 0 to disable the framebuffer terminal.

`vga_sog` - Enables sync-on-green on the Analog I/O Board 6.x when the board's SoG switch is in AUTO; the OVR position forces SoG on regardless of this setting. On I/O Board 9.2 + AV Board 1.2 there is no physical SoG switch; the `vga_sog` setting takes effect as configured.

## Audio Settings

`hdmi_audio_96k` - Changes the HDMI audio sampling rate from 48 kHz (default) to 96 kHz. This can help with the audio of systems with unusual sampling rates (like TurboGrafx-16's 32.088 kHz).

`dvi_mode` - DVI mode over the HDMI connection; it disables audio transmission over HDMI when turned on. 0 - HDMI, 1 - DVI. If unset, the mode is detected automatically from the display's EDID.

## Controller Settings

`mouse_throttle` - Can be used to change the speed of your mouse (1-100). Good for very sensitive mice.

`gamepad_defaults` - When set to 1, maps default gamepad buttons by position relative to a SNES-style controller layout.

`bt_auto_disconnect` - Number of minutes of inactivity before Bluetooth disconnects automatically. Default is 0 (off).

`bt_reset_before_pair` - Resets the Bluetooth adapter before the pairing dialog. If enabled, some input devices may shut down after the reset.

## Menu Settings

`rbf_hide_datecode` - Hides the date codes from the core names in the core selection menu.

`osd_timeout` - The length of time the OSD is displayed when brought up with no inputs pressed. 0 - never time out; the range is 5-3600 seconds.

`osd_rotate` - Rotate the OSD. Useful when rotating your monitor for certain arcade cores. 0 - no rotation, 1 - rotate right (+90°), 2 - rotate left (-90°), and 3 - automatic rotation for vertical arcade cores.

## Debug Settings

`log_file_entry` - Writes the filename under the cursor in the file browser for use by external integrations.

## Adding Core-specific Settings

It is possible to specify different settings for different cores; for example, you may prefer to use integer scaling just for the Game Boy Advance core so that you don't need any video filters for smooth scrolling. Add a section at the end of the INI file with the core name in brackets and paste your different settings below it, like so:

```
[GBA]
vscale_mode=1
```

Or, suppose you wanted to add an option to select 8:7 aspect ratio for the SNES core:
```
[SNES]
custom_aspect_ratio_1=8:7
```

The Menu core can have its own settings too. Create a section named `[Menu]` to specify settings for it.

You can also make exceptions for all arcade cores with the `[arcade]` header in the same way, and separate settings for vertically oriented arcade cores with `[arcade_vertical]` — useful if you want a different default video preset for them, like this example:

```
[arcade_vertical]
direct_video=0
```

A trailing `*` in a section name matches any core name with that prefix: `[PSX*]` applies to every core whose name starts with PSX.

Sections named `[video=WxH@R]` apply only while a matching output resolution is active — for example, `[video=1920x1080@60.0]` matches 1920x1080 at 60 Hz, and `[video=1920x1080]` without the refresh rate matches any 1920x1080 mode.
