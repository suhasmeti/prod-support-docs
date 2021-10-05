CIRRENT™ Agent
=================

The CIRRENT™ Agent is a compact code package that you install on your device. CIRRENT™ Agent collects data from your device and submits it to CIRRENT™ Cloud.

CIRRENT™ Agent collects a default data set that covers you for a broad range of analytics requirements, but you can customize CIRRENT™ Agent to deliver unique parameters and to facilitate notifications by tapping into the CIRRENT™ Agent API – read more about the API here.

We provide installation instructions for CIRRENT™ Agent on Linux and Raspberry Pi. Contact our support team if you want to run CIRRENT™ Agent on a device using a different environment, such as RTOS.

Once your device goes online, CIRRENT™ Agent will start reporting some data such as the SSID, BSSID, router that the Raspberry Pi is connected to after the first few minutes, while some data like metrics and connectivity values take up to a day for the CIRRENT™ Agent to collect and report.

****************************
CIRRENT™ Agent requirements
****************************

Your device needs to meet several minimum requirements to host the CIRRENT™ Agent. If your device does not meet the requirements below, or where you have any questions, please contact our support team on support@cirrent.com. 

Hardware requirements
^^^^^^^^^^^^^^^^^^^^^^^

The CIRRENT™ Agent hardware requirements depend on the feature being used.

* Wi-Fi Network interface must have STA mode
* Your device must have persistent storage with read/write access

Software requirements
^^^^^^^^^^^^^^^^^^^^^^
Your device must use one of the following operating systems:

* A Linux-based OS – including Raspberry Pi OS
* RTOS

Depending on the configuration for each feature, the CIRRENT™ Agent may require root permissions or special file capabilities on your device.

***********************************
Installing CIRRENT™ Agent on Linux
***********************************

The CIRRENT™ Agent is compatible with any device that runs **Linux 2.2 and above**. It runs in userspace as a cirrent_agent daemon.

The CIRRENT™ Agent is delivered as a tarball comprised of:

* Pre-compiled binaries compatible with your device’s architecture (armhf, x86, etc)

* All necessary configuration files

* Scripts for managing the CIRRENT™ Agent

* Shared libraries for working with the CIRRENT™ Agent

When you sign up as a CIRRENT™ INI customer we will automatically supply you with a copy of the CIRRENT™ Agent. If you would like to test the CIRRENT™ Agent please get in touch on support@cirrent.com.

Components
^^^^^^^^^^^

The CIRRENT™ Agent consists out of three components that work together to connect your device to the CIRRENT™ Cloud and to report observation from your device.

* cirrent_agent
  An executable binary that runs as a daemon (CIRRENT™_agent)

* libcirrent_api.so

  Shared library for communicating and controlling the CIRRENT™ Agent.

  Communication and control of the CIRRENT™ Agent is done either by linking in the libcirrent using the cirrent.h header or using the cirrent_cli shell utility (which internally uses the libcirrent)

* cirrent_cli

  Shell utility for communicating and controlling the CIRRENT™ Agent using the libCIRRENT™_api.so library.

  Refer to the section on the CIRRENT™ Agent API for a list of the commands that you can run.

*********************************************
Steps for installing CIRRENT™ Agent on Linux
*********************************************

Steps for installing CIRRENT™ Agent will vary depending on which Linux distribution your device uses. 

Note that each CIRRENT™ Agent must be authorized to communicate with the CIRRENT™ Cloud. Log into your CIRRENT™ Console account to generate the provisioning key and secret key if you don’t have one already.

We provide sample installation instructions for Raspberry Pi below, but in the broad your installation steps will look as follows:

1.	Ensure your device is fully updated
2.	Verify that your device can connect to Wi-Fi
3.	Ensure that you have an account with CIRRENT™ Cloud
4.	Make sure you have a provisioning key and secret ready for the CIRRENT™ Agent
5.	Acquire the latest CIRRENT™ Agent .deb package 
6.	Install the CIRRENT™ Agent using sudo command
7.	Use sudo to provision your device by adding the unique provisioning and secret key for CIRRENT™ Agent

