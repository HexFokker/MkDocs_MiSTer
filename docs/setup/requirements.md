---
hide:
  - toc
---


A MiSTer stack consists of the DE10-Nano board from Terasic, coupled with a number of [add-on boards](../basics/addons.md).

## Pre-built solutions and clones

Over time, two kinds of hardware solutions have appeared on the market:

- pre-built kits (using the DE10-Nano)
- clones of the DE10-Nano[^1] (and their equivalent pre-built kits)

This guide doesn't cover the options and their trade-offs. MiSTer is designed and tested with the DE10-Nano board and the stack described below.

[^1]: Clone boards can aim for compatibility with the MiSTer project, but minor hardware differences can cause occasional incompatibilities (they can be fixed, but that's outside the scope of the MiSTer project). Consult the respective sellers for compatibility and support.

## Build from scratch

You'll need the following to set up your MiSTer:

* Terasic DE10-Nano
* MicroSD card (minimum 4 GB) and a MicroSD card reader
* USB OTG adapter or a [MiSTer USB Hub add-on board](../basics/addons.md#usb-hub-addon-board){target=_blank} (no USB devices will work without this)
* USB keyboard
* HDMI display and HDMI cable

Recommended:

* [MiSTer SDRAM add-on board](../basics/addons.md#128mb-sdram-addon-board){target=_blank} (optional, but many cores require it)
* USB gamepad
* Cooling for the FPGA
* Internet connection (required for the first update)

### Where to buy
**DE10-Nano:**

* [Terasic](http://de10-nano.terasic.com){target=_blank}
* [Digikey](https://www.digikey.com/en/products/detail/terasic-inc/P0496/6817231){target=_blank}
* [Mouser](https://www.mouser.com/ProductDetail/Terasic-Technologies/P0496?qs=sGAEpiMZZMug%252BNZZT2EIMybLXjFfYtXHeZj9cpOi%2FsY%3D){target=_blank}

**SDRAM:**

The MiSTer SDRAM add-on board is required by many cores, like the SNES, NES, PlayStation, and Game Boy cores. Multiple sellers carry them, and you can also assemble one yourself if you're skilled at soldering.

**USB OTG Adapter/Hub:**

The MiSTer USB Hub add-on board is preferred. You can assemble it yourself if you're good at soldering, or [buy one from a shop that sells them](../basics/addons.md#where-to-buy){target=_blank}.

If you want a very cheap option, the [MakerSpot Micro USB OTG Hub](https://www.amazon.com/MakerSpot-Accessories-Charging-Extension-Raspberry/dp/B01JL837X8){target=_blank} works very well as a minimum.

**Cooling:**

The processor on the DE10-Nano is 21.5 mm × 21.5 mm, so a heatsink around that size is suitable. With a larger heatsink, make sure it doesn't touch components outside the processor.

There is no mounting mechanism for the heatsink — use an "adhesive thermal pad". 3M makes good ones, and heatsinks of this size usually come with them.

Do not apply a lot of pressure and do not touch the components directly with your fingers, as static shock can damage them.
