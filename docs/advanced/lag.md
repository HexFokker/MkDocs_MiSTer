A common concern among retro enthusiasts is whether a device like MiSTer has _lag_ and whether it creates a less desirable experience than original hardware. 

All electronic equipment exhibits some kind of _latency_, but it only becomes problematic if this latency causes frames to be missed. A frame is ~16.67 ms for a system using a 60 frames per second (60 Hz) display.

Lag is only problematic in a few specific cases:

* Some older games were designed to rely on extremely quick response times (e.g. Punch-Out on NES).
* If the latency is different between two players, it could introduce an unfair advantage.
* Lag that isn't constant can be an issue in games that require precise movement. (Most players can adapt to lag that is consistent.)

For a more detailed overview of lag, see [https://inputlag.science/](https://inputlag.science/){target=_blank}.

## Where lag comes from

There are three major categories of lag: **input** (controllers, mouse, etc.), **processing** (buffering in the core, execution or delays in code), and **display** (the video output to your display device).

### Input
For input, MiSTer primarily uses USB. In this case the overall input lag is the sum of the lag caused by USB polling and the lag from the controller itself (how quickly it processes the signals). The latter is outside the scope of MiSTer and can only be improved by using a better controller. On the MiSTer side, only the lag caused by USB polling can be reduced, and only if the connected USB device supports a lower polling interval. The polling interval is measured in Hz and indicates how often a USB device is polled per second. At 1000 Hz the polling adds at most 1 ms of lag (0.5 ms on average) — a great improvement over the default 125 Hz, which adds up to 8 ms (4 ms on average).

If a game is rendered at 60 frames per second, a single frame takes 1 s / 60 ≈ 16 ms to process. One might think that any polling interval below 16 ms would be perfect; however, USB polling happens independently of the vertical sync. Therefore, even with a 1 ms polling interval, there is a 1/16 chance that the whole frame will be missed and input will be processed on the next frame. The longer the polling interval, the greater the odds of a missed frame. With a polling interval of 8 ms, the odds of input missing a frame are 50%. Native polling rates and input response vary across consoles and even games.

### Processing
Processing is where FPGA emulation has a key advantage. Software emulators repeatedly execute and then wait for the next screen refresh, whereas FPGA cores run in real time, as the original hardware did. In most circumstances, cores therefore have no CPU bottlenecks that slow them down arbitrarily, and need no large extra buffers to hold data.

### Display
MiSTer’s two primary display outputs are analog and HDMI. 

The analog output is driven as the original system would have, with no buffering, so its latency is effectively identical to a real console's — from this point of view, the analog output has no lag of its own.

HDMI output must be scaled up to a higher resolution, which requires additional processing. How much latency the scaler adds depends on the `vsync_adjust` setting: from about 4–30 lines up to roughly 2 frames (see [Video lag](#video-lag) below).

Your television or monitor may add further latency, but this varies by device, so no definite number can be given here.

### Summary

If lag is critical to you, **it's best to play on a CRT using a recommended and widely tested USB controller.** Some users have tested and ranked USB controllers by performance; see their [results](https://github.com/eniva/MisSTer_Guides/wiki/USB-Controllers-Performance-Ranking){target=_blank}. Another thorough list of tested controllers is MiSTerAddons and Lemonici's [MiSTer Input Latency Chart](https://rpubs.com/misteraddons/inputlatency){target=_blank}.

Even over HDMI, however, MiSTer can provide a better experience than many other devices.

## Reducing Lag

### Video lag

The `vsync_adjust` option in `MiSTer.ini` (at the root of the SD card) configures the HDMI upscaler, trading compatibility against latency:

* `vsync_adjust=2` is the best option if your TV is compatible with it. It uses the core's original refresh rate and pixel clock, giving sub-frame latency. According to Grabulosaure, who made the scaler, the actual latency is around 4 to 30 lines with `vscale_mode=1`, and slightly more in other modes ([video](https://www.youtube.com/watch?v=DYfUZ6PG7H4){target=_blank}).
* `vsync_adjust=1` is the second-best option, with 1 frame of latency. It uses a framebuffer, but keeps the system's original vsync and varies the pixel clock per core.
* `vsync_adjust=0` is the weakest option for latency, but the most compatible: up to 1-2 frames of latency and slightly less smooth scrolling. It outputs your fixed `video_mode` timing unchanged — a standard pixel clock and refresh rate — so it is more compatible with modern displays. However, you will notice occasional jitter, because the core's refresh rate doesn't match the display's.

### Input lag

USB controllers usually report a polling interval, which the host (the MiSTer Linux kernel) respects when polling their inputs. Most USB devices can actually perform better when polled more often, without any side effects.

To set a higher USB polling rate, go to the `linux` folder on your SD card and rename `u-boot.txt_example` to `u-boot.txt`. The file contains the following options; change them only if you run into problems:
```bash
v=loglevel=4 usbhid.jspoll=1 xpad.cpoll=1
```
**loglevel**: 4 is the default value. You can set this to 9 to get debugging messages with the `dmesg` command via SSH. See below for how to check the jspoll/cpoll values applied to your controller.

**usbhid.jspoll**: specifies the interval for USB HID controllers, usually DirectInput.

**xpad.cpoll**: specifies the interval for USB XInput controllers. XInput is the controller standard of Microsoft's Xbox consoles and PC, and most popular controllers use it. Its values work the same way as `usbhid.jspoll`'s.

Both parameters take the same values:

* `0` — the default; the value requested by the controller is used (even without a `u-boot.txt`).
* `1` — recommended; 1000/1 = 1000 Hz polling. If you encounter issues, try higher integer values: the higher the interval, the higher the possible lag. Don't go above 8 (1000/8 = 125 Hz).

To check the applied value, run `systool -m usbhid -A jspoll` or `systool -m xpad -A cpoll` from the Linux shell.

## What is the fastest controller I can get?

Almost any standard USB controller works well with MiSTer, but based on user feedback and input lag testing, these are a few excellent choices:

* 8BitDo M30 2.4G connected in wired mode
* Sony DS4 in wired mode
* Hori Fighting Commander (later revisions), either the PS4 or Xbox One variant — pick your favorite
* DIY USB adapter using open source firmware available [here](https://github.com/MiSTer-devel/Retro-Controllers-USB-MiSTer){target=_blank}

Bluetooth-connected devices generally work fine, but expect the highest input latency from them.

Keep in mind that even "high latency" controllers *should* add at most 16 ms (1/60th of a second, one frame) of lag, or rarely, depending on the controller, 32 ms, and not constantly. That is not a lot, so if you don't notice lag, you can safely use any decent USB controller. Variable lag (for instance, response varying between 1 and 3 frames) is more noticeable than consistent lag. Very few controllers add more than 1 frame of lag.

There is no single definitive fastest controller, but quite a few are near the top. For a definitive, community-sourced list, see MiSTerAddons and Lemonici's [MiSTer Input Latency Chart](https://rpubs.com/misteraddons/inputlatency){target=_blank}: the controllers were tested on MiSTer with a separate device connected to the DE10-Nano's headers, for objective results.
