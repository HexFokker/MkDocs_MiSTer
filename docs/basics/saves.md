Many MiSTer cores let you save your game, either by simulating the original hardware's save features or with savestates. Most cores don't have savestates, but a steadily increasing number do.

## Normal game saves

MiSTer writes your in-game saves to the MicroSD card only when you open the On-Screen Display (OSD). To save:

1. Save inside the game.
2. Open the OSD and select "Save Backup RAM".
3. In most cores, open the OSD again. You should see a "Saving..." pop-up; if you don't, your save probably wasn't written.

While a save is being written with the OSD open, the yellow LED on the Digital I/O or Analog I/O board lights up, and it turns off when the save is complete.

Having to open the OSD takes some getting used to, but it is necessary. MicroSD cards survive only a limited number of writes before they begin to fail, and because these cores run in the FPGA, some of them may otherwise write to the card constantly, several times a second, without a *signal* telling them when to back up the save to a file.

## Autosave option

Because of the MicroSD card's limited write endurance, almost no core autosaves by default: autosave could generate too many writes and make the card fail sooner. MiSTer's Autosave option only writes when you open the OSD, so it doesn't cause constant writes, and turning it on is still recommended in every core that offers it:

1. Open the OSD and turn on the Autosave option, if available.
2. Press Right on your controller (or keyboard) to open the secondary OSD menu, and select "Save Settings".

"Save Settings" saves the setting for that core only; other cores keep their own settings.

## Save file conversion

The save files of most MiSTer cores are compatible with many popular emulators. Where they differ, Euan Forrester's [MiSTer Save File Converter](https://savefileconverter.com/#/mister){target=_blank} converts them. It also converts many other emulator save formats, and converts MiSTer saves back into emulator-compatible files.

## Back up your saves

Back up your saves from the MicroSD card regularly: when MicroSD storage fails, it usually fails suddenly and completely. Various tools can do this, such as [FreeFileSync](https://freefilesync.org/){target=_blank}, which can run a scheduled batch job that backs up specific MiSTer folders. See the FreeFileSync documentation for details.
