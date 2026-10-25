MiSTer provides an on-screen display (OSD) that can be toggled on and off by pressing F12 on your keyboard (or OSD button). For each core that is loaded, this menu can be configured to add specific options for that core.

The top-level module for the cores is `emu`. This does **NOT** mean `emu` is the project's top-level module — it's the top level from the core's perspective. The `emu` module is typically found in the SystemVerilog file (`*.sv` extension) with the same name as the project. As an example, the Arcade-Galaga project has its top-level module at `Arcade-Galaga.sv`.

The configuration string is stored in the `CONF_STR` variable of the `emu` module. This variable is passed to the `hps_io` module, which sends it to the processor to be read when needed. The lines of the configuration string are delimited with semicolons.

## Status Bit Map

Most cores have a Status Bit Map at the top of the `CONF_STR` section. Developers update it to show which status bits are occupied. Please use it when developing a core, because it is a helpful reference that aids collaboration: only one option can occupy a status bit, so this is important. Status bit `[0]` is reserved as a soft reset. The status register is 128 bits wide.

For example, with nothing occupied:

```
// Status Bit Map:
//             Upper                             Lower              
// 0         1         2         3          4         5         6   
// 01234567890123456789012345678901 23456789012345678901234567890123
// 0123456789ABCDEFGHIJKLMNOPQRSTUV 0123456789ABCDEFGHIJKLMNOPQRSTUV
// 
```

If you add a status bit option like `O89` to the core configuration string, it uses the first group of status bits on the left, since the "O" for option is capitalized (marked Upper). It then uses 8 and 9 from the bottom row (alphanumeric). Update the index after using these:

```
// Status Bit Map:
//             Upper                             Lower              
// 0         1         2         3          4         5         6   
// 01234567890123456789012345678901 23456789012345678901234567890123
// 0123456789ABCDEFGHIJKLMNOPQRSTUV 0123456789ABCDEFGHIJKLMNOPQRSTUV
//         XX
```

This tells other developers that `status[9:8]` are occupied and should not be used.

## Valid options for the menu

`[]` - means optional parameter

* `C[,{Text}]` - Enables a cheat menu entry with the label `{Text}`.
* `CHEAT` - like DIP, for arcades with a cheat system
* `D{Index}` - Prefix which disables the option if `menumask[Index]` is set.
* `d{Index}` - Same as 'D', but disables the option if `menumask[Index]` is NOT set.
* `DIP` - in arcade cores, this will display the DIP menu from the MRA
* `F[S][#],{Ext}[,{Text}][,{Address}]` - Load file button. 
    * `{Ext}` - a concatenated list of 3-character file extensions. For example, `BINGEN` would be the `BIN` and `GEN` extensions.
    * Optional `{Text}` string is the text displayed before the extensions, such as "Load RAM". If `{Text}` is not specified, the default is "Load \*".
    * Optional `[S]` - the core supports save files; load a file and mount a save for reading or writing
    * `#` is an explicit index (if not given, the index is generated from the line number).
    * Optional `{Address}` - load file directly into DDRAM at this address
    * ioctl_index from hps_io will be: ioctl_index[5:0] = index(explicit or auto), ioctl_index[7:6] = extension index
* `FC[#],{Ext}[,{Text}][,{Address}]` - Open file and remember it; useful for remembering an alternative ROM, config, or other type of file. See `F` for how the options work.

* `H{Index}` - Prefix which hides the option if `menumask[Index]` is set.
* `h{Index}` - Same as `H`, but hides the option if `menumask[Index]` is NOT set.
* `O{Index1}[{Index2}],{Name},{Options...}` - Option button that allows you to select between various choices.
    * `{Index1}` and `{Index2}` are values from 0-9 and A-V (like hex, but extending from A-V instead of A-F). This represents all 32 bits. The first and second index are the range of bits that will be set in the status register.
    * Indexes can also be written in bracket notation with plain decimal numbers 0-127: `O[hi:lo]` for a bit range or `O[n]` for a single bit (e.g. `O[122:121],Aspect ratio,...`). The same notation works for `T` and `R`.
    * `{Name}` is what is shown to describe the option.
    * `{Options...}` - a list of comma separated options.
