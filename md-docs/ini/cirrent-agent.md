# CIRRENT™ Agent

The CIRRENT™ Agent is a compact code package that you install on your device. CIRRENT™ Agent collects data from your device and submits it to CIRRENT™ Cloud.

CIRRENT™ Agent collects a default data set that covers you for a broad range of analytics requirements, but you can customize CIRRENT™ Agent to deliver unique parameters and to facilitate notifications by tapping into the CIRRENT™ Agent API – read more about the API here.

We provide installation instructions for CIRRENT™ Agent on Linux and Raspberry Pi. Contact our support team if you want to run CIRRENT™ Agent on a device using a different environment, such as RTOS.

Once your device goes online, CIRRENT™ Agent will start reporting some data such as the SSID, BSSID, router that the Raspberry Pi is connected to after the first few minutes, while some data like metrics and connectivity values take up to a day for the CIRRENT™ Agent to collect and report.

## CIRRENT™ Agent requirements

Your device needs to meet several minimum requirements to host the CIRRENT™ Agent. If your device does not meet the requirements below, or where you have any questions, please contact our support team on support@cirrent.com. 

### Hardware requirements

The CIRRENT™ Agent hardware requirements depends on the features being used.

* Wi-Fi Network interface must have STA mode
* Your device must have persistent storage with read/write access

### Software requirements

Your device must use one of the following operating systems:

* A Linux-based OS – including Raspberry Pi OS
* RTOS

Depending on the configuration for each feature, the CIRRENT™ Agent may require root permissions or special file capabilities on your device.

## Installing CIRRENT™ Agent on Linux

The CIRRENT™ Agent is compatible with any device that runs **Linux 2.2 and above**. It runs in userspace as a cirrent_agent daemon.

The CIRRENT™ Agent is delivered as a tarball comprised of:

* Pre-compiled binaries compatible with your device’s architecture (armhf, x86, etc)

* All necessary configuration files

* Scripts for managing the CIRRENT™ Agent

* Shared libraries for working with the CIRRENT™ Agent

When you sign up as a CIRRENT™ INI customer we will automatically supply you with a copy of the CIRRENT™ Agent. If you would like to test the CIRRENT™ Agent please get in touch on support@cirrent.com.

### Components

The CIRRENT™ Agent consists out of three components that work together to connect your device to the CIRRENT™ Cloud and to report observations from your device.

*   cirrent_agent
    An executable binary that runs as a daemon (CIRRENT_agent)   


*   libcirrent_api.so
    Shared library for communicating and controlling the CIRRENT™ Agent.
    Communication and control of the CIRRENT™ Agent is done either by linking in the libcirrent using the cirrent.h header or using the cirrent_cli shell utility (which internally uses the libcirrent)
  
*   cirrent_cli
    Shell utility for communicating and controlling the CIRRENT™ Agent using the libCIRRENT_api.so library.
    Refer to the section on the CIRRENT™ Agent API for a list of the commands that you can run.

### Steps for installing CIRRENT™ Agent on Linux

Steps for installing CIRRENT™ Agent will vary depending on which Linux distribution your device uses. Note that each CIRRENT™ Agent must be authorized to communicate with the CIRRENT™ Cloud. Log into your CIRRENT™ Console account to generate the provisioning key and secret key if you don’t have one already. We provide sample installation instructions for Raspberry Pi below, but in the broad your installation steps will look as follows:

1.	Ensure your device is fully updated
2.	Verify that your device can connect to Wi-Fi
3.	Ensure that you have an account with CIRRENT™ Cloud
4.	Make sure you have a provisioning key and secret ready for the CIRRENT™ Agent
5.	Acquire the latest CIRRENT™ Agent .deb package 
6.	Install the CIRRENT™ Agent using sudo command
7.	Use sudo to provision your device by adding the unique provisioning and secret key for CIRRENT™ Agent

Once in production, you will ship your products with CIRRENT™ Agent pre-installed.

### Dependencies

On Linux, the CA relies on the following libraries that are linked directly into the CA. These libraries must be available on your device.

