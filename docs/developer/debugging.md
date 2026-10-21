While developing a core, it's convenient to upload it through the USB Blaster (JTAG) port directly from Quartus. MiSTer supports USB Blaster and automatically reloads the Linux part for the uploaded core. Since Linux requires a reboot (for better stability), you may notice a longer startup time — this is normal. It's advisable to have a console connected to the MiSTer to control the boot process. Once the core is compiled to RBF format and placed on the SD card, loading will be fast.

## Configuring USB Blaster on Linux
Although no drivers are needed on Linux, by default only the root user can access the cable. To use it as a regular user, add a file called `/etc/udev/rules.d/92-usbblaster.rules` with the following content:

```
# USB-Blaster 
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6001", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6002", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6003", MODE="0666"

# USB-Blaster II
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6010", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="09fb", ATTR{idProduct}=="6810", MODE="0666"
```
