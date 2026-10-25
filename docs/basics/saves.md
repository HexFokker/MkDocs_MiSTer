Many MiSTer cores let you save your game, either by simulating the original hardware's save features or with savestates. Most cores don't have savestates, but a steadily increasing number do.

## Normal game saves

Cores keep in-game saves in backup memory and write them to the MicroSD card only on a trigger — opening the OSD with Autosave enabled, or selecting "Save Backup RAM" manually.

Without Autosave:

1. Save inside the game.
2. Open the OSD and select "Save Backup RAM". This starts the write — you do not need to reopen the OSD to finish it. If you do open the OSD while a write is in progress or has just finished, you may see a "Saving..." message.

Do not power off, reset, or load another game while a save is being written. On many cores the board's yellow LED lights during a write, but the same LED also indicates other core states, so don't rely on it alone.

Deferring the write is necessary: MicroSD cards survive only a limited number of writes before they begin to fail, and without a *signal* telling the core when to back up the save to a file, some cores could otherwise write to the card constantly, several times a second.

## Autosave option

Almost no core autosaves by default. MiSTer's Autosave uses the same deferred-write mechanism: opening the OSD writes any pending save data automatically, so it doesn't cause constant writes. Turning it on is recommended in every core that offers it:

1. Open the OSD and turn on the Autosave option, if available.
2. Press Right on your controller (or keyboard) to open the secondary OSD menu, and select "Save Settings".

"Save Settings" saves the setting for that core only; other cores keep their own settings.

## Save file conversion

The save files of most MiSTer cores are compatible with many popular emulators. Where they differ, Euan Forrester's [MiSTer Save File Converter](https://savefileconverter.com/#/mister){target=_blank} converts them. It also converts many other emulator save formats, and converts MiSTer saves back into emulator-compatible files.

## Back up your saves

Back up your saves from the MicroSD card regularly: when MicroSD storage fails, it usually fails suddenly and completely. Various tools can do this, such as [FreeFileSync](https://freefilesync.org/){target=_blank}, which can run a scheduled batch job that backs up specific MiSTer folders. See the FreeFileSync documentation for details.
