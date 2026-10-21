MiSTer has a built-in scaler that converts the cores' low-resolution video to a higher resolution, optionally using filters to improve the picture on modern displays. This page explains how to configure the scaling options.

## Video Scale Mode (vscale_mode)
The [MiSTer.ini file](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank} at the root of your MicroSD card controls how the core's original video is scaled to your display. A few lines into that file you'll see:

```ini
vscale_mode=0          ; 0 - scale to fit the screen height.
                       ; 1 - use integer scale only.
                       ; 2 - use 0.5 steps of scale.
                       ; 3 - use 0.25 steps of scale.
                       ; 4 - integer resolution scaling, use core aspect ratio
                       ; 5 - integer resolution scaling, maintain display aspect ratio
```

Here's what each does:

### vscale_mode=0 (Fit Vertically to the Display Height)
This is the default setting when you first turn on your MiSTer. If the game resolution is 256x224, fitting it vertically into a 1920x1080p display means dividing 1080 by 224 — which doesn't come out even (`1080 / 224 ≈ 4.82`). Some pixels may therefore not be scaled evenly. Some people don't mind this since it fills the screen entirely from top to bottom. You may see some shimmering pixels — if you do, use the interpolation video preset or one of the adaptive scanline filters to alleviate it.

### vscale_mode=1 (Integer Scaling)
This setting makes the final scaled resolution multiplier of the core's video output a whole number (e.g. 2x, 3x, 4x, 5x, 6x, etc.). If your `#!ini video_mode` is set to 1920x1080p, the previous example of 256x224 is scaled 4 times as large (`4 * 224 = 896`) and the remainder is left as a black border — but your pixels are correctly scaled so there should be no shimmering (unless your display is causing it). Some people prefer this for the crispest pixels and a much lower chance of undesirable video artifacts; others don't like that it doesn't fill the screen the way 0 does.

### vscale_mode=2 and 3 (Fractional Integer Scaling)
This setting is similar to `#!ini vscale_mode=1`, but instead of whole-number increments (e.g. 2x, 3x, 4x, etc.), it scales in increments of 0.5 (e.g. 2x, 2.5x, 3x, 3.5x, 4x) or 0.25 (e.g. 2x, 2.25x, 2.5x, 2.75x, 3x). On some monitors this can greatly reduce shimmering (though not all) while using sharper filtering (or none at all). Test `vscale_mode=2` and `3` per core to see what looks best.

### vscale_mode=4 and 5 (Dynamically Scaled Video Mode)
These modes, recently added by wickerwaka, dynamically change your `#!ini video_mode` to keep integer scaling while still filling the screen. They are ideal on a 2560x1440p or 4K display, where you can fill the screen vertically with very close to zero shimmering and video artifacts. If you don't want to learn how they work, just set one and test it.

#### vscale_mode=4 (Integer resolution scaling using the core's aspect ratio)
If you have `#!ini video_mode=13` set in your [MiSTer.ini file](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank}, then you're telling the MiSTer to set your display to 2048x1536p at a 60 Hz refresh rate. 

Take the 256x224 example, displayed at a 4:3 aspect ratio: you need a resolution that fits all of 256x224 integer-scaled at that ratio (like `#!ini vscale_mode=1` explained above). 2048x1536 is the maximum in either direction. 1536 is almost but not quite 7×224, so MiSTer uses 6 as the multiplier, giving a vertical resolution of 1344. The horizontal resolution has to keep the 4:3 ratio, so 256 scales by the equivalent amount — 1792 — I personally use an [aspect-ratio calculator](https://andrew.hedges.name/experiments/aspect_ratio/){target=_blank} to check.

That looks like a lot of work, but vscale_mode=4 does all of the math for you.

You may have mixed results with vscale_mode=4 — for instance, the PSX core changing resolutions prompts a full resync, which some people find jarring.

#### vscale_mode=5 (Integer resolution scaling maintaining the display's aspect ratio)
This works like `#!ini vscale_mode=4`, but it disregards the core's aspect ratio and only calculates the integer-scaled resolution that fits your screen's aspect ratio. Say you have a 1920x1200 display (16:10 aspect ratio) and are using `#!ini video_mode=1920,1200,60` — the 16:10 aspect ratio will not be changed. This could be useful if you have a specific display you want to fill horizontally with some cores, or a 31 kHz computer monitor that supports higher resolutions where you want to fit console cores into its 4:3 aspect ratio.
