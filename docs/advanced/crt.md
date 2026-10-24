MiSTer has two native analog output paths: VGA output from an I/O board, or Direct Video through a compatible HDMI-to-VGA adapter connected to the DE10-Nano's HDMI port.

*Based in part on the CRT guide by [MikeS11](https://github.com/MikeS11/){target=_blank} and [ArchiveRL](https://github.com/ArchiveRL/){target=_blank} on the MiSTer FPGA GitHub Wiki, with substantial revisions.*

## Output paths

Both paths carry the core's video with minimal processing and normally produce nearly identical results.

* **I/O board VGA output** — Analog I/O Board 6.x, or I/O Board 9.2 with AV Board 1.2
    * Pros: extra features such as buttons and LEDs; built-in sync circuitry for component output, so no cable modification is needed
    * Cons: more expensive; cannot use Dual SDRAM while providing VGA output
* **Direct Video adapter**
    * Pros: much cheaper
    * Cons: no extra features; component output requires an additional sync circuit; not all adapters are guaranteed to work

## Standard RGB / component connections

`MiSTer.ini` is in `/media/fat/` on your SD card — back up your working file, then start from a fresh copy from the official repository ([right-click this link and choose "Save file as"](https://github.com/MiSTer-devel/Main_MiSTer/raw/master/MiSTer.ini){target=_blank}); the settings below assume this default file. With a Direct Video adapter, always add `direct_video=1`. The [CRT configuration table](crttable.md) page lists every output mode and its full INI values.

* **Consumer TV with RGB SCART (15 kHz)** — a SCART cable with a 470-ohm resistor on the composite sync line; [it's recommended](https://www.retrorgb.com/beware-of-mister-scart-cables.html){target=_blank} to ask the seller whether one is built in. Sources: [MiSTerAddons (US)](https://misteraddons.com/collections/parts/products/video-cables-hdmi-scart-ypbpr){target=_blank}, [Retro Access (UK)](https://retro-access.com/products/mister-io-scart?_pos=1&_sid=97cb11000&_ss=r){target=_blank}, [UltimateMiSTer (PT)](https://ultimatemister.com/product/rgb-scart-cable/){target=_blank}, [Wolfsoft (DE)](https://www.wolfsoft.de/shop/product_info.php/products_id/15401//mister-premium-rgb-kabel-2m.html){target=_blank}, [Antoniovillena (ES)](https://www.antoniovillena.es/store/product/vga-scart-cable/){target=_blank}. A MiST cable usually works too but may lack the resistor: [Lotharek (PL)](https://lotharek.pl/productdetail.php?id=171){target=_blank}, [Amigastore (EU)](http://amigastore.eu/en/512-mist-scart-cable-mist-db15-f-to-scart-tv.html){target=_blank}. Alternatively use a VGA-SCART converter: [Antoniovillena](https://www.antoniovillena.es/store/product/vga-scart-adapter/){target=_blank}, [Arcadeforge](https://arcadeforge.net/UMSA/UMSA-Ultimate-SCART-Adapter::57.html?language=en){target=_blank}, [Retro Upgrades](https://www.retroupgrades.co.uk/product/vga2scart/){target=_blank}. On a consumer Trinitron you may also need an extra resistor/potentiometer to fix dull or incorrect colors ([forum link](https://misterfpga.org/viewtopic.php?p=4162#p4162){target=_blank}).
    INI: `composite_sync=1`

* **Consumer TV with YPbPr component (15 kHz)**
    * **Analog I/O Board 6.x or I/O Board 9.2 with AV Board 1.2** — a standard VGA-to-component cable. INI: `composite_sync=0`, `vga_mode=ypbpr`, `vga_sog=1`. On Analog I/O Board 6.x, set the SoG switch to **AUTO** so `vga_sog` controls SoG; I/O Board 9.2 with AV Board 1.2 has no SoG switch.
    * **Direct Video** — the cable needs a sync-on-green circuit added; see [Direct Video - Setup for YPbPr Signals](directvideo.md#setup-for-ypbpr-signals) or [this forum thread](https://misterfpga.org/viewtopic.php?f=33&t=1471){target=_blank}. INI: `direct_video=1`, `composite_sync=1`, `vga_mode=ypbpr`

* **VGA monitor (31 kHz)** — a standard VGA cable.
    INI: `forced_scandoubler=1` (plus `direct_video=1` for Direct Video)

* **PVM/BVM with RGBS input** — a standard VGA-to-BNC cable carrying RGB and a separate composite-sync signal.
    INI: `composite_sync=1` (plus `direct_video=1` for Direct Video)

* **Commodore monitors** — a cable for the 1084S is sold by [UltimateMiSTer (PT)](https://ultimatemister.com/product/mister-commodore-1084s/){target=_blank}.

## Native Y/C: S-Video and composite

Supported cores can generate native Y/C signals for S-Video or composite output — luma (Y) on the green output and chroma (C) on the red output. A Y/C adapter board carries these signals to the S-Video or composite jacks and provides the sync. S-Video keeps Y and C separate; composite combines them into a single CVBS signal.

### Adapter boards

[MiSTerAddons - Active Y/C Adapter](https://misteraddons.com/collections/parts/products/yc-active-encoder-board/){target=_blank}, [Ultimate MiSTer - Active Adapter](https://ultimatemister.com/product/mikes11-active-composite-svideo/){target=_blank}, [Antonio Villena - Active Adapter](https://antoniovillena.com/product/mikes1-vga-composite-adapter/){target=_blank}, and [UltimateMiSTer - Passive Adapter](https://ultimatemister.com/product/mikes1-yc-passive-board/){target=_blank}. There's also an open-source design you can build yourself: [GitHub](https://github.com/MikeS11/MiSTerCRT){target=_blank} / [forum link](https://misterfpga.org/viewtopic.php?f=33&t=2894){target=_blank}. Active adapters are recommended for the best quality in both composite and S-Video; the passive adapter is a cheaper alternative.

### Cabling

The exact cabling depends on the adapter and the display — the items below are examples, not parts required for every setup.

* **S-Video** — Y and C must stay on separate wires all the way to the display: a 4-pin mini-DIN connector or separate RCA jacks, depending on the adapter and display. Monitors such as the Commodore 1702 take Y/C on RCA jacks — in that case a "VGA-to-component" cable works purely as a physical VGA-to-RCA breakout (the signal is still Y/C, not YPbPr).
* **Composite** — if the adapter provides a dedicated composite (CVBS) RCA output, connect it straight to the display's composite input. A passive setup can instead combine Y and C with a VGA-to-RCA breakout cable and a 1-male-to-2-female RCA Y-adapter — this lacks a luma trap and can produce severe rainbow artifacts, so it is not the recommended composite setup.

### INI settings

* **Analog I/O Board 6.x or I/O Board 9.2 with AV Board 1.2** — the Y/C adapter generates the sync. On Analog I/O Board 6.x, set the SoG switch to **AUTO**; **OVR** forces SoG on and must not be used here. I/O Board 9.2 with AV Board 1.2 has no SoG switch:
    * `vga_scaler=0`
    * `vga_sog=0`
    * `composite_sync=1`
    * `vga_mode=svideo` (`cvbs` also works but is not recommended)
    * `ntsc_mode=0` (0 = normal NTSC, 1 = PAL-60, 2 = PAL-M; rarely needed — only affects the Y/C subcarrier frequency)

* **Direct Video adapter** — a sync-on-green circuit is required; active and passive adapters include one, otherwise see [Direct Video - Setup for YPbPr Signals](directvideo.md#setup-for-ypbpr-signals). The I/O board's physical SoG switch doesn't apply — the adapter's circuit covers it:
    * `direct_video=1`
    * `composite_sync=1`
    * `vga_mode=svideo` (`cvbs` also works but is not recommended)
    * `ntsc_mode=0`

### External RGB to composite / S-Video converters

Instead of the native Y/C output, an external converter can transcode an RGB or component signal into S-Video or composite. The converters reported here generally worked well in S-Video mode, but their composite output was prone to rainbow artifacts and excessive dot crawl. Examples: the [Axunworks converter](https://www.axunworks.com/RGB-to-Composite-S-Video-p341706.html){target=_blank} (needs a VGA-to-BNC cable with BNC-to-RCA adapters; [forum thread](https://shmups.system11.org/viewtopic.php?f=6&t=63452&start=270){target=_blank}), converters from eBay seller "wakabavideo", and the "Keene SCART to S-Video" brand.

## CRT display types

* **Consumer televisions** — mainly 15 kHz models (240p and 480i); later models may also take higher-rate component or HDMI inputs. Input support varies by region and model: composite was common in North America, RGB SCART was more common — though not universal — in Europe. Signal quality ranks roughly RF < composite < S-Video < component / RGB.
* **Computer monitors** — designed for 31 kHz, usually VGA-only. A 240p signal can produce jitter or other artifacts even when scandoubled to 31 kHz. Some [multisync monitors](https://en.wikipedia.org/wiki/Multisync_monitor){target=_blank} also accept 15 kHz natively, making them a versatile option for different consoles and video timings.
* **Professional monitors** — Sony's PVM/BVM series, [broadcast reference monitors](https://en.wikipedia.org/wiki/Broadcast_reference_monitor){target=_blank}, and medical-grade displays: high-quality builds with higher TVL (sharpness depends on model and condition), native RGB input on many models since the mid-80s, extensive front-panel image controls, easy servicing and good shielding. Many are multisync; 50/60 Hz support varies by model. Connectivity is broad, including BNC inputs — depending on the model, three BNC (RGB with sync-on-green), four (RGB plus composite sync), or five (RGB plus separate horizontal and vertical sync). Used units are expensive and hard to find.
