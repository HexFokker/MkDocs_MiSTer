<figure markdown>
  ![MiSTer FPGA Sandwich Punk Style Art by hewhoisred](img/misterpunk.png){ align=center width="400" }
  <figcaption>Artwork by Hewhoisred</figcaption>
</figure>

MiSTer has various add-on boards that are somewhat optional: the 128 MB SDRAM board, for example, is needed to run the most demanding cores, and the Analog I/O board lets you easily connect your MiSTer to a classic CRT television or monitor. You can buy these boards from various online sellers, or assemble one yourself by ordering the PCB from a PCB manufacturer, buying the components, and soldering it.

## [128MB SDRAM Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/sdram_xsds_2.9.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA 128MB SDRAM Add-on Board](img/sdram.png){ align=center }
</figure>

Several cores need the 128 MB SDRAM board to load games at all. A 32 MB SDRAM board is a cheaper alternative, but some games on Neo Geo, Game Boy Advance, and a few other cores may not work with the smaller module.

When plugging in the SDRAM board, make sure to support the DE10-Nano from beneath with your thumbs. Forcing in the SDRAM board without support can bend the DE10-Nano board and permanently damage it.

![How to Insert MiSTer FPGA SDRAM Module Add-On Board the right way](img/sdramdiy1.gif)

Removing the SDRAM board can be tricky with some GPIO connectors, and sometimes simply pulling won't work. Pulling with force often bends the GPIO header. For very tight connectors, wiggle the SDRAM board back and forth to ease it out slowly, bit by bit.

![How to remove MiSTer FPGA SDRAM Module Add-On Board the right way](img/sdramdiy2.gif)

## [USB Hub Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/USBHub_2.1.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA USB Hub Add-on Board](img/usbhub.png){ align=center }
</figure>

The USB Hub add-on board provides an OTG USB hub with one power-only USB port in the back and six USB 2.0 ports on the other three sides. It connects to the DE10-Nano in one of two ways: a slim external board plugs into the internal headers, or a bridge joins the two MicroUSB ports.

The hub needs its own power, so you may need a power splitter to supply both the DE10-Nano and the hub. If you use a Digital I/O board, a DC-to-DC jumper cable plus a single cable to the Digital I/O board's barrel jack powers the whole stack.

## [Digital I/O Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/iobrd_dig_1.2.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA Digital I/O Add-on Board](img/digitalio.png){ align=center }
</figure>

Get this board if you want a few more options, like the features below. It is typically cheaper than the Analog I/O board, and it leaves the second SDRAM slot free for future cores that may need it.

* 3 buttons: Reset, On-Screen Display (OSD), and User (for various user interactions without a keyboard)
* 3 status LEDs: Power, Disk, and User
* Secondary MicroSD card slot that may be required by some older computer cores — it isn't typical MicroSD storage; think of it as a little floppy drive
* Mini-TOSLINK optical digital audio port
* Full-size TOSLINK optical digital audio port
* User IO port — it **looks** like a USB 3.0 port but it **is not!** It's actually for direct serial communication with peripherals and adapters like [SNAC adapters](https://github.com/blue212/SNAC){target=_blank} and [MT32-Pi](https://github.com/dwhinham/mt32-pi){target=_blank}
* Fan power header and fan mounting holes for better cooling
* **Doesn't** use the 2nd set of 2x20 headers on the DE10-Nano, so it is compatible with Dual SDRAM configurations

## [Analog I/O Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/raw/master/releases/iobrd_6.1.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA Analog I/O Add-on Board](img/analogio.png){ align=center }
</figure>

Get this board instead of the Digital I/O board if you want simultaneous video output to a CRT and an HDMI display. Otherwise, the cheaper Digital I/O board should be sufficient.

It has the same 3 buttons, 3 status LEDs, secondary MicroSD slot, User IO port, fan power header, and fan mounting holes as the Digital I/O board (see above), plus:

