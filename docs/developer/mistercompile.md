MiSTer combines several compiled components: a customized minimal Linux kernel, a bootloader, the Main MiSTer binary written in C++, and cores built on the MiSTer framework in VHDL, Verilog, and SystemVerilog. Compiling the full stack requires a variety of tools.

## To compile MiSTer FPGA cores

Most MiSTer FPGA cores use Quartus 17.0.2 for compilation (as of this writing). Download links for Windows and Linux:

| Download URL                                                                                                                           | SHA1 Checksum                              |
|----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| [Linux](https://download.altera.com/akdlm/software/acdsinst/17.0std.2/602/ib_tar/Quartus-lite-17.0.2.602-linux.tar){target=_blank}     | `02aebab728d54e3ca8660d2646fdf93bc669b0ac` |
| [Windows](https://download.altera.com/akdlm/software/acdsinst/17.0std.2/602/ib_tar/Quartus-lite-17.0.2.602-windows.tar){target=_blank} | `01d1f9cea037cf4b8c666da1193f94ba626b6fb3` |

The Linux build is intended for Ubuntu 18.04 LTS; you may have to download some missing dependencies if you use a newer version or another distribution.

Open the `.qpf` file of the MiSTer core you wish to compile in Quartus and press Compile (the play button).

## General prerequisites for ARM Cross Compiling

Only some of these prerequisites are strict. This guide was tested on Ubuntu 20.04.5 LTS in WSL2; other distros may work, but your results may vary. Install the prerequisites for compiling the Main MiSTer binary and Linux kernel this way:

```sh
sudo apt update && sudo apt upgrade -y
sudo apt-get install build-essential git libncurses-dev flex bison openssl libssl-dev dkms libelf-dev libudev-dev libpci-dev libiberty-dev autoconf liblz4-tool bc curl gcc libncurses5-dev lzop make u-boot-tools libgmp3-dev libmpc-dev
```

Download the correct cross-compiler for compiling ARM binaries on a 64-bit x86-based system:

```sh
wget -c https://developer.arm.com/-/media/Files/downloads/gnu-a/10.2-2020.11/binrel/gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf.tar.xz
```

Extract this archive somewhere convenient — it will be added to PATH; here it's extracted to `/opt`:

```sh
sudo tar xf gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf.tar.xz -C /opt  # or extract to a directory you own instead
```

Add this to your PATH temporarily each time you compile:

```sh
export PATH=/opt/gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf/bin:$PATH
```

**Note:** On WSL2 (the author's setup), you may have to run these export commands again after logging out — this may not be the case in your scenario. There are ways to set them permanently, or you can pass them to `make` as parameters (e.g. `PATH=/opt/gcc-arm-10.2-2020.11-x86_64-arm-none-linux-gnueabihf/bin:$PATH make -j30`).

## Main MiSTer Binary

The Main MiSTer binary is a good place to start for this guide.

### Linux (including WSL)

Clone the Main_MiSTer repository:

```sh
git clone https://github.com/MiSTer-devel/Main_MiSTer.git
```

Then `cd` into the created directory and run `make`.

### macOS

With Apple Silicon, the commonly used toolchains do not run directly as they are built for x86_64.

You can take advantage of an [IDE with devcontainers support](https://containers.dev/supporting){target=_blank} as the Main MiSTer repo includes a [devcontainer configuration](https://github.com/MiSTer-devel/Main_MiSTer/tree/master/.devcontainer){target=_blank}.

Make sure you have enough RAM available or you will experience [disconnects](https://code.visualstudio.com/docs/remote/troubleshooting#_troubleshooting-hanging-or-failing-connections){target=_blank}. For [Colima](https://github.com/abiosoft/colima){target=_blank}, the following appears sufficient to compile MiSTer quickly: 
```
colima start --cpu 4 --memory 8
```

After the devcontainer is set up, you can proceed as before and run `make`.
