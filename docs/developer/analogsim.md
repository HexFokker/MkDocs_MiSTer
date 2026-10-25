*Article by MiSTer core developer Jegor van Opdorp (SupraDeus/jopdorp)*

Many old computers have analog parts — for example, audio boards with partly analog synthesis, and desktop computers with tape input.

There is currently no convenient way to directly simulate electronic circuits — e.g. from their SPICE netlists — in real time on MiSTer. To implement these circuits in FPGA, you need to simulate the circuit's behavior yourself.

The [Arcade-Battlezone](https://github.com/jopdorp/Arcade-BattleZone_MiSTer){target=_blank} core is an example of a core with analog sound synthesis.

## A way to approach the problem

1. Find YouTube videos of people playing the actual game to get an idea of the sounds it has.
2. Play the game in an emulator, paying extra attention to sounds that differ between the emulator and the video of the actual machine.
3. Identify the digital and analog parts of the schematic.

    * The digital parts run at the system clock speed, or sometimes at a separate clock source closer to the audible frequency spectrum. In Arcade Battlezone, for example, a 12 kHz input feeds a digital noise circuit whose output goes into an analog integrator circuit, producing the explosion sound (its implementation is listed at "inverting amplifier" below). In the FPGA implementation, the digital models of these analog parts are updated at the audio sample rate (48 kHz).

4. Implement all the digital parts. Common digital components in sound systems include:  

    * linear feedback shift register:  
    ![linear feedback shift register](img/linear_feedback_shift_reg.png)  
    An implementation of a similar circuit in Arcade BattleZone can be found [here](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/noise_shifters.sv){target=_blank}.

    * flip-flops, like the JK flip-flop, implemented [here](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/jk74109.sv){target=_blank}.

5. Identify analog circuits with isolated behavior, i.e. 1 input, 1 output. These can be individually implemented and tested.
6. Identify common, easily recognizable and implementable parts, such as:

    * [low pass filters](https://www.electronics-tutorials.ws/filter/filter_2.html){target=_blank}  
      ![low pass](img/low_pass_filter.png)  
      This can be implemented using an IIR low-pass filter; find the parameters with [this spreadsheet](https://docs.google.com/spreadsheets/d/1Z2DNhAQyqkDpNVJuzYPk3ZeW4rChxN7fTKsLGvb2r7g/edit#gid=0){target=_blank}.
      
      Some IIR filter implementations:

      * [Blockade Low Pass Filter](https://github.com/MiSTer-devel/Arcade-Blockade_MiSTer/blob/main/rtl/audio/blockade_lpf.v){target=_blank}
      * [Blockade Infinite Impulse Response (IIR) 1st Order Filter](https://github.com/MiSTer-devel/Arcade-Blockade_MiSTer/blob/main/rtl/audio/iir_1st_order.v){target=_blank}
      
      A simpler type:

      * [Blockade Infinite Impulse Response (IIR) Filter](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/iir.sv){target=_blank}
   
    * [high pass filters](https://www.electronics-tutorials.ws/filter/filter_3.html){target=_blank}

      ![high pass filter](img/high_pass_filter.png)

    * inverting amplifiers

      ![inverting amplifier](img/inverting_amplifier.png)

      This is essentially a sign inversion of the sample, followed by a (fixed sign) multiplication.

    * non inverting amplifiers

      ![non inverting amplifier](img/non_inverting_amplifier.png)

      This is just a (fixed sign) multiplication of the sample.

    * differential amplifiers

      ![differential amplifier](img/differential_amplifier.png)

    * inverting integrators

      ![inverting integrator](img/inverting_integrator.png)

      or, equivalently:

      ![inverting integrator 2](img/inverting_integrator_2.png)

      A leaky integrator is essentially a sign inversion of the sample, followed by a multiplication, with the result stored in a register.

      The multiplication runs repeatedly each audio clock cycle, producing a "release/decay" amplifier envelope.
     
      An example of an implementation of this can be found [here](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/6606cbce7760c60fc06e613292f731f76ffb18ba/rtl/noise_sound.sv#L52){target=_blank}

    * other common [opamp circuits](https://en.wikipedia.org/wiki/Operational_amplifier_applications){target=_blank}
    * [additive mixers](https://en.wikipedia.org/wiki/Electronic_mixer){target=_blank}

      ![additive mixer](img/additive_mixer.jpg)

      An additive mixer sums two signals (averaging is the same sum scaled by 1/2 — the gain differs, so pick whichever the circuit actually implements). If the resistance is higher for one signal than the other, this will result in a volume difference between them.

7. For the parts that need more attention, note them and try to guess their function. [Differentiators](https://en.wikipedia.org/wiki/Operational_amplifier_applications#Inverting_differentiator){target=_blank} and [integrators](https://en.wikipedia.org/wiki/Operational_amplifier_applications#Inverting_integrator){target=_blank} combined with [555 timers](https://www.electronics-tutorials.ws/waveforms/555_oscillator.html){target=_blank}  and noise inputs can be tricky.
8. Implement the mixers
9. Implement the filters
10. Implement the difficult parts of the circuit:
    1. Implement the circuit in a simulator.
    2. Figure out what input goes into the circuit when the game gets played.
    3. Run the simulation with the correct input and save the output as a `.wav` file.
    4. Analyze the output by viewing it in a wave editor like Audacity and listening to it.
    5. Is the input always the same (not noise), and does the circuit always respond the same way (not generating noise)? If so:
       1. Sample the output of the simulation.
       2. Convert the sample into an array literal and trigger it as needed — in this case the sample is usually just triggered by a pulse.
    6. If the analog circuit has noise as input or has variable inputs such as a number-controlled frequency or speed, you will need to:
       1. Make a mathematical model of the analog circuit.
       2. Implement the model in an easy-to-use programming language such as Python.
       3. Compare the output of the mathematical model with the output of the circuit simulation using the same inputs. They have to be close — not numerically identical, but indistinguishable to the ear.
       4. Rework your mathematical model to eliminate real-time division, in two steps:
          1. algebraically
          2. by precalculating any remaining divisions into lookup tables
       5. You can also create other kinds of lookup tables, for example a sine wave.
       6. Implement the mathematical model in HDL.
    7. Verify the outputs of the HDL with a testbench.
    8. Hook up the chip to the rest of your core!


## Handy links
### Developer journeys of analog circuit implementations
[MiSTer - Head On](headonsoundpcb.md)

### Informational resources

* For finding the right values of a filter: [https://www.micromodeler.com/dsp/](https://www.micromodeler.com/dsp/){target=_blank}
* Common operational amplifier uses, such as differentiators and integrators: [https://en.wikipedia.org/wiki/Operational_amplifier_applications](https://en.wikipedia.org/wiki/Operational_amplifier_applications){target=_blank}
* Explanation of how 555 timers work: [https://www.electronics-tutorials.ws/waveforms/555_oscillator.html](https://www.electronics-tutorials.ws/waveforms/555_oscillator.html){target=_blank}
* SPICE programming: [https://www.allaboutcircuits.com/textbook/reference/chpt-7/fundamentals-spice-programming/](https://www.allaboutcircuits.com/textbook/reference/chpt-7/fundamentals-spice-programming/){target=_blank}

### Code examples

* [Example of a noise-based sound Python implementation in a notebook](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/spice/Red%20baron%20crash%20circuit%20sim.ipynb){target=_blank}
* [Example of Python code that generates a lookup table](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/generate_control_coltages_to_frequency.py){target=_blank}
* [Example of a common digital noise generator](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/noise_source_shell_explo.sv){target=_blank}
* [Example of a sine-based sound that takes noise as input](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/bang_sound.sv){target=_blank}
* [Example of a script that takes the output of a SPICE simulation and generates a .wav file from it](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/spice/spicetowav.py){target=_blank}
* [Example of a SPICE netlist for a noise-based sound](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/spice/bang.cir){target=_blank}

### Tooling

* [https://www.falstad.com/circuit/](https://www.falstad.com/circuit/){target=_blank}
* [http://ngspice.sourceforge.net/](http://ngspice.sourceforge.net/){target=_blank}
* [https://www.audacityteam.org/](https://www.audacityteam.org/){target=_blank}
