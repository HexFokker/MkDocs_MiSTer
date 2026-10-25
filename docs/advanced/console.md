The DE10-Nano board has a console port. It lets you log in to Linux without a network connection and provides debug/info output that is sometimes useful for tracking down problems.

Refer to the **UART-to-USB (USB Mini-B)** connector on the board's right side in the picture below:

![UART port location](img/layout_top.jpg)

## Connect with Windows
Connect the DE10-Nano board to a PC using the **UART-to-USB (USB mini type B)** connector next to micro-USB. The PC will recognize it as a virtual COM port. Use any serial console application to connect to it, such as [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html){target=_blank}.

Verify that COM port settings are correct:

* Speed (baud rate) - 115200 bits per second
* Data bits - 8
* Stop bits - 1
* Parity - none
* Flow control - none

Quick video of connecting on Windows:

![type:video](videos/console-connection.mp4)

## Connect with Linux

1. Make sure you're a member of the **dialout** group.
2. Your serial port is likely **/dev/ttyUSB0**.
3. Configure it: `stty -F /dev/ttyUSB0 115200 cs8 -cstopb -parenb -ixoff -ixon`
4. Watch the output while dumping it to a file: `cat /dev/ttyUSB0 | tee mr.log` — this only reads and logs the serial output; it cannot send input. For an interactive session (e.g. to log in), use a terminal program such as `screen /dev/ttyUSB0 115200` or `minicom`.

mr.log now contains a copy of everything shown on screen.

## U-Boot command prompt

Once connected, hold ESC on the PC keyboard and power on or reboot the DE10-Nano (using the reset button) to interrupt U-Boot. You should see a `=>` prompt, where you can edit kernel boot options and more.
