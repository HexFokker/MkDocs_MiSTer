This page lists the MiSTer hotkeys. Hotkeys save time, and some actions can only be done with a keyboard or gamepad hotkey. Some hotkeys work only in the Main Menu core, some work inside cores during gameplay, and some work everywhere.

## In any core, with OSD closed

| Hotkey                                    | Description                                                                        |
| ----------------------------------------- | ---------------------------------------------------------------------------------- |
| ++f12++                                   | Open the Menu/On-Screen Display                                                    |
| ++alt+f12++                               | Open core select menu                                                              |
| ++win+prtsc++                             | Take a screenshot (upscaled)                                                       |
| ++shift+win+prtsc++                       | Take a screenshot (raw output)                                                     |
| ++lctrl+lalt+ralt++                       | Press the "User" button — usually resets the current core; same as the I/O board button |
| ++lshift+lctrl+lalt+ralt++                | Full reboot/reset; same as the I/O add-on board's Reset button                  |
| Controller: hold a button + press the Menu button   | Step that button through the configured autofire rates, then off   |
| Controller: hold a direction + press the Menu button | Same, for directional inputs (requires `autofire_on_directions=1`) |

## With the OSD open, in any core

| Hotkey                       | Description                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| ++f12++                      | Close OSD                                                               |
| ++f11++                      | Pair Bluetooth controller                                               |
| Hold I/O board OSD Button     | Alternate method to Pair Bluetooth controller                           |
| Left                         | Go to information screen (shows currently selected INI file and volume) |
| Right                        | System screen (change core, set filters, gamma, etc.)                   |
| Controller: Back + R/L/U/D   | Select Alternate INI file if defined (Default/Alt1/Alt2/Alt3)           |
| Controller: Select           | Expands submenus in the OSD when highlighted                            |
| Controller: Shoulder Buttons | Cycles through the OSD options in a core in either direction            |

## In the Main Menu core only

| Hotkey                             | Description                                                              |
| ---------------------------------- | ------------------------------------------------------------------------ |
| ++f1++                             | Switch background type (static, wallpaper, color bars, black)            |
| ++f2++                             | Hide / Show core dates                                                   |
| ++f9++                             | Open Linux terminal / command line interface, use F12 to go back to menu |
| Controller: **LB** + **X** / **Y** | Test the rumble motors on your controller                                |

## Core-specific hotkeys

### Some computer cores

Some computer cores make use of the Windows key (++win++) on your keyboard.

| Hotkey      | Description  |
| ----------- | ------------ |
| ++win+f12++ | Open the OSD |

### Light gun cores

Some console cores make use of USB/BT light guns, such as the Guncon2, Guncon3, Gun4IR, Sinden, etc.

[Read this guide](./input.md#using-a-lightgun){target=_blank} for more information.

[More calibration info here.](https://github.com/NolanNicholson/GunCon2-MiSTer?tab=readme-ov-file#calibration-instructions){target=_blank}

| Hotkey             | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| OSD Open + ++f10++ | Enters light gun calibration. For best results, use a white/bright image |

### Cores that support savestates

Savestate support is core-specific — the list changes as cores are updated (NES, PSX, GameBoy, GBA, WonderSwan, AtariLynx, SNES, and others; check each core's README). Four savestate slots are available. In those cores, a standard savestate button can be assigned on your controller (called `SaveStateBtn` here):

| Hotkey                                  | Description                                   |
| --------------------------------------- | --------------------------------------------- |
| ++alt+f1++ - ++f4++                     | Save the state in slots 1-4 respectively      | 
| ++f1++ - ++f4++                         | Restore the state from slots 1-4 respectively |
| Controller: SaveStateBtn + Left/Right   | Switch the savestate slot                     |
| Controller: SaveStateBtn + Start + Down | Save to the selected slot                     |
| Controller: SaveStateBtn + Start + Up   | Restore from the selected slot                |
