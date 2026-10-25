MiSTer supports keyboard remapping, which is useful for reduced-size or localized keyboards. Key remapping is system-wide, so every core uses the same key mapping. There is no macro key functionality — single keys are remapped to other single keys. Some multimedia keys generate several [key codes](https://www.scs.stanford.edu/10wi-cs140/pintos/specs/kbd/scancodes-5.html){target=_blank} and cannot be remapped. Each keyboard model's key map is stored in `/media/fat/config/kbd_[VID]_[PID].map`. To reset all keys to their defaults, delete the map file with the matching VendorID and ProductID in the filename. Key remapping is available through the Menu core only.

## Joystick emulation

Keyboards can be switched to joystick emulation. Define the keys used for joystick emulation the same way you did for joysticks. Autofire is also supported the same way as for joysticks (Menu+button). The button defined for "KBD TOGGLE" provides a quick switch between keyboard and joystick use for defined keys.

## Mouse emulation

Keyboards can be switched to mouse emulation. Define mouse emulation buttons in the Menu core the same way as for joysticks, in the Define Gamepad menu option.

## Emulation switch

To switch between emulation modes, press ++num-lock++ or ++scroll-lock++ until the desired mode is selected. 

The switching sequence is `Mouse >> Joy1 >> Joy2 >> None`

The LEDs on your keyboard will display the emulation modes:

* Mouse emulation: NumLock LED + ScrLock LED
* Joystick 1 emulation: NumLock LED.
* Joystick 2 emulation: ScrLock LED.

## Common functional keys/combos used in cores

* ++f12++ - open/close OSD menu/submenu
* ++alt+f12++ - quick core selection (like in Menu core).
* ++lctrl+lalt+ralt++ - presses the "USER" button, which usually triggers reset in the emulated system.
* ++lshift+lctrl+lalt+ralt++ - MiSTer reset (load Menu core).

### Notes

* Some systems provide write support, which requires additional attention when you reset/shut down the MiSTer. MiSTer tries not to keep pending writes and flushes to disk as soon as possible. Still, the safer way to reset from a core that was probably writing to disk recently is ++lshift+lctrl+lalt+ralt++ — this flushes all caches to disk before restart. Cores without write support can be restarted with the hard reset button or powered down without concern for filesystem corruption — though any in-game save not yet written to the card will still be lost.
* The ++lctrl+lalt+ralt++ sequence can be replaced by other well-known combos through the INI file.
