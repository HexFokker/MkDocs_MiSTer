---
hide:
  - toc
---

This table shows the `MiSTer.ini` settings required for each analog video output mode when connecting to a CRT.

## CRT Configuration Table

| Analog Video Out     | composite_sync= | vga_mode= | vga_sog= | direct_video= | vga_scaler= | forced_scandoubler= |
| -------------------- | :-------------: | :-------: | :------: | :-----------: | :---------: | :-----------------: |
| RGBS Native          | 1               | rgb       | 0        | 0             | 0           | 0 |
| RGBS Scan-doubled¹   | 1               | rgb       | 0        | 0             | 0           | 1 |
| RGBS Upscaled²       | 1               | rgb       | 0        | 0             | 1           | 0 |
| RGBS Direct³         | 1               | rgb       | 0        | 1             | 0           | 0 |
| RGBHV Native         | 0               | rgb       | 0        | 0             | 0           | 0 |
| RGBHV Scan-doubled¹  | 0               | rgb       | 0        | 0             | 0           | 1 |
| RGBHV Upscaled²      | 0               | rgb       | 0        | 0             | 1           | 0 |
| RGBHV Direct³        | 0               | rgb       | 0        | 1             | 0           | 0 |
| RGsB Native          | 1               | rgb       | 1        | 0             | 0           | 0 |
| RGsB Scan-doubled¹   | 1               | rgb       | 1        | 0             | 0           | 1 |
| RGsB Upscaled²       | 1               | rgb       | 1        | 0             | 1           | 0 |
| RGsB Direct³⁴         | 1               | rgb       | 1        | 1             | 0           | 0 |
| YPbPr Native         | 0               | ypbpr     | 1        | 0             | 0           | 0 |
| YPbPr Scan-doubled   | 0               | ypbpr     | 1        | 0             | 0           | 1 |
| YPbPr Upscaled²      | 0               | ypbpr     | 1        | 0             | 1           | 0 |
| YPbPr Direct³⁴       | 1               | ypbpr     | 0        | 1             | 0           | 0 |
| S-Video Native⁵      | 1               | svideo    | 0        | 0             | 0           | 0 |
| S-Video Direct³⁵     | 1               | svideo    | 0        | 1             | 0           | 0 |
| S-Video Converted⁶   | 1               | rgb       | 0        | 0             | 0           | 0 |
| Composite Native⁵    | 1               | svideo    | 0        | 0             | 0           | 0 |
| Composite Direct³⁵   | 1               | svideo    | 0        | 1             | 0           | 0 |
| Composite Converted⁶ | 1               | rgb       | 0        | 0             | 0           | 0 |

¹ Scan-doubled = 2x resolution (e.g. 240p → 480p)  
² Upscaled resolution follows [`video_mode`](videomodes.md)  
³ External "direct video" (HDMI-to-VGA) adapter required — bypasses the HDMI scaler and does not use `vga_scaler=1` or `video_mode` upscaling. Core-level scan-doubling with `forced_scandoubler=1` remains available on supported cores  
⁴ External "direct video" adapter requires an added sync-on-green circuit that mixes the CSYNC from the HS pin into green — see [Direct Video](directvideo.md#setup-for-ypbpr-signals)  
⁵ Y/C adapter board required (active or passive)  
⁶ External RGB to NTSC/PAL converter required  
 **SoG switch:** On Analog I/O Board 6.x, leave the physical SoG switch in **AUTO** for every VGA-output configuration in this table — **OVR** forces SoG on and overrides `vga_sog`. I/O Board 9.2 with AV Board 1.2 has no SoG switch. On both hardware types, use the `vga_sog` values shown in the table.

Credit: [Porkchop Express](https://twitter.com/MisterAddons){target=_blank}
