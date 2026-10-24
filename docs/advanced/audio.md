---
hide:
  - toc
---

The MiSTer has audio filters that make the audio sound less harsh and more balanced. Some old game systems were not designed for raw digital output: they had analog audio filters between the sound hardware and the speakers. These filters are generated from mathematical formulas representing common filters used in real electronics. You can find all of the filters in the [Filters_MiSTer GitHub repository](https://github.com/MiSTer-devel/Filters_MiSTer){target=_blank}.

## Types of Filters

`Arcade LPF` - Filters designed to replicate the filtering of common arcade cabinets. Many arcade games' raw audio output is very harsh on the ears; using these filters can help soften the sound. 1st and 2nd refer to the filter order. LPF stands for "low-pass filter", and the kHz value is the cutoff frequency.

`Core Specific` - Filters for specific cores. Currently there is only one core-specific filter, which replicates the filtering of one model of Super Nintendo.

`General LPF` - More generalized low-pass filters with higher cutoff frequencies than the arcade filters (10-20 kHz vs 2-8 kHz).

## Example video
![type:video](videos/sound-filters.mp4)
