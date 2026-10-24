MiSTer supports a wide variety of input devices. It also offers options for configuring them and several quality-of-life features that work in most (sometimes all) cores. This page covers special configurations for devices such as spinners, gamepads, joysticks, and keyboards.

## What devices are supported?

Generally, any normal USB HID-compatible input device should work: keyboards, arcade spinners, USB adapters for original controllers (such as the Raphnet and DaemonBite retro adapters), and even modern console controllers like the PS5 DualSense. If you have an Analog I/O or Digital I/O board, supported cores can also use original controllers through [SNAC](#serial-native-accessory-converter-snac), including lightguns that normally only work with the original system.

USB and Bluetooth gaming controllers get these standard features:

* Autofire
* Mouse emulation from your joystick
* Up to 6 players

## Default Joystick Player Assignment Method

* After a core starts, press a button on any connected controller to make it the Player 1 gamepad/joystick.
* Press a button on a second controller to make it the Player 2 joystick (if the core supports it).
* Continue the same way for Player 3, Player 4, etc.
* If you assigned the players in the wrong order, open the OSD's secondary menu (press Right after opening the OSD) and select "Reset player assignment" to start over.
* Resetting the core also resets the player assignments.

If a controller doesn't seem to work, you may need to reboot the MiSTer into the Menu core and define the controller's inputs, if you haven't already. Also, if two attached controllers report the same Vendor ID and Product ID to Linux, you may not be able to use both at the same time; this depends on how the controller is made.

## Advanced Joystick Player Assignment Method

You can also assign joystick players manually, based on which device is which. This is useful, for example, in an arcade cabinet with two USB encoder joysticks, where the right one should always be Player 2. Each controller can be identified in one of three ways:

1. Wireless Bluetooth devices: by their Bluetooth MAC address.
2. Wired devices: typically by their VendorID and ProductID.
3. Multiple devices that share the same VendorID and ProductID: by their USB port location.

The easiest way to find this information is to enable debug in MiSTer.ini, then [open a console connection](../advanced/console.md){target=_blank} or SSH into your MiSTer as root and run `killall MiSTer; /media/fat/MiSTer`. The debug output shows the information whenever you plug in or unplug a USB device. Enter it in your MiSTer.ini as described in the section starting with `Permanently assign specific controller to specific player` in the [default MiSTer.ini](https://github.com/MiSTer-devel/Main_MiSTer/blob/master/MiSTer.ini){target=_blank}.

## Maximum number of players

The MiSTer framework supports _up to_ six players on separate USB or Bluetooth controllers. Individual cores may support fewer: for instance, as of January 2026, the Saturn core supports up to 2 USB/Bluetooth controllers. If a core supports [SNAC](#serial-native-accessory-converter-snac), you may be able to add more players through it.

## Autofire

Any defined button supports autofire. To turn it on, press and hold the button, then quickly press and release the button defined as `BUTTON OSD` (joystick) or `KBD TOGGLE` (keyboard). Repeat this to step up to the next autofire rate. To turn autofire off, keep stepping through the rates until the message says autofire is disabled for that button. Each button can have its own autofire rate.

By default, MiSTer offers autofire rates of 10, 15, and 30 Hz. To set custom rates, add or edit the `autofire_rates` line in MiSTer.ini. Custom rates are rounded down to the nearest rate that repeats cleanly at 60 Hz, and rates above 30 Hz are capped at 30 Hz. You may find that some games work better with certain rates, and that some rates (particularly 30 Hz) are too fast for certain games to process.

`autofire_rates=7.5,10,15,20,30`

Advanced users may set a custom autofire rate as a pattern of button presses and releases. Prefix the pattern with `0b`, then use `0` for each frame the button should be released and `1` for each frame it should be held.

`autofire_rates=0b000011111`

This line would configure a single autofire rate in which the button is held for five frames, released for four frames, and the cycle then repeats. You can freely mix numeric and pattern-based rates in your autofire_rates line. MiSTer will ignore any rates it is unable to properly process.

### (Advanced) Built-in Custom Rates

Shooting games often favor very particular autofire rates. For convenience, one such rate is built in and can be selected with a keyword instead of a calculated pattern: put the keyword in the `autofire_rates=` line where you would put a custom rate or pattern. More may be added in the future as the community recommends them, or as the maintainer of the autofire feature gets better at shooting games.

| Value       | Target Game    | Resulting Rate |
| ----------- | -------------- | -------------- |
| GUNFRONTIER | Gun Frontier   | 6.67 Hz        |
| GAREGGA     | Battle Garegga | 8.57 Hz        |

### Autofire and the joystick/D-pad

By default, autofire does not apply to the D-pad/joystick. To allow autofire on directional inputs, add `autofire_on_directions=1` to your MiSTer.ini.

## Mouse emulation

Your joystick can emulate a mouse if you defined the "Mouse Emu" button when you set up your inputs in the Menu core. Hold `Mouse Emu` and ++alt+m++; the buttons you defined as Mouse Left/Right/Middle Btn then act as mouse buttons, and the left analog stick (if defined) moves the pointer. To keep mouse emulation on permanently, press `BUTTON OSD` while holding `Mouse Emu`. In permanent mode, `Mouse Emu` becomes a sniper button that makes pointer movements smaller.

Only the buttons defined for mouse emulation switch to mouse functions; the other buttons keep working as regular joystick buttons. A gamepad with many buttons can therefore act as a mouse and a joystick at the same time, which is useful for some games, such as Walker on the Amiga.

## Serial Native Accessory Converter (SNAC)

SNAC adapters let you connect original controllers and peripherals to MiSTer cores. Cores that support SNAC are specially built to expose serial connections on specific pins of the DE10-Nano. As a result, when you pull the trigger of an NES Zapper aimed at your CRT, the signal arrives almost instantly, as it would on original hardware. This matters for devices like lightguns, which need the lowest possible latency to work.

## Using a Lightgun

Besides original lightguns over SNAC, MiSTer supports several USB/Bluetooth lightguns, such as the GUN4IR, GunCon 2, GunCon 3, and Wiimote. They can be used with various cores, for example as a Zapper in the NES core or a GunCon 1 in the PSX core. For more on GunCon 2 support, see the [GunCon2-MiSTer repository](https://github.com/NolanNicholson/GunCon2-MiSTer){target=_blank}.

### Lightgun Calibration

The lightgun must be calibrated in each core:

* With the OSD open, press ++f10++ to show the calibration screen, then follow the prompts to shoot each edge of the image.
* It is recommended to load a game and calibrate to the edges of the game image, rather than to the edges of the whole (widescreen) TV.
  
### Lightgun Joy1/Joy2 assignment

* This setting must match the player number your lightgun is assigned to in the core. See [Default Joystick Player Assignment Method](#default-joystick-player-assignment-method).
* On some systems, such as the NES, SNES, and Genesis, the lightgun connected to the player 2 port. Many games for these systems also work with the lightgun as player 1 (Joy1), but some require a normal controller as player 1 and the lightgun as player 2 (Joy2).


### PSX Lightgun Mapping
| GunCon    | Justifier   | Mapping               |
| --------- | ------------| --------------------- |
| Trigger   | Trigger     | O (Gun Fire:Negcon A) |
| A (Left)  | Start       | Start (Gun A)         |
| B (Right) | Rear Button | X (Gun B:Negcon I)    |

**OSD Settings**

* Pad1: GunCon or Justifier (set based on the game)

### SNES Lightgun Mapping

| Super Scope | Justifier | Mapping       |
| ---------- | --------- | ------------- |
| Fire       | Trigger   | A (SS Fire)   |
| Cursor     |           | B (SS Cursor) |
| Pause      | Start     | Y (SS Pause)  |

**OSD Settings**

* 'Input Options' menu
    * Super Scope: Joy2
    * Super Scope Btn: Joy
    * Gun Type: (Set based on game)

### NES Lightgun Mapping

| Zapper  | Mapping         |
| ------- | --------------- |
| Trigger | Zapper/Vaus BTN |

**OSD Settings**

* 'Input Options' menu
    * Periphery: Zapper (Joy2)
    * Zapper Trigger: Joystick

### Genesis / Sega CD Lightgun Mapping
| Menacer      | Justifier | Mapping |
| ------------ | --------- | ------- |
| Trigger      | Trigger   | A       |
| Top Button   |           | B       |
| Lower Button |           | C       |
| Pause        | Start     | Start   |

**OSD Settings**

* 'Input' menu
    * Gun Control: Joy2
    * Gun Fire: Joy

### Master System Lightgun Mapping

| Phaser  | Mapping |
| ------- | ------- |
| Trigger | Fire 1  |

**OSD Settings**

* 'Input' menu
    * Gun Control: Joy1
    * Gun Fire: Joy
    * Gun Port: Port 1

### Atari 7800 Lightgun Mapping

| XG-1 light gun | Mapping |
| -------------- | ------- |
| Trigger        | Fire 1  |

**OSD Settings**

* 'Peripherals' menu
    * Port1 Input: Lightgun
    * Gun Control: Joy1
    * Gun Fire: Joy
* 'Audio & Video' menu
    * Show Overscan: Yes

## Using A Mouse

MiSTer supports mice, mainly for the computer cores whose original systems had them.

A mouse can also act as an emulated lightgun. A Wiimote with a powered sensor bar works on the same principle: once paired with the MiSTer, it is used as a mouse.

![type:video](videos/mouse-lightgun.mp4)

A mouse can also act as a paddle-style controller.

## Are gaming keyboards worth it?

No. High-performance, expensive keyboards and mice give no benefit on MiSTer, major or minor. They often expose many extra functions and virtual devices that clutter the input subsystem, which may add input lag, make the device completely unresponsive, or stop other devices such as gamepads from working. If you have problems with a gaming keyboard, try a simpler keyboard. The general advice is not to buy a specialty gaming keyboard just for MiSTer — it may end up being a waste of money.

## What about rumble support?

Rumble (controller vibration) has recently been added to the Game Boy, Game Boy Advance, and PlayStation cores. For the PlayStation core, make sure your controller's rumble is supported: in the Menu core, hold "L" and press "X" or "Y" (SNES-style layout) to test each of the two motors. Rumble only works reliably with controllers in X-Input mode.

## What about PlayStation 3-5, Xbox 360 and Xbox One, Switch, and third party Bluetooth gamepads?

The ideal wireless solution for these gamepads is a third-party USB dongle, such as the 8BitDo retro receiver (specifically the 8BitDo Wireless Bluetooth Adapter), or a name-brand Bluetooth 4.x/5.0 adapter.

The 8BitDo receiver supports Bluetooth PlayStation, Xbox, Wii, Switch, and 8BitDo gamepads without using the MiSTer's Bluetooth setup menu. Its main appeal is ease of use and quick pairing. Its drawbacks, compared to Bluetooth 5.0 adapters (including TP-Link and Asus models):

* It may add lag, and may have limited range and line-of-sight issues.
* Each receiver pairs with only one controller at a time, so multiplayer needs one receiver per controller. Regular Bluetooth pairing has no such limit.
* The receiver sits between your gamepad and the USB host as a compatibility layer and always presents itself as the same controller, whatever gamepad you connect. Some gamepad features, such as the PS5 controller's mute button and touchpad, are therefore unavailable. A Bluetooth 5.0 adapter pairs the gamepad directly with the MiSTer, so it is less likely to have such limitations, although some features still won't work until the development team adds framework and Linux support for them.

Grey and orange (brick-decorated) 8BitDo USB adapters are functionally the same on the latest firmware. Depending on the controller model, gamepads can switch between input modes with hotkeys; some models, such as the 8BitDo SN30 Pro 2, have a switch on the back instead. 8BitDo's website doesn't document these hotkeys, but the firmware update log does:

* X-Input mode: Hold SELECT+UP for 3 seconds.
* PSC (PlayStation Classic) mode: Hold SELECT+DOWN for 3 seconds. This is useful for gamepads with few buttons (12 in total, with the D-pad counting as 4) that still need to open the MiSTer OSD. In this mode, L+R+START opens the OSD inside cores; this combination is hard-coded in MiSTer specifically for 8BitDo adapters, so don't assign an OSD button when configuring buttons in the Menu core. You may also lose autofire and mouse functionality in this mode.

Other 8BitDo adapters, such as the 8BitDo Retro Receivers for SNES, NES, and Genesis consoles, are always in X-Input mode when connected via Micro USB.

## JammaSD support

MiSTer supports the JammaSD by detecting whether a pressed button belongs to Player 1 or Player 2. Configure Player 1 as a joypad in the Menu core (and remap it in cores if needed); Player 2's inputs are then defined automatically, as if it were a second identical joypad. A second JammaSD can be plugged in for Players 3 and 4. JammaSD support uses a VID/PID that should be the same on all devices; if yours differs, set it in MiSTer.ini with the `jamma_vid`/`jamma_pid`/`jamma2_vid`/`jamma2_pid` options.
