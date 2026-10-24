## Direct Video
Since autumn 2019, *Direct Video* has provided analog video output without an I/O board. It offers minimal latency comparable to the I/O board's VGA output. To use it, enable Direct Video in `MiSTer.ini` and connect a compatible HDMI-to-VGA DAC to the DE10-Nano's HDMI port.

## Compatibility

*Direct Video* support depends on the core. Supported output formats include RGBS, RGBHV, RGsB, YPbPr, and native Y/C for S-Video or Composite on cores that support it; native Y/C also requires a Y/C adapter board. Output timing and format vary by core — see the [analog video configuration table](crttable.md) for the required settings and external hardware.

## How to Use

Use a compatible HDMI-to-VGA DAC. AG6200/AG6201-based adapters have been reported to work, and many also output analog audio. Do not connect or disconnect the adapter while the MiSTer is powered on — hot-plugging may damage the HDMI port.

![picture](img/direct-video-dac.jpg)

*You may use an HDMI-to-VGA converter similar to this one.*

Then add the following line to your [MiSTer.ini](ini.md) file:

`direct_video=1`

This enables *Direct Video* at startup, bypassing the standard HDMI video scaler and outputting the core's native video timing through the HDMI transmitter, which your DAC converts. The resulting signal is not standard HDMI, so a normal HDMI TV or monitor cannot be used while *Direct Video* is enabled.

The display must accept the core's horizontal and vertical scan rates and the selected signal format — see [Core Default Resolutions](nativeres.md) for an incomplete list of core timings. Further configuration depends on which analog signal you want, as described below.

## Setup for RGBS over SCART

For RGBS output over SCART, set `composite_sync=1` in `MiSTer.ini`, then connect an RGB-compatible VGA-to-SCART cable to your TV.

**Warning:** Many HDMI-to-VGA DACs output **3 V or more** on VGA pin 13 (HSync/CSYNC). For SCART, use a cable with a 470 Ω resistor inline on the sync signal, or add one yourself, to reduce the voltage reaching the display's 75 Ω input. Higher-voltage sync can damage equipment such as the OSSC or XRGB Mini Framemeister. Do not omit the resistor unless you have confirmed that your equipment can tolerate the DAC's sync voltage.

## Setup for YPbPr signals

*Direct Video* YPbPr has limited display compatibility because HDMI-to-VGA DACs were not designed for the YPbPr color space and may produce slightly out-of-spec output. Some displays accept it, while others show a bright pink image [due to the way many displays process such signals](https://github.com/MiSTer-devel/Main_MiSTer/issues/210#issuecomment-622672178){target=_blank}. If this occurs, use YPbPr from the I/O board or an external RGB-to-YPbPr transcoder.

To use YPbPr in *Direct Video* mode, set `composite_sync=1` and `vga_mode=ypbpr` in your [MiSTer.ini](ini.md) file.

Add a sync-on-green circuit to the VGA connection using a 1N4148 diode and a 330 Ω resistor. Values between 270 and 390 Ω are acceptable; outside this range the sync signal may be too weak or too strong.

![picture](img/sync-on-green-circuit.png)

*Connect VGA pin 13 (HSync/CSYNC) to the diode's anode. Connect the diode's cathode through the resistor to VGA pin 2 (green).*

## Scan-doubling for 31 kHz output

Some VGA monitors do not accept 15 kHz video. On supported cores, set `forced_scandoubler=1` in `MiSTer.ini` to double a 15 kHz signal to approximately 31 kHz. See [Core Default Resolutions](nativeres.md) for core output timings.

## Color Depth

*Direct Video* carries a 24-bit digital video signal. Analog I/O Board 6.x provides 18-bit VGA output, while I/O Board 9.2 with AV Board 1.2 also provides 24-bit output. A core may internally generate fewer than 24 bits of color, so a 24-bit output path does not necessarily increase the number of colors produced by the core.

## RGB Output Range

Most cheap DACs, like the ones based on the AG6200 chip, don't produce Full Range RGB. They instead produce Limited Range RGB (16-235) or, much more commonly, a non-spec Limited Range variant (16-255). To compensate, you may want to configure the `hdmi_limited` option in your MiSTer.ini to adjust the signal being sent to your DAC.

- Full Range (0-255): `hdmi_limited=0`.
- Limited Range (16-235): `hdmi_limited=1`.
- Limited Range common DAC variant (16-255): `hdmi_limited=2`.

## Historical Adapter Test Results

HDMI-to-VGA DAC compatibility varies, especially with VGA-to-SCART cables — see [Main_MiSTer issue #410](https://github.com/MiSTer-devel/Main_MiSTer/issues/410){target=_blank} for background. These are historical test results, not a guarantee that currently sold adapters with the same product name use identical hardware.

### Adapters reported to work

| Product Name                                       | Store URL                                                                                   | Test-Date  |
|----------------------------------------------------|---------------------------------------------------------------------------------------------|------------|
| ISY IAD-1007, HDMI Adapter                         | https://www.mediamarkt.de/de/product/_isy-iad-1007-hdmi-adapter-2737565.html                | 2022-12-20 |
| HAMA HDMI™-Stecker auf VGA-Buchse, Adapter, 0,15 m | https://www.mediamarkt.de/de/product/_hama-hdmi%E2%84%A2-stecker-auf-vga-buchse-2708216.html| 2022-12-20 |
| HDMI - VGA-adapter                                 | https://www.jula.se/hdmi-vga-adapter-003087/                                                | 2021-06-16 |


### Adapters reported not to work

| Product Name                                       | Store URL                                    | Test-Date  |
|----------------------------------------------------|----------------------------------------------|------------|
| HDMI till VGA 1080P                                | https://www.amazon.se/gp/product/B08HXRQGXM/ | 2021-06-16 |
| Rankie H001 1080P Aktiv HDTV HDMI till VGA-Adapter | https://www.amazon.se/gp/product/B00ZMV7RL2/ | 2021-06-16 |
| HDMI auf VGA Kabeladapter                          | https://www.amazon.de/dp/B09MF2HXGF          | 2022-08-04 |
