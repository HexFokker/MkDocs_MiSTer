The Sony PlayStation (PSX) MiSTer core is the most feature-filled and heavily developed core so far:

* Multiple controller options
* Automatic BIOS region swapping
* Both memory card slots with manual file loading
* Speed-increasing modes
* In-game texture modification

Writing a PSX FPGA implementation is a huge task, and this core by Robert Peip ([FPGAzumSpass](https://www.patreon.com/FPGAzumSpass/){target=_blank}) is still under active development. This page highlights some of its features.

## Controller Support

The MiSTer PSX core supports a very large list of control options that original hardware had available to it.

* [DualShock](https://en.wikipedia.org/wiki/DualShock#DualShock){target=_blank} (later controller with analog sticks and rumble/vibration capability)
* [Digital Pad](https://upload.wikimedia.org/wikipedia/commons/f/f9/PSX-Original-Controller.jpg){target=_blank} (original PSX controller without analog sticks)
* Analog Pad mode (dual analog sticks mode enabled)
* [GunCon](https://en.wikipedia.org/wiki/GunCon#GunCon){target=_blank}
* [NeGcon](https://en.wikipedia.org/wiki/NeGcon){target=_blank} (can also be used as a steering wheel via the "Wheel-NegCon" option in the OSD)
* Racing Wheels (some analog racing wheels work if you switch to "Wheel-Analog" in the OSD)
* [Mouse](https://en.wikipedia.org/wiki/PlayStation_Mouse){target=_blank}
* [Justifier](https://en.wikipedia.org/wiki/Konami_Justifier){target=_blank}
* SNAC (requires a special adapter to use real PSX controller accessories; memory cards and even the PocketStation can technically be used in this mode)
* [Analog Joystick](https://en.wikipedia.org/wiki/PlayStation_Analog_Joystick){target=_blank}
* [Pop'n Music Controller](https://www.resetera.com/threads/popn-music-ot-button-slapping-intensifies.3419/){target=_blank}

### DualShock Support

DualShock controller mode is a catch-all solution. Ideally, it identifies what the game requires and ought to put itself into the right mode (Digital or Analog) for that game. However, some games don't register controller inputs when the controller is in the wrong mode. If this happens, switch to the other mode manually and see whether the problem goes away.

As on the original DualShock controller, you can switch between digital and analog modes with a button press (or several buttons, depending on your controller):

* On a DualShock 4 or DualSense (PS5) controller, press the center touchpad once. Each press switches between Analog and Digital.
* On other controllers, press L3+R3+Up/Down or L1+L2+R1+R2+Up/Down, depending on the "DS mode" setting in the OSD.

## Manual Memory Card Loading

You can load PlayStation memory card files (.mcd or .sav) manually in the OSD. By default, the core automatically fills slot 1 with a blank memory card file, so it is probably best to load your file into slot 2. Alternatively, turn off the Automount Memory Card 1 option in the OSD to stop slot 1 from being filled automatically. If you have a SNAC adapter with a memory card slot connected, the core also supports real PlayStation memory cards over SNAC.

## Libcrypt Support

Some games use a copy-protection scheme called "Libcrypt" and don't work unless it is circumvented. To circumvent it, place an .sbi file with the same name next to the game's .cue file; it is loaded automatically when the CD image is mounted. The whole collection of .sbi files can be downloaded from [redump.info](https://redump.info/sbi/psx/){target=_blank}.

## Audio and Video Options

### Fixed blanks

The original PlayStation gave software developers a wide variety of resolutions, and some games shake the screen by moving the image outside the screen bounds. Both can cause sync loss and unstable scaling when the resolution changes. The Fixed Horizontal Blanks (HBlank) and Fixed Vertical Blanks (VBlank) options stabilize the video output. If you have sync problems, or resolution changes don't look right, try these options.

* **Fixed HBlank** also makes everything fit within the original 4:3 aspect ratio of the PSX video output, so turn it on in nearly all situations if you want the original resolution.
* **Vertical Crop** becomes available when Fixed VBlank is on. It is similar to the 5x scaling in other cores; because many PSX games use either 224p or 216p, it has two settings.
* **Horizontal Crop** is made for some PAL games; see what works best for you.

Examples:

* **Metal Gear Solid** benefits from Fixed HBlank: without Fixed VBlank turned on, the screen shaking in some scenes would make a modern display lose sync.
* **Final Fantasy VII** benefits from Fixed VBlank. Fixed HBlank alone gives the proper 4:3 aspect ratio, but the resolution visibly "jumps" when the game switches from the world map to a battle. With Fixed VBlank and Vertical Crop -> On (224/270), this transition no longer causes a jarring change in resolution or screen position:

![type:video](videos/psx-blanks-ff7.mp4)

There are more games like these; test to see what works best.

### Black Transitions

Some resolution and screen transitions are so quick that the framebuffer isn't fully cleared in DDR3. This option prevents ghost images of previous frames from appearing over scaled video (HDMI or `vga_scaler`).

### Deinterlacing Methods

The MiSTer PSX core supports two methods of deinterlacing the occasional interlaced video on the PlayStation. Weave is the default and often preferred, giving you the most stable image. Bob is very jittery, but may look better on real CRTs in some situations.

### Sync 480i for HDMI

This option syncs the 480i output when playing on an HDMI display. It will improve the speed at which the resolution changes from 480i to 240p for many displays.

### Rotate

If you need to rotate the screen 180°, go to the Audio and Video options in the OSD and toggle "Rotate" on or off.

### Dithering On/Off Toggle

Dithering can be turned on or off. In some games this can cause undesirable color banding; in others it can clean up the checkerboard look without much loss. Find out what works best for each game.

### Render 24-bit

Enables 24-bit rendering, which may make the graphics of some games look much smoother without needing dithering to avoid color banding. Try it out.

### Dither 24-bit for VGA

MiSTer's Analog I/O board was not originally designed with 24-bit RGB color in mind, so only 18-bit video comes out over it. This option will dither 24-bit video sources from the PSX (most situations are not 24-bit, usually just FMV sequences from some games) so the lack of those 6 bits is not apparent over analog video. This has no effect on HDMI video and shouldn't be used if you are using a direct video adapter, which has full 24-bit RGB support.

### Widescreen Hack

The MiSTer PSX core has a widescreen hack mode. Many games are almost entirely 3D, with very little 2D, so the visible landscape can potentially be widened without stretching the 3D models. Some games work well with this, others don't — your results may vary. Multiple aspect ratios are available — 3:2, 5:3, and 16:9 (what most modern displays use) — to leave options open for various displays and games. Example using R4 - Ridge Racer Type 4:

![type:video](videos/psx-widescreen.mp4)

### Texture Filter

The PlayStation didn't have any built-in texture filtering like some other consoles did (Nintendo 64 is a popular example). This means many of the textures had rough edges. In some cases this is fine, but in some games it can be very displeasing. This option in the MiSTer PSX core lets you smooth out the textures on 3D objects. A good example is Tony Hawk's Pro Skater 2, shown in the video below:

![type:video](videos/psx-texturefilter.mp4)

### SPU RAM select

The MiSTer PSX core is the first released core which supports the optional Dual SDRAM modules. This was necessary early in development, as a single SDRAM module didn't have enough bandwidth to hold the test ROMs and small games alongside the other components that needed to be in SDRAM at the same time. Dual SDRAM has not been required for the PSX core for a long time; the official release is a single-SDRAM build compatible with the Analog I/O board.

Toggling this option while a game is running will most likely crash the game. If you have a Dual SDRAM build of the core and you enable this option, you will likely have to reset the game to get it to work.

The only known difference in the Dual SDRAM build of the MiSTer PSX core is imperceptible: the audio samples are measurably more accurate by a tiny fraction of a millisecond — the human ear can't tell that 1 or 2 out of 44,100 samples per second were dropped.

This option to use Dual SDRAM for the SPU is disabled by default in the regular releases of the core. To get a build with Dual SDRAM support, either compile the core yourself from the "PSX_DualSDRAM.qpf" Quartus project file using Quartus 17.0.2, or get the latest test build from the [MiSTer FPGA Discord](https://discord.com/misterfpga){target=_blank} in the #test-builds channel.

## Miscellaneous Options

This section covers the core's speedhacks, which can improve the performance of PlayStation games at the potential cost of some compatibility, and its information overlays.

### Fastboot

Fast boot bypasses the BIOS boot logo and screen when starting a game. This can make it a lot quicker to get into the game; however, a small number of games may exhibit bugs or other compatibility issues. If you notice bugs in a game, turn off Fastboot first before submitting a bug report.

### Unsafe Options

The core offers various options to improve gameplay for some games, but those options cannot be considered stable across all games. If you use one or more of these options, the core will warn you every time you start a game.

_Note_: Please do not report bugs with these options turned on — first confirm whether the issue persists without them.

* **480i to 480p hack:** Renders some games at full 480p resolution, so that 480i 3D games look less jittery and have no horizontal interlacing lines interrupting the image. Only works for some full-3D 480i titles, and may look buggy in some games.
* **Turbo:** Increases CPU, DMA, memory, and GTE performance by ~10% (Low), ~20% (Medium), or 50% (High). Cheats cannot be used while Turbo is on and are disabled automatically.
* **Pause when CD slow:** CD data must be returned in a fixed time frame, otherwise the core will pause until the data has arrived. Disabling this removes these pauses but risks the game hanging when CD data arrives late.
* **PAL 60Hz Hack:** Runs PAL games at 60 Hz. PAL games will often run faster with this hack on. Screen height is limited to 256 lines in this mode, so some games might be cropped.
* **CD Fast Seek:** The CD seeks the next sector in the minimum possible time. Decreases game loading times, but some games depend on the long loading times and will crash.
* **CD Speed:** Runs the CD drive at a fixed higher speed to decrease loading times, but some games depend on the long loading times and will crash. The CD automatically slows to original speed for FMVs or CD audio playback and speeds back up in loading areas. The higher speed rates are more unstable and require proper storage; BIN/CUE files perform better than CHD here.
* **Limit Max CD Speed:** Holds back any new CD data until the game has processed the last data. Mostly useful to prevent CD data overrun when using higher speed modes, leading to overall faster loading times due to fewer read retries.
* **RAM:** 8 MB option from development consoles. Only use for homebrew that requires it, otherwise there is a high chance of crashing games.
* **GPU Slowdown:** Slows down GPU fill rate.

### Overlays

Three information overlays are available, disabled by default:

* FPS Overlay - Frames per second.
* Error Overlay - Error messages (see [Error Messages](#error-messages) below).
* CD Slow Overlay - Displays an indicator that the CD access time is slower than expected. If you use a spinning hard disk or a NAS for ROM storage, the core will pause and wait for data if there is an unexpected delay. This indicator shows when this occurs.

## Using cheats on the MiSTer PSX core

PSX cheats are detected differently from other MiSTer cores. On other cores, the cheat file carries a CRC32 hash in its filename, checked against the CRC32 of the loaded ROM. PSX (and other CD-based cores with cheat support) works differently: CD images are too large for a CRC32 check, so the internal Game ID is scanned instead and the cheats file with the same Game ID is loaded. For example, when Final Fantasy VII Disc 1 is loaded, MiSTer detects Game ID SCUS-94163 and loads `SCUS-94163.zip` from `./cheats/PSX/`. Note that when the Data Cache enhancement is enabled in the OSD, cheats are disabled and will not function. This is by design.

## Core variants

There is an internal variant of this core referred to as `PSX2XCPU` (sometimes abbreviated to just PSX turbo core, or `2X`).

It is *not officially distributed* and needs to be installed manually. We document it here strictly for reference.

This variant introduces a 2x CPU speed-up, from approximately 33 MHz to 66 MHz. Unlike other unofficial/experimental dual-SDRAM variants, it only uses one 128 MB SDRAM board. Very few games benefit from using it in comparison to the official version, as generally the **Turbo** [option](#unsafe-options) in the official core is sufficient.

In the 2X variant with Turbo on, the CPU can run at up to 3–4 times its original speed, which can be too fast: for example, the risk of games hanging is much higher.

The variant is currently a [branch in the core repo](https://github.com/MiSTer-devel/PSX_MiSTer/tree/2xCPU/){target=_blank}.

_Please do not report issues in these experimental builds_.

## Error Messages

If there is a problem recognized by the MiSTer PSX core, an error overlay is displayed, showing which error has occurred. You can hide these messages with the "Error Overlay" OSD option, which is on by default.

List of error codes:

* `E2` - CPU exception (only relevant if the game shows issues)
* `E3` through `E6` - GPU hangs (e.g. corrupt display list)
* `E7` - CPU2VRAM with mask-AND enabled
* `E8` - DMA chopping enabled
* `E9` - GPU FIFO overflow
* `EA` - SPU timeout
* `EB` - DMA and CPU interlock error
* `EC` - DMA FIFO overflow
* `ED` - CPU Data/Bus request timeout — will also appear if the BIOS is not found or is corrupt, or if no SDRAM module is installed
* `EE` - Dotclock used as timer report (only relevant if the game shows issues)
* `EF` - BusWidth for SPU was set to 8 Bit (but should be 16-bit)