Once in production, you will ship your products with CIRRENT™ Agent pre-installed. You can read more about the onboarding process for manufactured devices here.

*************
Dependencies
*************

On Linux, the CA relies on the following libraries that are linked directly into the CA. These libraries must be available on your device.

+-----------------------+--------------------------------+----------------+------------------------------------+
| Library/Application   | Description                    | Required For   | Notes                              |
+=======================+================================+================+====================================+
| libc                  | C library                      | INI, CM        | C99                                |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libssl                | TLS Library                    | INI, CM        | versions >= 1.0.2h                 |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libcrypto             | crypto Library                 | INI, CM        |                                    |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libpthread            | thread Library                 | INI, CM        |                                    |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libcurl               | HTTP client library            | INI, CM        |                                    |
+-----------------------+--------------------------------+----------------+------------------------------------+
| librt                 | realtime extensions library    | INI, CM        |                                    |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libnl                 | network information library    | INI            |                                    |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libnl-genl            | network information library    | INI            |                                    |
+-----------------------+--------------------------------+----------------+------------------------------------+
| udhcpc                | DHCP Client                    | CM             | Available with busybox             |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libmicrohttpd         | HTTP server library            | CM             | Enables Wi-Fi onboarding           |
+-----------------------+--------------------------------+----------------+------------------------------------+
| libmicrohttpd         | DHCP Server                    | CM             | Enables Wi-Fi onboarding           |
+-----------------------+--------------------------------+----------------+------------------------------------+

 ℹ️ If you have the following utilities available on your target Linux device you will find installation easier:

+--------------+--------------------+-------------------------------------------------+
| Utility      | Description        | Notes                                           |
+==============+====================+=================================================+
| curl         | http client        | Used during install for downloading files       |
+--------------+--------------------+-------------------------------------------------+
| jq           | json parser        | Used during install for parsing requests        |
+--------------+--------------------+-------------------------------------------------+
 		

*****************************************************
Installation example: CIRRENT™ Agent on Raspberry Pi
*****************************************************

Integrating CIRRENT™ Agent on your Linux-based device is simple. In this example guide we show you how to use your Raspberry Pi as a testing platform to install, configure, run, and use the CIRRENT™ Agent (CA) on your Raspberry Pi to run the IoT Network Intelligence feature

By the end of this guide you will have the latest CIRRENT™ Agent running on your Raspberry Pi and your Raspberry Pi device will be reporting data to the CIRRENT™ Cloud. You can view this data on your CIRRENT™ Console account.

Hardware requirements
^^^^^^^^^^^^^^^^^^^^^^

The CIRRENT™ Agent should work on any modern Raspberry Pi, but the CIRRENT™ Agent was thoroughly tested on a Raspberry Pi 3B. Though we only guarantee compatibility with a Raspberry Pi 3B, you may find that the CIRRENT™ Agent works on a different edition of the Raspberry Pi. 

Note that your Raspberry Pi 3B must have a compatible power supply. `You can read more about compatible power supplies here <https://www.raspberrypi.org/documentation/computers/raspberry-pi.html#power-supply>`_.

The Raspberry Pi 3B radio only works on a 2.4 GHz network, so you can only use the CIRRENT™ Agent on your Raspberry Pi 3B if your Wi-Fi network has a 2.4 Ghz band.

Software requirements
^^^^^^^^^^^^^^^^^^^^^^

You need a clean install of the Raspbian OS, we’ve test CIRRENT™ Agent on **Raspbian OS 2020-02-14 which** `you can download here <https://downloads.raspberrypi.org/raspbian/images/>`_. 

**Note that you will need terminal access to your Raspberry Pi, you can** `read more about terminal access here <https://www.raspberrypi.org/documentation/computers/using_linux.html#terminal>`_.