* `P{#},{Title}` - Creates sub-page for options with `{Title}`.
* `P{#}` - Prefix to place the option into specific `{#}` page. This is added before `O#` but after something like `d#`. (e.g. `"d5P1o2,Vertical Crop,Disabled,216p(5x);",` is correct and `"P1d5o2,Vertical Crop,Disabled,216p(5x);",` is incorrect and the menu options will not work.)
* `R{Index},{Name}` - Same as `T` option but closes the OSD after selecting. Convenient for a reset option.
* `S{Slot},{Ext}[,{Text}]` - Mount SD card button. 
    * `{Slot}` - a digit from 0-9. Up to ten images can be mounted at the same time (the hps_io VDNUM parameter supports 1-10)..
    * `{Ext}` - same as in `F` option.
    * (Optional) `{Text}` - The text that is displayed before the extensions like "Load RAM". If `{Text}` is not specified, then default is "Mount \*".
* `T{Index},{Name}` - Trigger button. This is a simple button that pulses the specified `{Index}` bit in the status register HIGH. A perfect example is a reset button.
    * `{Name}` is the text that describes the button function.
* `-[,TEXT]` - empty (or with `TEXT`) line.
* Lowercase options `o`, `t`, `r` are equal to their uppercase variants with 32 added to the status bit indexes.

## Non-OSD options

These must be placed at the bottom of the configuration string:

* `J[1],{Button1}[,{Button2},...]` - J1 means lock keyboard to joystick emulation mode. Useful for keyboard-less systems such as consoles. {Button1},{Button2},... is a list of joystick buttons used in the core. Up to 12 buttons can be listed. Analog axes are not defined here. The user just needs to map them through the Menu core.
* `jn,{SNES Button Name1},[,{SNES Button2},...]` - sets the default mapping of the buttons, e.g. `jn,A` maps joystick bit 4 to the A button on a SNES-style controller automatically
* `jp` - same as `jn` but used when `gamepad_defaults=1` in `MiSTer.ini`. Typically refers to positional mapping relative to a SNES controller
* `V,{Version String}` - Version string. Takes the core name and appends a version string to the name displayed when the core is loaded. Note that the timestamp in the core browser (before the core is loaded) is not derived from `Version String`, but from the .rbf filename.
* `v,{0-99}` - Config version. Appends `_v{n}` to the core's settings filename, so saved settings are not reused when `CONF_STR` options change in an incompatible way — change the number to force defaults on first start.
* `X` - Disables the OSD entirely.
* `I,INFO1,INFO2,...,INFO255` - `INFO1-INFO255` lines to display as OSD info (top left corner of screen).
* `DEFMRA,{mra name}` - default MRA (e.g. Puckman.mra) to be used when the core is uploaded via USB Blaster (debug)

## jn vs. jp and mapping conventions

`jn` mapping is the default; `jp` mapping is used when the INI file has `gamepad_defaults=1`. The two differ only in their "philosophy", i.e. the convention used to map buttons: `jn` maps by button **name**, `jp` by button **position**.

Both refer to MiSTer's internal gamepad. In the Menu core, every controller is mapped to this internal SNES-style gamepad, whose buttons are ordered ABXYLR + Start + Select (button 1 = A, button 2 = B, and so on).

* **`jn` (name-based):** map the core's A button to the internal "SNES A" button, B to "SNES B", and so on, so that the names (or order) match the original SNES definition (ABXYLR etc.). If the core has no button named "A", its first button takes that slot, its second button "SNES B", and so forth.
* **`jp` (position-based):** map each button by its physical location. For a Genesis 3-button controller with buttons A, B, C, the mapping would be "SNES Y, SNES B, SNES A", because Y, B, and A are the lower 3 buttons of a SNES gamepad.
