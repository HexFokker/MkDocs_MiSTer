The `#!ini video_mode` INI setting supports several ways to specify the video mode.

## Automatic Detection
If no `#!ini video_mode` setting is specified, MiSTer will attempt to determine the correct video mode using EDID information from the display device. This will only work for devices connected to the HDMI port. If a valid video mode cannot be determined, a safe preset is used — 720p, or 1080p if the EDID data indicates Full HD support.

## Video Mode Presets (video_mode)
MiSTer has 15 built-in video mode presets (0–14) covering common display modes for televisions and monitors. For example:
```ini
; Number 8 - 1920x1080 - 60 Hz - 16:9 - FHD 1080p
video_mode=8
```

| Number | Resolution | Refresh (Hz) | Aspect Ratio | Name          |
| ------ | ---------- | ------------ | ------------ | ------------- |
| 0      | 1280x720   | 60           | 16:9         | HD 720p       |
| 1      | 1024x768   | 60           | 4:3          | XGA           |
| 2      | 720x480    | 60           | 3:2          |               |
| 3      | 720x576    | 50           | 5:4          |               |
| 4      | 1280x1024  | 60           | 5:4          | SXGA          |
| 5      | 800x600    | 60           | 4:3          | SVGA          |
| 6      | 640x480    | 60           | 4:3          | VGA           |
| 7      | 1280x720   | 50           | 16:9         | HD 720p PAL   |
| 8      | 1920x1080  | 60           | 16:9         | FHD 1080p     |
| 9      | 1920x1080  | 50           | 16:9         | FHD 1080p PAL |
| 10     | 1366x768   | 60           | 16:9         | WXGA          |
| 11     | 1024x600   | 60           | 128:75       | WSVGA         |
| 12     | 1920x1440  | 60           | 4:3          |               |
| 13     | 2048x1536  | 60           | 4:3          | iPad Retina   |
| 14     | 2560x1440  | 60           | 16:9         | 1440p         |

`video_mode_pal` and `video_mode_ntsc` accept the same values and override `video_mode` when the core's output is ~50 Hz or ~60 Hz, respectively. These overrides only take effect when `vsync_adjust` is non-zero.

## Custom Video Modes
A custom mode can be set by specifying the width, height, and refresh rate like so:
```ini
; 1920x1200 at 75Hz
video_mode=1920,1200,75
```
The maximum width is 4096, the maximum height is 2048, and the refresh rate can be a whole number or a fraction (for example, `59.94`). The DE10-Nano may not be able to output the mode you select, or your display may not accept it. The maximum recommended video frequency is 210 MHz, which limits the maximum resolution to 2048x1536. [Pixel repetition](#hdmi-pixel-repetition-pr) can push resolution further, but it also has limits.

The VESA [Coordinated Video Timings](https://en.wikipedia.org/wiki/Coordinated_Video_Timings){target=_blank} standard is used to calculate the timing information for the requested video mode. By default the reduced blanking version of the standard is used. This is compatible with most flat panel displays but may not be as well supported on older displays and CRT monitors. You can use regular CVT timings by adding the `#!ini cvt` flag to the end of the video mode:
```ini
; 1600x1200 on a CRT monitor
video_mode=1600,1200,60,cvt
```
Regular CVT timing requires a slightly higher clock speed for a given resolution, so some higher-resolution modes aren't achievable with it. An [online video timing calculator](https://tomverbeure.github.io/video_timings_calculator){target=_blank} can help you understand the differences between the two methods.

## Manual Modelines
Video mode timing can be fully specified with a modeline consisting of nine values that define the horizontal timing, vertical timing, and pixel clock.
```ini
video_mode=hact,hfp,hs,hbp,vact,vfp,vs,vbp,fpix
```
Two further values can be appended to set the sync polarities directly: `hpol` then `vpol`, each `0` or `1` (11 values in total).
`hact` and `vact` define the active (visible) size of the video mode in horizontal and vertical pixels, respectively. `hfp`, `hs`, and `hbp` define the duration of the horizontal front porch, sync, and back porch in pixels. `vfp`, `vs`, and `vbp` define the same properties for the vertical timing. Finally, `fpix` is the pixel clock frequency in kHz (pixel clocks are usually specified in MHz, so multiply the MHz value by 1000).

MiSTer modelines are similar to XFree86 modelines, but the information is expressed slightly differently. You can convert an XFree86 modeline to a MiSTer one with morf77's [custom video mode tool](https://github.com/morfeus77/MiSTerTools){target=_blank} (source; the hosted version is offline), used together with a [modeline calculator](https://arachnoid.com/modelines/){target=_blank}.

## Additional Flags
Additional flags can be appended to custom modes and modelines:

 * `#!ini +hsync` / `#!ini -hsync` - set the horizontal sync polarity
 * `#!ini +vsync` / `#!ini -vsync` - set the vertical sync polarity
 * `#!ini pr` - use HDMI pixel repetition (custom modes and modelines; also applied automatically when the width exceeds 2048)
 * `#!ini cvt` - use normal CVT timing (custom mode only)
 * `#!ini cvtrb` - use reduced blanking CVT timing (custom mode only)

## HDMI Pixel Repetition (pr)
HDMI pixel repetition enables MiSTer to output a higher resolution video signal without using additional resources or requiring higher clock speeds. It does this by instructing the ADV7513 HDMI transmitter to duplicate each pixel that it sends to the display. This doesn't increase the fidelity of the final image — in most cases it reduces it — but it enables a wider selection of video modes.

MiSTer is limited to a maximum horizontal resolution of 2048 pixels and a maximum pixel clock of 210 MHz. This is enough for 2048x1536 (209 MHz, iPad resolution), the maximum native resolution supported, and also for 1920x1440 (184 MHz), a non-standard 4:3 resolution that some displays accept. The more commonly supported 2560x1440 mode is out of reach: it exceeds the limits in both horizontal resolution and pixel clock (240 MHz).

Pixel repetition makes a mode like 2560x1440 possible by lowering the horizontal resolution to 1280 pixels, which lowers the pixel clock to 120 MHz. The 1280x1440 image produced by the MiSTer scaler is stretched horizontally by the ADV7513, so the display receives the full 2560x1440.

![Pixel Repetition Pipeline](img/pixel-repeat.png)

Supporting the non-uniform scaling of the core's output requires an updated framework, and pixel repetition only works with cores that have been updated. Older cores output 1920x1080 when a mode requiring pixel repetition is requested.
