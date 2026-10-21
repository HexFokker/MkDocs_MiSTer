When you override the gamepad settings inside a core, you can also map button combinations (e.g. A+B) to a single button, if your gamepad has enough physical buttons. For this, after you define a gamepad, MiSTer asks whether you want to set up "alternate mappings".

The alternate mapping is active at the same time as the main mapping. It lets you:

* map two physical buttons to the same core button (e.g. an alternate button for Start), or
* map one physical button to a two-button combination in the core (e.g. physical X to the core's A+B).

## Bind core button to two physical buttons

The simplest use is mapping an extra physical button. Only this additional button needs to be defined in the alternate map, as follows:

| Map      | D-Pad     | A      | B      |
| -------- | --------- | ------ | ------ |
| `main`   | _define_  | Btn 1  | Btn 2  |
| `alt`    | _skip_    | _skip_ | Btn 3  |

With this setup, physical buttons 2 and 3 are both mapped to the core's B button.

This also works with gamepad directions. For example, for games that use Up as a jump input, you can map a third physical button to Up.

## Bind physical button to core button combo

A more advanced setup uses both mappings in parallel, making one physical button press two core buttons at the same time:

| Map      | D-Pad     | A      | B      |
| -------- | --------- | ------ | ------ |
| `main`   | _define_  | Btn 1  | Btn 3  |
| `alt`    | _skip_    | Btn 3  | Btn 2  |

With this setup, Button 1 is A, Button 2 is B, and Button 3 is A+B.

This is particularly useful for the Neo Geo core, where some fighting games use A+B and C+D as strong hits. Unfortunately, Neo Geo games aren't consistent with each other, so no single mapping works for all of them. The examples below show mappings for several games.

## Example: Neo Geo Breakers / Breakers' Revenge

Assume a six-button arcade controller (for Street Fighter 2) with 3 punch buttons on top and 3 kick buttons below, and map the buttons so Breakers / Breakers' Revenge gets the same layout.

The game uses these attack buttons:

* A: Weak Punch
* B: Weak Kick
* C: Strong Punch
* D: Strong Kick

In addition, most characters have an extra "command" move mapped to:

* Weak Punch + Strong Punch 
* Weak Kick + Strong Kick 

To match the Street Fighter 2 layout, assign this across six buttons:

| **-**   | **Weak** | **Strong** | **Weak+Strong** |
|:--------|:---------|:-----------|:----------------|
|**Punch**|    A     |  C         |   A + C         |
|**Kick** |    B     |  D         |   B + D         |

This translates to the following buttons:

| **-**   | **Weak** | **Strong** | **Weak+Strong** |
|:--------|:---------|:-----------|:----------------|
|**Punch**|Btn 1     |  Btn 2     |   Btn 3         |
|**Kick** |Btn 4     |  Btn 5     |   Btn 6         |

To get this layout, use the following assignments in the main and alternate maps:

| **map** | **d-pad** | **A** | **B** | **C** | **D** |
|:--------|:----------|:------|:------|:------|:------|
|**main** |_define_   | Btn 1 | Btn 4 | Btn 3 | Btn 6 |
|**alt**  |_skip_     | Btn 3 | Btn 6 | Btn 2 | Btn 5 |

(In the alternate map, the d-pad and all other buttons can be skipped.)

## Example: Neo Geo King of Fighters / Fatal Fury Special

Both of these games use the same attack layout as Breakers, but their button combinations differ:

| **-**   | **Weak** | **Strong** | **Combo**       |
|:--------|:---------|:-----------|:----------------|
|**Punch**|    A     |  C         |   A + B         |
|**Kick** |    B     |  D         |   C + D         |

The mapping is similar, with some buttons rearranged:

| **map** | **d-pad** | **A** | **B**   | **C**   | **D** |
|:--------|:----------|:------|:--------|:--------|:------|
|**main** |_define_   | Btn 1 | _Btn 3_ | _Btn 2_ | Btn 6 |
|**alt**  |_skip_     | Btn 3 | _Btn 4_ | _Btn 6_ | Btn 5 |

## Example: Neo Geo Samurai Shodown

This game has yet another layout, changing the order of base attacks:

| **-**   | **Weak** | **Medium** | **Strong**      |
|:--------|:---------|:-----------|:----------------|
|**Slash**|    A     |  B         |   A + B         |
|**Kick** |    C     |  D         |   C + D         |

Map it as follows:

| **map** | **d-pad** | **A** | **B**   | **C**   | **D** |
|:--------|:----------|:------|:--------|:--------|:------|
|**main** |_define_   | Btn 1 |  Btn 3  | _Btn 4_ | Btn 6 |
|**alt**  |_skip_     | Btn 3 | _Btn 2_ |  Btn 6  | Btn 5 |

## Counterexample: The Last Blade 1 and 2

Similar to the above, but the button combo differs:

| **-**   | **Weak** | **Medium** | **Special**     |
|:--------|:---------|:-----------|:----------------|
|**Slash**|    A     |  B         |   _B + C_       |
|**Kick** |    C     |  D         |   C + D         |

In this case, it is not possible to map C three times — _so you must choose whether to map B+C or C+D_.

### Option 1: Map B+C to button 3

| **map** | **d-pad** | **A** | **B**   | **C**   | **D** |
|:--------|:----------|:------|:--------|:--------|:------|
|**main** |_define_   | Btn 1 |  Btn 2  |  Btn 3  | Btn 5 |
|**alt**  |_skip_     | _skip_| Btn 3   |  Btn 4  | _skip_|

(Btn 6 remains unassigned)

### Option 2: Map C+D to button 6

| **map** | **d-pad** | **A** | **B**   | **C**   | **D** |
|:--------|:----------|:------|:--------|:--------|:------|
|**main** |_define_   | Btn 1 |  Btn 2  |  Btn 6  | Btn 5 |
|**alt**  |_skip_     | _skip_| _skip_  |  Btn 4  | Btn 6|

(Btn 3 remains unassigned)
