WiFi is optional and simple to set up on the MiSTer. You'll need a compatible dongle, the `wifi.sh` script (provided with the Mr. Fusion image), and a keyboard attached to your MiSTer to type in your WiFi password.

## Suggested WiFi Adapters

Neither the DE10-Nano nor the MiSTer add-on boards have built-in WiFi, so you need a compatible USB WiFi adapter. Not all models are compatible — even adapters of the same model can vary by hardware revision. Adapters reported to work include: Adapters reported to work:

* ASUS USB AC53 nano rev A1
* TP-Link AC1300 Archer T3U or Nano AC600 Archer T2U
* CanaKit Raspberry Pi WiFi dongle
* Edimax EW-7612UAn v2 or EW-7811UN or EW-7822ULC
* Netgear A6100 or A6150
* D-link AC1300 MU-MIMO Wi-Fi Nano USB Adapter DWA-181

Your results may vary, because newer hardware revisions of these adapters may not be supported. Advanced users can compile their own drivers.

## Set up WiFi with a script

1. Navigate to the scripts menu in the on-screen display (OSD).
2. Select the "wifi" script and run it.
3. Select your WiFi network's SSID (the name of your WiFi). 
4. Type your WiFi password and press Enter.
5. It should connect and ask you to press any key to continue. 

A small WiFi icon at the top of the main menu shows that you are connected. The setting should be saved, and the MiSTer will reconnect automatically whenever the adapter is plugged in and within range of your network.

## Manual WiFi setup

If the script doesn't work, you can try to set up WiFi manually. This method is slightly more advanced, so feel free to ask the community for help before trying it:

1. Edit the file `/media/fat/linux/_wpa_supplicant.conf` with a text editor that supports Unix/Linux line endings.
2. Replace `put_your_SSID_here` with your WiFi network's SSID, and `put_your_password_here` with your WiFi password. 
3. Change the country code [to the one that matches your country](https://www.arubanetworks.com/techdocs/InstantWenger_Mobile/Advanced/Content/Instant%20User%20Guide%20-%20volumes/Country_Codes_List.htm){target=_blank}. 
4. Rename `_wpa_supplicant.conf` to `wpa_supplicant.conf`.
5. Reboot the MiSTer.

After the reboot, the WiFi icon should appear at the top of the Main Menu's OSD. Be patient: the MiSTer is not very fast at connecting to WiFi — the connection can take a while to come up.
