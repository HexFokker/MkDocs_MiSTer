---
hide:
  - toc
---

この表は、CRT に接続する際の各アナログ映像出力モードに必要な `MiSTer.ini` 設定を示します。

## CRT 設定表

| Analog Video Out     | composite_sync= | vga_mode= | vga_sog= | direct_video= | vga_scaler= | forced_scandoubler= |
| -------------------- | :-------------: | :-------: | :------: | :-----------: | :---------: | :-----------------: |
| RGBS Native          | 1               | rgb       | 0        | 0             | 0           | 0                   |
| RGBS Scan-doubled¹   | 1               | rgb       | 0        | 0             | 0           | 1                   |
| RGBS Upscaled²       | 1               | rgb       | 0        | 0             | 1           | 0                   |
| RGBS Direct³         | 1               | rgb       | 0        | 1             | 0           | 0                   |
| RGBHV Native         | 0               | rgb       | 0        | 0             | 0           | 0                   |
| RGBHV Scan-doubled¹  | 0               | rgb       | 0        | 0             | 0           | 1                   |
| RGBHV Upscaled²      | 0               | rgb       | 0        | 0             | 1           | 0                   |
| RGBHV Direct³        | 0               | rgb       | 0        | 1             | 0           | 0                   |
| RGsB Native          | 1               | rgb       | 1        | 0             | 0           | 0                   |
| RGsB Scan-doubled¹   | 1               | rgb       | 1        | 0             | 0           | 1                   |
| RGsB Upscaled²       | 1               | rgb       | 1        | 0             | 1           | 0                   |
| RGsB Direct³⁴         | 1               | rgb       | 1        | 1             | 0           | 0                   |
| YPbPr Native         | 0               | ypbpr     | 1        | 0             | 0           | 0                   |
| YPbPr Scan-doubled   | 0               | ypbpr     | 1        | 0             | 0           | 1                   |
| YPbPr Upscaled²      | 0               | ypbpr     | 1        | 0             | 1           | 0                   |
| YPbPr Direct³⁴       | 1               | ypbpr     | 0        | 1             | 0           | 0                   |
| S-Video Native⁵      | 1               | svideo    | 0        | 0             | 0           | 0                   |
| S-Video Direct³⁵     | 1               | svideo    | 0        | 1             | 0           | 0                   |
| S-Video Converted⁶   | 1               | rgb       | 0        | 0             | 0           | 0                   |
| Composite Native⁵    | 1               | svideo    | 0        | 0             | 0           | 0                   |
| Composite Direct³⁵   | 1               | svideo    | 0        | 1             | 0           | 0                   |
| Composite Converted⁶ | 1               | rgb       | 0        | 0             | 0           | 0                   |

¹ Scan-doubled = 2倍解像度（例：240p → 480p）  
² 上変換解像度は [`video_mode`](videomodes.md) の設定に従う  
³ 外部 "direct video"（HDMI-to-VGA）アダプターが必要 — HDMI スケーラーをバイパスし、`vga_scaler=1` や `video_mode` のアップスケールは使いません。対応コアでは `forced_scandoubler=1` によるコア内部のスキャンダブルが引き続き使えます  
⁴ 外部 "direct video" アダプターは、HS ピンの CSYNC をグリーンに混合する sync-on-green 回路の追加が必要。[Direct Video](directvideo.md#setup-for-ypbpr-signals) を参照  
⁵ Y/C アダプターボードが必要（アクティブまたはパッシブ）  
⁶ 外部 RGB to NTSC/PAL コンバーターが必要  
 **SoG スイッチ：** Analog I/O Board 6.x では、この表のすべての VGA 出力構成で物理 SoG スイッチを **AUTO** のままにします。**OVR** は SoG を強制的にオンにし、`vga_sog` を上書きします。I/O Board 9.2 with AV Board 1.2 には SoG スイッチがありません。どちらのハードウェアでも、表に示された `vga_sog` の値を使います。

提供：[Porkchop Express](https://twitter.com/MisterAddons){target=_blank}
