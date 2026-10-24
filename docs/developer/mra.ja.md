このページでは、MiSTer がアーケードシステムの ROM を扱う方法の複雑な部分のほとんどを説明します。

## MRA フォーマット

一部のアーケード基板は新しい ROM を挿すだけでゲームを変えられるため、RBF ファイルをメニューリストから外し、代わりに MRA ファイルをブラウズするのが理にかなっていました。これらの MRA ファイルは、どの RBF ファイルを使うか、どの MAME ROM zip ファイルをその場でマージしてアーケードコアに渡す ROM にするかを指定します。マージ済みまたは非マージの MAME ROM から構築される、古い `a.pacman.rom` スタイルの ROM です。

### ファイルレイアウト例
```bash
/_Arcade/<game name>.mra
/_Arcade/cores/<game rbf>.rbf
/games/mame/<mame rom>.zip
/games/hbmame/<hbmame rom>.zip
```
検索パスに基づき、これらのファイルの他の場所もあります。

### MRA ファイル例
```xml
<misterromdescription>
  <name>Donkey Kong (US set 1)</name>
  <mratimestamp>201911270000</mratimestamp>
  <mameversion>0216</mameversion>
  <setname>dkong</setname>
  <year>1981</year>
  <manufacturer>Nintendo of America</manufacturer>
  <category>Maze / Monkeys</category>
  <category>Platform</category>
  <category>Platform / Mario Bros.</category>
  <rbf>DonkeyKong</rbf>
<!-- switches element taken from "Pac-Man (Midway).mra"; for demonstration purposes only -->
  <switches default="FF,FF,C9">
    <dip bits="15"    name="Cabinet" ids="Cocktail,Upright"/>
    <dip bits="16,17" name="Coinage" ids="2c/1cr,1c/1cr,1c/2cr,Free Play" values="3,1,2,0"/>
    <dip bits="18,19" name="Lives" ids="1,2,3,5"/>
    <dip bits="20,21" name="Bonus Life After" ids="10000,15000,20000,None"/>
    <dip bits="22"    name="Difficulty" ids="Hard,Normal"/>
  </switches>
  <buttons names="Jump,Start 1P,Start 2P,Coin" default="A,Start,Select,R"/>
<!-- rom index 1 or any other index can pass additional information to a rom.
useful to say this rom is game A or game 1.  Use it in case of multiple games for
the same RBF, e.g. Dig Dug 2, Mappy -->
  <rom index="1">
    <part>0A</part>
  </rom>
<!-- romstruct element taken from "Two Tigers.mra"; for demonstration purposes only -->
  <romstruct>
ROM structure
00000 - 0BFFF  48k CPU1
0C000 - 0FFFF  16k CPU2
10000 - 13FFF  16k GFX1
14000 - 1BFFF  32k GFX2
  </romstruct>

<!-- the nvram node is used to download and upload the nvram memory. When the user hits "Save Settings" in the OSD it triggers ioctl_upload. This isn't available in Donkey Kong because it didn't originally have NVRAM -->
<nvram index="4" size="1024"/>



<!-- rom index 0 is the standard rom. The zip will be added to the name inside the part, unless the
part has its own zip. The md5 will be checked at the end. A file not found error is reported before an md5
error. -->
  <rom index="0" zip="dkong.zip" md5="05fb1dd1ce6a786c538275d5776b1db1" type="merged|nonmerged|split">
    <part crc="ba70b88b" name="c_5et_g.bin"/>
<!-- interleave element taken from "Crater Raider.mra"; for demonstration purposes only -->
    <interleave output="32">
	<part crc="579a8e36" name="crvid.a4"  map="0001"/>
	<part crc="2c2f5b29" name="crvid.a3"  map="0001"/>
	<part crc="5bf954e0" name="crvid.a6"  map="0010"/>
	<part crc="9bdec312" name="crvid.a5"  map="0010"/>
	<part crc="4b913498" name="crvid.a8"  map="0100"/>
	<part crc="9fa307d5" name="crvid.a7"  map="0100"/>
	<part crc="7a22d6bc" name="crvid.a10" map="1000"/>
        <part crc="811f152d" name="crvid.a9"  map="1000"/>
    </interleave>
<!-- begin kill screen fix -->
    <patch offset="0xf7d">
FE 04 38 02 3E 04 47 A7 17 A7 17 A7 17 80 80 C6 
28
    </patch>
<!-- end kill screen fix -->
    <part crc="d6412358" name="c-2j.bpr"/>
    <part crc="b869b8f5" zip="another.zip" name="v-5e.bpr"/>
    <part crc="b869b8f5" name="v-5e.bpr" offset="1024" length="1024"/>
    <part repeat="3328">00</part>
    <part>
80 80 80 80 80 80 7F 7F 7F 7F 7F 7F 7F 80 80 80
    </part>
  </rom>
<!-- If the first rom0 fails the md5 checksum, it will go ahead and try again if another entry is present.
Otherwise it will skip the additional entries.
-->
  <rom index="0" zip="dkong.zip" md5="05fb1dd1ce6a786c538275d5776b1db1">
  </rom>
</misterromdescription>

```

