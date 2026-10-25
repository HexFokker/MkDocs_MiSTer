*記事：MiSTer コア開発者 Jegor van Opdorp（SupraDeus/jopdorp）*

多くの古いコンピューターにはアナログ部品があります。例えば一部アナログ合成のオーディオボードや、テープ入力のあるデスクトップコンピューターです。

現在、MiSTer 上で電子回路を（例えば SPICE ネットリストから）リアルタイムで直接シミュレートする便利な方法はありません。これらの回路を FPGA に実装するには、回路の挙動を自分でシミュレートする必要があります。

[Arcade-Battlezone](https://github.com/jopdorp/Arcade-BattleZone_MiSTer){target=_blank} コアはアナログサウンド合成を持つコアの例です。

## 問題へのアプローチ方法

1. 実際のゲームを遊ぶ人の YouTube 動画を見て、どんな音があるかイメージを掴みます。
2. エミュレーターでゲームを遊び、エミュレーターと実機の動画で異なる音に特に注意を払います。
3. 回路図のデジタル部分とアナログ部分を識別します。

    * デジタル部分はシステムクロック速度、または可聴周波数スペクトルに近い別のクロック源で動きます。たとえば Arcade Battlezone では、12 kHz 入力がデジタルノイズ回路に入り、その出力がアナログ積分回路に入って爆発音を生成します（その実装は下の「反転増幅器」にリスト）。FPGA 実装では、これらアナログ部分のデジタルモデルはオーディオサンプルレート（48 kHz）で更新されます。

4. すべてのデジタル部分を実装します。サウンドシステムでよくあるデジタルコンポーネント：  

    * 線形帰還シフトレジスター（LFSR）：  
    ![linear feedback shift register](img/linear_feedback_shift_reg.png)  
    Arcade BattleZone の類似回路の実装は[こちら](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/noise_shifters.sv){target=_blank}。

    * JK フリップフロップのようなフリップフロップ。実装は[こちら](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/jk74109.sv){target=_blank}。

5. 独立した挙動を持つアナログ回路（1入力、1出力）を識別します。これらは個別に実装・テストできます。
6. よくある、認識・実装しやすい部分を識別します。例：

    * [ローパスフィルター](https://www.electronics-tutorials.ws/filter/filter_2.html){target=_blank}  
      ![low pass](img/low_pass_filter.png)  
      IIR ローパスフィルターで実装できます。[このスプレッドシート](https://docs.google.com/spreadsheets/d/1Z2DNhAQyqkDpNVJuzYPk3ZeW4rChxN7fTKsLGvb2r7g/edit#gid=0){target=_blank}でパラメーターを求めます。
      
      IIR フィルターの実装例：

      * [Blockade Low Pass Filter](https://github.com/MiSTer-devel/Arcade-Blockade_MiSTer/blob/main/rtl/audio/blockade_lpf.v){target=_blank}
      * [Blockade Infinite Impulse Response (IIR) 1st Order Filter](https://github.com/MiSTer-devel/Arcade-Blockade_MiSTer/blob/main/rtl/audio/iir_1st_order.v){target=_blank}
      
      よりシンプルなタイプ：

      * [Blockade Infinite Impulse Response (IIR) Filter](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/iir.sv){target=_blank}
   
    * [ハイパスフィルター](https://www.electronics-tutorials.ws/filter/filter_3.html){target=_blank}

      ![high pass filter](img/high_pass_filter.png)

    * 反転増幅器

      ![inverting amplifier](img/inverting_amplifier.png)

      これは本質的にサンプルの符号反転の後に（固定符号の）乗算を行うものです。

    * 非反転増幅器

      ![non inverting amplifier](img/non_inverting_amplifier.png)

      これはサンプルの（固定符号の）乗算だけです。

    * 差動増幅器

      ![differential amplifier](img/differential_amplifier.png)

    * 反転積分器

      ![inverting integrator](img/inverting_integrator.png)

      または

      ![inverting integrator 2](img/inverting_integrator_2.png)

      これは本質的にサンプルの符号反転の後に乗算を行い、結果を reg に格納するものです。

      乗算はオーディオクロックサイクルごとに繰り返し実行され、「リリース／ディケイ」型の増幅器エンベロープになります。
     
      この実装例は[こちら](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/6606cbce7760c60fc06e613292f731f76ffb18ba/rtl/noise_sound.sv#L52){target=_blank}。

    * その他の一般的な[オペアンプ回路](https://en.wikipedia.org/wiki/Operational_amplifier_applications){target=_blank}
    * [加算ミキサー](https://en.wikipedia.org/wiki/Electronic_mixer){target=_blank}

      ![additive mixer](img/additive_mixer.jpg)

      加算ミキサーは2つの信号を合計します（平均化は合計を 1/2 にスケールしたもので、ゲインが違うので回路が実際にどちらかを実装しているかを選んでください）。一方の信号の抵抗が他方より高ければ、両者の間に音量差が生まれます。

7. より注意が必要な部分はメモし、その機能を推測してみます。[微分器](https://en.wikipedia.org/wiki/Operational_amplifier_applications#Inverting_differentiator){target=_blank}と[積分器](https://en.wikipedia.org/wiki/Operational_amplifier_applications#Inverting_integrator){target=_blank}を [555 タイマー](https://www.electronics-tutorials.ws/waveforms/555_oscillator.html){target=_blank}やノイズ入力と組み合わせたものは厄介です。
8. ミキサーを実装します。
9. フィルターを実装します。
10. 回路の難しい部分を実装します：
    1. シミュレーターで回路を実装します。
    2. ゲームが遊ばれたときに回路に何が入力されるかを調べます。
    3. 正しい入力でシミュレーションを実行し、出力を `.wav` ファイルとして保存します。
    4. Audacity のような波形エディターで見て聴いて出力を分析します。
    5. 入力が常に同じ（ノイズではなく）で、回路が常に同じ応答をする（ノイズを生成しない）場合：
       1. シミュレーション出力をサンプリングします。
       2. サンプルを配列リテラルに変換し、必要に応じてトリガーします。この場合、サンプルは通常パルスでトリガーされるだけです。
    6. アナログ回路が入力としてノイズを持つか、数値制御の周波数や速度のような可変入力を持つ場合は：
       1. アナログ回路の数学モデルを作ります。
       2. Python のような使いやすいプログラミング言語でモデルを実装します。
       3. 同じ入力で、数学モデルの出力と回路シミュレーションの出力を比較します。近くなければなりません。数値的に同一である必要はなく、耳で区別できなければよいです。
       4. リアルタイムの除算をなくすため、数学モデルを2ステップで作り直します：
          1. 代数的に
          2. 残った除算をルックアップテーブルに事前計算する
       5. 他の種類のルックアップテーブル（正弦波など）も作れます。
       6. 数学モデルを HDL に実装します。
    7. テストベンチで HDL の出力を検証します。
    8. チップをコアの残りに接続！


## 便利なリンク
### アナログ回路実装の開発記録
[MiSTer - Head On](headonsoundpcb.md)

### 情報リソース

* フィルターの正しい値を見つける：[https://www.micromodeler.com/dsp/](https://www.micromodeler.com/dsp/){target=_blank}
* 微分器や積分器など一般的なオペアンプの使い方：[https://en.wikipedia.org/wiki/Operational_amplifier_applications](https://en.wikipedia.org/wiki/Operational_amplifier_applications){target=_blank}
* 555 タイマーの仕組みの解説：[https://www.electronics-tutorials.ws/waveforms/555_oscillator.html](https://www.electronics-tutorials.ws/waveforms/555_oscillator.html){target=_blank}
* SPICE プログラミング：[https://www.allaboutcircuits.com/textbook/reference/chpt-7/fundamentals-spice-programming/](https://www.allaboutcircuits.com/textbook/reference/chpt-7/fundamentals-spice-programming/){target=_blank}

### コード例

* [ノイズベースサウンドの Python 実装例（ノートブック）](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/spice/Red%20baron%20crash%20circuit%20sim.ipynb){target=_blank}
* [ルックアップテーブルを生成する Python コード例](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/generate_control_coltages_to_frequency.py){target=_blank}
* [一般的なデジタルノイズジェネレーターの例](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/noise_source_shell_explo.sv){target=_blank}
* [ノイズを入力に取る正弦波ベースサウンドの例](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/rtl/bang_sound.sv){target=_blank}
* [SPICE シミュレーションの出力から .wav ファイルを生成するスクリプトの例](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/spice/spicetowav.py){target=_blank}
* [ノイズベースサウンドの SPICE ネットリストの例](https://github.com/jopdorp/Arcade-BattleZone_MiSTer/blob/sound/spice/bang.cir){target=_blank}

### ツール

* [https://www.falstad.com/circuit/](https://www.falstad.com/circuit/){target=_blank}
* [http://ngspice.sourceforge.net/](http://ngspice.sourceforge.net/){target=_blank}
* [https://www.audacityteam.org/](https://www.audacityteam.org/){target=_blank}
