Many MiSTer cores support in-game saves, either by simulating the original hardware's save features or with savestates. Most cores don't have savestates, but a steadily increasing number do.

## Normal game saves

Many cores keep in-game saves in emulated backup memory until they are written to the MicroSD card. Save behavior varies by core.

For cores with a "Save Backup RAM" option:

1. Save inside the game.
2. Open the OSD and select "Save Backup RAM". This starts the write; you do not need to reopen the OSD.

MicroSD cards have finite write endurance. Deferring writes until a save trigger avoids writing every time a game updates its emulated save memory.

Do not power off, reset, or load another game while a save is being written.

## Autosave option

Autosave behavior varies by core. On cores that save when the OSD is opened, Autosave writes pending save data automatically when you open the OSD, without requiring you to select "Save Backup RAM".

To enable Autosave, if available:

1. Open the OSD and turn on the Autosave option.
2. Press Right on your controller or keyboard to open the secondary OSD menu, then select "Save Settings".

"Save Settings" saves the setting for that core only; other cores keep their own settings.

## Save file conversion

Save file formats vary by core. Many MiSTer save files are compatible with popular emulators. Where formats differ, Euan Forrester's [MiSTer Save File Converter](https://savefileconverter.com/#/mister){target=_blank} can convert between MiSTer and many emulator save formats.

## Back up your saves

MicroSD cards can fail suddenly and completely, so back up your saves regularly. Tools such as [FreeFileSync](https://freefilesync.org/){target=_blank} can run scheduled backups of specific MiSTer folders. See the FreeFileSync documentation for details.
