# What Is a Core

In MiSTer terminology, a core is an FPGA design that provides a particular system or function. Most cores implement a console, computer, or arcade system; the Menu core instead provides the user interface. By default, MiSTer loads the Menu core at startup. Selecting another core, such as `NES` in the `_Console` menu, reconfigures the FPGA with that core's design.

In HDL development, "core" can also mean a reusable IP block within a larger FPGA design, such as a PLL, HDMI, Ethernet, or serial interface core. This usage is distinct from the usual meaning of a MiSTer core.

## What happens when I load a core?

Loading a system core is conceptually like connecting a different console, computer, or arcade system to your display. The `.rbf` file configures the FPGA with the selected core and the MiSTer framework logic required by that core.

Loading cores does not consume flash program/erase cycles. The FPGA configuration is held in SRAM and is replaced when another core is loaded.

## Core repositories and issues

MiSTer cores build on contributions from many developers and earlier open-source projects. Accuracy, feature coverage, and known issues vary by core. Consult the relevant core's README, release notes, and issue tracker for installation requirements, supported features, and known limitations. Search existing issues before submitting a new one.

For repositories maintained by the MiSTer project, see the [MiSTer FPGA GitHub organization](https://github.com/MiSTer-devel){target=_blank}. Independently maintained cores may use different installation instructions and support channels; consult their respective repositories and documentation.
