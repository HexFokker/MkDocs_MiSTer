# Computer core Internet and console connections

Since the May 7, 2018 release, MiSTer supports a serial (UART) connection from FPGA to Linux. Linux runs a PPP or console daemon on this connection, allowing access to the Internet or a Linux shell from FPGA cores.

## Cores supporting serial connection

* **Minimig**. Tested on [Roadshow TCP/IP](https://misterfpga.org/viewtopic.php?f=4&t=2063&p=18598&hilit=Roadshow#p18598){target=_blank}, AmiTCP and Miami. Supported speeds are 115200 or 230400 baud — be sure to match the OSD settings with your TCP/IP stack of choice!
    * AmiTCP provides a more complete solution with an ftpd daemon, and many other third-party add-ons are based on it — this package is recommended.
    * Roadshow works very well and is fully compatible with AmiTCP, and offers additional extensions. Follow these [instructions](https://misterfpga.org/viewtopic.php?f=4&t=2063&p=18598&hilit=Roadshow#p18598){target=_blank} for complete setup. It is still a paid, supported product — more information [here](http://roadshow.apc-tcp.de/index-en.php){target=_blank}.
    * Miami was successfully tested. The Miami settings that worked: use a PPP connection via serial.device, set the baud rate to 115200 OR 230400, RTS/CTS to on, and enable 8N1. Set the modem type to null modem. Manually enter an IP suitable for your LAN ending in 254, e.g. 192.168.1.254. Manually add a DNS server, e.g. 8.8.8.8 for Google DNS. Term v4.7 was used to test the console connection. For a more detailed MiamiDX setup guide, see [here](https://www.geocities.ws/allforamiga/){target=_blank}.

* **ao486**. PPP and serial connections are working under DOS, tested with mTCP and various terminal software. PPP is also working under Win3.11/Win95/Win98/NT 4.0.
DOS tools are here: [dos_ftpd.zip](https://github.com/MiSTer-devel/ao486_MiSTer/raw/master/sw/dos_ftpd.zip){target=_blank}. The DOS FTP server included does not support passive mode, so set your client to use active.
* **PC XT**. PPP and serial connections are working under DOS, tested with mTCP/DOS PPP and various terminal software.
* **C64**. Serial connection.
* **Tandy Color Computer 3 (CoCo3)**. Serial connection.
* **Macintosh Plus**. Serial and PPP support.
* **AtariST**. Serial and PPP support.
* **Apple IIe**. Serial connection.

OSD provides an option to switch between PPP and Console on these cores.
Both console and PPP use 115200 baud, 8N1 mode, with hardware RTS/CTS flow control for stability.

## Console connection

Using this connection with a supported terminal application on the FPGA core, you can access the Linux shell to do file management or adjust Linux settings if required.

No special settings are required on the Linux side.

## PPP connection

With this connection, the core can access the Internet. More importantly, the core can run an FTP daemon to expose its filesystem, so you can use an FTP client on your PC to move files to and from the emulated system.

The PPP daemon uses the **/media/fat/linux/ppp_options** file (`linux\ppp_options` from a PC). Most likely you don't need to modify it — a recent update assigns IPs automatically. The core gets a `<your_net>.254` IP (for example 192.168.1.254); if you want a different IP or your router already uses .254, modify the ppp_options file. At the bottom of the file, uncomment and modify the last line:
```ini
# You may explicitly define local and remote IPs for PPP link.
# new MiSTer releases don't require it anymore.
# IPs entered here will override automatically assigned IPs.
#192.168.1.1:192.168.1.10
```

For PPP to work correctly, make sure you see a network icon in the Menu core before starting the other core — otherwise the PPP link won't get IPs. If the core was already started, connect it to PPP and disconnect; the next connection will get the correct IP. You can also switch UART mode in the OSD to renew the IP.

All of the PPP guides below start with the same first step: in the MiSTer System Menu (++win+f12++) set the "Uart Connection" to "PPP", Baud to "115200", and save it.

### MS-DNS configuration

DNS is not acquired automatically by Windows 95/98/NT on a PPP connection
and requires manual configuration either in the operating system or in the `ppp_options` file on your MiSTer's SD card.
The latter is the better solution as it allows multiple Windows machines to autoconfigure.

1. Get a valid DNS server address:
    * Run `cat /etc/resolv.conf | awk '/nameserver/ {print $2}'` on your MiSTer or other Linux devices on the same network to get the DNS server address(es) it autoconfigured
    * Run `ipconfig /all` on a modern Windows device on the same network and look for `DNS Servers` in the output to get the DNS server address(es) it autoconfigured
    * Alternatively, use a public DNS server (`8.8.8.8`, `8.8.4.4`, `9.9.9.9`, `1.1.1.1`, etc.) at the expense of longer name resolution times
2. Open `ppp_options` for editing on your MiSTer SD card:
    * Located at `/media/fat/linux/ppp_options` when accessed from the MiSTer itself
    * Located at `linux/ppp_options` when accessed by inserting the SD card into another device
3. Specify ms-dns entries with the DNS server addresses you got earlier:
    * Find and remove the `#` at the beginning of the ms-dns line to uncomment it
    * Modify the IP address so it's the valid DNS server address you got in step 1
    * For example, if the DNS server address is `10.0.0.138`, `ppp_options` should look like:
   ```ini
   # Specify which DNS Servers the incoming Win95 or WinNT Connection should use
   # Two Servers can be remotely configured
   ms-dns 10.0.0.138
   # ms-dns 192.168.1.2
   ```

### PPP connection in MS-DOS on ao486

1.  Download the DOS PPPD driver: DOSPPP06.ZIP from [HERE](https://www.ibiblio.org/pub/micro/pc-stuff/freedos/files/net/dosppp/){target=_blank}.
2.  Grab the latest version of Michael Brutman's mTCP TCP/IP applications for MS-DOS, from the 'Downloads' section [HERE](http://www.brutman.com/mTCP/){target=_blank}
3.  Transfer those zip files over to your ao486's virtual hard drive and unzip them into the directory of your choice (e.g. C:\NETWORK)
4.  In MS-DOS on the core, edit an mTCP config file — either the sample `sample.cfg` in the SAMPLES directory (you need to add the top MTCPSLIP line to it), or the example below (a simple text file named `mtcp.cfg` in your installation folder):
```ini
SET MTCPSLIP=true
mtu 1500
packetint 0x60
hostname ao486_fpga
IPADDR 192.168.1.254 <- Change this to reflect your network. Only the first three octets (e.g. 192.168.1), the last .254 is the default IP assigned to the core !!!
NETMASK 255.255.255.0
GATEWAY 192.168.1.1 <- Change this to reflect your network.
NAMESERVER 8.8.8.8 <- You can change this to reflect your network if you want to.
LEASE_TIME 86400
IRCJR_USER FPGA_User
IRCJR_NICK fpga_user
IRCJR_NAME FPGA_User
```
5. Edit your AUTOEXEC.BAT and add the path to your installation folder, as well as the MTCPCFG variable:
```bat
PATH C:\DOS;C:\NETWORK
SET MTCPCFG=C:\NETWORK\MTCP.CFG
```
6. The DOS PPPD driver archive includes the ppp packet driver, which you need to load:
```bat
epppd com1 115200 local
```
7. Enjoy telnet, FTP, IRC, and other Internet applications while you use MS-DOS. Make sure you have ANSI.SYS loaded in CONFIG.SYS if you want to use the telnet client for telnet BBSes. Original discussion [HERE](https://misterfpga.org/viewtopic.php?t=896){target=_blank}.

### PPP connection in Windows 3.11 on ao486

1. Get the Trumpet Winsock PPP client
    * Download the software. Other newer versions exist, but be warned: only version 3.0 will work.
        * [Trumpet Winsock 3.0](https://winworldpc.com/product/trumpet-winsock/3x){target=_blank}
2. License the software — it is still (time-limited) shareware. Once you acquire a license, enter the details in Tcpman under the "Special" menu in "Password registration".
3. Configure Software  
    * Start Tcpman
    * Under File-->PPP Options ensure all checkboxes are unchecked and the text boxes are blank.
    * Under File-->Setup, enter an "IP Address" suitable for your LAN (e.g. 192.168.1.254) and a "DNS Server(s)" (e.g. 192.168.1.1)
        * Under the Driver section select the PPP radio button and click on "Dialer settings..."  
    * In the "Dialer settings..."  
        * "COMM port" COM1  
        * "Baud rate" 115200

### PPP connection in Windows 95/98 on ao486

1. Get the modem driver from [HERE](https://github.com/MiSTer-devel/ao486_MiSTer/blob/master/releases/drv/modem9x.inf){target=_blank} and transfer it to your VHD or a floppy image
    * Click the Windows 95 Start button, point to Settings, and then click Control Panel. Double-click Add New Hardware
    * Select No when Windows offers to search for new hardware. Click Next, then select Modem on the next page.
    * Check "Don't detect my modem", then "Have Disk" on the next page. Navigate to the modem9x.inf location and install it.
2. Install Dial-Up Networking:
    * Click the Windows 95 Start button, point to Settings, and then click Control Panel. Double-click Add/Remove Programs.
    * Click the Windows Setup tab. Select Communications. Click Details, select Dial-Up Networking and click OK.
    * Click OK to close the Windows Setup dialog box. Dial-up networking should now be under "My Computer".
3. Create a dial-up connection
    * Open My Computer then Dial-Up Networking. Double-click on Make New Connection.
    * Name it to your liking and be sure to select Generic NULL Modem. Use any phone number — it won't matter. Hit Next, then Finish.
    * Right-click on the newly made connection, then Properties:
        * **General** tab - make sure the Generic Null Modem is selected and set to COM 1, 115200 baud
        * **Server Types** tab - select "PPP: Windows 95, Windows NT 3.5, Internet" and uncheck everything except TCP/IP
    * Hit OK, then double-click the dial-up connection to connect. You should now have a working PPP connection under Win95/98.
4. **Important:** DNS is not acquired automatically by Windows 95 (or Windows NT) unless you either:
    * Click TCP/IP Settings in the above Server Types tab and configure static name servers (either your router's internal IP address — usually .1 — or a public one like Google's 8.8.8.8)
    * Edit "ms-dns" lines in the `ppp_options`, see [MS-DNS configuration](#ms-dns-configuration)

### PPP connection in Windows NT 4.0 on ao486

The full guide to installing Windows NT 4.0 and PPP is on the [MiSTerFPGA forum](https://misterfpga.org/viewtopic.php?t=4400):

1. Set the UART connection to PPP at 115200 baud as described [above](#ppp-connection). **Important: plain 115200, not Turbo!**
2. Get the same modem9x.inf driver as in the [Windows 95/98 guide](#ppp-connection-in-windows-9598-on-ao486) above and transfer it to your VHD or a floppy image
3. Mount Windows NT 4.0 CD-ROM image 
4. Open My Computer and click on Dial-Up Networking. When prompted, navigate to the /i386 folder on the CD-ROM, which contains the "rascfg" files and the rest needed for setup.
5. During setup, when **Remote Access Setup** asks you to add a modem, hit **Yes**, then in the following window, check **"Don't detect my modem..."**. In the next window, click on **"Have disk"** and point to where modem9x driver is.
6. From that point on, setup will prompt you to use the **Generic null modem** — hit **OK**, hit **Continue**, check only **TCP/IP** when prompted, then **Continue** again. Setup will ask you to restart at some point.
7. After installing Dial-Up Networking, you will get an Event Error at every boot. It doesn't break PPP, but you can get rid of it by re-running Service Pack 6 (mount the misternt.iso CD-ROM and run sp6ai386) and restarting again when asked.
8. The New Phonebook Entry Wizard will appear; name your connection and check the "I know all about phonebook..." box to jump to finish. You can use any number (I used 555-1234).
9. Click on **More** then **Edit entry and modem properties**
    * **Basic** tab - be sure to have "Dial using" set to Generic NULL modem (COM1), speed set to 115200
    * **Server** tab - uncheck everything except TCP/IP, Dial up server type should be "PPP: WinNT, 98 Plus, Internet"
10. **Important:** DNS is not acquired automatically by Windows NT (or Win95) unless you either:
    * Click TCP/IP Settings in the above Server tab and configure static name servers (either your router's internal IP address — usually .1 — or a public one like Google's 8.8.8.8)
    * Edit "ms-dns" lines in the `ppp_options`, see [MS-DNS configuration](#ms-dns-configuration)

### PPP connection in MS-DOS on PC XT

Follow the [MS-DOS on ao486](#ppp-connection-in-ms-dos-on-ao486) instructions above, with two differences:

* The XT core's PPP connection uses the COM 2 serial port instead of COM 1, so load the packet driver with `epppd com2 115200 local`.
* In `mtcp.cfg`, use a hostname appropriate for the core, e.g. `hostname PCXT_fpga`.

## Serial (modem) connections

The C64, CoCo3, and Apple IIe cores can connect to telnet BBSes through the MiSTer's modem emulation ("Uart Connection" set to "Modem").

### Serial connection on C64

Note that custom kernels may remove functionality required for this — if in doubt, use the built-in kernel.

The following is an example of connecting to a BBS using Striketerm 2014 and VIC-1011 2400 baud mode:

1. Start the C64 core.
2. In the MiSTer C64 Menu (++win+f12++), go to "Hardware", set "Expansion" to "RS232", "RS232 Connection" to "Internal", and "RS232 mode" to "VIC-1011", and save it.
3. In the MiSTer System Menu (++win+f12++), set "Uart Connection" to "Modem", Link to "TCP", and Baud to "2400", and save it.
4. Load Striketerm 2014 from d64, available [here](https://csdb.dk/release/?id=130807){target=_blank}.
5. Keep the defaults in the Main Menu (++f1++), ensuring you are running at 2400 baud.
6. Save a BBS to the address book (++f5++); you can find some [here](http://cbbsoutpost.servebbs.com){target=_blank}.
7. Surf the BBS very slowly...

The following is an example of connecting to a BBS using CCGMS Ultimate and UP9600 mode:

1. Start the C64 core.
2. In the MiSTer C64 Menu (++win+f12++), go to "Hardware", set "Expansion" to "RS232", "RS232 Connection" to "Internal", and "RS232 mode" to "UP9600", and save it.
3. In the MiSTer System Menu (++win+f12++), set "Uart Connection" to "Modem", Link to "TCP", and Baud to "9600", and save it.
4. Load CCGMS Ultimate from d64, available [here](https://csdb.dk/release/download.php?id=214853){target=_blank}
5. Hit ++f7++ to access the configuration page, then ++m++ to change the modem to "UP9600/EZ232", then ++b++ to set the baud speed to "9600". Save the config with ++s++.
6. Access the Phonebook with ++a++ from the same configuration page; save some BBS addresses from [here](http://cbbsoutpost.servebbs.com){target=_blank}.
7. Enjoy the faster BBS experience.

### Serial connection on Color Computer 3 (CoCo3)

The following is an example of connecting to a BBS using UltimaTerm 4.0:

1. Start the CoCo3 core (use Multi-pak Slot 4 Disk or Slot 2 CoCoSDC)
2. In the MiSTer System Menu ++win+f12++  set the "Uart Connection" to "Modem", Link to "TCP", Baud to "9600" and save it.
3. Mount UltimaTerm DSK file, obtainable [HERE](https://colorcomputerarchive.com/repo/Disks/Applications/Ultimaterm%204.0%20%28Ken%20Johnston%29%20%28Coco%203%29.zip){target=_blank}
4. Load UltimaTerm by issuing: `LOADM"ULTIMATE`
5. Hit ++alt+o++ to open the Options menu, then ++m++ for Modem options. Use ++b++ to modify the baud rate (++left++ or ++right++ arrows to change values) to 9600. The rest of the settings should stay at defaults (word length 8, parity none, stop bits 1, duplex full, terminal type ANSI). 
6. Save your changes with ++alt+d++, then ++f1++.
7. Hit ++alt+a++ to open Phonebook, add a BBS and dial away.
8. Alternatively, you can dial directly by issuing an `ATDTBBS_Address:port`. Full UltimaTerm 4.0 Documentation [HERE](https://colorcomputerarchive.com/repo/Documents/Manuals/Applications/Ultimaterm%20v4.0%20%28Ken%20Johnston%29.pdf){target=_blank}

### Serial connection on Apple IIe

Apple IIe has serial support via an emulated Super Serial Card in Slot 2. While some programs can theoretically use up to 19200 baud, the author of this section found it more stable at 1200 and/or 2400 baud.

Terminal programs tested:

* ACT - Apple Conference Terminal v.3.0.3 [HERE](https://mirrors.apple2.org.za/ftp.apple.asimov.net/images/communications/Apple%20Conference%20Terminal%20V3.0.3.dsk){target=_blank}
* Practical Peripherals Communication Program for Apple II v.1.01 [HERE](https://mirrors.apple2.org.za/ftp.apple.asimov.net/images/communications/Apple_II_Comm_Program.dsk){target=_blank}

1. Start the Apple IIe core
2. In the MiSTer System Menu (++win+f12++), set "Uart Connection" to "Modem", Link to "TCP", and Baud to "1200", and save it.
3. Load either of the terminal programs listed above; both have intuitive menus and 80-column modes.
4. Configure the terminal's baud rate to match the one set earlier (e.g. 1200 baud, word length 8, stop bits 1, parity none, Super Serial Card slot 2).
5. Enter terminal mode and ATDT your favorite BBS