Finally, you also need a CIRRENT™ Cloud account in order to receive inbound data from the CIRRENT™ Agent. You can register for an account here, or by contacting support@cirrent.com

Getting ready
^^^^^^^^^^^^^^

You’ll need the latest CIRRENT™ Agent .deb package to get started. 

1.	Make sure your Raspberry Pi is running a clean OS installation and is powered on with your official Raspberry Pi power supply
2.	Make sure your Raspberry Pi is connected to the 2.4 GHz Wi-Fi network and can reach the Internet

	* https://www.raspberrypi.org/documentation/configuration/wireless/

3.	Make sure you have a provisioning key and secret ready for the CIRRENT™ Agent. Each CIRRENT™ Agent must be authorized to communicate with the CIRRENT™ Cloud. Log into your CIRRENT™ Console account to generate the provisioning key and secret if you don’t have one already.

Installation
^^^^^^^^^^^^^

1. Update your Raspberry Pi:


::

	sudo apt-get update

1. Install the CIRRENT™ Agent .deb package


::

	sudo dpkg -i CIRRENT™-agent_2.0.4-ini+deb10u3_armhf.deb

⚠️ some errors may be reported by dpkg. You can safely ignore these errors. See output:


::

	dpkg: dependency problems prevent configuration of CIRRENT™-agent:
	CIRRENT™-agent depends on monit; however:
	Package monit is not installed.
	dpkg: error processing package CIRRENT™-agent (--install):
	dependency problems - leaving unconfigured
	Processing triggers for systemd (241-7~deb10u2+rpi1) ...
	Errors were encountered while processing:
	CIRRENT™-agent

1. Finish installation. This will also resolve errors from the previous step:


::

	sudo apt-get -f install

1. Configure your device by entering your provisioning key and secret:


::

	sudo nano /etc/default/CIRRENT™

Add the following lines and replace the 

placeholders PROVISIONING_KEY and PROVISIONING_SECRET with your provisioning key and secret


::

	PROVISION_CRED="-K PROVISIONING_KEY -S PROVISIONING_SECRET \
	 -U $(ip link show dev eth0 | grep ether | awk '{print $2}' | sed 's|:|-|g')"

1.	Reboot your Raspberry Pi


::

	sudo reboot

✔️ All done! You can now leave your Raspberry Pi running and the CIRRENT™ Agent will automatically collect data.

Next Steps
^^^^^^^^^^^

The CIRRENT™ Agent will start reporting some data like the SSID, BSSID, router that the Raspberry Pi is connected to after the first few minutes, while some data such as metrics and connectivity values take up to a day for the CIRRENT™ Agent to collect and report.

To view data for all devices in an account, please visit:

`https://cirrent.infineon.com <https://cirrent.infineon.com>`_

To start viewing your Raspberry Pi’s data simply go the Device Inspector page and search for your device.


Installation example: CIRRENT™ Agent on ModusToolbox
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you’re making use of ModusToolbxo you can follow the instructions below to start the CIRRENT™ Agent with PSoC® 6 MCU and CYW43xxx connectivity devices. The example establishes a connection with a user defined Wi-Fi network and then starts the CIRRENT™ Agent to monitor the Wi-Fi network and upload data to the CIRRENT™ Cloud to enable the INI feature.

Requirements
^^^^^^^^^^^^^

You need access to the following to start CIRRENT™ Agent on ModusToolbox:

* ModusToolbox™ software v2.3, patched to version 2.3.1 – `download it here <https://www.cypress.com/products/modustoolbox-software-environment>`_

* Programming Language: C

* Supported Toolchains: Arm GCC

* One of two supported parts: all `PSoC® 6 MCU <http://www.cypress.com/PSoC6>`_ parts with either `CYW43012 <https://www.cypress.com/documentation/product-overviews/cypress-cyw43012>`_ or `CYW4343W <https://www.cypress.com/documentation/datasheets/cyw4343w-single-chip-80211-bgn-macbasebandradio-bluetooth-41>`_ chips

