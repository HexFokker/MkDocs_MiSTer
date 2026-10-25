The standard way to play games on MiSTer is from the MicroSD card. This guide covers copying games to the card directly or over the network. For NAS or USB storage, see [Advanced Networking](../advanced/network.md).

## The games folder
ROMs are normally stored in `/games/`. For example, NES ROMs go in `/games/NES/`. Use the folder expected by each core.

## File formats

* **CD images:** Supported formats depend on the core. CUE/BIN and CHD are common, but some cores also accept ISO or other formats. CD images cannot be placed in ZIP archives. Multi-disc support, folder layout, save handling, and disc-changing procedures also vary by core. See [CD-based games](../basics/cd.md) and the core's readme for details.
* **VHD (virtual hard drive) files:** Do not place VHD files in ZIP archives.
* **Other ROMs:** Many ROMs can be placed in ZIP archives, but archive support and the required file layout depend on the core. Check the core's readme on GitHub for supported file types and naming requirements. Some cores also provide documentation in their folder under `/games/`.

## Transfer ROMs over the network with FTP/SFTP/SCP
The MiSTer has FTP and SSH servers enabled by default. SFTP and SCP run over SSH. See [Network Access](../advanced/network.md#network-access) for connection details.

## Transfer ROMs over the network with Samba/SMB
The MiSTer also comes with a Samba server. Once you activate it, the MiSTer's SD card appears on your network like any other shared folder:

1. Go to the Scripts menu in the Menu core and run `samba_on`.
2. On Windows, type `\\MiSTer\sdcard\` in the File Explorer address bar and press Enter.
3. On macOS, open Finder, select **Go → Connect to Server**, and enter `smb://MiSTer/sdcard`. On Linux, use your file manager's network-share dialog with the same SMB address.

![MiSTer FPGA Samba Server File Explorer](img/samba.png)

In this example, ROMs are copied to the `/games/NES/` folder for the NES core:

![ROM Transfer to MiSTer FPGA folder from Windows](img/rom-transferred.png)

## Transfer ROMs to the MicroSD card directly
You can also power off the MiSTer, remove the MicroSD card, and connect it to your computer with a card reader. Copy your games to the appropriate folders on the exFAT partition named `MiSTer`, then safely eject the card before removing it from the computer.

Once your games are on the card, continue to the next step: [Play a Game](play.md).
