MegaCD コアは [srg320 (Sergey Dvodnenko)](https://www.patreon.com/srg320/){target=_blank} 氏による MiSTer プロジェクトオリジナルで、Sega Genesis 用 Sega CD / Mega CD 拡張のシミュレートを目指しています。同じ [fpgagen](https://github.com/Torlus/fpgagen){target=_blank} ロジックと MiSTer Genesis コアで施された多くの改善を使い、さらに CD 拡張ハードウェアを扱うための大量の追加ロジックを備えています。

## 機能

* [Genesis コア](genesis.md)のほぼすべての機能
* CUE/BIN 対応
* CHD 対応
* リージョン自動検出
* 複数 BIOS 対応
* Pier Solar 対応
* [MSU-MD](https://github.com/krikzz/msu-md){target=_blank} 対応

## Sega CD Mode 1 音声 - MSU-MD と Pier Solar 対応

MSU-MD を使う、または MiSTer コアで Sega CD 版 Pier Solar を遊ぶには、次の条件を満たす必要があります：

* MegaDrive/Genesis のカートリッジ ROM と、ゲーム全体の CUE/BIN（または CHD）イメージを同じフォルダーに置く。
* MegaDrive/Genesis カートリッジ ROM を `cart.rom` にリネームし、CUE/CHD 読み込み時に SDRAM に読み込まれるようにする。
* MSU-MD の場合、ROM に正しい MSU-MD パッチを適用して、どのトラックをいつ再生するかコアに伝えられるようにする。

これらの条件をすべて満たしてもゲームが動かない場合、考えられる原因はいくつかあります：

1. ROM パッチが実は MD+ パッチ。MD+ は本稿執筆時点では非対応です。現状はコアの README を確認してください。
2. ROM にパッチが適用されていない。
3. カートリッジ ROM を `cart.rom` にリネームしていない。
4. CUE ファイルが間違っている。

ダウンロードした MSU-MD ROM セットが動かない場合は、新しい ROM に自分でパッチを適用して動くか試してください。
