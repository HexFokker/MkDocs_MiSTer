MGL ファイルは、MiSTer の Menu コアからゲームを直接読み込むショートカットです。SD カードのルートに置けばメニュー最上部に表示され、アンダースコア（`_`）で始まるメニューフォルダー内に置くこともできます。メニューフォルダーは自分で作れます。

すべてのコアが MGL ファイルに対応しているわけではありませんが、人気のコアはほぼ対応しています。コンソールの対応は良好ですが、コンピューターコアは、読み込んだゲームを自動起動する仕組みがない限り、一般的にうまく動きません。

## MGL フォーマット

MGL は `.mgl` 拡張子を持つシンプルな XML ファイルです。MGL ファイルに付けた名前（拡張子を除く）がメニューの項目名になります。例：`My Favorite Game.mgl` はメニューに `My Favorite Game` と表示されます。

MGL ファイルの例：

```xml
<mistergamedescription>
	<rbf>_console/snes</rbf>
	<file delay="2" type="f" index="0" path="puzzles/dummy.sfc"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_console/psx</rbf>
	<file delay="1" type="s" index="1" path="dummy.chd"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_Computer/ao486</rbf>
	<file delay="1" type="s" index="2" path="dummy.vhd"/>
	<file delay="1" type="s" index="4" path="cds/dummy.iso"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_Console/SMS</rbf>
	<setname>GameGear</setname>
	<file delay="1" type="f" index="2" path="some/other.zip/path/dummy.gg"/>
</mistergamedescription>
```

```xml
<mistergamedescription>
	<rbf>_Console/Gameboy</rbf>
	<setname same_dir="1">GBC</setname>
</mistergamedescription>
```

* `rbf`：SD ルートからコアの RBF ファイルへの相対パス。拡張子とタイムスタンプは除きます。
* `setname`：コア名をこの値に設定し、games フォルダーと設定ファイルを変えます。
    * `setname same_dir="1"`：コア名をこの値に設定し、設定ファイルを変えますが games フォルダーはコア本来のまま。
* `file`：コアに読み込むファイルとその起動引数。
    * `delay`：読み込み／マウントまで待つ秒数。
    * `type`：`f` はファイルをメモリーに読み込み、`s` はファイルをマウント。
    * `index`：コア内でファイルが読み込まれるスロット。
    * `path`：コアの games フォルダーからゲームファイルへの相対パス。
* `reset`：コアにリセットを発行。おそらく不要です。
    * `delay`：リセットまで待つ秒数。
    * `hold`：リセットを保持する秒数（オプション。省略時は約 100 ms）。
* `option`：コアの OSD オプションの1つを指定した値に設定します。
    * `name`：コアの OSD に表示されるオプション名。
    * `value`：そのオプションの値の1つ。
    * `page`：OSD ページタイトル（オプション。同名オプションが複数ページにある場合のみ必要）。
    * `default="1"`：コアに保存済み設定がない場合のみ適用。初回デフォルトに便利。

`rbf` タグは必須です。

`file` タグはオプションで、1つの MGL 内で複数回使えます。複数のファイルスロットを持つコアに便利です。

`setname` タグはオプションで、その変更は一時的です。複数システムを遊ぶコアや、異なる設定を頻繁に切り替えるコアに便利です。`same_dir="1"` を使えば、カスタム設定を使いながらコアの通常の games フォルダーからゲームを読み込めます。

`type` と `index` 属性は、コアの開発者が設定した値に依存します。確認方法は後述の [MGL 引数の調べ方](#finding-mgl-arguments)を参照。

ゲーム読み込み後に OSD メニューが出たり、ゲームが読み込まれない場合は `delay` 値を増やしてみてください。

ショートカットごとにオプションをプリセットすることもできます。たとえば、これは Colors オプション（コアの "Audio & Video" OSD ページにある項目）を Raw RGB にして TurboGrafx-16 ゲームを読み込みます：

```xml
<mistergamedescription>
	<rbf>_Console/TurboGrafx16</rbf>
	<option name="Colors" value="Raw RGB" page="Audio & Video"/>
	<file delay="1" type="f" index="0" path="dummy.pce"/>
</mistergamedescription>
```

## MGL 引数

主なコアの MGL 引数：

| システム            | RBF                   | Delay | Index   | Type |
| ------------------- | --------------------- | :---: | :-----: | :--: |
| Atari 2600/7800     | _Console/Atari7800    | 1     | 1       | f    |
| Atari 5200          | _Console/Atari5200    | 1     | 1       | s    |
| Atari Lynx          | _Console/AtariLynx    | 1     | 1       | f    |
| Commodore 64        | _Computer/C64         | 1     | 1       | f    |
| Famicom Disk System | _Console/NES          | 2     | 1       | f    |
| Game Boy (Color)    | _Console/Gameboy      | 2     | 1       | f    |
| Game Boy Advance    | _Console/GBA          | 2     | 1       | f    |
| Game Gear           | _Console/SMS          | 1     | 2       | f    |
| Genesis             | _Console/Genesis      | 1     | 1       | f    |
| Master System       | _Console/SMS          | 1     | 1       | f    |
| Sega CD             | _Console/MegaCD       | 1     | 0       | s    |
| Neo Geo             | _Console/NeoGeo       | 1     | 1       | f    |
| NES                 | _Console/NES          | 2     | 1       | f    |
| PlayStation         | _Console/PSX          | 1     | 1       | s    |
| Sega 32X            | _Console/S32X         | 1     | 1       | f    |
| SNES                | _Console/SNES         | 2     | 0       | f    |
| TurboGrafx-16       | _Console/TurboGrafx16 | 1     | 0       | f    |
| TurboGrafx-16 CD    | _Console/TurboGrafx16 | 1     | 0       | s    |

Wizzo 氏によるより網羅的な MGL 引数リストは[こちら](https://github.com/wizzomafizzo/mrext/blob/main/docs/systems.md){target=_blank}。

## MGL 引数の調べ方 { #finding-mgl-arguments }

探しているコアがこれらのリストにない場合は、自分で組み合わせを試すか、GitHub のコアソースを調べて値を直接確認してください。

たとえば **TurboGrafx-16** コアが対応する index 番号とファイルタイプは、GitHub の [TurboGrafx16.sv](https://github.com/MiSTer-devel/TurboGrafx16_MiSTer/blob/master/TurboGrafx16.sv){target=_blank} にあります。

`parameter CONF_STR` で始まるセクションを探し、起動したいファイルタイプを見つけます。この場合 `"S0,CUECHD,Insert CD;"`。`S0` は index 0 で type `s` を意味します。

このフォーマットの詳細は[コア設定文字列](../developer/conf_str.md)ページを参照。

## アーケードコア

アーケードコアは MGL ファイルでは起動できません。メニュー内の別の場所にアーケードコアへのショートカットを作りたい場合は、代わりに*シンボリックリンク*を張ります。

たとえば SSH またはコンソール（メニューから `F9`）で：
```
# ln -s /media/fat/_Arcade/dummy.mra /media/fat
# ln -s /media/fat/_Arcade/cores /media/fat
```

これで MiSTer メニューのルートにアーケードコアへのショートカットができます。メニューのサブフォルダーでも同様に可能です。

2行目の `cores` フォルダーへのシンボリックリンクに注意。MRA ファイルをシンボリックリンクするフォルダーごとに、一度これを行う必要があります。
