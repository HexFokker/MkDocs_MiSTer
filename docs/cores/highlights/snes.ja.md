Super Nintendo Entertainment System（SNES）の MiSTer コアには多くの機能があります。CPU と Super FX のターボモード、ライトガン・マウス対応、設定可能な WRAM 初期化値などです。リリースされた拡張チップのほぼすべてにも対応しています。この非常に強力なコアを主に開発したのは [srg320](https://www.patreon.com/srg320){target=_blank} 氏で、当時は実機すら持っていなかったそうです。

## 拡張チップ対応
現在対応している SNES 拡張チップと、それを使ったゲームの例：

* Super FX / GSU-1（Star Fox、Star Fox 2、Stunt Race FX）
* Super FX 2 / GSU-2（Super Mario World 2: Yoshi's Island、Doom）
* CX4（Mega Man X 2 と Mega Man X 3 のみ）
* DSP-1（Super Mario Kart と Pilotwings）
* DSP-2（Dungeon Master のみ）
* DSP-3（SD Gundam GX のみ）
* DSP-4（Top Gear 3000 のみ）
* OBC-1（Metal Combat: Falcon's Revenge のみ）
* S-DD1（Star Ocean と Street Fighter Alpha 2 のみ）
* SA-1（Kirby シリーズ、Super Mario RPG）
* SPC7110（Far East of Eden Zero、Momotarou Dentetsu Happy）
* ST010（F1 ROC II: Race of Champions）
* MSU-1（ROM ハックで使われる CD 品質オーディオ・データ拡張）
* S-RTC（Daikaijuu Monogatari II）

対応リストにない拡張チップには、MX15001TFC（Nintendo Power Flash Cartridges）、ST011（Hayazashi Nidan Morita Shougi）、ST018（Hayazashi Nidan Morita Shougi 2）があります。最新の対応状況はコアの README を確認してください。Cyclone V の FPGA スペースは限られています。

### 拡張チップの例動画
![type:video](videos/snes-chips.mp4)

## Satellaview 対応
コアは Satellaview にも対応しています。BSX/BS-X ROM を `./games/SNES/` フォルダーに置き、`bsx_bios.rom` にリネームしてください。以前はパッチ適用済み ROM が必要でしたが、インターネット接続や追加周辺機器などが必要だったものを除き、オリジナルの Satellaview ROM はパッチなしで動きます。

### BS-X Satellaview の例動画
![type:video](videos/snes-bs-x.mp4)

## Super FX Turbo
Super FX Turbo オプションは Super FX チップをオーバークロックし、ゲームを少し速く動かします。Turbo CPU オプションと組み合わせると、Star Fox のようなゲームでフレームレートが上がります。ただしゲームは意図より速く動くため、結果はまちまちです。この種のハックはバグを起こしやすくもするので、Turbo オプション使用中に発生したバグは報告しないでください。

### Super FX Turbo の例動画
![type:video](videos/snes-fx-turbo.mp4)
