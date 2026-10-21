In MiSTer terminology, a "core" is the system the FPGA is currently configured to simulate. By default, the FPGA is configured as the "Menu" core on power-on. Then, if you open the OSD, go to `_Console`, and select `NES`, the FPGA is reconfigured as the "NES" core.

Hardware Description Language (HDL) developers use the term "core" for things programmed onto the FPGA. For instance, the MiSTer FPGA framework uses Intel's "Altera PLL Core" — a portable chunk of logic that lets developers configure the chip's clock speeds. There are HDMI cores, Ethernet cores, serial data cores, and so on.

However, for MiSTer, a core refers to the system being emulated: the [PSX (PlayStation) core](https://github.com/MiSTer-devel/PSX_MiSTer){target=_blank}, the [Minimig (Amiga) core](https://github.com/MiSTer-devel/Minimig-AGA_MiSTer){target=_blank}, the [SNES core](https://github.com/MiSTer-devel/SNES_MiSTer){target=_blank}, and many more.

## What happens when I load a core?

Imagine every time you load a core you are connecting a different console, computer, or arcade system to your television. Select the Genesis core in the menu and load it, and you have essentially plugged a Genesis into your television — without wrestling with cables. What actually happens is that the `.rbf` file reprograms the FPGA chip: the digital logic for the NES is replaced with the digital logic for the Genesis (both combined with the MiSTer FPGA core components).

You may worry that all this rewriting could shorten the FPGA's lifespan. It isn't something to worry about: SRAM-based FPGAs like this one are considered to have an unlimited number of writes, and many millions of rewrites to the same area are normal.

## Core updates and issues

Cores on MiSTer are the result of the collaboration between many people over many years and across multiple prior open-source projects. Most console and computer cores have now been compared to original hardware to a high level of precision (e.g. audio capture comparison), with the few remaining issues documented on their respective GitHub repository pages. Check the relevant core's page before submitting an issue.

For a list of core repositories, see the [MiSTer FPGA GitHub Organization](https://github.com/MiSTer-devel){target=_blank}. Each core's page leads to its release folder, its Issues page, and its README, which ideally lists all of the core's features and limitations in detail.

There are other unofficial MiSTer FPGA cores out there, but they aren't listed here — they may not work correctly, and the list is always changing.
