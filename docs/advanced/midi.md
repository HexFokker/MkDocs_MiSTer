There are multiple options for using MIDI on the MiSTer.


## [The mt32-pi Project](https://github.com/dwhinham/mt32-pi/wiki){target=_blank}

Dale Whinham (aka d0pefish) created mt32-pi, an open-source MIDI synthesizer for the Raspberry Pi. For current instructions, see the [MiSTer FPGA section of the mt32-pi wiki](https://github.com/dwhinham/mt32-pi/wiki/MiSTer-FPGA){target=_blank}. There are also [two add-on boards designed by Sorgelig](../basics/addons.md#mt32-pi-lite-mister-addon-board){target=_blank} for using mt32-pi with the MiSTer.

### Example video
![type:video](videos/mt32-pi.mp4)

## Computer cores with MIDI support

When an ALSA-compatible USB MIDI device is attached, the Minimig and ao486 cores get two extra 'UART Connection' menu options, 'USBMIDI' and 'USBMIDI-38K', in addition to 'None', 'PPP', and 'Console'.

### Minimig

Use 'USBMIDI' with the Amiga (Minimig) core. It sets the UART connection speed to 31250 baud, the standard MIDI speed.

Many Amiga applications and most games don't need any additional MIDI drivers. Some "newer" applications may require the [CAMD driver](http://aminet.net/package/mus/midi/camd){target=_blank} (Aminet).

### ao486

Use 'USBMIDI-38K' with the ao486 core. It sets the UART connection speed to 38400 baud, because DOS PC UARTs couldn't run at the standard MIDI speed of 31250 baud.

Some sequencer applications and Microsoft Windows may support MIDI on the serial port, but DOS games typically require an MPU-401 interface, which ao486 unfortunately lacks. Instead of a hardware MPU-401, the [SoftMPU](http://bjt42.github.io/softmpu/){target=_blank} TSR can be used with a good degree of success.

#### SoftMPU

SoftMPU requires the QEMM memory manager (QEMM 8.03 was used for testing). QEMM's "stealth" option seems to be incompatible with ao486, so it is advisable to skip that part of the optimize process. After adding SoftMPU to AUTOEXEC.BAT, it's a good idea to run QEMM's optimize again to free up as much of the lower 640 KB of conventional RAM as possible.

Although less common, some DOS games and applications require MPU-401 interrupts. Enabling them can break compatibility with other software that doesn't use interrupts.


Starting SoftMPU without MPU-401 interrupts:

    SOFTMPU.EXE /MPU:330 /OUTPUT:COM1

Starting SoftMPU with MPU-401 interrupts:
       
    SOFTMPU.EXE /SB:220 /IRQ:5 /MPU:330 /OUTPUT:COM1  

The Rev.0 Roland MT-32 used in testing needed the 'DELAYSYSEX' switch to prevent buffer overflow in certain games, but it made Sierra games send SysEx commands excessively slowly. This is unnecessary for General MIDI modules and newer-revision MT-32s.

    SOFTMPU.EXE /MPU:330 /DELAYSYSEX /OUTPUT:COM1

## MidiLink

The [MidiLink](https://github.com/MiSTer-devel/MidiLink_MiSTer){target=_blank} daemon (`midilink`) is included with MiSTer and supports several operating modes, selectable from the Menu core's Uartmode option or via command-line switches:

* **Local / MUNT** — MUNT soft synth running on the HPS ARM core (no USB MIDI adapter needed; MT-32/CM-32 ROMs go in `/media/fat/linux/mt32-rom-data`)
* **Local / FSYNTH** — FluidSynth soft synth (soundfont set by `FSYNTH_SOUNDFONT` in MidiLink.INI)
* **Remote / UDP** — direct MIDI connection to another MiSTer or computer
* **Remote / TCP** — modem emulation with a subset of Hayes AT commands (115200 baud default)
* **USBMIDI / SERMIDI** — USB MIDI adapter (e.g. Roland UM-ONE MK2), or a USB serial adapter as fallback

Default baud rate is 31250; the ao486 core uses 38400. See the [MidiLink README](https://github.com/MiSTer-devel/MidiLink_MiSTer){target=_blank} for the full switch list and MidiLink.INI options.

## MIDI adapters reported to work

* Creative EMU XMIDI (Known to mangle SYSEX messages)
* Roland UM-ONE
* M-Audio Midisport Uno


