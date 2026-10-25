Each core looks for its games in a folder named after the core. This page lists where that folder can be, and which location is used if it exists in more than one.

## Standard Core Paths
They are of the form `/media/fat/games/<CORE>`, where `<CORE>` is the [internal core name](../developer/corenames.md) of the given system. Check each core's README to determine the appropriate full path.

## Standard USB Core Paths
They are of the form `/media/usb<0..5>/games/<CORE>`, where `<0..5>` is the mount index of each mounted USB drive (usb0, usb1, ... usb5).

## Standard CIFS Core Paths
They are of the form `/media/fat/cifs/games/<CORE>`.

## Other Paths
Other valid paths exist for backwards compatibility and to ease testing. You should use the standard paths instead whenever possible.

## Path Priority
There is a priority order of core paths. When you plug in a USB drive containing a `/games/PSX` folder (mounted as `/media/usb<0..5>/games/PSX`), the MiSTer PSX core looks there instead of the local `/media/fat/games/PSX` on the MicroSD. Here is the priority list from [Main_MiSTer's file_io.cpp](https://github.com/MiSTer-devel/Main_MiSTer/blob/8328d9f0e162c663bcdcd695ee77b61ca6eab06a/file_io.cpp#L1060){target=_blank} (`findPrefixDir`), from highest to lowest priority:

For each mounted USB drive in order (`usb0`, `usb1`, ... `usb5`):

1. `/media/usb<N>`
2. `/media/usb<N>/games`

Then:

3. `/media/network`
4. `/media/network/games`
5. `/media/fat/cifs`
6. `/media/fat/cifs/games`
7. `/media/fat`
8. `/media/fat/games`

If the core's folder isn't found in any of these locations, MiSTer creates it automatically on the MicroSD card.
