## Direct Video
Since autumn 2019, *Direct Video* has provided analog video output without an I/O board. It offers minimal latency comparable to the I/O board's VGA output. To use it, enable Direct Video in `MiSTer.ini` and connect a compatible HDMI-to-VGA DAC to the DE10-Nano's HDMI port.

![picture](img/direct-video-dac.jpg)

*You may use an HDMI-to-VGA converter similar to this one.*

*NOTE*: as of 2021-06-27, it seems very hard to find devices that are compatible with VGA-to-SCART adapters, while devices that work with VGA are still easy to find. More info: [Main_MiSTer issue #410](https://github.com/MiSTer-devel/Main_MiSTer/issues/410){target=_blank}

These are historical test results, not a guarantee that currently sold adapters with the same product name use identical hardware.

## Adapters known to work with Direct Video

| Product Name                                       | Store URL                                                                                   | Test-Date  |
|----------------------------------------------------|---------------------------------------------------------------------------------------------|------------|
| ISY IAD-1007, HDMI Adapter                         | https://www.mediamarkt.de/de/product/_isy-iad-1007-hdmi-adapter-2737565.html                | 2022-12-20 |
| HAMA HDMI™-Stecker auf VGA-Buchse, Adapter, 0,15 m | https://www.mediamarkt.de/de/product/_hama-hdmi%E2%84%A2-stecker-auf-vga-buchse-2708216.html| 2022-12-20 |
| HDMI - VGA-adapter                                 | https://www.jula.se/hdmi-vga-adapter-003087/                                                | 2021-06-16 |


## Adapters known NOT to work with Direct Video

| Product Name                                       | Store URL                                    | Test-Date  |
|----------------------------------------------------|----------------------------------------------|------------|
| HDMI till VGA 1080P                                | https://www.amazon.se/gp/product/B08HXRQGXM/ | 2021-06-16 |
| Rankie H001 1080P Aktiv HDTV HDMI till VGA-Adapter | https://www.amazon.se/gp/product/B00ZMV7RL2/ | 2021-06-16 |
| HDMI auf VGA Kabeladapter                          | https://www.amazon.de/dp/B09MF2HXGF          | 2022-08-04 |


## Compatibility

*Direct Video* is compatible with most current cores, but support depends on the core.

RGBS, RGsB, and YPbPr are supported, although YPbPr has less display compatibility in *Direct Video* mode than YPbPr from the I/O board.

Note that output resolution and format can vary from core to core. See [the analog video configuration table](crttable.md) for more information.

## How to Use

First you need a simple DAC with VGA output. DACs based on the AG6200/AG6201 chip (like the one pictured) are proven to work, fairly inexpensive, and easy to find, and many also output analog audio. The only recommendation here is not to hotplug them while the MiSTer is **ON**, since you might damage your HDMI port in the process.

Then you need to add the following line to your [MiSTer.ini](ini.md) file:

`direct_video=1`

This enables *Direct Video* at startup. This bypasses the standard HDMI video scaler and outputs the core's native video timing through the HDMI transmitter, which your DAC converts. The resulting signal is not standard HDMI, so a normal HDMI TV or monitor cannot be used while *Direct Video* is enabled.

The analog video signal from your DAC should work with standard CRTs if the loaded core uses standard CRT refresh frequencies (see [Core Default Resolutions](nativeres.md) for an incomplete list; your results may vary). Depending on which kind of analog signal you want, some further configuration is needed, as described below.

## Setup for RGBS over SCART

For RGBS output over SCART, set `composite_sync=1` in `MiSTer.ini`, then connect an RGB-compatible VGA-to-SCART cable to your TV.

For optimal results, [Retro Access](https://retro-access.com/products/mister-io-scart?_pos=1&_sid=97cb11000&_ss=r){target=_blank} sells SCART and BNC cables specifically for use with MiSTer.

**DISCLAIMER:** Many VGA DACs may output a sync signal at **3 volts _or more_** on pin 13 (HSYNC/CSYNC) even when used in *Direct Video* mode! You will need a 470 ohm resistor on the corresponding SCART sync pin to reduce the sync voltage reaching the display's 75-ohm input. A variety of professional video equipment can have wide tolerances for higher-voltage sync signals, but other devices — especially external scalers like the OSSC or XRGB Mini Framemeister — can be damaged by repeated exposure to them. Unless you are 100% certain your equipment can tolerate higher voltage signals, it is _strongly_ recommended that you either purchase a cable that has a 470 ohm resistor inline or add one yourself. Retro Access MiSTer SCART cables, for example, come with a resistor inline by default.

## Setup for YPbPr signals

YPbPr — also known as Component Video — is available in *Direct Video* mode but has limited compatibility. This is due to limitations of HDMI-to-VGA DACs, which were never designed to produce signals in the YPbPr color space, so their output is slightly out-of-spec. It is possible that your display will accept the *Direct Video* YPbPr signal with no issue, but it may also appear bright pink [due to the way many displays process such signals](https://github.com/MiSTer-devel/Main_MiSTer/issues/210#issuecomment-622672178){target=_blank}. For higher YPbPr compatibility you may prefer RGB mode with an external RGB-to-YPbPr transcoder instead, or YPbPr via the I/O board.

To use YPbPr in *Direct Video* mode, set `composite_sync=1` and `vga_mode=ypbpr` in your [MiSTer.ini](ini.md) file. 

You'll also need a sync-on-green circuit on your VGA connection. These can be very simple — just a diode (1N4148) and a 330-ohm resistor (any values between 270 and 390 ohms are advised; too high and the sync signal is too weak, too low and it's too strong).

![picture](img/sync-on-green-circuit.png)

*Connection: from HSync -> anode of diode, cathode of diode -> resistor, resistor to Green signal.*

## Doubling frequency

This is handy for modern monitors that have a VGA input but typically can't handle 15 kHz signals and require 31 kHz analog video. Set `forced_scandoubler=1` in your `MiSTer.ini` to turn a 15 kHz signal into a 31 kHz one (see which cores output 15 kHz video in [Core Default Resolutions](nativeres.md)).


## Color Depth

*Direct Video* carries a 24-bit digital video signal. Analog I/O Board 6.x provides 18-bit VGA output, while I/O Board 9.2 with AV Board 1.2 also provides 24-bit output. A core may internally generate fewer than 24 bits of color, so a 24-bit output path does not necessarily increase the number of colors produced by the core.

Most cheap DACs, like the ones based on the AG6200 chip, don't produce Full Range RGB. They instead produce Limited Range RGB (16-235) or, much more commonly, a non-spec Limited Range variant (16-255). To compensate, you may want to configure the `hdmi_limited` option in your MiSTer.ini to adjust the signal being sent to your DAC.

- Full Range (0-255): `hdmi_limited=0`.
- Limited Range (16-235): `hdmi_limited=1`.
- Limited Range common DAC variant (16-255): `hdmi_limited=2`.