* Power On/Off switch
* Barrel jack that can power the DE10-Nano
* VGA port for analog video output — see [Advanced - CRT](../advanced/crt.md) for connectivity options
* Simultaneous analog video and HDMI video output
* Sync-on-green override/auto switch
* 3.5 mm analog audio port doubling as a Mini-TOSLINK optical digital audio port
* 3.5 mm audio-in port for ADC-in (e.g. tape input for some computer cores)
* Uses the 2nd set of 2x20 headers on the DE10-Nano, so it is **not** compatible with Dual SDRAM configurations

## [MT32-Pi Lite MiSTer Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/MT32Pi_lite.pdf){target=_blank}

[MT32-Pi](https://github.com/dwhinham/mt32-pi/wiki){target=_blank} is a baremetal emulator of the Roland MT-32 synth module. This add-on board is Sorgelig's version of the new MT32-Pi design, which uses a Raspberry Pi Zero 2 W. It plugs into the side of the MiSTer, into the User IO port of the Digital I/O or Analog I/O board. Get it if you want upgraded MIDI sound in cores and games that support it, such as the ao486 and X68000 cores. YouTuber MiSTer Walrus FPGA has a [video showing how the MT32-Pi sounds](https://www.youtube.com/watch?v=q05ud_eNU8E){target=_blank}.

## [MT32-Pi Raspberry Pi HAT Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/MT32Pi_Main.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA MT32-Pi Raspberry Pi HAT Add-on Board](img/mt32pimain.png){ align=center }
</figure>

This is a Raspberry Pi HAT add-on board for the [MT32-Pi](https://github.com/dwhinham/mt32-pi/wiki){target=_blank}. It is intended for the Raspberry Pi 3A+ due to its square shape, but the 3B and 4 also work. You will also need a short USB 3.0 Type-A male-to-male cable if you choose this option.

## [Real Time Clock Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/rtc_1.3.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA Real Time Clock Add-on Board](img/rtc.png){ align=center }
</figure>

You need this board if you want your MiSTer to have a real-time clock, which [various cores use](../cores/features/rtcsupport.md). For how the board works and how to use it, see [Advanced - RTC Board](../advanced/rtc.md).

## [ADC Analog Audio Input Addon Board](https://github.com/MiSTer-devel/Hardware_MiSTer/blob/master/releases/ADCin_1.1.pdf){target=_blank}

<figure markdown>
  ![MiSTer FPGA ADC Analog Audio Input Add-on Board](img/adc.png){ align=center }
</figure>

The ADC add-on board lets certain computer cores load data from computer tape audio over an analog audio input, either from recordings or from an actual retro tape player.

## Where to buy?

If you'd like to buy a board from a vendor online (instead of soldering one yourself), the MiSTer FPGA Forums have a dedicated [Hardware Sellers forum](https://misterfpga.org/viewforum.php?f=34){target=_blank}. Here are some sellers from that forum and elsewhere:

* [MiSTerAddons.com](https://misteraddons.com){target=_blank} (USA)
* [UltimateMiSTer.com](https://ultimatemister.com/){target=_blank} (Portugal)
* [MiSTerFPGA.co.uk](https://misterfpga.co.uk){target=_blank} (United Kingdom)
* [AntonioVillena.com](https://antoniovillena.com/){target=_blank} (Spain)
* [LegacyPixels.com](https://www.legacypixels.com/mister/){target=_blank} (USA)
* [CAMInventions.com](https://www.caminventions.com/){target=_blank} (Australia)
* [ManuFerHi.com](https://manuferhi.com/c/mister-fpga){target=_blank} (Spain)
* [RetroCastle](https://www.retrocastlestore.com/){target=_blank} (China)
* [RetroRemake](https://retroremake.co/pages/store){target=_blank} (China) (Note: this uses a clone board of the DE10-Nano, not the real Terasic DE10-Nano)

This is not an official endorsement of any sellers, merely a collection of links. For hardware or shipping problems, contact the vendor you purchased from first.