コアを作るとき、`ioctl_index` > 0 で追加データを渡せます。

```verilog
// Retrieve Title No.
always @(posedge clk_sys) begin
   if (ioctl_wr & (ioctl_index==1)) tno <= ioctl_dout[3:0];
end

```

### XML 要素と属性の説明

* **name**: 要素としては ROM を何と呼ぶべきかを示します。値は MAME から取るべきです。属性としては、MiSTer が読み込むべき外部 ROM ファイル（またはその一部）を示します。
* **mratimestamp**: *.mra ファイルが作成された日付を示します（より新しいバージョンの *.mra ファイルがあるかユーザーが判断するのに有用）。日付フォーマットは YYYYMMDD です。
* **mameversion**: *.mra ファイルが基づいている MAME romset のバージョン（テストに使われたバージョン）を示します。MAME のバージョン番号のドットは省略されます。
* **setname**: MAME が付ける romset の名前を示します。romset ごとに個別の設定を保存できるよう、*.rbf ファイルで指定されたコア ID を上書きするために使われます。
* **year**: ゲームがリリースされた年を示します。フォーマットは YYYY で、値は MAME から取るべきです。
* **manufacturer**: ゲームのメーカーを示します。値は MAME から取るべきです。
* **rbf**: ゲームを実行するために使うコアのファイル名（パスと拡張子なし）を示します。
* **buttons**: ゲームのデフォルトボタンマッピングを示します。名前の通りボタンのみに適用され、方向コントロールには適用されません。**names** 属性は MiSTer OSD でボタンが何と呼ばれるかを指定し、**default** 属性は仮想 [MiSTer ゲームパッド](../setup/controller.md)にどうマッピングされるかを指定します。各 **name** は hps_io から出力される joystick_X ポートの1ビットに対応し、ビット4から始まります（ビット0-3は方向コントロール）。未使用ビットは '-' でパディングします。ボタンにはプレイヤー入力だけでなく、スタートボタン、コイン、ポーズなども含まれます。これらのビットの並べ方はあなた次第です。エミュレートされたハードウェアの I/O ポートに直接マッピングすることも、任意にすることもできます。OSD では属性に現れる順序で設定され、その後コア内でハードウェアポートに再マッピングされます。
* **switches**: アーケード基板上にある DIP スイッチを定義します。少し複雑なので、下に[専用セクション](#dip-switches)があります。
* **nvram**: OSD の Save Settings で NVRAM データを保存するよう MiSTer に指示します。NVRAM が保存されていれば、コアにも送られます。
* **romstruct**: ROM 構造、ROM メモリーのマップ方法についての情報を与えます。ここに含まれる情報は他の開発者向けのコメントを意図したもので、MiSTer が実際に使うものではありません。
* **remark**: 他の開発者向けの自由形式の備考。MiSTer は使いません。
* **rom**: part、patch、interleave 要素は rom 要素を親要素として持つ必要があります。値が1の **index** 属性は、マルチゲームコアにどのマシン設定を使うかを伝えます。実際の ROM データを渡すにはインデックス値0が必要です。オプションの **address** 属性は ROM を特定のメモリアドレスに読み込みます。**md5** 属性は md5 チェックサムの指定に使います。md5 チェックサムは、与えられた *.mra ファイルに従って ROM 全体が作成された後、MiSTer が計算・チェックします。MiSTer がコア起動時に計算したチェックサムは Linux コンソールで確認できます（コマンドラインは `/media/fat/MiSTer rbffilename mrafilename`）。`*.mra` ファイルで指定されたものと異なるチェックサムの ROM は読み込まれません。md5 チェックサムを "none" と指定するとこのチェックが無効になります。
* **part**: part 要素は rom 要素内でのみ許可されます。ROM の一部を指定するために使います。part の内容は（著作権法が許せば）hex 値として *.mra ファイル自体に埋め込むか、name 属性経由で外部ファイルを参照できます。外部ファイルが親 rom 要素とは別の zip ファイルにある場合、zip ファイルのファイル名を **zip** 属性で指定する必要があります。
    * **crc** 属性はそれぞれの part の CRC32 チェックサムを指定します（フォーマット：8桁の hex）。crc 値が指定されている場合、MiSTer は crc で適切なファイルを選ぼうとし、crc 値が一致しない場合のみ `name` 属性のファイル名に戻ります。これにより *.mra ファイルと異なる MAME バージョンの romset との互換性が上がります。crc 値は外部ファイルにのみ関係するため、外部ファイルへの参照がある場合にのみ part 要素に crc 値を付けるべきです。
    * **repeat** 属性は埋め込み part にのみ適用され、シーケンスを（何回ではなく）どのくらいの長さ繰り返すかを示します。デフォルトでは10進数が仮定されます。hex 数値は "0x" を前に付ける必要があります。
    * rom 要素内では、**offset** と **length** 属性は外部ファイルにのみ適用されます。内部データに offset 属性を使うには patch 要素を使う必要があります。offset は MiSTer が読み込みを開始すべきファイル内の位置を示し、length は MiSTer が読み込むべきシーケンスの長さを示します。デフォルトでは10進数が仮定されます。hex 数値は "0x" を前に付ける必要があります。
    * **map** 属性は、対応する part 要素の特定部分だけを読み込むよう指定します。たとえば "0001"（バイナリー）の値は4バイトごとだけ読み込むことを意味し、"1010"（バイナリー）は1バイト目と3バイト目だけ読み込むことを意味します。part をバイトスワップするには、map 属性値を 21（10進）に設定し、その part 要素を interleave タグで囲む必要があります。
* **patch**: patch 要素は rom 要素内でのみ許可されます。ROM 全体が part から作成された後に適用され、指定された offset から patch 要素内容の長さ分、ROM の内容を patch 要素の内容で上書きします。`operation="xor"` を指定すると、上書きの代わりに patch データを ROM に XOR します。
* **interleave**: interleave 要素は rom 要素内でのみ許可され、1つ以上の part 要素の親要素としてのみ使えます。必須の **output** 属性とともに、interleave 要素は子 part 要素を特定の方法で読み込むよう指定できます。たとえば "32"（10進）の output 値は、子 part 要素の ROM データを32ビットとして扱うことを示します。オプションの **input** 属性は、出力と異なる場合の入力幅を指定します。
* **rotation**: オプションの要素で、テキストが画面の回転を宣言します。"vertical" で始まる値はゲームを縦画面としてマークし、"ccw"/"counterclockwise" または "cw"/"clockwise" を追加すると回転方向を設定します（デフォルトは時計回り）。
* **cheats**: オプションの要素で、ゲームのチートフォーマットを記述します。**size** は1つのチートエントリのバイト数、**max** は同時に有効にできるチートの最大数です。子要素の **cheat** は **name** 属性を取り、OSD チートメニューに表示されます。

### DIP スイッチ { #dip-switches }

最新バージョンの MRA での DIP スイッチ対応は、ステータスビットの代わりに使われます。DIP 設定文字列はコア内にリストされ、`ioctl_index` 254 経由で送られる最大64ビットの DIP データを読み込むのはコアの責任です。


```verilog
reg [7:0] sw[8];
always @(posedge clk_sys) if (ioctl_wr && (ioctl_index==254) && !ioctl_addr[24:3]) sw[ioctl_addr[2:0]] <= ioctl_dout;
```

`switches` 要素は DIP スイッチ設定を保持し、`default` はデフォルトバイトを保持します。これらはアーケードを正しい工場設定にデフォルトさせます。工場設定がすべて OFF/OFF/OFF でない場合に便利です。**default** の hex 文字列では、左端のバイトが DIP ビット 7:0 を指し、次のバイトが 15:8、以下同様であることに注意してください。つまり最上位バイトが文字列の右端を占めます。

```xml
 <switches default="FF,FF,C9">
```

値 C9 は DIP ビット 23:16 に適用されます。

`dip` タグで DIP スイッチエントリーを追加できます。ビット番号（0始まり）はコアの書き方に基づきます。MAME ソースコードがビットを理解する助けになることが多いです。番号付けは使う ROM、アーケードコア、レイアウトのされ方に依存します。
 
* **bits**: `ioctl_data` でコアに送られるビット番号
* **name**: OSD のタイトル
* **ids**: OSD の各オプションのタイトル
* **values**: 値を 0,1,2,3 と違うものにしたい場合、並べ替えられます
 
```xml
    <dip bits="16,17" name="Coinage" ids="2c/1cr,1c/1cr,1c/2cr,Free Play" values="3,1,2,0"/>
```
