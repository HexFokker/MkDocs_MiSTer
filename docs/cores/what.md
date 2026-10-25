In MiSTer terminology, a core is an FPGA design that provides a particular system or function. Most cores implement a console, computer, or arcade system; the Menu core instead provides the user interface. By default, the FPGA loads the Menu core on power-on. Selecting another core, such as `NES` in the `_Console` menu, reconfigures the FPGA with that core's design.

Hardware Description Language (HDL) developers use the term "core" for things programmed onto the FPGA. For instance, the MiSTer FPGA framework uses Intel's "Altera PLL Core" — a reusable block of logic that lets developers configure the chip's clock speeds. There are HDMI cores, Ethernet cores, serial data cores, and so on.

## What happens when I load a core?

Loading a system core is conceptually like connecting a different console, computer, or arcade system to your display. The `.rbf` file configures the FPGA with the selected core and the MiSTer framework logic required by that core.

You may worry that all this rewriting could shorten the FPGA's lifespan. It isn't something to worry about: loading different cores does not wear out the FPGA through flash program/erase cycles, because its configuration is held in SRAM and can simply be replaced when another core is loaded.

## Core repositories and issues

MiSTer cores build on work from many contributors and earlier open-source projects. Accuracy, feature coverage, and known issues vary by core. For repositories maintained by the MiSTer project, see the [MiSTer FPGA GitHub organization](https://github.com/MiSTer-devel){target=_blank}. Consult the relevant core's README, release notes, and issue tracker for installation requirements, supported features, and known limitations. Search existing issues before submitting a new one.

Independently maintained cores may use different installation instructions and support channels; consult their respective repositories and documentation.
