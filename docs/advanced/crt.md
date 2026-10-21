A few methods connect your MiSTer to a classic CRT display; the two main ones are the VGA port on the Analog I/O board and a Direct Video HDMI-to-VGA adapter plugged into the DE10-Nano's HDMI socket.

*The vast majority of this content is from the guide written by [MikeS11](https://github.com/MikeS11/){target=_blank} and [ArchiveRL](https://github.com/ArchiveRL/){target=_blank} on the MiSTer FPGA GitHub Wiki*

## MiSTer CRT Connectivity Options

### Boards / Adapters

Both methods produce a nearly identical image, which in most cases should match the original hardware's output 1:1. Their pros and cons:

* Analog I/O board
    * Pros: extra features (buttons, LEDs, etc.), doesn't need a SoG mod for component output
    * Cons: more expensive, lower color depth in some cores, can't use Dual SDRAM
* Direct Video
    * Pros: better color depth, much cheaper
    * Cons: no extra features, needs extra modification for component, not all adapters are guaranteed to work

Once you have either an I/O board or a Direct Video adapter, connect it to your TV with a cable and adjust some settings in `MiSTer.ini`.

### Cables

* Consumer TVs (15 kHz) with RGB SCART (via I/O board or Direct Video) — besides the I/O board or Direct Video adapter you'll also need a special cable, which you can either make or buy online. [It's recommended](https://www.retrorgb.com/beware-of-mister-scart-cables.html){target=_blank} to get a cable with a 470-ohm resistor on the Composite Sync line (it's best to ask the seller whether it already has one):
  
    * Some possible sources: [MiSTerAddons (US)](https://misteraddons.com/collections/parts/products/video-cables-hdmi-scart-ypbpr){target=_blank}, [Retro Access (UK)](https://retro-access.com/products/mister-io-scart?_pos=1&_sid=97cb11000&_ss=r){target=_blank}, [UltimateMiSTer (PT)](https://ultimatemister.com/product/rgb-scart-cable/){target=_blank}, [Wolfsoft (DE)](https://www.wolfsoft.de/shop/product_info.php/products_id/15401//mister-premium-rgb-kabel-2m.html){target=_blank}, [Antoniovillena (ES)](https://www.antoniovillena.es/store/product/vga-scart-cable/){target=_blank}.

    * A MiST cable generally works too, but may lack the 470-ohm resistor, and is generally "not guaranteed": [Lotharek (PL)](https://lotharek.pl/productdetail.php?id=171){target=_blank}, [Amigastore (EU)](http://amigastore.eu/en/512-mist-scart-cable-mist-db15-f-to-scart-tv.html){target=_blank}.

    * Another option is to use a VGA-SCART converter, plus normal SCART/VGA cables. Possible sources: [Antoniovillena (SP)](https://www.antoniovillena.es/store/product/vga-scart-adapter/){target=_blank}, [Arcadeforge (DE)](https://arcadeforge.net/UMSA/UMSA-Ultimate-SCART-Adapter::57.html?language=en){target=_blank}, [Retro Upgrades (UK)](https://www.retroupgrades.co.uk/product/vga2scart/){target=_blank}.

    * Note: on a consumer Trinitron, you may also need an extra resistor/potentiometer to fix dull or incorrect colors ([forum link](https://misterfpga.org/viewtopic.php?p=4162#p4162){target=_blank}).

* Consumer TVs (15 kHz) with YPbPr component (via I/O board) — a standard VGA-to-component cable should be enough.

* Consumer TVs (15 kHz) with YPbPr component (via Direct Video) — requires cable modifications to add Sync on Green (SoG). See [Direct Video - Setup for YPbPr Signals](directvideo.md#setup-for-ypbpr-signals) or this forum thread: [Direct Video HDMI to Component CRT 480i TV by thorr](https://misterfpga.org/viewtopic.php?f=33&t=1471){target=_blank}.

* VGA monitors (31 kHz) — a standard VGA cable should be enough.

* PVM/BVM monitors (via I/O board or Direct Video) — a standard VGA-to-BNC cable (3xRGB + HSync) should be fine.

* Commodore monitors — a cable for the 1084S monitor is sold by [UltimateMiSTer (PT)](https://ultimatemister.com/product/mister-commodore-1084s/){target=_blank}.

### Settings

Most of the settings changes are done in your `MiSTer.ini` file, which is located in the `/media/fat/` directory of your SD card. When editing this file, back up your currently working `MiSTer.ini`, then use a fresh `MiSTer.ini` from the official repository ([right-click this link and choose "Save file as"](https://github.com/MiSTer-devel/Main_MiSTer/raw/master/MiSTer.ini){target=_blank}). All `MiSTer.ini` settings in this section assume this default file.

#### Analog I/O board

* Consumer TVs (15 kHz) with RGB SCART  
    `composite_sync=1`

* Consumer TVs (15 kHz) with component  
    `vga_mode=ypbpr`  
    *You might need to flip the SoG switch on the I/O board*

* VGA monitors (31 kHz)  
    `forced_scandoubler=1`

#### Direct Video adapter

* Consumer TVs (15 kHz) with RGB SCART  
    `direct_video=1  `  
    `composite_sync=1`

* Consumer TVs (15 kHz) with component  
    `direct_video=1  `  
    `composite_sync=1`  
    `vga_mode=ypbpr`

* VGA monitors (31 kHz)  
    `direct_video=1  `  
    `forced_scandoubler=1`

* PVM/BVM monitors  
    `direct_video=1  `  
    `composite_sync=1`

### Connecting to composite or S-Video

MiSTer cores now output S-Video / composite (Y/C) natively. The cores generate the two signals on the existing RGB pins: luma (brightness) on the green output and chroma (color) on the red output. An adapter board converts them to the S-Video / composite connectors.

#### Adapter boards

[MiSTerAddons - Active Y/C Adapter](https://misteraddons.com/collections/parts/products/yc-active-encoder-board/){target=_blank}, [Ultimate MiSTer - Active Adapter](https://ultimatemister.com/product/mikes11-active-composite-svideo/){target=_blank}, [Antonio Villena - Active Adapter](https://antoniovillena.com/product/mikes1-vga-composite-adapter/){target=_blank}, and [UltimateMiSTer - Passive Adapter](https://ultimatemister.com/product/mikes1-yc-passive-board/){target=_blank}. There's also an open-source design you can build yourself: [GitHub](https://github.com/MikeS11/MiSTerCRT){target=_blank} / [forum link](https://misterfpga.org/viewtopic.php?f=33&t=2894){target=_blank}. The active adapters are recommended for the best quality in both composite and S-Video, but the passive adapter can be a good alternative.

#### Connection requirements

* S-Video:
    * VGA-to-component cable (only required for some monitors, e.g. Commodore 1702)
    * Custom RCA to S-Video connector
* Composite:
    * VGA-to-component cable plus a 1-male-to-2-female RCA Y-adapter splitter cable. Warning: this method produces severe rainbowing because there is no luma trap.

#### Settings with the Analog I/O board

* Sync-on-green switch: OFF (if you use an active or passive adapter, it generates the sync)
* INI settings:
    * `vga_scaler=0`
    * `composite_sync=1`
    * `vga_mode=svideo` (`cvbs` also works but is not recommended)
    * `ntsc_mode=0` (0 = normal NTSC, 1 = PAL-60, 2 = PAL-M; no cores currently use these)

#### Settings with a Direct Video adapter

* A sync-on-green circuit is required. Active and passive adapters include one; otherwise see [Direct Video - Setup for YPbPr Signals](directvideo.md#setup-for-ypbpr-signals).
* INI settings: the same INI list as [for the Analog I/O board](#settings-with-the-analog-io-board) (the board's physical SoG switch doesn't apply — the adapter's circuit covers it), except `direct_video=1` instead of `vga_scaler=0`.

#### Other RGB to composite / S-Video converters

Instead of relying on MiSTer's native Y/C output, you can use an external converter that takes an RGB or component signal and transcodes it to S-Video or composite.

**These converters have been reported to work well in S-Video mode, but composite has rainbow artifacts and excessive dot crawl. This is currently unavoidable and expected behavior.**

One option is the [Axunworks converter](https://www.axunworks.com/RGB-to-Composite-S-Video-p341706.html){target=_blank}. It requires a VGA-to-BNC cable with BNC-to-RCA adapters, and most likely also suffers from artifacts in composite ([forum thread](https://shmups.system11.org/viewtopic.php?f=6&t=63452&start=270){target=_blank}). Other options reported to work well are converters from the eBay seller "wakabavideo" and the "Keene SCART to S-Video" brand.

## Types of CRT displays

There are three main categories of CRTs: consumer televisions, computer monitors, and professional video monitors. Some of these categories overlap in compatibility, but the signals intended for one type of CRT are often not ideal on another. Each category has subcategories that aren't important here. Generally speaking, using a CRT with the MiSTer is not a one-size-fits-all experience.

### Consumer televisions

Typically these are only compatible with a 15 kHz frequency signal (the kind of signal video game consoles used). They were intended to be used with what is known as a "240p" analog signal. From the 1950s up until the late 1980s most consumer televisions only used [RF video](https://en.wikipedia.org/wiki/RF_connector){target=_blank} which is highly susceptible to interference, especially today. Later they began to use [composite video](https://en.wikipedia.org/wiki/Composite_video){target=_blank} (which is still very noisy, but less prone to interference than RF video). Some TVs also supported [S-Video](https://en.wikipedia.org/wiki/S-Video){target=_blank} (a much sharper signal, more resistant to interference), but it was less common. In many European countries these TVs also supported RGB video by way of [SCART connectors](https://en.wikipedia.org/wiki/SCART){target=_blank} (which is about as good as it gets). Finally, near the end of the life of CRT televisions in the late 90s and early 2000s they began to use [component video](https://en.wikipedia.org/wiki/Component_video){target=_blank} and even [HDMI video](https://en.wikipedia.org/wiki/HDMI){target=_blank}.

Most used CRT televisions sold today (in the United States) use composite video or component video. In Europe it is more common — though not guaranteed — to find used CRT televisions with RGB SCART support.

### Computer monitors

Computer monitors were usually designed for higher-resolution 31 kHz signals. They often only had a [VGA connector](https://en.wikipedia.org/wiki/VGA_connector){target=_blank}, with very few offering other options like [DVI](https://en.wikipedia.org/wiki/Digital_Visual_Interface){target=_blank}. Since these displays were made for higher resolutions, running a 240p signal through them can produce jitter or other undesirable effects, even when scandoubled to 31 kHz. Computer monitors handle retro computer video signals excellently, as that is what they were designed for. There are also [multisync monitors](https://en.wikipedia.org/wiki/Multisync_monitor){target=_blank} capable of natively handling 15 kHz (240p) analog signals. These are less common but are highly sought after by the CRT enthusiast community — if you want one monitor to handle all types of signals, consider acquiring a multisync monitor.

### Professional video monitors

Professional Video Monitors (PVMs) also go by other names: [Broadcast reference monitor, Broadcast video monitor (BVM)](https://en.wikipedia.org/wiki/Broadcast_reference_monitor){target=_blank}, Medical Grade Monitor, and more. These displays were designed for professional use, with high-quality components, and were very expensive for their time. PVMs are still made today, but they are now usually very expensive OLED or LCD displays used only in niche business applications. Old PVMs offered a wide variety of connections, sometimes all of the connectors mentioned above, plus specialty connectors such as [BNC connectors](https://en.wikipedia.org/wiki/BNC_connector){target=_blank}, which carry the red, green, blue, and sync signals on separate connectors. Some BNC cable configurations also require a fifth, sync-on-green cable.

For retro hardware, a used PVM has these advantages over consumer CRT televisions:

* Very high-quality designs with more displayed lines (a crisper image), better colors, or superior display technology.
* They were often designed to be easier to service, and had better shielding against electromagnetic interference.
* Since around the mid-80s, most of them seem to have supported native RGB input, so in theory the video quality can be far superior.
* They typically allow very fine control of the image through many dials and buttons on the front.
* Many support simultaneous output, mirroring the image to another display.
* A good number of them are also multisync, supporting both 15 kHz and 31 kHz signals, and many are region-agnostic, supporting 50 Hz PAL and 60 Hz NTSC signals.

Unfortunately, PVMs are incredibly expensive today, so if you don't already have one, it may be very difficult to get one now. It is not uncommon to see a mere 9" PVM selling for over $200, and 19" to 24" displays for anywhere from $500 to over $2000, depending on the model's popularity and features.
