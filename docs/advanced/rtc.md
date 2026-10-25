![MiSTer FPGA RTC Add-on board](img/rtc1.jpg)

Some cores (ao486, Minimig) use a clock, so MiSTer provides them with the real time. When an Internet connection is active, MiSTer can get the time from the Internet; the RTC board provides it offline.

![MiSTer FPGA RTC Add-on board assembled correctly](img/rtc2.jpg)

This simple board provides the real time without an Internet connection. It supports two types of battery holders and several types of RTC ICs, and plugs into the LTC connector.

## Assembly tips

* If a through-hole battery holder is used, cut all its plastic pins and make sure the holder sits fully on the board, without gaps. Otherwise it may touch the I/O board and cause a short circuit.
* For a through-hole holder, also cut the pins as short as possible, so they don't protrude under the board and cause a short circuit.
* The board has a hole on the side opposite the connector. Put a plastic (or other non-conductive) screw in it as a leg, to stop the board from bending and touching the main board.
* The SMD holder (left picture) is preferable, because it is slimmer.

## Usage notes

To save the real time to the RTC, connect the MiSTer to the Internet and let it run for about 15 minutes — or update it from the console (see the commands below).

By default the time zone is UTC (GMT). To get your local time zone, do the following:

* Connect to MiSTer by FTP/SFTP.
* Navigate to the `/usr/share/zoneinfo/posix` folder and find the file named after your place or time zone.
* Copy that file to your computer under the name `timezone`.
* Copy it back to the MiSTer into the `/media/fat/linux` folder, keeping the name `timezone`.

From the console you can also force the hardware clock to update and read the time from it:

* **Store datetime to RTC**: `hwclock -wu`
* **Read RTC**: `hwclock -u`

## RTC Add-on board DIY Assembly

This page is for reference only. It may not be up to date, and may not include the BOM for the latest PCB version — check the schematic and required components yourself!

The following section walks you through creating your own MiSTer RTC Board: where to order the PCB and components, what equipment you need, and how to assemble the board.

![picture](img/RTC_Board_DIY.png)

### 1. Order PCB

#### PCB manufacturer examples

* [PCBway](https://www.pcbway.com/setinvite.aspx?inviteid=43024){target=_blank} - [Quick order RTC v1.2](https://www.pcbway.com/project/shareproject/RTC_for_MiSTer_v1_2.html){target=_blank} - [Quick order RTC v1.3 (with temp sensor)](https://www.pcbway.com/project/shareproject/W43024ASU40_rtc_1_3.html){target=_blank}
* [EasyEDA](https://easyeda.com/){target=_blank}
* [JLCPCB](https://jlcpcb.com/){target=_blank}
* [OSH Park](https://oshpark.com/){target=_blank}

#### PCB Layout (Gerber Files)
Check the MiSTer hardware repository for the most recent PCB files: [MiSTer_Hardware](https://github.com/MiSTer-devel/Hardware_MiSTer){target=_blank}

### 2. Order Components

This is a general overview of the components, including reference parts that were successfully used to assemble a MiSTer RTC Board **version 1.2**.

#### General components
These are the general components; you'll additionally need to choose an RTC chip and crystal combination from the next table.

| Name | Component | Package | Value | Reference Parts |
|---|---|:---:|:---:|---|
| C1 | Capacitor (Ceramic) | 0805 | 10uF | [KEMET <br> C0805C106K8PACTU](https://www.digikey.com/products/en?keywords=399-4925-1-ND){target=_blank} |
| R1, R2 | Resistor 1% 1/8W | 0805 | 4.7K | [Yageo <br> RC0805FR-074K7L](https://www.digikey.com/products/en?keywords=311-4.70KCRCT-ND){target=_blank} |
| B1 | Coin Cell Holder for CR1220 | 12 mm | - | [MPD <br> BK-885](https://www.digikey.com/products/en?keywords=BK-885-ND){target=_blank} |
| P1 | GPIO Connector | 2 mm | 18-pin | [Amphenol <br> 63453-118LF](https://www.digikey.com/products/en?keywords=%09609-2663-ND){target=_blank} |

#### RTC / Crystal Table
The RTC Chip (U1) / Crystal (X1) combinations in this table were confirmed by users who successfully built an RTC Board version 1.2.

| Name | Component | Package | Value | Reference Parts |
|---|---|:---:|:---:|---|
| U1 | I2C RTC Chip: <br> M41T81 | 8-SOIC | - | [ST <br> M41T81M6F](https://www.digikey.com/products/en?keywords=497-4709-1-ND){target=_blank} |
| X1 | Crystal: <br> 32.768 kHz ±20 ppm, 12.5 pF, 50 kΩ  | Cylindrical Can | - | [Citizen <br> CMR200T32768DZFT](https://www.digikey.com/products/en?keywords=%09300-8340-6-ND){target=_blank} |

[Example of BOM on Octopart](https://octopart.com/bom-tool/95qomeBj){target=_blank}

### 3. Assemble the board

When assembling the board, follow the [assembly notes](#assembly-notes) above.