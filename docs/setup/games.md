To play games on the MiSTer, transfer them to your MicroSD card. Games can also be loaded in other ways, such as from a NAS or a USB drive (see the [Advanced Networking page](../advanced/network.md)), but this guide sticks to the most basic method.

## The games folder
ROMs are stored in the `/games/` folder: NES ROMs go in `/games/NES`, for instance. Each core looks for its ROMs in a specific folder, so it's best to put them in the right place.

## File formats

* **CD images** must be in CUE/BIN or CHD format and can't be placed in zip archives — they are handled differently from other ROMs. Put each CD game in its own folder, and keep all discs of a multi-disc game in the same folder (e.g. `Final Fantasy VII` discs 1–3 in one `Final Fantasy VII` folder). This lets you change discs without resetting the core, and on the PSX core your save carries over from disc to disc. See [CD-based games](../basics/cd.md) for details.
* **VHD (virtual hard drive) files** must not be zipped either.
* **All other ROMs** can be placed in zip archives. The core shows which file extensions it accepts. If a ROM won't load, the core's readme (on GitHub or in the `/games/$CORE/` folder) should tell you which file types work with that core.

## Transfer ROMs over the network with FTP/SFTP/SCP
The MiSTer has FTP and SSH servers enabled out of the box. See [Network Access](../advanced/network.md#network-access) for how to connect to them.

## Transfer ROMs over the network with Samba/SMB
The MiSTer also comes with a Samba server. Once you activate it, the MiSTer's SD card appears on your network like any other shared folder:

1. Go to the Scripts menu in the Menu core and run `samba_on`.
2. On Windows, type `\\MiSTer\sdcard\` in the File Explorer address bar and press Enter. On Linux and macOS, open the share the way you normally access network shares on your system.

![MiSTer FPGA Samba Server File Explorer](img/samba.png)

In this example, ROMs are copied to the `/games/NES/` folder for the NES core:

![ROM Transfer to MiSTer FPGA folder from Windows](img/rom-transferred.png)

## Transfer ROMs to the MicroSD card directly
You can also turn off the MiSTer, remove the MicroSD card, and plug it into your computer. It has an exFAT partition named "MiSTer" that most operating systems can read and write.

Once your games are on the card, continue to the next step: [Play a Game](play.md).
