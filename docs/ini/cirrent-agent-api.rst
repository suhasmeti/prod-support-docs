CIRRENT™ Agent API
====================

CIRRENT™ INI gives you the ability to develop custom uses cases that rely on the CIRRENT™ Agent. You do so by using the CIRRENT™ Agent API. There are three key areas in which CIRRENT™ Agent API can help you build a custom monitoring and control use case.

.. topic:: Custom data submission

	You can use the CIRRENT™ Agent to collect custom data from your device, and transmit it to the CIRRENT™ Cloud - in addition to the data that is automatically collected by the CIRRENT™ Agent. You can then use the CIRRENT™ Console to analyze the custom attributes you submitted.

	That gives you the ability to monitor custom events, measurements and attributes that is unique to your IoT deployment. Custom measurements are submitted by making use of the CIRRENT™ Agent API. Any application on your device can connect to the CIRRENT™ Agent on your device, submitting custom parameters via the CIRRENT™ Agent API. 

.. topic:: Running jobs on your device

	You can use the CIRRENT™ Agent API to run specific jobs on a single device, or across a fleet of devices, including the ability to collect entire device logs with a single action.

.. topic:: Pushing status notifications to your apps

	The CIRRENT™ Agent also has the ability to send notifications directly to other apps on your device. For example, notifying another application that the device has lost Wi-Fi connectivity.
 
************************************
Using the API to submit custom data
************************************

You can submit a range of custom data through the CIRRENT™ Agent API. This includes custom events such as user-initiated reboot, custom measurements such as CPI temperatures, as well as any other attributed eg: firmware version. Depending on your choice of argument type you can submit either a string of up to 100 bytes, a floating-point value or a start stop event. The CIRRENT™ Agent API accepts four types of arguments:

* | Event which indicates a start or stop value

* | Measurement is a numerical value, sent as a floating point value, used to collected values such as CPU temperature or available storage

* | Attribute is a string of up to 100 characters which contains any text you would like to record in CIRRENT™ Cloud that matches attribute data type 

* | State is a string of up to 100 characters which contains any text you would like to record in CIRRENT™ Cloud that matches status data type
  | 	
  |	Accepted values for each argument:

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
	
	
.. note:: For the event data type, using the **start** value initiates a counter, while the **end** value stops that counter. For every minute that passes between the start value and the stop value the counter will increase by 1. Sending an empty string “” instead will simply increase the counter by 1.

.. note:: Any dummy custom attribute and dummy custom event you send using cirrent_cli during testing will always be visible on CIRRENT™ Console. So, make sure that the names of the custom attribute or event you used during testing are meaningful and will be used in the future.

.. note:: Please review the INI data model to ensure that the custom measurement you are considering is not already captured by default CIRRENT™ Agent behavior.

Using the measurement data type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The measurement data type is a special custom data type in the CIRRENT™ Cloud. When you submit custom data using the measurement data type the CIRRENT™ Cloud automatically generates a range of calculations to support your analysis, including:

* Average measurement value, calculated by dividing the sum of the measurements by the number of measurements submitted

* The total sample count, a simple count of the number of measurements submitted

* A sampling interval, e.g. 30 or 60, a calculation of the frequency of sample submission

* A maximum value and a minimum value specifying the highest measurement submitted and the lowest measurement submitted 

* A standard deviation

However, If you pass a string as a custom measurement, the average, max, and min for that measurement will be reported as 0.

.. note:: Only continuous measurements are supported. At least one measurement should be sent every minute, each custom measurement command should be executed at most 1 minutes apart and the measurement value should be an integer or a floating point.


Sending INI custom data using the cirrent_cli:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Using the CIRRENT™ Agent API to submit custom data to the CIRRENT™ Cloud is simple. Just execute the following shell command to submit custom data:


::

	$ cirrent_cli ini_custom <type> <name> <value>

Arguments
^^^^^^^^^^

There are three arguments in every cirrent_cli ini_custom call: 

1.	**type**

	* This case-sensitive string must be one of event, measurement, attribute, or state, see below for accepted values.

2.	**name**

	* This case-sensitive string indicates your choice of name of the custom data field and will be displayed in CIRRENT™ Console, it must be no longer than 100 bytes.

3.	**value**

	* The requirement for value depends on the data type you chose in the first argument, see the above table for accepted values for each corresponding data type.

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


Example shell command for CIRRENT™ Agent API:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

Finally, the following example adds an event count of log_upload_duration equal to the duration in minutes between when the start and stop commands were executed to the event summary:


::

	$ ./cirrent_cli ini_custom event log_upload_duration start
 	$ ./cirrent_cli ini_custom event log_upload_duration stop

**************************
Using the API to run jobs
**************************

You can use the CIRRENT™ Agent API to execute jobs on a single device – or across a fleet of devices. The CIRRENT™ Agent checks for jobs once a day. If there is a pending job the CIRRENT™ Agent will check what the job is and execute a special script on the device.

Some of the tasks you can request the CIRRENT™ Agent to perform include:

* **Device logs.** You can request that the CIRRENT™ Agent collects extensive logs from your device, above and beyond the data collected by default through the CIRRENT™ Agent. 

  CIRRENT™ Agent saves the logs to the CIRRENT™ Cloud. You can use the logs to troubleshoot complex device issues by reviewing OS logs in depth – to diagnose problems such as driver failure. 


* **CIRRENT™ Network profile.** Likewise, you can request that the CIRRENT™ Agent collects and saves the full CIRRENT™ network profile to the CIRRENT™ cloud.

  With the CIRRENT™ network profile you can diagnose complex network issues by viewing low-level network data including routing table, nameserver configuration and firewall settings. This profile could help you diagnose a range of glitches – for example, where a port was accidentally blocked on the network.


* **Rolling INI data.** CIRRENT™ INI collects values every minute and submit the values to the CIRRENT™ Cloud. However, a rolling log of values is not stored on CIRRENT™ Cloud. Nonetheless, the CIRRENT™ Agent does store a 24 hour rolling log on the device.

  You can use the CIRRENT™ Agent API to collect these raw values which can deliver unique insights. For example, when you know that a specific event occurred, you can use the raw rolling log to tell exactly when that event happened.
  

It is also possible to use the CIRRENT™ Agent to remotely run custom jobs of your own design. Contact support@cirrent.com for more information.
Running a job on your device is simple. Just navigate to the Device Inspector on the CIRRENT™ Console, and Explore your device. The list of pending jobs and the option to trigger new jobs is listed under the Jobs tab.

Using the API for on-device notifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For a verity of reasons applications on your device may benefit from knowing what the WiFi status of the device is. You can use the CIRRENT™ Agent API to communicate the Wi-Fi status of your device to applications that reside on your device.

For example, you can use the CIRRENT™ Agent to alert an application on your device that the device has completed Wi-Fi onboarding.
Similarly, should your device lose Wi-Fi connectivity you can trigger an action in an application on your device – by pausing a streaming server, for example.

*************
API commands
*************

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






