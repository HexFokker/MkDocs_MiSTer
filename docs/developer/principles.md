Tips and guidelines for contributing to the MiSTer project.

## Indent with tabs, not spaces

Tabs over spaces may be controversial, but there's good reason here: the project lives on GitHub, which handles spaces poorly in diffs, git blame, and formatting. Tabs are more compatible and easier for everyone to work with.

## Comment your code when appropriate

Commenting takes extra time but saves everyone, including yourself, time in the long run. Be reasonably thorough. A good example from the Atari7800 core: [TIA.sv](https://github.com/MiSTer-devel/Atari7800_MiSTer/blob/cfcb2603d3f718268b5de8b7742798dd5fdbc605/rtl/TIA.sv#L786){target=_blank} starting at line 786:

```sv
module playfield
(
	input         clk,     // Master clock
	input         reset,   // System reset
	input logic   clkp,    // Pixel Clock
	input clock_t hclk,    // Horizontal clock phase 2
	input         reflect, // Control playfield, 1 makes right half mirror image
	input         cnt,     // center signal, high means right half
	input         rhb,     // Reset HBlank signal
	input [19:0]  pfc,     // Combined playfield registers
	output logic  pf       // Playfield graphics
);
```

When instantiating this module, the developer added a comment to the end of each input and output. Don't assume everyone knows that `hclk` is `Horizontal clock phase 2`, even if the name makes sense to you. Other good comment practices: separating sections of assignments or port instantiations by category, and explaining the "why" behind unintuitive code.

But code can also be commented **too** much — avoid that as well:

```sv
// The 16-bit Color Look Up Table
wire [7:0] color_lut[16] = '{
	8'd0,   8'd27,  8'd49,  8'd71,
	8'd87,  8'd103, 8'd119, 8'd130,
	8'd146, 8'd157, 8'd174, 8'd190,
	8'd206, 8'd228, 8'd255, 8'd255

wire TRANSP_DETECT; // Transparency Detection
};
```

The wire name `color_lut` already says it's a color look-up table, and `TRANSP_DETECT` obviously signals transparency detection — neither comment adds anything.

For an extreme and deliberately funny example:

```sv
//////////////////////////////////
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~ ///
///  REGION PRIORITY HANDLING  ///
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~ ///
//////////////////////////////////
case(status[28:27]) // Status Bits 27 through 28 
// Region priority is in CONF_STR section at line 256 of this file
// If line 256 is no longer valid then here is a reference to what it says:
// "D2ORS,Priority,US>EU>JP,EU>US>JP,US>JP>EU,JP>US>EU;",
// O = Option, R and S are the status bits.
// 2 status bits means there are 4 combinations of options
// Case statements for this begin with 0 and end in 3
// Since there were two switches and 4 options as explained above you can treat 0-3 as 1-4 if you'd like
// First Case Statement (0 is actually the first one)
	0: if(hdr_u) region_req <= 1; // NTSC-U Region
		else if(hdr_e) region_req <= 2; // PAL Region
		else if(hdr_j) region_req <= 0; // NTSC-J Region
		else region_req <= 1; // Set to NTSC-U if there is no region in the header
// Second Case Statement (1 is actually the second one)
	1: if(hdr_e) region_req <= 2; // PAL Region
		else if(hdr_u) region_req <= 1; // NTSC-U Region
		else if(hdr_j) region_req <= 0; // NTSC-J Region
		else region_req <= 2; // Set to PAL if there is no region in the header
// Third Case Statement (2 is actually the third one)
	2: if(hdr_u) region_req <= 1; // NTSC-U Region
		else if(hdr_j) region_req <= 0; // NTSC-J Region
		else if(hdr_e) region_req <= 2; // PAL Region
		else region_req <= 1; // Set to NTSC-U if there is region in the header
// Fourth Case Statement (3 is actually the fourth one)
	3: if(hdr_j) region_req <= 0; // NTSC-J Region
		else if(hdr_u) region_req <= 1; // NTSC-U Region
		else if(hdr_e) region_req <= 2; // PAL Region
		else region_req <= 0;  // Set to NTSC-U if there is region in the header
endcase // End of the case statement
// Okay I can put things that aren't in the case statement down here
//////////////////////////////////////////////
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ///
/// END REGION OF REGION PRIORITY HANDLING ///
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ///
//////////////////////////////////////////////
```

Please don't do things like this.

## Align ends, assignments, and proper indentation

Keep similar elements aligned for readability. For example, in [EEPROM_24C0x.sv](https://github.com/MiSTer-devel/NES_MiSTer/blob/8dddb6cc01a2a2854a444838e0cfe5a17338060f/rtl/EEPROM_24C0x.sv){target=_blank} from NES_MiSTer, this:

```sv
// savestate
assign SS_MAP1_BACK[ 2: 0] = (state == STATE_STANDBY)  ? 3'd0 :
							 (state == STATE_TEST)     ? 3'd1 :
							 (state == STATE_ADDRESS)  ? 3'd2 :
							 (state == STATE_WRITE)    ? 3'd3 :
														 3'd4;
```

...is a lot easier to read than this:

```sv
assign SS_MAP1_BACK[ 2: 0] = (state == STATE_STANDBY) ? 3'd0 : (state == STATE_TEST) ? 3'd1 : (state == STATE_ADDRESS) ? 3'd2 : (state == STATE_WRITE) ? 3'd3 : 3'd4;
```

Both do the same thing, but the first is much easier to parse at a glance.

Another example:

```sv
always @(posedge clk) begin
	if (rst)
		q <=0;
	else
		if (d)
			q <= ~q;
		else
			q <= q;
end
```

is much easier to read than:

```sv
always @(posedge clk) begin
if (rst)
q <=0;
else
if (d)
q <= ~q;
else
q <= q;
end
```

Both compile successfully and are functionally identical, but the indented version is easier to parse at first glance. SystemVerilog won't throw compilation errors for bad indentation, but indent `end`s properly anyway. Aligning comments at the end of a line also helps readability, as in the `playfield` module example near the top of this page.

## Naming things to be easily understood

In [EEPROM_STM95](https://github.com/MiSTer-devel/Genesis_MiSTer/blob/b15cceff237ebd6cb269119d6ec6f3b1dcbb0a8e/rtl/EEPROM_STM95.sv#L13){target=_blank} in the Genesis core, this module's port instantiation uses `_n` to signify that the signal is "active low":

```sv
module STM95XXX
(
	//...
	input         hold_n,        // Hold (active low)
	input         cs_n,          // Chip Select (active low)
	input         wp_n,          // Write Protect (active low)
	//...
);
```

With this convention, a signal suffixed `_n` is understood to be active low without needing a comment every time.

## If you run out of DSP or Logic space accidentally

If you run out of space during compilation, your code may be inferred into DSP, which is very limited. Tell the compiler to use logic instead with the [multstyle](https://www.intel.com/content/www/us/en/programmable/quartushelp/17.0/index.htm#hdl/vlog/vlog_file_dir_multstyle.htm){target=_blank} attribute:

```sv
(* multstyle = "logic" *) module myModule (
	input clk
)
```

This forces multipliers in the module to be implemented in logic cells instead of DSP blocks. Note that `multstyle` only controls multiplier implementation — it does not prevent other parts of the module from using DSP or block RAM. You can likewise force multipliers into DSP with `(* multstyle = "dsp" *)`. The `multstyle` attribute works on module declarations, variable declarations, and binary expressions.
