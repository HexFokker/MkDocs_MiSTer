## The MiSTer FPGA's correct DIP switch configuration on the DE10-Nano

If your keyboard or other low-level hardware doesn't work, one or more of the DIP switches on your DE10-Nano may be misconfigured.

### Upper DIP Switches

Make sure the DIP switches are configured as shown:  
![MiSTer FPGA DIP Switches Correct Configuration - Small DIPS - Terasic DE10-Nano](img/dips1.png)

### Lower DIP Switches

If your I/O board is based on the 9.2 [I/O board](../assets/92_io_board.png) and [AV mezzanine board](../assets/92_av_board.png), you don't need to set any of the lower switches: the framework detects the configuration of these boards automatically. Settings for earlier boards are below.

??? note "I/O boards before 9.2"

    ![MiSTer FPGA DIP Switches Correct Analog I/O board Configuration - Big DIPS - Terasic DE10-Nano](img/dips2.png)

    If you have a Digital I/O board and a 2nd SDRAM module, turn DIP switch SW3 On (up) and the rest Off (down), as in the 2nd picture above:  
    ![MiSTer FPGA DIP Switches Correct Digital I/O board Configuration - Big DIPS - Terasic DE10-Nano](img/dips3.png)  
    *Credit for 2nd and 3rd pictures goes to Nat from [MiSTerFPGA.co.uk](https://misterfpga.co.uk){target=_blank}*

    | Board      | SW0 | SW1 | SW2 | SW3 |
    | ---------- | --- | --- | --- | --- |
    | Analog I/O  | Off | Off | Off | Off |
    | Digital I/O | Off | Off | Off | On  |

## My gamepad doesn't work

If your gamepad doesn't work in the menu, make sure you have [defined its inputs](../setup/controller.md){target=_blank}. If it works in the menu but not in a core, define the gamepad in that core's secondary OSD menu. If it works in neither, check that your DIP switches are correct as shown above.

## My keyboard doesn't work right

If you have a fancy gaming keyboard with lots of macros and RGB lights, the stock power supply may not provide enough power. You may want to consider a power supply with more amps to fix this, such as the [Mean Well GST18A05-P1J](https://www.amazon.com/MEAN-WELL-GST18A05-P1J-Desktop-Adaptor/dp/B01LZ0LJXQ){target=_blank}; this [DigiKey search result](https://www.digikey.com/short/33rwd9pm) gives an idea of what is required. Generally, you need a 5 V supply rated above the stock 2 A, with a center-positive 2.1 mm x 5.5 mm x 11.0 mm barrel plug. Mean Well and Triad are often recommended, but they are not the only option if your retailer doesn't carry them.

## The lights on my MiSTer light up, but I don't get video out of the HDMI port

If your MiSTer seems to boot but there is no video from the HDMI port:

1. Check that the cable is good and firmly connected at both the MiSTer and the display.
2. Try another cable, just in case.
3. Remove the SD card and insert it again. If the MiSTer can't read the card, or the card is empty, it fails to boot completely.

To check whether the MiSTer has booted, try connecting to it via [SSH or FTP](../advanced/network.md#network-access). If you can connect, it has booted.

## Fixing missing certs

If `wget` fails, you may be missing security certificate files. The default system ships without any, so `wget` can only download over HTTPS with `--no-check-certificate`. To install the certificates:

1. Open the Linux terminal with F9; log in as `root` with password `1`.
2. `cd /etc/ssl/certs`
3. `cp cacert.pem cacert.pem.bak` (back up the existing cert)
4. `wget --no-check-certificate https://curl.se/ca/cacert.pem -O cacert.pem`

If the download succeeded, `wget` now works normally.

## WiFi shows two IP addresses and no internet connection

If the MiSTer has no Internet connection (for example, you can't update it) and `ip addr` shows two IP addresses on `wlan0`, the two addresses may be the cause. Some WiFi adapters seem to do this even on regular Linux computers; the underlying cause is not well understood. In many cases there is no Internet access if one of the two addresses is an "APIPA" address (169.254.x.x). To clear the problem temporarily, flush the addresses and request a fresh lease, then reconnect WiFi:

`ip addr flush wlan0`

The problem may come back when your DHCP lease expires and new addresses are assigned. On most home networks, the DHCP server is the router/modem.

## Fixing a corrupted Linux image on the MiSTer

Sometimes MicroSD cards corrupt data over time. Rarely, it corrupts the MiSTer's Linux files. If you notice low-level problems such as the following (the list is not exhaustive):

* HDMI video output not working anymore
* USB controllers and even keyboards not working
* Internet no longer working
* Sound not working over HDMI
* WiFi not working

then it is best to try re-downloading the Linux files and overwriting the old ones:

1. Remove the MicroSD card from your MiSTer and insert it into your PC.
2. Download the latest sd-installer release archive (usually the .7z file at the bottom of the list) from [https://github.com/MiSTer-devel/SD-Installer-Win64_MiSTer](https://github.com/MiSTer-devel/SD-Installer-Win64_MiSTer){target=_blank} and unzip it on your PC.
3. Copy the contents of the archive's `linux` folder over the `linux` folder on the MicroSD card, overwriting the existing files.

This is essentially what the update script's "Linux Update" does, and it should restore everything to the normal defaults. If you use WiFi, you may need to repeat the [WiFi setup](wifi.md).
