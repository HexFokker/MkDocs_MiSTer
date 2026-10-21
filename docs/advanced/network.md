The MiSTer has several advanced networking features.

## Network access
The MiSTer board can be accessed through the on-board Ethernet port. The system has **FTP**, **SSH**, and **SFTP** services running.

User name: **root**  Password: **1**

If you connect to your MiSTer over the network frequently,
consider [Setting up a hostname](#hostname-configuration) for your MiSTer 
so you don't have to look up or remember your MiSTer's IP address.

### FTP/SFTP
FTP lets you upload files to or download files from your MiSTer over the network, without removing the SD card.
SFTP is a similar file transfer protocol that runs over SSH; note that not all FTP clients support it.

You can use any FTP or SFTP client, as long as transfers are in binary mode, not ASCII.
ASCII transfers will corrupt the data.

Once connected to the MiSTer, your SD card's contents will be at `/media/fat`.

If you don't have a compatible FTP client already, then try [FileZilla](https://filezilla-project.org/download.php?type=client){target=_blank}. 
It is a solid choice for all modern operating systems (Linux, MacOS and Windows). 
Older versions of FileZilla such as `2.1.9a` are compatible with Windows 95/NT3.5+
and can be used inside the [ao486 core with a PPP connection](computer.md#ppp-connection-in-windows-9598-on-ao486).

Another good FTP client for modern Windows operating systems is [WinSCP](https://winscp.net/eng/download.php){target=_blank}.

Once one of these clients is installed, run the program and open the **Site Manager** dialog.

| FTP Client | Site Manager Location                     |
|------------|-------------------------------------------|
| FileZilla  | **File** -> **Site Manager**              |
| WinSCP     | **Tabs** -> **Sites** -> **Site Manager** |

Set **Protocol** to either `FTP` or `SFTP` and fill out the **Host**, **User** and **Password** fields.
For example: if the MiSTer's IP address is `192.168.2.8` and you want to log in as `root`,
then **Host** is `192.168.2.8`, **User** is `root`, and **Password** is the user password.

Optionally set the **Default Remote Directory** to `/media/fat` so the client opens the SD card directly after connecting.
Likewise, you can set the **Default Local Directory** to your local MiSTer folder.

| FTP Client | Remote Directory Location                                                    |
|------------|------------------------------------------------------------------------------|
| FileZilla  | **Site Manager** -> **Advanced** -> **Default Remote Directory:**            |
| WinSCP     | **Site Manager** -> **Advanced** -> **Directories** -> **Remote Directory:** |

Click **Connect** or **Login** — you should now be able to upload and download files.

### SSH
Secure Shell (SSH) is a standardized network protocol for remotely operating computers over a network; it gives you a remote text terminal to your MiSTer.

On Linux and macOS, open a terminal and run `ssh <user>@<MiSTer IP>` — for example `ssh root@192.168.2.8` to log in as `root`.

If your Windows machine doesn't have `ssh` in Command Prompt, you can download and run [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html){target=_blank} instead.
Using the same example as above type `root@192.168.2.8` into the **Host Name** text field.
Ensure **Port** is set to `22` and **Connection type** is set to **SSH** then click **Open**.

Enter the password when prompted; you can then run commands as if at the MiSTer console.

## Share Mounting
The MiSTer can mount a network share from another computer or server as if it were local storage. CIFS and NFS shares are supported. If you want to use them, download the following helper scripts to `/media/fat/Scripts`; each `*_umount.sh` script unmounts the share again.

| Share type | Mount script | Unmount script |
|------------|--------------|----------------|
| CIFS | [cifs_mount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/cifs_mount.sh){target=_blank} | [cifs_umount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/cifs_umount.sh){target=_blank} |
| NFS | [nfs_mount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/nfs_mount.sh){target=_blank} | [nfs_umount.sh](https://raw.githubusercontent.com/MiSTer-devel/Scripts_MiSTer/master/nfs_umount.sh){target=_blank} |

`cifs_mount.sh` mounts the share at `/media/fat/cifs`, and MiSTer gives the folders mounted there preference. `nfs_mount.sh` mounts the share so that its folders take priority over identically named folders in `/media/fat` on the MicroSD card, which you will then no longer see. See [Core Paths](../cores/paths.md) for how this priority order works.

### CIFS Share Troubleshooting
There is a known problem with certain cores (at least ao486 and NeoGeo) and certain CIFS share configurations, caused by [some open bugs](https://bugzilla.samba.org/show_bug.cgi?id=12783) in Samba.

If certain cores don't start when loading games from a CIFS share, but work fine from SD or USB, check whether Kernel Oplocks are enabled on the share. If they are, do one of the following:

* Disable them.
* Enable them globally on your Samba server.
* Move your MiSTer files to a separate share used only by the MiSTer, without Kernel Oplocks.

Choose whichever suits your use case best. Many NAS devices enable Kernel Oplocks by default for good reason: they should prevent bad file synchronization, corruption, and data loss when a share is used through different protocols (e.g. CIFS and NFS) or by software running on the NAS, such as a torrent client.

## RetroNAS
RetroNAS, a project by Dan Mons, makes it easy to set up a network attached storage (NAS) device focused solely on compatibility with retro gaming devices. MiSTer is one of its primary focuses, and it works quite well. All you need is a Raspberry Pi 4 or 5 and an external storage drive. Remember: a NAS is not a backup! You could lose data if a NAS is the only place you keep important data. The project has a simple [installation guide](https://github.com/danmons/retronas/wiki/Installing-RetroNAS){target=_blank}, [MiSTer-specific instructions](https://github.com/danmons/retronas/wiki/MiSTer-FPGA){target=_blank}, and YouTube video guides for [installation](https://www.youtube.com/watch?v=szA-MSabplc){target=_blank} and [MiSTer FPGA-specific configuration](https://www.youtube.com/watch?v=OrTctA-5kqk){target=_blank}.

## Tailscale Networking

Adding your MiSTer to a Tailnet has a lot of benefits: keeping access to a NAS with your games while traveling, remotely administering a less-technical friend's MiSTer, and remote SSH/SFTP for running scripts and installing cores, to name a few.

If you do not already have a Tailnet, follow the instructions [here](https://tailscale.com/kb/1017/install){target=_blank} to get started. Make sure you add at least one computer/NAS/phone to the Tailnet once it's created.

To install Tailscale on your MiSTer, you can either use [this easier scripted install method](https://github.com/davewongillies/MiSTer-tailscale#setup) or follow the manual steps below.

Go to the [Tailscale Package Repository](https://pkgs.tailscale.com/stable/#static){target=_blank} and download the ARMv7 binary package (it will look something like `arm: tailscale_x.xx.x_arm.tgz`).

Extract the archive on your computer and SFTP the files (`tailscaled` and `tailscale`) to your MiSTer. The examples below use `/media/fat/linux/tailscale/`, but any directory under `/media/fat/` works — adjust the paths accordingly.

SSH into your MiSTer and change to the directory where you put the extracted Tailscale files. Create a directory to house the Tailscale state on boot with `mkdir .state`. Now start the Tailscale Daemon with the following command:
```
# /media/fat/linux/tailscale/tailscaled --tun=userspace-networking --statedir=/media/fat/linux/tailscale/.state/
```
`--tun=userspace-networking` is added because the MiSTer Linux kernel is not compiled with TUN support, so running it in userspace allows the daemon to start. `--statedir=/media/fat/linux/tailscale/.state/` prevents the daemon from erroring on a cold boot, when the OS root directory is mounted read-only.

Once the daemon starts, run the following command to join your MiSTer to your tailnet:
```
# /media/fat/linux/tailscale/tailscale up --accept-routes
```
`--accept-routes` is only needed if you have a machine on your Tailnet set up as a subnet router.

When that command finishes, paste the URL at the bottom of its output into your browser to join the device to your Tailnet.

Once the MiSTer is joined to the Tailnet, create a `tailstart.sh` file in the tailscale directory with the following contents:
```
#/bin/sh

/media/fat/linux/tailscale/tailscaled --tun=userspace-networking --statedir=/media/fat/linux/tailscale/.state/ > /dev/null 2>&1 &
/media/fat/linux/tailscale/tailscale up --accept-routes > /dev/null 2>&1 &
```

Once the file is created, run:
```
# chmod +x tailstart.sh
```
To have Tailscale start at boot, edit the `user-startup.sh` file in `/media/fat/linux/` and add the following line to the bottom:
```
/media/fat/linux/tailscale/tailstart.sh
```

Now your MiSTer will connect to your Tailnet after every reboot.

## Network settings and configuration
By default, MiSTer uses `dhcpcd` (not to be confused with `dhcpd`) to acquire a local network IP address from a DHCP server.
It is a powerful DHCP client with too many configuration options (`dhcpcd.conf`) to cover here,
so this section covers only the most likely reasons to modify its behavior on a MiSTer.
For full documentation read [dhcpcd.conf (5)](https://man.archlinux.org/man/dhcpcd.conf.5){target=_blank}.

### MAC address configuration
A MAC address (Media Access Control address) is a network address assigned
to the hardware of every network interface.
It lets network switches learn where to route traffic — like an IP address, but statically assigned to hardware and only relevant within your local network.

Much like IP addresses, MAC addresses have to be unique for the network to function properly,  
but unlike IP addresses, they cannot be dynamically assigned by a DHCP server — MAC addresses are static by design.

Some installers like [Mr Fusion](../setup/software.md#flash-mr-fusion-to-your-microsd-card) 
randomize the MiSTer's MAC address during setup, but others use the same MAC address every time.
As a result, it is common for two or more MiSTers to have the exact same MAC address on their onboard Ethernet port.

If two MiSTers with the same MAC address are on the same network at the same time,  
the network switches may start sending packets to the wrong MiSTer and cause connections to fail.
Fortunately, if this is the case, it's possible to override the default MAC address.

#### Log in to the Linux terminal on the MiSTer
From the MiSTer's startup menu, press ++F9++ to get a Linux terminal, then
log in as root (see [Network Access](#network-access) for the default credentials).

#### Change MAC address
Open u-boot.txt for editing by running `nano /media/fat/linux/u-boot.txt`.
The file should contain a line similar to this:
```
ethaddr=EA:C8:21:56:E3:43
```

Edit the MAC address so that no MiSTers on your network share the same address.
MAC addresses are made up of six sets of two characters that range between `00`-`FF` and are separated by `:`.
When changing the MAC address, avoid these addresses that have special meaning:

* Multicast (any address where the first set ends in `1`, `3`, `5`, `7`, `9`, `B`, `D` or `F`):
    * ❌ `EB:C8:21:56:E3:43`
    * ✔️ `EC:C8:21:56:E3:43`
* Broadcast (`FF:FF:FF:FF:FF:FF`)
* All zeros (`00:00:00:00:00:00`)

Once done, save with ++Ctrl+o++ and exit with ++Ctrl+x++, then
run `reboot` to restart the MiSTer with the new MAC address applied.

### Hostname configuration
`dhcpcd` can be configured so that MiSTer offers its preferred name to your DHCP server, but it's disabled by default.
Enabling it lets you connect to your MiSTer by name instead of looking up its IP address.

#### Log in to the Linux terminal on the MiSTer
Log in to the MiSTer's Linux terminal as described [above](#log-in-to-the-linux-terminal-on-the-mister).

Alternatively, you can log in remotely with [SSH](#ssh).
This is recommended if possible as you will be able to copy and paste the commands instead of typing them out by hand.

#### Check your local network has a top-level domain assigned
Before enabling this feature, you should be sure
that your network router supports top-level domains (TLDs) in the local network.

To do this, run `dhcpcd -U | less`
and look for at least one `domain_name` entry that looks like this:
```
domain_name=lan
```
Remember the value after the `=` for later and press ++Q++ to return to the terminal.
If you find more than one `domain_name` value, remember them all.
If you have no `domain_name` value in the results then your network router is not offering a top level domain
and there's no point in proceeding.

Alternatively, run this command to find and filter `domain_name` values for you:
```bash
dhcpcd -U 2>/dev/null | grep domain_name= | cut -c13-
```
It produces output like:
```
lan
```

#### Enable sending preferred name to DHCP server
Open the dhcpcd configuration file for editing by running `nano /etc/dhcpcd.conf`.

Press ++Down++ until you find this text:
```
# Request a hostname from the network
#option host_name
```
Uncomment the option by removing the `#` in front of it so it looks like this:
```
# Request a hostname from the network
option host_name
```
Once done, save with ++Ctrl+o++ and exit with ++Ctrl+x++.

#### Set the MiSTer's preferred name
To set the name itself, run `nano /etc/hostname`.
You should see a word in the file (likely `MiSTer`).
Change it to whatever you want your MiSTer's name to be.
You can choose any name, but for best compatibility with other network devices follow these constraints:

* Only use alphanumeric characters (A–Z; no kanji or Cyrillic)
    * The name is case-insensitive; mix uppercase and lowercase as you like
* Avoid symbols (`!`, `?`, `#`, `%` etc.) and especially periods (`.`)
* Avoid starting the name with a number (0 to 9)
* Avoid using spaces and multiple words
* Try to choose a name that is no more than 15 characters total

Once done, save with ++Ctrl+o++ and exit with ++Ctrl+x++.

Run `hostname` to confirm the MiSTer's name has changed, then
run `reboot` to restart the MiSTer with the new network settings applied.

#### Test the name change
> Assume you set your MiSTer's name to `timemachine` and your top-level domain is `.home`.
Replace these with the domain you found earlier and the name you actually set.

From another computer on the network, run `ping timemachine.home`.
If you see replies, you can now use `timemachine.home`
to reach your MiSTer on your local network. The MiSTer should now be accessible from at least one of the top-level domains you found earlier.

### Static IP Address configuration
Before configuring a static IP address, consider whether it's really necessary.
A static IP can conflict with another network device assigned the same address,
and an address outside the network's subnet range will leave your MiSTer unable to connect to anything.
If in doubt, try [Hostname configuration](#hostname-configuration) first.

#### Log in to the Linux terminal on the MiSTer
Log in to the MiSTer's Linux terminal as described [above](#log-in-to-the-linux-terminal-on-the-mister).

You can do this over SSH, but it is not recommended: once the IP address changes,
you may lose network access (and therefore your SSH connection) to the MiSTer.

#### Find the network interface name
A DE10-Nano MiSTer always has at least two network interfaces:

| Interface Name | Description                                             |
|----------------|---------------------------------------------------------|
| `lo`           | Linux virtual network loopback device (not interesting) |
| `eth0`         | The DE10-Nano's built-in Gigabit Ethernet               |

These two interface names should be consistent across all MiSTers.
However, if you want to set a static IP address on a USB network card,
you will first need to know the name Linux has given to the interface.
Run `ip link`. The output looks similar to this:
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DEFAULT group default qlen 1000
    link/ether 01:02:03:04:05:06 brd ff:ff:ff:ff:ff:ff
```
If necessary, run `ip addr` instead to see the IP address currently assigned to each interface (if any):
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 01:02:03:04:05:06 brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.221/24 brd 10.0.0.255 scope global dynamic noprefixroute eth0
       valid_lft 40368sec preferred_lft 34968sec
```
There will be an additional entry
for each USB Wi-Fi and/or Ethernet adapter MiSTer has recognized.
Take note of the interface name you want to change (they are case-sensitive) before proceeding.

#### Assign a static IP address to an interface

> Assume you want the network interface named `eth0` to be assigned a static IP address of `192.168.0.128`.
Replace these values with the network interface name you got in the previous step
and the IP address you want to set it to.

Open the dhcpcd configuration file by running `nano /etc/dhcpcd.conf`.
Press ++Down++ until you're at the bottom of the file, then type:
```
interface eth0
static ip_address=192.168.0.128/24
```
These lines are order-sensitive, so be sure to add them at the very bottom of the file.
Any line below an `interface` line will apply to that interface until the next `interface` line.
Any line above the first `interface` line will apply to all network interfaces.

You can optionally specify any combination of options for an interface, here are some useful ones:

| Option                        | Description                                       |
|-------------------------------|---------------------------------------------------|
| `static routers=`             | Manually specify routers/gateways to the Internet |
| `static domain_name_servers=` | Manually specify DNS servers to resolve names     |
| `ntp_servers=`                | Manually specify NTP servers to get time from     |

With these options specified, an interface configuration looks like:
```
interface eth0
static ip_address=192.168.0.128/24
static routers=192.168.0.1
static domain_name_servers=8.8.8.8 1.1.1.1
ntp_servers=192.168.0.1 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org
```

Once done, save with ++Ctrl+o++ and exit with ++Ctrl+x++.
Run `reboot` to restart the MiSTer with the new network settings applied.

#### Re-enabling DHCP
If your static IP configuration isn't working, or you want to revert to automatic DHCP,
open `/etc/dhcpcd.conf` again and put a `#` at the beginning of each line you want to revert.
Commenting lines out is as good as removing them, but lets you restore them later if you change your mind.

To revert all of your configuration, comment out every line you added like so:
```
#interface eth0
#static ip_address=192.168.0.128/24
#static routers=192.168.0.1
#static domain_name_servers=8.8.8.8 1.1.1.1
#ntp_servers=192.168.0.1 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org
```
Just like before: save the file and reboot to apply the new settings.
