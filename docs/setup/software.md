First, install the software onto your MicroSD card.

## Flash Mr. Fusion to your MicroSD card
Mr. Fusion provides a compact image that you can download and flash onto a supported MicroSD card with enough capacity for the install and your games, using a tool like [balenaEtcher](https://www.balena.io/etcher/){target=_blank}, [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/){target=_blank}, [Apple Pi Baker](https://www.tweaking4all.com/software/macosx-software/applepi-baker-v2/){target=_blank}, or even [dd](https://en.wikipedia.org/wiki/Dd_%28Unix%29){target=_blank}.

This guide uses balenaEtcher — [download the latest release for your computer](https://www.balena.io/etcher/){target=_blank} and install it.

Next, [download the latest release of Mr. Fusion](https://github.com/MiSTer-devel/mr-fusion/releases){target=_blank}:

[![Download Mr. Fusion](img/dl-mr-fusion.png)](https://github.com/MiSTer-devel/mr-fusion/releases){target=_blank}

Insert the MicroSD card into your computer and open balenaEtcher. Select "Flash from file" and navigate to the Mr. Fusion file you just downloaded.

![Flash from file](img/balena-1.png)

Then select your MicroSD card as the flash target.

![Select target MicroSD](img/balena-2.png)
![Select the right one](img/balena-3.png)

And click "Flash!"

![Flash that card!](img/balena-4.png)

Wait for it to complete successfully.

![Successful flash :)](img/balena-5.png)

"Flash complete!" and "1 Successful target" mean the flash worked. If it fails, try again, or try a different MicroSD card in case yours is faulty.

You can now close balenaEtcher and remove the MicroSD card.

## Boot the DE10-Nano with Mr. Fusion
Carefully insert the MicroSD card into the DE10-Nano (**NOT the MicroSD slot on the I/O board on top!**).

![Location of DE10-Nano MicroSD slot on the bottom](img/de10-nano-microsd.png)

Now turn on your DE10-Nano.

The Mr. Fusion installer can take up to a few minutes. Be patient, or you may have to start all over again.

![Running Mr. Fusion](img/run-mr-fusion.png)

When the MiSTer On-Screen Display appears with fuzzy static behind it, the MiSTer software is installed on your MicroSD card.

![Fuzzy Static Displaying Away!](img/static-menu.png)

Continue with the next tutorial in the sidebar.
