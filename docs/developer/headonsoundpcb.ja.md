*記事：MiSTer コア開発者 Jegor van Opdorp（SupraDeus/jopdorp）*

この記事では、SEGA/Gremlin のゲーム Head On のサウンド PCB をどう実装したかを説明します。

## 最初のステップ
Head On サウンド PCB 基板の回路図を分析し、個々の音の回路と回路の繰り返し部分を特定しました。

![head-on audio board analysis](img/headon_schem.png)

各部分が何だと思うか話し合い、車の音から始めることにしました。

## 実機の映像を探す
音の入った動画をウェブで探したところいくつか見つかりましたが、品質が悪かったです：

（元の動画リンクはプライベートな Discord メッセージで、現在は公開アクセスできません。）

JimmyStones がサウンドボードの製作者にヒントがないか連絡を取りました。彼は協力してくれそうでしたが、プロジェクトに参加するほど FPGA に詳しくありませんでした。JimmyStones はその後キャビネットを所有する人を見つけ、良い音の録音を入手。結果を検証する方法ができました。

## シミュレーションと分析

### 車
まず Falstad シミュレーターで車の音の実装から始めました。ダイオードタイプやトランジスターのベータ値などを正しく調整するのに多少手間がかかりましたが、実物とほぼ同じに聞こえる結果を得られました。

これが最終回路です：[car_circuit.txt](https://github.com/MiSTer-devel/Main_MiSTer/files/8336074/car_circuit.txt) は [Falstad シミュレーター](https://www.falstad.com/circuit/)に読み込めます。そこから `.wav` ファイルを録音でき、それを使って音を分析しました。

車の音は、次のような繰り返し波形で構成されていることが分かりました：

![Screenshot from 2022-03-13 14-50-49](img/headon_car_waveform.png)

この波形の周波数は変調されています。最初は聞こえないほど低く、ゲームが始まると上限まで上昇カーブをたどります。"high speed" ボタンが押されると、周波数は一瞬下がってから速い上昇カーブをたどり、ボタンが離されると下降カーブをたどります：

![Screenshot from 2022-03-13 21-25-05](img/headon_curve_waveform.png)

この情報に基づき、実装戦略を立てられました：

* 波形を配列にする
* 周波数応答カーブを3つのルックアップテーブルにする：
    * ゲーム開始用
    * "high speed" ボタンが押されているとき用
    * "high speed" ボタンが押されていないとき用
* 現在の状態に応じて、必要な周波数カーブをたどる

### ボーナス
ボーナス音は最初はシンプルに見えましたが、思ったより複雑でした。ボーナス入力が短くハイになってローに戻ると、音はかなりシンプルです：

![Screenshot from 2022-03-16 10-57-04](img/headon_bonus_waveform.png)

この音を記述するアルゴリズムを考え、SystemVerilog モジュールに実装しました。

#### アルゴリズム

Bonus は、ボーナスピンがハイになった瞬間に振幅が 100% になるパルスジェネレーターです。パルスは常に動いており、振幅を掛けているだけです。

ボーナスピンがローになると、音は指数カーブに従って音量が下がります。ボーナスピンがローのとき、パルス周期は長さの 3/4 になり、[完全四度](https://en.wikipedia.org/wiki/Perfect_fourth)になります。

振幅は 28 ms ごとに半分になるので、こんな感じです：

`Amplitude = MaxAmplitude * 0.976^time_in_milliseconds`（つまり `Amax * 2^(-t/28ms)`。各オーディオサンプルのタイムステップで振幅に減衰係数を掛けます。下の実装を参照）

`MaxAmplitude` は精度を保つのに十分な固定小数点幅にしてください。例ではこれらの乗算に 32 ビットを使っています。後で出力用に16ビットに変換します。

ボーナスピンがハイのとき、パルス周期は 0.002746 s で、パルスは75%の時間ハイです。次のループに相当：

`{1,1,1,0}`

実効波形は、非常にわずかなローパスフィルターを通ったように見え、次のループになります：

`{97{2}, 1, 33{0}, 1} `

48 kHz では、これは周期 0.00275 s になります。

これを SystemVerilog で次のように実装しました：

```sv
module bonus(
    input clk,
    input clk_48KHz_en,
    input bonus_en,
    output reg[15:0] audio_out = 0
);

    localparam MAX_AMPLITUDE = 1 << 18 << 14;
    reg[1:0] WAVEFORM_SLOW[131:0];
    reg[1:0] WAVEFORM_FAST[98:0];
    assign WAVEFORM_SLOW[97] = 1;
    assign WAVEFORM_SLOW[131] = 1;
    assign WAVEFORM_FAST[73] = 1;
    assign WAVEFORM_FAST[98] = 1;

    genvar i;
    generate
        for (i = 0; i <= 96; i = i + 1) begin
            assign WAVEFORM_SLOW[i] = 2;
        end
        for (i = 98; i <= 130; i = i + 1) begin
            assign WAVEFORM_SLOW[i] = 0;
        end
    endgenerate

    genvar j;
    generate
        for (j = 0; j <= 72; j = j + 1) begin
            assign WAVEFORM_FAST[j] = 2;
        end
        for (j = 74; j <= 97; j = j + 1) begin
            assign WAVEFORM_FAST[j] = 0;
        end
    endgenerate
    

    localparam AMPLITUDE_RATIO_PER_TIMESTEP_18 = 262008; // z^(28ms*48khz) = 0.5, so z = 0.99948, 0.99948 * 2^18 = 262008

    reg[9:0] current_sample = 0;
    reg[68:0] amplitude = 0;

    reg last_bonus_en = 0;

    localparam SLOW_TO_FAST_RATIO_16 = 87381; // 4/3 * 2^16 = 87381.3333333
    reg[15:0] map_slow_to_fast = ((current_sample * SLOW_TO_FAST_RATIO_16) >> 16);

    always_ff @(posedge clk) begin
        if(clk_48KHz_en)begin
            last_bonus_en <= bonus_en;

            if(bonus_en)begin
                amplitude <= MAX_AMPLITUDE;

                if(current_sample == 131)begin
                    current_sample <= 0;
                end else begin
                    current_sample <= current_sample + 1;
                end
                audio_out <= (amplitude * WAVEFORM_SLOW[current_sample]) >> 18;
            end else begin 
                if(last_bonus_en)begin
                    current_sample <= map_slow_to_fast;
                    audio_out <= (amplitude * WAVEFORM_SLOW[current_sample]) >> 18;
                end else begin
                    if(current_sample >= 98)begin
                        current_sample <= 0;
                    end else begin
                        current_sample <= current_sample + 1;
                    end
                    audio_out <= (amplitude * WAVEFORM_FAST[current_sample]) >> 18;
                end
                amplitude <= (AMPLITUDE_RATIO_PER_TIMESTEP_18 * amplitude) >> 18;
            end

        end 
    end

endmodule
```

しかし、これが全部ではないことが判明しました。ゲーム終了時、ボーナスピンがより長い間ハイになり、トーンの周波数がより複雑に変調される別の効果がトリガーされます。シミュレーションに戻ったところ、下部の NOT ゲートに間違った電圧しきい値が割り当てられていることが判明しました。

![wrong_inverters](img/wrong_inverters.png)


これは宝石を拾ったときにマシンが出す短いボーナス音は変えませんでしたが、ボーナスピンがより長い間ハイになるときの音は変えます。しかし、Falstad シミュレーターはこの回路をシミュレートするには十分速くありませんでした。

そこで LTspice に切り替えて、十分速いか試しました。
