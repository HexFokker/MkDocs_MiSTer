MiSTer offers several basic video customization features:

* Adjustable resolution (`video_mode`)
* Framebuffer options (`vsync_adjust`) that reduce input latency and video stutter
* Video filters, including scanlines
* Shadowmasks
* Gamma correction
* 5x overscan mode, which first crops the image to the effective number of lines, then integer-scales it 5x for square pixels on a 1080p display (with some overscan, depending on the game's resolution)

## Video Presets

Video Presets let you load a pre-made configuration that looks good and works in most situations, which makes them a good starting point. Open the OSD, press right, go to Video Processing → Load Preset, and pick one that looks good to you:

![type:video](videos/presets.mp4)

## MiSTer.ini video settings

The [MiSTer.ini](../advanced/ini.md){target=_blank} file contains many video settings; this page covers only a few of them. CRT-specific settings are covered in [Advanced - CRT](../advanced/crt.md){target=_blank}.

You can edit `MiSTer.ini` with any text editor (Windows Notepad, Visual Studio Code, Notepad++, etc.), or run the `ini-settings.sh` script in the scripts folder, which offers a simple interface for changing options.

### video_mode

The `video_mode` option sets the output resolution. The available presets are listed in comments above it:

```
; 0 - 1280x720@60
; 1 - 1024x768@60
; 2 - 720x480@60
; 3 - 720x576@50
; 4 - 1280x1024@60
; 5 - 800x600@60
; 6 - 640x480@60
; 7 - 1280x720@50
; 8 - 1920x1080@60
; 9 - 1920x1080@50
;10 - 1366x768@60
;11 - 1024x600@60
;12 - 1920x1440@60
;13 - 2048x1536@60
;14 - 2560x1440@60 (Pixel Repetition)
```

For example, `video_mode=0` sets 1280x720@60. Most people will probably want 1920x1080@60, so `video_mode=8` is a common choice. The `ini-settings.sh` script also shows which value selects which resolution.

For a detailed explanation of video modes, see [Advanced - Video Modes](../advanced/videomodes.md) (thanks to Wickerwaka).

### vsync_adjust

Most modern displays work fine at 60 Hz, but some games run at a "non-standard" refresh rate, such as 60.6 Hz for arcade Donkey Kong. To handle this, MiSTer uses a framebuffer: the game keeps running at 60.6 Hz while frames are sent to the display at 60 Hz. Because the game produces frames slightly faster than they are sent, the framebuffer occasionally has to adjust, which causes a small stutter. Using a framebuffer adds a minimal amount of lag. `vsync_adjust` controls this behavior:

```ini
vsync_adjust=0
```
Outputs at your monitor's refresh rate (e.g. 60 Hz), with about 1-2 frames of lag. Video can be a little jittery, because the core still runs at its native rate, which isn't exactly 60 Hz.
```ini
vsync_adjust=1
```
Outputs at exactly the game's frame rate (e.g. 60.6 Hz), with 1 frame of lag. Video is very smooth, but this mode is less compatible with modern televisions.
```ini
vsync_adjust=2
```
Draws video to the screen as fast as possible and can achieve consistent sub-frame lag (not counting your controller's and display's own lag). Video is very smooth. However, this is the least compatible mode, and it may result in unplayable behavior on some televisions with certain cores. Because of the way this mode works, the refresh rate of the scaled output also differs from that of the core's original video output.

As a rule of thumb, start at `vsync_adjust=2` for the smoothest video and lowest lag. If a core you want to play doesn't work, reduce it to 1 or 0. Your results may vary depending on your display and the core.

### Variable Refresh Rate (VRR)

MiSTer supports Variable Refresh Rate (VRR). VRR is an alternative to `vsync_adjust`: instead of the scaler adjusting the pixel clock, the display is told to follow the core's changing refresh rate. VRR is only active when `vsync_adjust` is `0`, and it is not used with Direct Video output.

VRR requires an up-to-date [Main MiSTer binary](https://github.com/MiSTer-devel/Main_MiSTer/){target=_blank}. You also need either an updated [MiSTer.ini](https://github.com/MiSTer-devel/Main_MiSTer/raw/master/MiSTer.ini){target=_blank} or the following lines added to your existing one:

```ini
; Variable Refresh Rate control
; 0 - Do not enable VRR (send no VRR control frames)
; 1 - Auto Detect VRR from display EDID.
; 2 - Force Enable Freesync
; 3 - Force Enable VESA VRR
; 4 - Force Enable MiSTer VRR (vsync_adjust must be 0)
vrr_mode=0
; VESA VRR base framerate. Normally set to the current video mode's output framerate
vrr_vesa_framerate=0
```

VRR is off by default, for broad compatibility and to keep the MiSTer easy to use. Set `vrr_mode=1` to auto-detect what your display supports; results vary, and some displays can't sync with this setting. If auto-detection fails, force VRR on with `2` (FreeSync), `3` (VESA HDMI Forum VRR), or `4` (MiSTer VRR). The refresh range sent to the display comes from `refresh_min`/`refresh_max`, falling back to the range reported in the display's EDID. Some displays label FreeSync as "AMD FreeSync", but it is an open standard and not exclusive to AMD products. Some displays also label VESA VRR as "G-Sync", even though it isn't necessarily the same as NVIDIA's proprietary G-Sync standard.

Results with VRR vary. Before changing this setting, make sure you can easily edit `MiSTer.ini`, because the setting may leave you without display output until you revert it. The refresh rate reported by the MiSTer may also differ from the one reported by your TV. This is expected: TVs measure refresh rate with proprietary methods whose accuracy can't be verified without expensive test equipment.

Enabling VRR might give measurably smoother video: Ace reported that the repeated and skipped frames he saw on his display disappeared. Multiple testers also observed better sync stability with some non-standard refresh rates. There is no guarantee your display will behave the same way.

### Core exceptions

You can override settings for specific cores. For example, if a monitor doesn't work well with the low-lag setting on the MegaDrive core, add this section to the **end of the file**:

```ini
[MegaDrive]
vsync_adjust=0
```

Whatever `vsync_adjust` is set to in the main section, the MegaDrive core will now always use `vsync_adjust=0`, the most compatible mode. A wildcard applies one exception to multiple cores:

```ini
[dkong*]
vsync_adjust=1
```

This rule applies to every core whose name starts with `dkong`. You can also make an exception for all arcade cores:

```ini
[arcade]
vsync_adjust=1
```

For the internal core names to use in exceptions, see [Developer Reference - Core Names](../developer/corenames.md).

**NOTE** — Exceptions for individual arcade games use the `<setname>` value from the MRA file, **not** the internal core name. For example, `Arkanoid (Japan).mra` contains:

```xml
<setname>arkanoidj</setname>
```

so the exception for this game is `[arkanoidj]`. For a list of setnames, see [Developer Reference - MRA Setnames](../developer/mrasetnames.md).

## Video processing tutorial

This tutorial walks through the main video processing options.

### Filters and scanlines

MiSTer can apply upscaling filters and scanlines to enhance the video output or make it look like a retro CRT. With the video output set to 1920x1080p, the NES core running Duck Tales should look something like this by default:

[![Duck Tales NES MiSTer FPGA 1920x1080@60 Default Video Output](img/default-video-nes.png)](img/default-video-nes.png){target=_blank}

To improve this, open "Video Processing" in the secondary OSD menu (press F12 or the menu button you assigned, then press right):

![MiSTer FPGA Video Processing options selection](img/video-processing.png)

On this screen, `Video Filter:` defaults to `NearNeighbour`, a nearest-neighbour filter. Scaling 240p video to 1080p requires enlarging each pixel, but 240 doesn't divide evenly into 1080 (1080 / 240 = 4.5), so some pixels can't be perfectly square. Because 4.5 is not an integer, some source pixels must end up 4 output pixels tall and others 5, so scaled pixels are not all the same size. Nearest neighbour keeps every edge hard; interpolation instead smooths the transitions so the uneven sizes are less noticeable.

Select `Video Filter:` to choose a filter file; the label changes to `Horz filter:`. For normally oriented (non-rotated) games, the horizontal filter is the upscaling filter that softens or sharpens the image.

Select `<none>` below it to browse the filter files. For now, select `Interpolation (Medium).txt`, which softens edges and blends the uneven pixel sizes.

![MiSTer FPGA Horizontal Interpolation filter horz filter:](img/horz-filter.png)

The pixels are now a bit smoother:

[![MiSTer FPGA Horizontal Interpolation Medium filter horz filter: NES duck tales](img/interpolation-medium.png)](img/interpolation-medium.png){target=_blank}

Interpolation also softens sharp pixel edges compared with the default nearest neighbour.

For scanlines like those of a CRT (and of the scanline option in some emulators), set `Vert Filter:` the same way. It filters horizontal lines from top to bottom, i.e. vertically. Under `Vert Filter`'s `From File` option, select `Scanlines - Brighter.txt`. The options should now look like this:

[![MiSTer FPGA's Vertical filter Scanlines - Brighter vert filter](img/scanlines-brighter.png)](img/scanlines-brighter.png){target=_blank}

### 5x Vertical Crop (1080p only)

**Note: this feature only works if the output resolution in MiSTer.ini is a 1080p mode.**

With the scanline filter on, you might notice that some scanlines look darker than others. This is because 240p (this game's resolution) doesn't divide evenly into 1080p, but it does divide evenly into 1200 (5 × 240 = 1200). To make the scanlines even, scale the image by an integer factor so every source pixel is the same height: in the regular core menu, select `Video & Audio` → `Vertical Crop` and change `Disabled` to `(216p)5X`. This crops a strip off the top and bottom of the image (hence the name); games designed for CRT overscan usually hide nothing important there. Not all cores have this option; the NES core does.

[![MiSTer FPGA Vertical Crop 5x mode 1080p to 1200p 216p to 5x with overscan](img/5x-vertical-crop.png)](img/5x-vertical-crop.png){target=_blank}

A few lines at the top and bottom are cut off. CRTs typically hid a similar overscan region, and most games keep no information at the edges — but cropping can lose content in games that use the full frame. The `Scanlines - Brighter.txt` scanlines are now evenly spaced, and the image should look a lot better.

This video demonstrates 5x mode:

![type:video](videos/5x.mp4)

### Shadowmasks

Shadowmasks are another layer of options. They modify the red, green, and blue color channels to create effects such as the grille or mask of an old CRT screen or the pixel layout of old LCD handhelds. There are many shadowmasks; this tutorial uses `Squished VGA Bright v2.txt`, in the author's opinion one of the most versatile color shadowmasks. It attempts to resemble consumer computer monitors and some TVs, which had red, green, and blue phosphors in a particular pattern. With this shadowmask added, the same game looks like this:

[![MiSTer FPGA Shadowmasks / Shadow Masks Squished VGA Bright v2.txt 1200p 5x overscan to 1080p with scanlines - brighter.txt](img/squished-vga-bright-v2.png)](img/squished-vga-bright-v2.png){target=_blank}

### Gamma curves

On an old CRT, gamma is the relationship between voltage and brightness. Picture a graph with voltage on the x-axis and brightness (more precisely, luminance) on the y-axis. An old CRT does not respond linearly: at medium voltage, brightness is a lot lower than you'd expect. Modern displays do not reproduce that curve either, though they approximate a similar power-law response.

![MiSTer FPGA documentation gamma explanation graph example](img/gamma-curve.png)  
[Image Source](https://www.japanistry.com/understanding-gamma-in-photography/){target=_blank}

MiSTer applies its own intensity mapping, so gamma filters let you reshape the response toward the CRT-like curve you were used to. This is especially helpful after adding a "brighter" scanline and a shadowmask (which imitates a CRT's phosphors). Gamma is a matter of personal preference, so try it and judge for yourself.

This example applies a very mild gamma curve, `gamma_113.txt` from the `Pure_Gamma` folder, which is allegedly close to a typical consumer CRT's gamma curve.

[![MiSTer FPGA Gamma curve explanation with Shadow Masks Squished VGA Bright v2.txt 1200p 5x overscan to 1080p with scanlines - brighter.txt](img/pure_gamma-gamma_113.png)](img/pure_gamma-gamma_113.png){target=_blank}

This video demonstrates the gamma controls:

![type:video](videos/gamma.mp4)
