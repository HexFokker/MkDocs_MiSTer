In MiSTer terminology, a core is an FPGA design that provides a particular system or function. Most cores implement a console, computer, or arcade system; the Menu core instead provides the user interface. By default, the FPGA loads the Menu core on power-on. Selecting another core, such as `NES` in the `_Console` menu, reconfigures the FPGA with that core's design.

Hardware Description Language (HDL) developers use the term "core" for things programmed onto the FPGA. For instance, the MiSTer FPGA framework uses Intel's "Altera PLL Core" — a reusable block of logic that lets developers configure the chip's clock speeds. There are HDMI cores, Ethernet cores, serial data cores, and so on.

For example, the [PSX (PlayStation) core](https://github.com/MiSTer-devel/PSX_MiSTer){target=_blank}, the [Minimig (Amiga) core](https://github.com/MiSTer-devel/Minimig-AGA_MiSTer){target=_blank}, the [SNES core](https://github.com/MiSTer-devel/SNES_MiSTer){target=_blank}, and many more.

## What happens when I load a core?

Imagine every time you load a core you are connecting a different console, computer, or arcade system to your television. Select the MegaDrive core in the menu and load it, and you have essentially plugged a Mega Drive into your television — without wrestling with cables. What actually happens is that the `.rbf` file reprograms the FPGA chip: the digital logic for the NES is replaced with the digital logic for the Mega Drive (both combined with the MiSTer framework logic).

You may worry that all this rewriting could shorten the FPGA's lifespan. It isn't something to worry about: loading different cores does not wear out the FPGA through flash program/erase cycles, because its configuration is held in SRAM and can simply be replaced when another core is loaded.

## Core updates and issues

Cores on MiSTer are the result of the collaboration between many people over many years and across multiple prior open-source projects. Accuracy, feature coverage, and known issues vary by core. Consult the relevant core's README and issue tracker for setup requirements, supported features, and known limitations, and search existing issues before submitting a new one.

For a list of core repositories, see the [MiSTer FPGA GitHub Organization](https://github.com/MiSTer-devel){target=_blank}. Each core's page leads to its release folder, its Issues page, and its README, which ideally lists all of the core's features and limitations in detail.

Independently maintained cores outside the MiSTer-devel organization are not listed here; they may use different installation instructions and support channels — consult their respective documentation.