| Library/Application | Description | Required For | Notes |
|-------------------------|--------------------------------------|------------|----------------------------------|
| libc | C library | INI, CM | C99 |
| libssl | TLS Library | INI, CM | versions >= 1.0.2h |
| libcrypto | crypto Library | INI, CM |  |
| libpthread | thread Library | INI, CM |  |
| libcurl | HTTP client library | INI, CM |  |
| librt | realtime extensions library | INI, CM |  |
| libnl | network information library | INI |  |
| libnl-genl | network information library | INI |  |
| udhcpc | DHCP Client | CM | Available with busybox |
| libmicrohttpd | HTTP server library | CM | Enables Wi-Fi onboarding |
| libmicrohttpd | DHCP Server | CM | Enables Wi-Fi onboarding |

 If you have the following utilities available on your target Linux device you will find installation easier:

| Utility | Description | Notes |
|-------------------------|--------------------------------------|------------|
| curl         | http client        | Used during install for downloading files       |
| jq           | json parser        | Used during install for parsing requests        |
 		

## Installation example: CIRRENT™ Agent on Raspberry Pi

Integrating CIRRENT™ Agent on your Linux-based device is simple. In this example guide we show you how to use your Raspberry Pi as a testing platform to install, configure, run, and use the CIRRENT™ Agent (CA) on your Raspberry Pi to run CIRRENT™ INI.

By the end of this guide you will have the latest CIRRENT™ Agent running on your Raspberry Pi and your Raspberry Pi device will be reporting data to the CIRRENT™ Cloud. You can view this data in the CIRRENT™ Console.

### Hardware requirements

The CIRRENT™ Agent should work on any modern Raspberry Pi, but the CIRRENT™ Agent was thoroughly tested on a Raspberry Pi 3B. Though we only guarantee compatibility with a Raspberry Pi 3B, you may find that the CIRRENT™ Agent works on a different edition of the Raspberry Pi. 

