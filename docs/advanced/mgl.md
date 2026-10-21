MGL files are shortcuts that load a game directly from the MiSTer Menu core. They can be placed in the root of the SD card to appear at the top of the menu, or in a menu folder — a regular folder prefixed with an underscore (`_`) that shows in the menu. You can create your own menu folders.

Not all cores support MGL files, though all the most popular cores do. Console support is good, but computer cores generally don't work well with them, unless they have some mechanism to auto-boot a loaded game.

## MGL Format

MGLs are simple XML files with the file extension `.mgl`. Whatever name you give to an MGL file (excluding the extension) is what will be shown for its entry in the menu. E.g. `My Favorite Game.mgl` will display in the menu as `My Favorite Game`.

Example MGL files:

```xml
<mistergamedescription>
	<rbf>_console/snes</rbf>
	<file delay="2" type="f" index="0" path="puzzles/dummy.sfc"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_console/psx</rbf>
	<file delay="1" type="s" index="1" path="dummy.chd"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_Computer/ao486</rbf>
	<file delay="1" type="s" index="2" path="dummy.vhd"/>
	<file delay="1" type="s" index="4" path="cds/dummy.iso"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_Console/SMS</rbf>
	<setname>GameGear</setname>
	<file delay="1" type="f" index="2" path="some/other.zip/path/dummy.gg"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_Console/Gameboy</rbf>
	<setname same_dir="1">GBC</setname>
</mistergamedescription>
```

* `rbf`: Relative path to the core's RBF file from the SD root, excluding its file extension and timestamp.
* `setname`: Sets a core's name to this value, changing its games folder and config file.
    * `setname same_dir="1"`: Sets a core's name to this value, changing its config file while keeping the core's original games folder
* `file`: The file to be loaded into the core and its launch arguments.
    * `delay`: Number of seconds to wait before load/mount.
    * `type`: Either `f` to load a file into memory or `s` to mount a file.
    * `index`: The slot the file is loaded into in the core.
    * `path`: Path to the game file relative to the core's games folder.
* `reset`: Triggers a reset on the core. You probably don't need this.
    * `delay`: Number of seconds to wait before reset.
    * `hold`: Number of seconds to hold the reset (optional; about 100 ms if omitted).

The `rbf` tag must be present.

The `file` tag is optional. It can be used more than once in an MGL. Useful for cores that have multiple file slots.

The `setname` tag is optional, and the change it makes is only temporary. It is useful for cores that play multiple systems, or that you often switch between different configurations. With `same_dir="1"`, you can load games from the core's normal games folder while using a custom configuration.

The `type` and `index` attributes depend on what values were configured by the core's developer. See below for [how to check those](#finding-mgl-arguments).

If a core pops up the OSD menu after loading the game or the game doesn't load, try increasing the `delay` value.

## MGL Arguments

Some MGL arguments for common cores:

| System              | RBF                   | Delay | Index   | Type |
| ------------------- | --------------------- | :---: | :-----: | :--: |
| Atari 2600/7800     | _Console/Atari7800    | 1     | 1       | f    |
| Atari 5200          | _Console/Atari5200    | 1     | 1       | s    |
| Atari Lynx          | _Console/AtariLynx    | 1     | 1       | f    |
| Commodore 64        | _Computer/C64         | 1     | 1       | f    |
| Famicom Disk System | _Console/NES          | 2     | 1       | f    |
| Game Boy (Color)    | _Console/Gameboy      | 2     | 1       | f    |
| Game Boy Advance    | _Console/GBA          | 2     | 1       | f    |
| Game Gear           | _Console/SMS          | 1     | 2       | f    |
| Genesis             | _Console/Genesis      | 1     | 1       | f    |
| Master System       | _Console/SMS          | 1     | 1       | f    |
| Sega CD             | _Console/MegaCD       | 1     | 0       | s    |
| Neo Geo             | _Console/NeoGeo       | 1     | 1       | f    |
| NES                 | _Console/NES          | 2     | 1       | f    |
| PlayStation         | _Console/PSX          | 1     | 1       | s    |
| Sega 32X            | _Console/S32X         | 1     | 1       | f    |
| SNES                | _Console/SNES         | 2     | 0       | f    |
| TurboGrafx-16       | _Console/TurboGrafx16 | 1     | 0       | f    |
| TurboGrafx-16 CD    | _Console/TurboGrafx16 | 1     | 0       | s    |

A more comprehensive list of MGL arguments documented by Wizzo can be found [here](https://github.com/wizzomafizzo/mrext/blob/main/docs/systems.md){target=_blank}.

## Finding MGL Arguments

If the core you're looking for isn't in these lists, either test the combinations yourself or check the core's source on GitHub to find the values directly.

For example, the index numbers and file types supported by the **TurboGrafx-16** core can be found in [TurboGrafx16.sv](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer/blob/master/TurboGrafx16.sv){target=_blank} on GitHub.

Find the section starting with `parameter CONF_STR` and look for the file type you're launching — in this case `"S0,CUECHD,Insert CD;"`. The `S0` means type `s` with index 0.

See the [Core Configuration String](../developer/conf_str.md) page for detailed information on this format.

## Arcade Cores

Arcade cores cannot be launched using MGL files. If you want to make a shortcut to an arcade core elsewhere in the menu, you'll instead have to *symlink* (symbolic link) it there.

For example, either through SSH or the console (press `F9` from the menu):
```
# ln -s /media/fat/_Arcade/dummy.mra /media/fat
# ln -s /media/fat/_Arcade/cores /media/fat
```

This creates a shortcut to an arcade core in the root of the MiSTer menu. It can also be done with menu subfolders.

Note the second line, which symlinks the `cores` folder. You have to do this once for each folder you want to symlink MRA files into.
