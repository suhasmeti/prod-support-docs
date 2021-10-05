Raspberry Pi Quick Start
==========================

**⏱️ This guide should take approximately 30 minutes to complete ⏱️**

This guide covers how to install, configure, run, and use the CIRRENT™ Agent (CA) on your Raspberry Pi to run the IoT Network Intelligence feature. By the end of this guide you will have the latest CIRRENT™ Agent running on your Raspberry Pi and reporting data to the CIRRENT™ Cloud. Data will be displayed in your CIRRENT™ Console account.

Requirements
-------------

* Raspberry Pi 3B with a supported power supply

	* `https://www.raspberrypi.org/products/raspberry-pi-3-model-b/ <https://www.raspberrypi.org/products/raspberry-pi-3-model-b/>`_
	* `https://www.raspberrypi.org/documentation/hardware/raspberrypi/power/README.md <https://www.raspberrypi.org/documentation/hardware/raspberrypi/power/README.md>`_
	* Other Raspberry Pis may work, but we test the CA with the Raspberry Pi 3B.

* 2.4 GHz Wi-Fi Network

	* Raspberry Pi 3B radio only supports 2.4 GHz networks

* Raspbian OS 2020-02-14 Clean Install

	* `https://downloads.raspberrypi.org/raspbian/images/ <https://downloads.raspberrypi.org/raspbian/images/>`_

* Raspberry Pi Terminal access

	* `https://www.raspberrypi.org/documentation/usage/terminal/ <https://www.raspberrypi.org/documentation/usage/terminal/>`_

* CIRRENT™ Console account

	* Please register for a console account using the invite email sent by CIRRENT™. You can also request an account by contacting support@cirrent.com

* The latest CIRRENT™ Agent .deb package

Setup
-------
1. Make sure your Raspberry Pi is running a clean OS installation and is powered on with your official Raspberry Pi power supply

2. Make sure your Raspberry Pi is connected to the 2.4 GHz Wi-Fi network and can reach the Internet
	
	* `https://www.raspberrypi.org/documentation/configuration/wireless/ <https://www.raspberrypi.org/documentation/configuration/wireless/>`_

3. Make sure you have a provisioning key and secret ready for the CIRRENT™ Agent. Each CIRRENT™ Agent must be authorized to communicate with the CIRRENT™ Cloud. Log into your CIRRENT™ Console account to generate the provisioning key and secret if you don't have one already.

Installation
--------------

1. Update your Raspberry Pi:

.. code:: raspberry

   sudo apt-get update


2. Install the CIRRENT™ Agent `.deb` package


.. code:: raspberry

   sudo dpkg -i cirrent-agent_2.0.4-ini+deb10u3_armhf.deb



⚠️ some errors may be reported by `dpkg`. You can safely ignore these errors. See output:

.. code:: raspberry

	dpkg: dependency problems prevent configuration of cirrent-agent:
	cirrent-agent depends on monit; however:
	Package monit is not installed.
	dpkg: error processing package cirrent-agent (--install):
	dependency problems - leaving unconfigured
	Processing triggers for systemd (241-7~deb10u2+rpi1) ...
	Errors were encountered while processing:
	cirrent-agent


3. Finish installation. This will also resolve errors from the previous step:

.. code:: raspberry

	sudo apt-get -f install


4. Configure your device by entering your provisioning key and secret:

.. code:: raspberry

	sudo nano /etc/default/cirrent


Add the following lines and replace the placeholders `PROVISIONING_KEY` and `PROVISIONING_SECRET` with your provisioning key and secret

.. code:: raspberry

	PROVISION_CRED="-K PROVISIONING_KEY -S PROVISIONING_SECRET \
	 -U $(ip link show dev eth0 | grep ether | awk '{print $2}' | sed 's|:|-|g')"


5. Reboot your Raspberry Pi

.. code:: raspberry

	sudo reboot


**✔️ All done!** You can now leave your Raspberry Pi running and the CIRRENT™ Agent will automatically collect data.

Next Steps
------------

The CIRRENT™ Agent will start reporting some data like the SSID, BSSID, router that the Raspberry Pi is connected to after the first few minutes, while some data like metrics and connectivity values take up to a day for the CIRRENT™ Agent to collect and report.

To view data for all devices in an account, please visit:

`https://console.cirrent.com <https://console.cirrent.com>`_

To start viewing your Raspberry Pi’s data simply go the Device Inspector page and search for your device:

`https://console.cirrent.com/device-inspector/network-connectivity <https://console.cirrent.com/device-inspector/network-connectivity>`_