Note that your Raspberry Pi 3B must have a compatible power supply. [You can read more about compatible power supplies here](https://www.raspberrypi.org/documentation/computers/raspberry-pi.html#power-supply).

The Raspberry Pi 3B radio only works on a 2.4 GHz network, so you can only use the CIRRENT™ Agent on your Raspberry Pi 3B if your Wi-Fi network has a 2.4 Ghz band.

### Software requirements

You need a clean install of the Raspbian OS, we’ve test CIRRENT™ Agent on **Raspbian OS 2020-02-14 which** [you can download here](https://downloads.raspberrypi.org/raspbian/images/)`.

**Note that you will need terminal access to your Raspberry Pi, you can** [read more about terminal access here](https://www.raspberrypi.org/documentation/computers/using_linux.html#terminal).

Finally, you also need a CIRRENT™ Cloud account in order to receive inbound data from the CIRRENT™ Agent.

### Getting ready

You’ll need the latest CIRRENT™ Agent .deb package to get started. 

1.	Make sure your Raspberry Pi is running a clean OS installation and is powered on with your official Raspberry Pi power supply
2.	Make sure your Raspberry Pi is connected to the 2.4 GHz Wi-Fi network and can reach the Internet

	* https://www.raspberrypi.org/documentation/configuration/wireless/

3.	Make sure you have a provisioning key and secret ready for the CIRRENT™ Agent. Each CIRRENT™ Agent must be authorized to communicate with the CIRRENT™ Cloud. Log into your CIRRENT™ Console account to generate the provisioning key and secret if you don’t have one already.

### Installation

1. Update your Raspberry Pi:

	`
    sudo apt-get update
    `

2. Install the CIRRENT™ Agent .deb package
    `
    sudo dpkg -i CIRRENT™-agent_2.0.4-ini+deb10u3_armhf.deb
    `

	Some errors may be reported by dpkg. You can safely ignore these errors. See output:

    ```
    dpkg: dependency problems prevent configuration of CIRRENT™-agent:
    CIRRENT™-agent depends on monit; however:
    Package monit is not installed.
    dpkg: error processing package CIRRENT™-agent (--install):
    dependency problems - leaving unconfigured
    Processing triggers for systemd (241-7~deb10u2+rpi1) ...
    Errors were encountered while processing:
    CIRRENT™-agent
    ```

3. Finish installation. This will also resolve errors from the previous step:
    `
		sudo apt-get -f install
    `

4. Configure your device by entering your provisioning key and secret:
    `
		sudo nano /etc/default/CIRRENT™
    `

	Add the following lines and replace the placeholders PROVISIONING_KEY and PROVISIONING_SECRET with your provisioning key and secret
    ```
    PROVISION_CRED="-K PROVISIONING_KEY -S PROVISIONING_SECRET \
        -U $(ip link show dev eth0 | grep ether | awk '{print $2}' | sed 's|:|-|g')"
    ```

5.	Reboot your Raspberry Pi
    `
		sudo reboot
    `

	All done! You can now leave your Raspberry Pi running and the CIRRENT™ Agent will automatically collect data.

### Next Steps

The CIRRENT™ Agent will start reporting data including the SSID, BSSID, and router that the Raspberry Pi is connected to after the first few minutes, while some data such as metrics and connectivity values take up to a day for the CIRRENT™ Agent to collect and report.

To view data for all devices in an account, please visit:

[https://cirrent.infineon.com](https://cirrent.infineon.com)

To start viewing your Raspberry Pi’s data simply go the Device Inspector page and search for your device.


## Installation example: CIRRENT™ Agent on ModusToolbox

If you’re making use of ModusToolbox you can follow the instructions below to start the CIRRENT™ Agent with PSoC® 6 MCU and CYW43xxx connectivity devices. The example establishes a connection with a user defined Wi-Fi network and then starts the CIRRENT™ Agent to monitor the Wi-Fi network and upload data to the CIRRENT™ Cloud to enable the INI feature.

### Requirements

You need access to the following to start CIRRENT™ Agent on ModusToolbox:

* ModusToolbox™ software v2.3, patched to version 2.3.1 – [download it here](https://www.cypress.com/products/modustoolbox-software-environment)

* Programming language: C

* Supported toolchains: Arm GCC

* One of two supported parts: all [PSoC® 6 MCU](http://www.cypress.com/PSoC6>) parts with either [CYW43012](https://www.cypress.com/documentation/product-overviews/cypress-cyw43012) or [CYW4343W](https://www.cypress.com/documentation/datasheets/cyw4343w-single-chip-80211-bgn-macbasebandradio-bluetooth-41) chips

* CIRRENT™ Developer Account with access to the CIRRENT™ Console.

* Wi-Fi network with internet access

The follow instructions support two kits – [the PSoC 6 Wi-Fi BT Prototyping Kit](https://www.infineon.com/cms/en/product/evaluation-boards/cy8cproto-062-4343w) and the [PSoC 62S2 Wi-Fi BT Pioneer Kit](https://www.infineon.com/cms/en/product/evaluation-boards/cy8ckit-062s2-43012/?utm_source=cypress&utm_medium=referral&utm_campaign=202110_globe_en_all_integration-dev_kit).

### Required hardware and software configuration

This example uses the board's default configuration. See your kit’s user guide to ensure that the board is configured correctly. Note that you need to install a terminal emulator if you don’t have one.

### Using the code examples

In Eclipse IDE for ModusToolbox:

1.	Click the **New Application** link in the **Quick Panel** (or, use **File** > **New** > **ModusToolbox Application**).

2.	Pick a kit supported by the code example from the list shown in the **Project Creator - Choose Board Support Package (BSP)** dialog.

	When you select a supported kit, the example is reconfigured automatically to work with the kit. 

	To work with a different supported kit later, use the **Library Manager** to choose the BSP for the supported kit. You can use the Library Manager to select or update the BSP and firmware libraries used in this application. 

	To access the Library Manager, right-click the application name from the Project Workspace window in the IDE, and select **ModusToolbox** > **Library Manager**. You can also access it from the **Quick Panel**.

	You can also just start the application creation process again and select a different kit.

	If you want to use the application for a kit not listed here, you may need to update the source files. If the kit does not have the required resources, the application may not work.

3.	In the **Project Creator - Select Application** dialog, choose the example.

4.	Optionally, update the **Application Name:** and **Location** fields with the application name and local path where the application is created.
5.	Click **Create** to complete the application creation process.

For more details, see the Eclipse IDE for ModusToolbox User Guide: [Eclipse IDE User Guide](https://www.infineon.com/dgdl/Infineon-Eclipse_IDE_for_ModusToolbox_User_Guide_1-UserManual-v01_00-EN.pdf?fileId=8ac78c8c7d718a49017d99bcb86331e8)

### In Command-line Interface (CLI):

1.	Download and unzip this repository onto your local machine, or clone the repository.
2.	Open a CLI terminal and navigate to the application folder.

	On Linux and macOS, you can use any terminal application. On Windows, navigate to the modus-shell directory (*{ModusToolbox install directory}/tools_{version}/modus-shell*) and run *Cygwin.bat*.
3.	Import the required libraries by executing the `make getlibs` command.

### In Third-party IDEs:

1. Follow the instructions from the CLI section to download or clone the repository, and import the libraries using the `make getlibs` command.
2. Export the application to a supported IDE using the `make <ide>` command.
3. Follow the instructions displayed in the terminal to create or import the application as an IDE project. 
   For more details, see the "Exporting to IDEs" section of the ModusToolbox User Guide: *{ModusToolbox install directory}/ide_{version}/docs/mtb_user_guide.pdf*.

### Using the CIRRENT™ Agent in ModusToolbox

1. Using your CIRRENT™ Developer Account, log into the [CIRRENT™ Console](https://cirrent.infineon.com) and navigate to "Device Management->Cloud ID". Click on the 'Device Registration' tab and create a new Provision API Key. Name it something convenient like "Sample 43012 Application key". Make a note of the key and its secret.
2. Connect the board to your PC using the provided USB cable through the KitProg3 USB connector.
3. Using the key and secret from Step 1, replace the `PROVISIONING_KEY` and `PROVISIONING_SECRET` values stored in the `CA_INIT_CONFIG_T.credential.provision` in the *main.c* file.
4. Modify the `WIFI_SSID`, `WIFI_PASSWORD`, and `WIFI_SECURITY` macros to match with that of the Wi-Fi network credentials that you want to connect and monitor. These macros are defined in the *configs/wifi_config.h* file. Make sure the Wi-Fi network has Internet connectivity.
5. Program the board.

	**Using Eclipse IDE for ModusToolbox**

	1. Select the application project in the Project Explorer.

	2. In the **Quick Panel**, scroll down, and click **Application Name /Program KitProg3**.


	- **Using CLI**:

	 	From the terminal, execute the `make program` command to build and program the application using the default toolchain to the default target. You can specify a target and toolchain manually:
        `
		   	make program TARGET=<BSP> TOOLCHAIN=<toolchain>   
        `

		Example:
        `
		   make program TARGET=CY8CPROTO-062-4343W TOOLCHAIN=GCC_ARM
        `

		**Note**:  Before building the application, ensure that the *deps* folder contains the BSP file (*TARGET_xxx.lib*) corresponding to the TARGET. Execute the `make getlibs` command to fetch the BSP contents before building the application.

		After programming, the application starts automatically. Confirm that the CIRRENT™ Agent is running by examining the terminal output. You should see the CIRRENT™ Agent start to print logs like:
        `
			|INFO|2000.01.01 00:00:00.000000|0000||CA-START||ca_version=2.0.6;
        `

6. Navigate to the Device Inspector in the [CIRRENT™ Console](https://cirrent.infineon.com) and search for your `DEVICE_ID` (by default this is the MAC address of your device's Wi-Fi interface delimited by dashes, e.g. 00-11-22-aa-bb-cc). The CIRRENT™ Agent will upload the Wi-Fi network SSID within a minute of starting. It will be displayed in the Device Inspector as soon as it is uploaded. Other data like metrics, and connectivity values will take up to 24 hours to be gathered and uploaded.

