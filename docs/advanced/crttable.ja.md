---
hide:
  - toc
---

この表は、CRT に接続する際の各アナログ映像出力モードに必要な `MiSTer.ini` 設定を示します。

## CRT 設定表

| Analog Video Out     | composite_sync= | vga_mode= | vga_sog= | direct_video= | vga_scaler= | forced_scandoubler= | SoG Switch⁷ |
| -------------------- | :-------------: | :-------: | :------: | :-----------: | :---------: | :-----------------: | :--------: |
| RGBS Native          | 1               | rgb       | 0        | 0             | 0           | 0                   | AUTO       |
| RGBS Scan-doubled¹   | 1               | rgb       | 0        | 0             | 0           | 1                   | AUTO       |
| RGBS Upscaled²       | 1               | rgb       | 0        | 0             | 1           | 0                   | AUTO       |
| RGBS Direct³         | 1               | rgb       | 0        | 1             | 0           | 0                   | N/A        |
| RGBHV Native         | 0               | rgb       | 0        | 0             | 0           | 0                   | AUTO       |
| RGBHV Scan-doubled¹  | 0               | rgb       | 0        | 0             | 0           | 1                   | AUTO       |
| RGBHV Upscaled²      | 0               | rgb       | 0        | 0             | 1           | 0                   | AUTO       |
| RGBHV Direct³        | 0               | rgb       | 0        | 1             | 0           | 0                   | N/A        |
| RGsB Native          | 1               | rgb       | 1        | 0             | 0           | 0                   | AUTO       |
| RGsB Scan-doubled¹   | 1               | rgb       | 1        | 0             | 0           | 1                   | AUTO       |
| RGsB Upscaled²       | 1               | rgb       | 1        | 0             | 1           | 0                   | AUTO       |
| RGsB Direct³         | 1               | rgb       | 1        | 1             | 0           | 0                   | N/A        |
| YPbPr Native         | 0               | ypbpr     | 1        | 0             | 0           | 0                   | OVR        |
| YPbPr Scan-doubled   | 0               | ypbpr     | 1        | 0             | 0           | 1                   | OVR        |
| YPbPr Upscaled²      | 0               | ypbpr     | 1        | 0             | 1           | 0                   | OVR        |
| YPbPr Direct³⁴       | 0               | ypbpr     | 0        | 1             | 0           | 0                   | N/A        |
| S-Video Native⁵      | 1               | svideo    | 0        | 0             | 0           | 0                   | N/A        |
| S-Video Converted⁶   | 1               | rgb       | 0        | 0             | 0           | 0                   | N/A        |
| Composite Native⁵    | 1               | svideo    | 0        | 0             | 0           | 0                   | N/A        |
| Composite Converted⁶ | 1               | rgb       | 0        | 0             | 0           | 0                   | N/A        |

¹ Scan-doubled = 2倍解像度（例：240p → 480p）  
² Upscaled resolution = video_mode  
³ 外部 "direct video"（HDMI-to-VGA）アダプターが必要 — ネイティブ解像度のみ（アップスケール・スキャンダブル不可）  
⁴ 外部 "direct video" アダプターは Sync on Green（SoG）を通すための改造が必要  
⁵ アクティブ Y/C コンバーターが必要  
⁶ 外部 RGB to NTSC/PAL コンバーターが必要  
⁷ Analog I/O ボード上の物理スイッチ
 
提供：[Porkchop Express](https://twitter.com/MisterAddons){target=_blank}