* CIRRENT™ Developer Account with access to the [CIRRENT™ Console](https://cirrent.infineon.com)

* Wi-Fi network with Internet access

The follow instructions support two kits – `the PSoC 6 Wi-Fi BT Prototyping Kit <https://www.cypress.com/CY8CPROTO-062-4343W) (CY8CPROTO-062-4343W>`_ and the `PSoC 62S2 Wi-Fi BT Pioneer Kit <https://www.cypress.com/CY8CKIT-062S2-43012>`_.

Required hardware and software configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This example uses the board's default configuration. See the kit user guide to ensure that the board is configured correctly.
Note that you need to install a terminal emulator if you don't have one. You can follow the instructions in this document.

Using the code examples
^^^^^^^^^^^^^^^^^^^^^^^^

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
For more details, see the Eclipse IDE for ModusToolbox User Guide: *{ModusToolbox install directory}/ide_{version}/docs/mt_ide_user_guide.pdf*.

In Command-line Interface (CLI):
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1.	Download and unzip this repository onto your local machine, or clone the repository.
2.	Open a CLI terminal and navigate to the application folder.

On Linux and macOS, you can use any terminal application. On Windows, navigate to the modus-shell directory (*{ModusToolbox install directory}/tools_\<version>/modus-shell*) and run *Cygwin.bat*.

3.	Import the required libraries by executing the `make getlibs` command.

In Third-party IDEs:
^^^^^^^^^^^^^^^^^^^^^

1. Follow the instructions from the CLI section to download or clone the repository, and import the libraries using the `make getlibs` command.
2. Export the application to a supported IDE using the `make <ide>` command.
3. Follow the instructions displayed in the terminal to create or import the application as an IDE project.
For more details, see the "Exporting to IDEs" section of the ModusToolbox User Guide: *{ModusToolbox install directory}/ide_{version}/docs/mtb_user_guide.pdf*.

*****************************************
Using the CIRRENT™ Agent in ModusToolbox
*****************************************

1. Using your CIRRENT™ Developer Account, log into the [CIRRENT™ Console](https://cirrent.infineon.com) and navigate to "Device Management->Cloud ID". Click on the 'Device Registration' tab and create a new Provision API Key. Name it something convenient like "Sample 43012 Application key". Make a note of the key and its secret.
2. Connect the board to your PC using the provided USB cable through the KitProg3 USB connector.
3. Using the key and secret from Step 1, replace the `PROVISIONING_KEY` and `PROVISIONING_SECRET` values stored in the `CA_INIT_CONFIG_T.credential.provision` in the *main.c* file.
4. Modify the `WIFI_SSID`, `WIFI_PASSWORD`, and `WIFI_SECURITY` macros to match with that of the Wi-Fi network credentials that you want to connect and monitor. These macros are defined in the *configs/wifi_config.h* file. Make sure the Wi-Fi network has Internet connectivity.
5. Program the board.

Using Eclipse IDE for ModusToolbox

1. Select the application project in the Project Explorer.

2. In the **Quick Panel**, scroll down, and click **\<Application Name> Program (KitProg3)**.


- **Using CLI**:

 From the terminal, execute the `make program` command to build and program the application using the default toolchain to the default target. You can specify a target and toolchain manually:


::

   	make program TARGET=<BSP> TOOLCHAIN=<toolchain>   

Example:


::

   make program TARGET=CY8CPROTO-062-4343W TOOLCHAIN=GCC_ARM


**Note**:  Before building the application, ensure that the *deps* folder contains the BSP file (*TARGET_xxx.lib*) corresponding to the TARGET. Execute the `make getlibs` command to fetch the BSP contents before building the application.

After programming, the application starts automatically. Confirm that the CIRRENT™ Agent is running by examining the terminal output. You should see the CIRRENT™ Agent start to print logs like:


:: 

	|INFO|2000.01.01 00:00:00.000000|0000||CA-START||ca_version=2.0.6;

6. Navigate to the Device Inspector in the [CIRRENT™ Console](https://cirrent.infineon.com) and search for your `DEVICE_ID` (by default this is the MAC address of your device's Wi-Fi interface delimited by dashes, e.g. 00-11-22-aa-bb-cc). The CIRRENT™ Agent will upload the Wi-Fi network SSID within a minute of starting. It will be displayed in the Device Inspector as soon as it is uploaded. Other data like metrics, and connectivity values will take up to 24 hours to be gathered and uploaded.


CIRRENT™ Agent API
====================

CIRRENT™ INI gives you the ability to develop custom uses cases that rely on the CIRRENT™ Agent. You do so by using the CIRRENT™ Agent API. 

There are three key areas in which CIRRENT™ Agent API can help you build a custom monitoring and control use case.

Custom data submission
^^^^^^^^^^^^^^^^^^^^^^^

You can use the CIRRENT™ Agent to collect custom data from your device, and transmit it to the CIRRENT™ Cloud - in addition to the data that is automatically collected by the CIRRENT™ Agent. You can then use the CIRRENT™ Console to analyze the custom attributes you submitted.

You therefore have the ability to monitor custom events, measurements and attributes that is unique to your IoT deployment. Custom measurements are submitted by making use of the CIRRENT™ Agent API. Any application on your device can connect to the CIRRENT™ Agent on your device, submitting custom parameters via the CIRRENT™ Agent API. 

Running jobs on your device
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the CIRRENT™ Agent API to run specific jobs on a single device, or across a fleet of devices, including the ability to collect entire device logs in a single go.

Pushing status notifications to your apps
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The CIRRENT™ Agent also has the ability to send notifications directly to other apps on your device. For example, notifying another application that the device has lost Wi-Fi connectivity.
 
************************************
Using the API to submit custom data
************************************

You can submit a range of custom data through the CIRRENT™ Agent API. This includes custom events such as user-initiated reboot, custom measurements such as CPI temperatures as well as any other attributed eg: firmware version.

Depending on your choice of argument type you can submit either a string of up to 100 bytes, a floating-point value or a start stop event. The CIRRENT™ Agent API accepts four types of arguments:

* Event which indicates a start or stop value

* Measurement is a numerical value, sent as a floating point value, used to collected values such as CPU temperature or available storage

* Attribute is a string of up to 100 characters which contains any text you would like to record in CIRRENT™ Cloud that matches attribute data type 

* State is a string of up to 100 characters which contains any text you would like to record in CIRRENT™ Cloud that matches status data type
	
	Accepted values for each argument:

	+-------------+-----------------+
	| type        | Accepted value  |
	+=============+=================+
	| event       | start, stop, ““ |
	+-------------+-----------------+
	| measurement | floating point  |
	+-------------+-----------------+
	| attribute   | string          |
	+-------------+-----------------+
	| state       | string          |
	+-------------+-----------------+
	
	
**Note:** For the event data type, using the start value initiates a counter, while the end value stops that counter. For every minute that passes between the start value and the stop value the counter will increase by 1. Sending an empty string “” instead will simply increase the counter by 1.

**Note:** Any dummy custom attribute and dummy custom event you send using cirrent_cli during testing will always be visible on CIRRENT™ Console. So, make sure that the names of the custom attribute or event you used during testing are meaningful and will be used in the future.

**Note:** Please review the INI data model to ensure that the custom measurement you are considering is not already captured by default CIRRENT™ Agent behavior.

Using the measurement data type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The measurement data type is a special custom data type in the CIRRENT™ Cloud. When you submit custom data using the measurement data type the CIRRENT™ Cloud automatically generates a range of calculations to support your analysis, including:

* Average measurement value, calculated by dividing the sum of the measurements by the number of measurements submitted

* The total sample count, a simple count of the number of measurements submitted

* A sampling interval, e.g. 30 or 60, a calculation of the frequency of sample submission

* A maximum value and a minimum value specifying the highest measurement submitted and the lowest measurement submitted 

* A standard deviation

However, If you pass a string as a custom measurement, the average, max, and min for that measurement will be reported as 0.

Note that only continuous measurements are supported. At least one measurement should be sent every minute, each custom measurement command should be executed at most 1 minutes apart and the measurement value should be an integer or a floating point.


**********************************************
Sending INI custom data using the cirrent_cli:
**********************************************

Using the CIRRENT™ Agent API to submit custom data to the CIRRENT™ Cloud is simple. Just execute the following shell command to submit custom data:


::

	$ cirrent_cli ini_custom <type> <name> <value>

Arguments
^^^^^^^^^^

There are three arguments in every cirrent_cli ini_custom call. 

1.	**type**

	* This case-sensitive string must be one of event, measurement, attribute, or state, see below for accepted values

2.	**name**

	* This case-sensitive string indicates your choice of name of the custom data field and will be displayed in CIRRENT™ Console, it must be no longer than 100 bytes

3.	**value**

	* The requirement for value depends on the data type you chose in the first argument, see the above table for accepted values for each corresponding data type

Return Values
^^^^^^^^^^^^^^

These are all the possible values that CIRRENT™ Agent may return in response to your API call to cirrent_cli ini_custom:

+--------------+---------------+-----------------------------------------------------------------+
| stdout       | stderr        | Reason(s)                                                       |
+==============+===============+=================================================================+
| FAILURE      | non-zero      | * More custom event types than preconfigured maximum sent       |
|              |               |   Out of storage                                                |
|              |               | * CIRRENT™ Agent not running                                    |
|              |               | * Invalid arguments                                             |
+--------------+---------------+-----------------------------------------------------------------+
| OK           | 0             | CIRRENT™ Agent successfully received and stored ini_custom data |
+--------------+---------------+-----------------------------------------------------------------+


*********************************************
Example shell command for CIRRENT™ Agent API:
*********************************************

To access the CIRRENT™ Agent API, run the following command:


::

	$ export LD_LIBRARY_PATH=/PATH_TO/CIRRENT™/lib

Adding a single custom attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is an example of submitting a custom attribute to the CIRRENT™ Cloud via the CIRRENT™ Agent API. In this example, we submit the firmware version of the device using the attribute custom value type:


::

	$ ./cirrent_cli ini_custom attribute fw_version 1.2 

In the next example, we use the state custom value type to submit a value confirming that the device has established a connection:


::

	$ ./cirrent_cli ini_custom state connection_established 1 

Adding a series of measurements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is a series of three submissions using the measurement custom value type:


::

	 $ ./cirrent_cli ini_custom measurement cpu_temp 30 $ ./Cirrent_cli ini_custom measurement cpu_temp 20 $ ./Cirrent_cli ini_custom measurement cpu_temp 10 $ ./Cirrent_cli ini_custom measurement cpu_temp 40

The above series of submissions adds a custom measurement cpu_temp to the measurement summary. The CIRRENT™ Cloud automatically generates the following information for the cpu_temp value: 

* “average”: 25, 
* “sample_count”: 4,
* ”sampling_interval”: 60,”
* “max”: 40
* ”min”: 10 
* and standard_deviation

Adding to the event counter
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is an example of an instantaneous event, this example submits an event count of log_upload=1 to the event summary by using the empty string “” parameter:


::

	$ ./cirrent_cli ini_custom event log_upload 

Finally, the following example adds an event count of log_upload_duration equal to the duration in minutes between when the start and stop commands were executed to the event summary.


::

	$ ./cirrent_cli ini_custom event log_upload_duration start
 	$ ./cirrent_cli ini_custom event log_upload_duration stop

Using the API to run jobs
^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the CIRRENT™ Agent API to execute jobs on a single device – or across a fleet of devices. 

The CIRRENT™ Agent checks for jobs once a day. If there is a pending job the CIRRENT™ Agent will check what the job is and execute a special script on the device.

Some of the tasks you can request the CIRRENT™ Agent to perform include:

* Device logs. You can request that the CIRRENT™ Agent collects extensive logs from your device, above and beyond the data collected by default through the CIRRENT™ Agent. 

CIRRENT™ Agent saves the logs to the CIRRENT™ Cloud. You can use the logs to troubleshoot complex device issues by reviewing OS logs in depth – to diagnose problems such as driver failure. 

* CIRRENT™ Network profile. Likewise, you can request that the CIRRENT™ Agent collects and saves the full CIRRENT™ network profile to the CIRRENT™ cloud.

With the CIRRENT™ network profile you can diagnose complex network issues by viewing low-level network data including routing table, nameserver configuration and firewall settings. This profile could help you diagnose a range of glitches – for example, where a port was accidentally blocked on the network.

* Rolling INI data. CIRRENT™ INI collects values every minute and submit the values to the CIRRENT™ Cloud. However, a rolling log of values is not stored on CIRRENT™ Cloud. Nonetheless, the CIRRENT™ Agent does store a 24 hour rolling log on the device.

You can use the CIRRENT™ Agent API to collect these raw values which can deliver unique insights. For example, when you know that a specific event occurred, you can use the raw rolling log to tell exactly when that event happened.

It is also possible to use the CIRRENT™ Agent to remotely run custom jobs of your own design. Contact support@cirrent.com for more information.
Running a job on your device is simple. Just navigate to the Device Inspector on the CIRRENT™ Console, and Explore your device. The list of pending jobs and the option to trigger new jobs is listed under the Jobs tab.

Using the API for on-device notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For a verity of reasons applications on your device may benefit from knowing what the WiFi status of the device is. You can use the CIRRENT™ Agent API to communicate the Wi-Fi status of your device to applications that reside on your device.

For example, you can use the CIRRENT™ Agent to alert an application on your device that the device has completed Wi-Fi onboarding.
Similarly, should your device lose Wi-Fi connectivity you can trigger an action in an application on your device – by pausing a streaming server, for example. Contact support@cirrent.com for more information.


API commands
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We’ve outlined some of the use cases for the CIRRENT™ Agent API above. To give you more insight into the custom use cases of the CIRRENT™ Agent, we also provide a list of the commands that you can run on the CIRRENT™ Agent. 

API calls to libcirrent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+----------------------------+---------------------------------------------------------------------------------------------------+
| api_init                   | Initializes the API. Must be called before any other API calls are made.                          |
+----------------------------+---------------------------------------------------------------------------------------------------+
| api_cleanup                | Cleanup after done with ca api, i.e. client app shuts down                                        |
+----------------------------+---------------------------------------------------------------------------------------------------+
| api_get_network_info       | Retrieves the current network info and the network capabilities. Your device code should use this |
|                            | information to determine which services can be started on the device. For example, with a 20kbps  |
|                            | bandwidth limitation you will not want to start video streaming.                                  |
+----------------------------+---------------------------------------------------------------------------------------------------+
| wifi_scan                  | Retrieves the most recent wi-fi scan list from the CA.  ca_api_free_wifi_scan should be called to |
|                            | free the network list that is returned.                                                           |
+----------------------------+---------------------------------------------------------------------------------------------------+
| free_wifi_scan             | Frees network scan list returned by @ref ca_api_get_wifi_scan                                     |
+----------------------------+---------------------------------------------------------------------------------------------------+
| device_info                | Retrieves identifying information about the device (its device id, DUB key and SCD keys).         |
+----------------------------+---------------------------------------------------------------------------------------------------+
| private_networks           | Retrieves a list of user-configured networks for this device.                                     |
+----------------------------+---------------------------------------------------------------------------------------------------+
| free_private_networks      | Frees list of networks returned by @ref ca_api_get_private_networks                               |
+----------------------------+---------------------------------------------------------------------------------------------------+
| add_private_network        | Adds a Private Network for this device                                                            |
+----------------------------+---------------------------------------------------------------------------------------------------+
| delete_private_network     | Deletes a Private Network                                                                         |
+----------------------------+---------------------------------------------------------------------------------------------------+
| api_ini_custom             | Uploads to the CIRRENT™ Cloud custom IoT Network Intelligence data                                |
+----------------------------+---------------------------------------------------------------------------------------------------+
| api_reset_device();        | Resets the Device - resets CIRRENT™ cloud status for this device                                  |
+----------------------------+---------------------------------------------------------------------------------------------------+
| api_cloud_sync(void);      | Triggers frequent communication with the CIRRENT™ cloud for short period of time.                 |
+----------------------------+---------------------------------------------------------------------------------------------------+
| make_discoverable();       | Makes CA discoverable Triggers the CA to bring up the SoftAP so that the user has the option to   |
|                            | locally  configure the private network credentials.                                               |
+----------------------------+---------------------------------------------------------------------------------------------------+
| register_status_handler    | Register for status change callbacks                                                              |
+----------------------------+---------------------------------------------------------------------------------------------------+
| enable_notifications       | Enables notifications from cirrent_agent                                                          |
+----------------------------+---------------------------------------------------------------------------------------------------+
| disable_notifications      | Disables notifications from cirrent_agent.                                                        |
+----------------------------+---------------------------------------------------------------------------------------------------+
| register_status_script     | Registers a script which will be called whenever a network status changes                         |
+----------------------------+---------------------------------------------------------------------------------------------------+
| ca_version                 | Retrieves the version of CA                                                                       |
+----------------------------+---------------------------------------------------------------------------------------------------+


Commands available on cirrent_cli
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+----------------------------+---------------------------------------------------------------------------------------------------+
| version                    | This command retrieves the cirrent_agent version                                                  |
+----------------------------+---------------------------------------------------------------------------------------------------+
| action_ready               | Report the state changes for the action, saving the report to the specified file                  |
+----------------------------+---------------------------------------------------------------------------------------------------+
| cloud_sync                 | Trigger a burst of communication with the CIRRENT™ Cloud to test communication                    |
+----------------------------+---------------------------------------------------------------------------------------------------+
| status                     | Retrieves the network status                                                                      |
+----------------------------+---------------------------------------------------------------------------------------------------+
| add_net                    | Adds the network to networks list                                                                 |
+----------------------------+---------------------------------------------------------------------------------------------------+
| add_net_hex                | Add network with specified SSID hexdump to networks list                                          |
+----------------------------+---------------------------------------------------------------------------------------------------+
| net_list                   | Get a list of networks                                                                            |
+----------------------------+---------------------------------------------------------------------------------------------------+
| del_net_ssid               | Delete the network with the specified SSID from the networks list                                 |
+----------------------------+---------------------------------------------------------------------------------------------------+
| del_net_hex_ssid           | Delete the network with the specified ssid hexdump from networks list                             |
+----------------------------+---------------------------------------------------------------------------------------------------+
| scan                       | Get the most recent Wi-Fi scan list                                                               |
+----------------------------+---------------------------------------------------------------------------------------------------+
| device_info                | Get device identity information                                                                   |
+----------------------------+---------------------------------------------------------------------------------------------------+
| make_discoverable          | Make the CIRRENT™ Agent discoverable                                                              |
+----------------------------+---------------------------------------------------------------------------------------------------+
| register_status_script     | register a script that will get called when there is a change in network status                   |
+----------------------------+---------------------------------------------------------------------------------------------------+
| ini_custom                 | upload custom IoT Network Intelligence data                                                       |
+----------------------------+---------------------------------------------------------------------------------------------------+
| quit                       | exit cirrent_cli                                                                                  |  
+----------------------------+---------------------------------------------------------------------------------------------------+

For full details on these commands including parameters and responses please contact us on support@cirrent.com. 






