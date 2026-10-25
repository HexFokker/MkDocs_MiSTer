MiSTer プロジェクトへのコントリビュートのためのヒントとガイドライン。

## インデントはスペースではなくタブで

プロジェクトの規約はタブです。diff がきれいになるよう、既存ファイルと一貫したインデントを保ってください。

## 適切な場所でコードにコメントする

コメントを書くのは余分な時間がかかりますが、長期的には自分を含む全員の時間を節約します。適度に丁寧に。Atari7800 コアの良い例：[TIA.sv](https://github.com/MiSTer-devel/Atari7800_MiSTer/blob/cfcb2603d3f718268b5de8b7742798dd5fdbc605/rtl/TIA.sv#L786){target=_blank} の 786 行目から：

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

このモジュールをインスタンス化するとき、開発者は各入出力の末尾にコメントを追加しました。名前があなたには意味をなしても、誰もが `hclk` が `Horizontal clock phase 2` だと知っていると仮定しないでください。他の良いコメントの習慣：代入やポートインスタンス化のセクションをカテゴリーごとに分けること、直感的でないコードの背後の「なぜ」を説明すること。

ただし、コードはコメント**過剰**にもなり得ます。それも避けましょう：

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

ワイヤー名 `color_lut` はすでにカラールックアップテーブルだと言っており、`TRANSP_DETECT` も明らかに透過検出を示します。どちらのコメントも何も追加しません。

極端で意図的に面白い例：

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

このようなことはしないでください。

## end、代入、適切なインデントを揃える

似た要素は読みやすさのために揃えてください。たとえば NES_MiSTer の [EEPROM_24C0x.sv](https://github.com/MiSTer-devel/NES_MiSTer/blob/8dddb6cc01a2a2854a444838e0cfe5a17338060f/rtl/EEPROM_24C0x.sv){target=_blank} では、これ：

```sv
// savestate
assign SS_MAP1_BACK[ 2: 0] = (state == STATE_STANDBY)  ? 3'd0 :
							 (state == STATE_TEST)     ? 3'd1 :
							 (state == STATE_ADDRESS)  ? 3'd2 :
							 (state == STATE_WRITE)    ? 3'd3 :
														 3'd4;
```

…はこれよりずっと読みやすいです：

```sv
assign SS_MAP1_BACK[ 2: 0] = (state == STATE_STANDBY) ? 3'd0 : (state == STATE_TEST) ? 3'd1 : (state == STATE_ADDRESS) ? 3'd2 : (state == STATE_WRITE) ? 3'd3 : 3'd4;
```

どちらも同じことをしますが、最初の方が一目で解析しやすいです。

別の例：

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

はこれよりずっと読みやすいです：

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

どちらもコンパイルが通り機能的に同一ですが、インデントされたバージョンの方が一目で解析しやすいです。SystemVerilog は悪いインデントでコンパイルエラーを出しませんが、それでも `end` は正しくインデントしてください。行末のコメントを揃えるのも可読性に役立ちます。このページ上部近くの `playfield` モジュール例のように。

## 分かりやすい命名

Genesis コアの [EEPROM_STM95](https://github.com/MiSTer-devel/Genesis_MiSTer/blob/b15cceff237ebd6cb269119d6ec6f3b1dcbb0a8e/rtl/EEPROM_STM95.sv#L13){target=_blank} では、このモジュールのポートインスタンス化は信号が「アクティブロー」であることを示す `_n` を使っています：

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

この慣例では、`_n` サフィックスの信号は毎回コメントなしでアクティブローと理解されます。

## うっかり DSP やロジックスペースを使い切った場合

コンパイル中にスペースを使い切った場合、コードが DSP に推論されているかもしれません。DSP は非常に限られています。[multstyle](https://www.intel.com/content/www/us/en/programmable/quartushelp/17.0/index.htm#hdl/vlog/vlog_file_dir_multstyle.htm){target=_blank} 属性でコンパイラーにロジックを使うよう伝えます：

```sv
(* multstyle = "logic" *) module myModule (
	input clk
)
```

これはモジュール内の乗算器を DSP ブロックではなくロジックセルで実装するよう強制します。`multstyle` が制御するのは乗算器の実装のみで、モジュールの他の部分が DSP やブロック RAM を使うのを防ぎません。同様に `(* multstyle = "dsp" *)` で乗算器を DSP に強制できます。`multstyle` 属性はモジュール宣言、変数宣言、二項式で機能します。
