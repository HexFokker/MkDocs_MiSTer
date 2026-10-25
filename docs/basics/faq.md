Answers to frequently asked questions about MiSTer. If something is missing, feel free to contribute by editing this page on GitHub with the Edit (pen) icon in the top right.

## About MiSTer

### Is MiSTer hard to set up? Is it really only for technical people who like to tinker?

No and no, although people who enjoy tinkering can get a lot more out of their MiSTer if they wish. The minimum setup only requires attaching an SDRAM board to a DE10-Nano and preparing an SD card. See [the Setup Guide](../setup/requirements.md) for details.

### How does the accuracy of MiSTer cores compare to other FPGA options?

Most MiSTer cores are as accurate as, if not more accurate than, those of any other major FPGA product available today. Most people would not be able to tell these cores apart from the original hardware.

### Does MiSTer have lag?

It depends on your setup, but it ranges from imperceptibly low to around one frame. Near-zero latency is possible with certain equipment and tweaks; see [Input Latency](../advanced/lag.md) for a detailed explanation.

### When will MiSTer support cartridges or USB CD drives?

Never, officially. The project aims to give the original hardware experience without needing the original hardware. Supporting cartridges is physically impractical given the number of GPIO pins available from the FPGA. USB CD drives all have different drivers, latency, and buffering, and they would add unpredictable latency compared with the current method of loading CD games. See also [CD-based games](cd.md#will-mister-ever-support-usb-cd-drives).

### Why doesn't MiSTer have a fancy GUI with cover art and metadata?

For several reasons:

1. MiSTer's menu is designed to take up very little space on the FPGA and as few resources as possible on the ARM processor.
2. The DE10-Nano has no graphics processor, so a fancy GUI would be rendered slowly in software by the CPU, unless it were rendered on the FPGA.
3. The menu has to fit and remain usable on a wide variety of very low-resolution analog displays.

### Will any MiSTer core ever get save states?

The Game Boy, GBA, Lynx, WonderSwan, NES, and PSX cores support savestates.

Before savestates can be added, a core must either be written from scratch to support them or be significantly reworked to support pausing. Adding savestates to an FPGA-based emulator is not as simple as adding them to a software emulator. There are no specific plans to add them to other cores at this time, but it may happen one day.

### I heard the DE10-Nano board uses subsidized components. Is MiSTer doomed if that stops?

No. The DE10-Nano is manufactured at a very large scale for students and is widely available. When it reaches end of life, the open-source cores and infrastructure will be ported to another widely available board.

### I see a defect that some other people aren't seeing. Should I get a different DE10-Nano?

No. Report the defect and wait for a fix. There is no magically better DE10-Nano.

### I found some other Cyclone-based dev board on sale and it has built-in WiFi. Can I use it for MiSTer?

Generally, no. Someone may always take the time to port things to another board, but different pins and memory mean the cores won't simply work on it, and unless the board is a significant upgrade it would never get official support. Supporting another platform takes a lot of work, so there are no plans to support multiple unofficial hardware platforms.

## Hardware

### Does MiSTer need an I/O board?

No. The I/O board is optional, but it offers features that may be important to some users, such as 3.5 mm and optical audio, CRT output, and tape audio input.

### Do I need an I/O board to get analog video output to my CRT?

No. You can use an HDMI-to-VGA adapter instead; see [Direct Video](../advanced/directvideo.md).

### Which cores require SDRAM?

See the [Console Cores](../cores/console.md) and [Computer Cores](../cores/computer.md) lists, which are kept up to date. Many [Arcade cores](../cores/arcade.md) require SDRAM as well.

### Why do some cores require an SDRAM add-on board when other cores do not?

Usually because the core needs reliable read and write timing to work properly without bugs. The original NES, for instance, accesses the ROM directly, so its timings are much tighter and SDRAM is required. The DE10-Nano's built-in DDR3 memory has variable latency for random reads and writes, which makes it unsuitable for systems that need reliable timing.

### Do I need the official USB Hub Add-On Board?

No, but you will probably want at least an inexpensive OTG hub, such as the [MakerSpot Micro USB OTG Hub](https://www.amazon.com/MakerSpot-Accessories-Charging-Extension-Raspberry/dp/B01JL837X8){target=_blank}, or a regular hub with an adapter. Use a powered hub if you have many devices.

### Do I need to have a USB keyboard with me to use MiSTer?

Yes, it's a good idea to always have a USB keyboard available. A cheap, compact wireless keyboard reduces clutter.

### What power supply is compatible with MiSTer?

The DE10-Nano needs a 5 V power supply rated for at least 2 A, with a center-positive coaxial "barrel" plug of 5.5 mm outer diameter, 2.1 mm inner diameter, and 11.0 mm length.

If you use a USB Hub add-on board with a lot of power-hungry peripherals (WiFi, Bluetooth, multiple controllers, a mechanical hard drive), consider a similar 5 V supply with more current (4–5 A). Typically this is only needed if you have a mechanical hard drive, make heavy use of the charging port, or power an MT32-Pi from the User IO port, because these draw a lot of current.

### Does my MiSTer need cooling?

A heatsink (passive cooling) is recommended. 22 mm × 22 mm is the ideal size, but 20 mm × 20 mm is more than enough and more common. Active cooling with a fan helps but is not strictly required. Some faster and more complex cores, such as ao486, SNES, N64, and PSX, may generate a lot of heat.

### The DE10-Nano is rated for up to 100°C operation and it doesn't get nearly that hot. Do I really need a fan or heatsink?

A number of complex cores (like ao486) benefit from a cooler chip, because heat can affect the tight timings they require. A heatsink is recommended to avoid any possible glitches, and a fan on top of it is even better. You won't damage your DE10-Nano if you use neither.

### My fan is very loud, is there anything I can do about that?

Probably. Many I/O boards, though not all, have a [jumper](https://en.wikipedia.org/wiki/Jumper_(computing)){target=_blank} near the fan connector that switches the fan's voltage from 5 V to 3 V. It is most likely either next to the fan power connector (you may have to remove the [mezzanine board](../assets/92_av_board.png){target=_blank} to reach it) or on the underside of the board.

Jumper on the top side of the board:

![I/O board with the 5v jumper on the top side](../assets/jumper_top.png)

Jumper on the underside of the board:

![I/O board with the 5v jumper on the bottom side](../assets/jumper_bottom.png)

Moving the jumper to the other position should slow the fan down and make it quieter.

### My MiSTer needs a case. What should I do?

Either make one yourself or buy one from an online vendor. For DIY, 3D-print files are available online (e.g. on [Thingiverse](https://www.thingiverse.com/search?q=mister+fpga){target=_blank}). See [Cases](case.md) for designs and ideas.

### What kind of screws do I use with the DE10-Nano's 14 mm-long brass standoffs?

M3 screws; 8 mm is a good length.

## Software and updates

### I've seen "Update Framework" or "Update Sys" in the news. What does that mean?

The "framework" (or "sys") contains the elements that all cores share, such as I/O and video scaling. The message means that the framework part of that core was updated.

### Can I customize the update/downloader script to ignore certain things?

Yes. Add filters to `/media/fat/downloader.ini` as described in [this guide](https://github.com/MiSTer-devel/Downloader_MiSTer/blob/main/docs/download-filters.md){target=_blank}.

### Can I use the downloader script to download more cores than it currently does?

Yes. The downloader script supports custom databases; see [this guide](https://github.com/MiSTer-devel/Downloader_MiSTer/blob/main/docs/custom-databases.md){target=_blank}.

### What are unstable cores? How do I install one?

Unstable cores are built automatically from the latest commits to a core's repository, so they include the developers' most recent changes and are updated whenever new code is pushed. They may contain bugs or unfinished features, but they eventually mature into a stable release. The update scripts intentionally don't install them, but there are good reasons to install one, such as testing a bug fix or a new feature. Not every core has automated unstable builds.

Unstable builds are uploaded to the [MiSTer-unstable-nightlies GitHub organization](https://github.com/MiSTer-unstable-nightlies), which hosts forks of the core repositories. Download them from the Releases tab of the core's repository. Ignore the `releases` folder in the repository's file tree: it contains the stable upstream builds. To install a build, copy its `.rbf` file to the appropriate folder on your MiSTer's MicroSD card. You may want to use a dedicated `/_Unstable/` folder to keep these builds separate from stable cores.

### Why doesn't this core from another repo work? Why is MiSTer so hard to use?

MiSTer repositories are self-contained, and the official updater script only fetches cores from the active official MiSTer repositories. Cores from other repositories are not fully integrated, so your results may vary. Some of their developers have their own Discord servers or forums where you can ask for support.

### How do I make MiSTer boot into the NES core and a specific game?

Combine two options, autobooting a core and starting the core with a given ROM:

* In `MiSTer.ini`, set `bootcore=NES_20201102.rbf` (or the core version you have), and comment out `;bootcore_timeout`.
* In your NES games folder (e.g. `/media/fat/games/NES/`), copy the FDS BIOS as `boot0.rom` and the `.nes` ROM you want to boot as `boot1.rom`.

For more options, see the [NES core documentation](https://github.com/MiSTer-devel/NES_MiSTer#installation){target=_blank}.

## Controllers

### Can I use original console controllers?

Yes. Many USB adapters for original console controllers are available; see the USB controller recommendations below. They can also be connected directly to the I/O board's User port (SNAC), as described below.

### Any USB controller recommendations?

Almost any USB controller works with MiSTer, and Bluetooth or 2.4 GHz USB adapters work for wireless. Controllers that many users seem to like and that have low input latency:

* [Sony DualSense (PS5 Controller)](https://www.playstation.com/en-us/accessories/dualsense-wireless-controller/){target=_blank} - Very low lag, fast pairing, and a touchpad that can be used as mouse input in cores with mouse support (for example, for SNES lightgun games or as a spinner).
* [8BitDo M30 Bluetooth](https://www.8bitdo.com/m30/){target=_blank} and [8BitDo M30 2.4G](https://www.8bitdo.com/m30-2-4g-for-genesis-mini-mega-drive-mini/){target=_blank} - These have fewer buttons than PlayStation-style controllers and no analog sticks, so they may limit you if they are your only controllers.
* [8BitDo SN30 Pro 2](https://www.8bitdo.com/pro2/){target=_blank} - Versatile connectivity and a comfortable design, similar in shape to the PlayStation DualShock, with an SNES look and button layout.
* [8BitDo Arcade Stick](https://www.8bitdo.com/arcade-stick/){target=_blank} - Low lag both wired and wireless, with somewhat low lag variation; the pushbuttons and joystick can be replaced (DIY).
* [iBuffalo SNES Controller](https://www.amazon.com/Buffalo-iBuffalo-Classic-USB-Gamepad/dp/B002B9XB0E/){target=_blank} - A little overpriced now, but one of the lowest-lag controllers tested.

There are many, many more. [MiSTerAddons' input latency tests](https://rpubs.com/misteraddons/inputlatency){target=_blank} can help you decide, and see the [USB overclock instructions](../advanced/lag.md) for the fastest response.

Excellent USB adapters for original console controllers:

* [UltimateMiSTer.com's DaemonBite adapters](https://ultimatemister.com/product-category/daemonbite-adapters/){target=_blank} (Portugal) - Support multiple kinds of controllers, using an RP2040 chip and the GP2040 firmware.
* [MiSTerAddons.com's Reflex Adapt](https://misteraddons.com/products/reflex-adapt){target=_blank} (USA) - One main device that supports multiple controller types through [separate adapter cables](https://misteraddons.com/products/hdmi-controller-adapters){target=_blank}.
* [Timville Triple Controller DaemonBite](https://www.tindie.com/products/timville/triple-controller-classic-gaming-usb-adapter/){target=_blank} (USA) - A spinoff of MickGuyver's DaemonBite adapters that supports original NES, Genesis, and SNES controllers. You can also build it yourself with [these instructions](https://github.com/timville85/TripleController){target=_blank}. A 3D-printed housing is available for purchase, or you can print it yourself from [these 3D files](https://www.thingiverse.com/thing:5011783){target=_blank}.
* [2600-daptor D9](http://www.2600-daptor.com/){target=_blank}

### Can I increase the polling rate of my USB controller to improve input latency?

Yes. See [Input Latency](../advanced/lag.md).

### How do I add a second controller to MiSTer?

With no core loaded, plug in the controller and set it up in the Menu core, then define it in the OSD of each core as needed. This is only necessary if the controller is a different make/model (a different VendorID/ProductID) from the controllers you have already defined; a second DualShock 4, for example, shouldn't need its inputs defined again. For the same reason, different devices that share a VendorID/ProductID may need to be reconfigured whenever you switch between them, and there is currently no way around this. This includes 8BitDo and Mayflash adapters used with multiple controllers, because the ID belongs to the adapter.

### What are the methods for connecting controllers to the serial port of the I/O add-on board?

SNAC (Serial Native Accessory Converter) connects original controllers directly to supported cores (SNES, Genesis, NES, and TG16). SNAC adapters are sold online by various sellers:

* [MiSTerFPGA.co.uk's SNAC adapters](https://misterfpga.co.uk/product/mister-snac-controller-adapters/){target=_blank} (best used with their [SNAC extension cable](https://misterfpga.co.uk/product/mister-snac-extension-cable/){target=_blank})
* [UltimateMiSTer.com's SNAC Adapters](https://ultimatemister.com/product-category/mister-snac/){target=_blank} (best used with their [SNAC extension cable](https://ultimatemister.com/product/snac-extension-c64-iec-mt32-pi/){target=_blank})
* [MiSTerAddons.com's SNAC V1](https://misteraddons.com/products/mister-fpga-serial-native-accessory-converter-snac){target=_blank}, [SNAC V2](https://misteraddons.com/products/snax){target=_blank}, and [SNAC V3](https://misteraddons.com/products/snax64){target=_blank}, all of which use [external controller adapters](https://misteraddons.com/products/hdmi-controller-adapters){target=_blank} made for them and sold separately.

For details on SNAC, see [this page](https://github.com/blue212/SNAC){target=_blank}.

### What about light guns?

Original light guns such as the NES Zapper are too timing-sensitive to work over USB, but they work fine in supported cores through the I/O board (SNAC, see above).

MiSTer also supports several USB light guns, such as the GunCon 2, GunCon 3, Gun4IR, and Sinden:

* GunCon 2 requires a CRT and a way to tap into the sync signal.
* GunCon 3 and Gun4IR work on all displays.
* Sinden requires a modern display and dedicated files for MiSTer.
* Reflex Adapt supports an overclocked GunCon 1, which performs better than the GunCon 2 when 1 ms (1000 Hz) polling is enabled.

Each core requires its own calibration. Calibrate your gun from the distance you plan to play at, and use a white screen for best results.

Never let the calibration value go below 0: saving a calibration with a negative value will likely make the core crash. To fix this, delete the core's light gun calibration file from the "config" folder on your MiSTer's MicroSD card.

## Video

### How do I set up MiSTer for 1080p, shimmer-free gameplay?

Run the updater script, then use one of the video presets and filters it installs, in the Video Processing menu of the secondary OSD. See [Video Configuration](video.md) for details.

### How do I get the scanline filters on my MiSTer to look good?

For the best results, without shimmering artifacts during motion, use integer scaling: set `vscale_mode=1` in `MiSTer.ini`, or use the core's own integer scaling options (and 5x, if supported). Not all cores have OSD options for integer scaling.

"Integer scaling" means the source resolution (e.g. 240p) is scaled to the target resolution (e.g. 1080p) by a whole-number factor only (1, 2, 3, 4...). With the MiSTer set to 1080p in `MiSTer.ini` and a core that natively outputs 240p, integer scaling enlarges the image 4x (4 × 240 = 960). The remaining 120 lines are left as black borders at the top and bottom of the screen.

You can use other settings if you want the scaler to fill the screen, but scanlines won't be "perfect" unless the source resolution divides evenly into the target resolution (e.g. 240p into 1200p at 5x).

### I have a 4K or other higher-than-1080p display, does MiSTer support that resolution? I'd like to enjoy better video scaling.

MiSTer can't quite reach 4K. To change the resolution, edit `MiSTer.ini` on your SD card: for example, `video_mode=12` for 1920x1440p or `video_mode=13` for 2048x1536p (the hardware maximum). `video_mode=14` gives 2560x1440p using your display's pixel repetition feature, but your display's upscaling may then cause some tearing or resizing artifacts. Whether these higher resolutions work may depend on your display and signal chain.

### Other cores work but I get a black screen for this one. What do I do?

Try setting `vsync_adjust` to 0 (this was the default setting), because your display may not support all refresh rates.

## CD games

### My CD games don't work! Help!

Unzip them; CD games must not be zipped. Use ISO/WAV/BIN/IMG + CUE files or CHD. See [CD-based games](cd.md) for how to store them.

### How do I handle multidisc games? The core keeps resetting when I change to another disc!

Put all discs of the game in the same subfolder; the core then shouldn't reset when you mount the next disc. See [Multi-disc games](cd.md#multi-disc-games) for an example.

### What version of the CD card BIOS do I need for TurboGrafx-16 CD/PC Engine CD?

Use the Japanese version 3.0, commonly found as `Super CD-ROM System (Japan) (v3.0).pce`.

## Menu and screenshots

### How do I change the wallpaper/background on the Menu core when I turn on my MiSTer?

By default, the Menu core background shows simulated TV static. Press F1 in the Menu core to cycle through color bars, plain black, and a wallpaper.

The wallpaper option looks for `menu.jpg` or `menu.png` in the root of your MicroSD card (`/media/fat/` when the MiSTer is running). If neither file exists, it picks a random `.png` or `.jpg` from the `./wallpapers` folder each time the Menu core loads. The image's EXIF rotation metadata affects its orientation; if the image appears rotated, change this value with an online EXIF editor.

### Can you take screenshots on the MiSTer?

Yes. Press ++win+prtsc++ for an upscaled screenshot, or ++shift+win+prtsc++ for the raw output of the core (which may be distorted or have an odd aspect ratio). Screenshots are stored in `./screenshots`, in a folder named after the core.

These screenshots are simple and don't include any video processing effects. To capture the fully processed image you see on a modern display, you need a capture card that supports the desired resolution. A card often used in the community is the [Magewell USB HDMI Gen 1 or Gen 2](https://www.magewell.com/products/usb-capture-hdmi-gen-2){target=_blank}, which can be found used on eBay for a fraction of the retail price.

[Example: raw screenshot from the NES core](img/raw_screenshot.png){target=_blank}

[Example: upscaled screenshot from the Neo Geo core](img/upscaled_screenshot.png){target=_blank}

## Why use FPGA when other proven solutions exist, such as Raspberry Pi?

*The following was originally written by Sorgelig, founder of MiSTer FPGA*

There are debates about how to refer to the process of simulating real hardware using FPGA. Some people insist it's not emulation but rather true hardware replication, while any simulation using a traditional CPU should be referred to as emulation. I have my own opinion here. :) From my point of view, if the FPGA code is based on the circuitry of real hardware (along with the usual tweaks for FPGA compatibility), then it should be called *replication*. Anything else is *emulation*, since it uses different kinds of approximation to meet the same objectives. Currently, it's hard to find a core that can truly be called a replica – most cores are based on more-or-less functional recreations rather than true circuit recreation. The most widely used CPU cores – the Z80 (T80) and MC68000 (TG68K) – are pure functional emulations, not replications. So it's okay to call FPGA cores emulators, unless they are proven to be replicas.

To go back to the original question, then, why FPGA, if it's also just emulation? Well, FPGA emulation is fundamentally different than emulation on a CPU. Traditional emulators on CPUs execute code sequentially. This is a tricky method of emulation because real hardware has many chips and all of them work in parallel. The CPU, video chip/logic, audio chip, memory arbiter – all of them are working at the same time. So a traditional emulator has to take care of all these parts and try to emulate the whole orchestra at the same time by quickly "running" from one chip to another. This requires a lot of CPU power to emulate even an old and slow retro computer. Sometimes even a modern CPU working at 100 times the speed of the retro computer is not enough, so the emulator has to use approximation, skip emulation of some less important parts, or assume some standard work of the emulated system without extraordinary usage. Let's take a well-known emulator, UAE, emulating an Amiga. On a Raspberry Pi 3, you can run some Amiga CPU benchmarks and get crazy numbers like 100 times the original 68000 processor. So you may assume you have an emulated Amiga that is 100 times faster than the real one. No, you don't. If you run different kinds of demos or games, you will see the video stutter sometimes. For example, if you play the well-known "State of the Art" demo by Spaceballs, you will notice video stuttering at some points, while a real Amiga 600 with 1x CPU speed plays the whole demo very smoothly. This is how traditional emulators on Raspberry Pi work.

FPGA emulation works very differently from traditional emulation on CPU. An FPGA is a large array of simple triggers and other logic – just like any other chip/CPU. The only difference is that specific chips/CPUs have these triggers and logic permanently connected, while FPGA allows you to connect them however you want. A special HDL (hardware description language) describes how to connect all these triggers/logic cells. Everything in FPGA works in parallel like in the original chips/devices. Thus, FPGA is pretty close to the original hardware. FPGA doesn't need high frequencies to emulate retro computers; it works at much lower frequencies than traditional emulators require. Since everything in FPGA works in parallel, it is no problem to handle any possible usage of the emulated system. Developers using FPGA usually concentrate on the specific part to make it work correctly – and it will work as it should in any possible scenario. In the same reference demo, "State of the Art," using FPGA emulation, you can see smooth video through the whole playback, as on the original hardware.

You may want to ask, "So why not make all emulators on FPGA then?" The answer is: FPGA programming is not so trivial. Every bit in FPGA works in parallel, so the developer needs to think in parallel as well :). What is trivial on CPU is not trivial on FPGA – although some parts that are trivial on FPGA cost a lot in CPU code.
