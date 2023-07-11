# INI Data Model

CIRRENT™ IoT Network Intelligence (INI) collects a range of standard measurements and attributes by default. When the CIRRENT™ Agent is active on your device it automatically collects these measurements and submits it to the CIRRENT™ Cloud. The measurements below are all visible in the CIRRENT™ Console. Review the CIRRENT™ Console page here to see how you can view your fleet’s data. Measurements collected by the CIRRENT™ Agent can be classified into four categories: 

* **Events** that flag any specific network or hardware related issues experience by your device, also used to monitor the frequency with which these issues occur across your fleet.

* **Measurements** are a time range of samples that can help you determine how devices perform, or what the system conditions were during a specific event.

* **Attributes** are properties that change relative rarely and is generally not unique to the specific device, and which is likely to remain the same if the device is restarted - such as firmware version or the user's ISP.

* **State** refers to device properties that are specific to that device’s environment, that is not necessarily shared with another device, and which may change if the device is switched off or restarted – for example, the Wi-Fi channel the device is associated with.


> **_NOTE_** You can customize the CIRRENT™ INI data model to include custom measurements by submitting these measurements via the CIRRENT™ Agent API. Read more about the CIRRENT™ API here.

> **_NOTE_** The CIRRENT™ Agent automatically collects additional data for some Infineon chips, including the Infineon AIROC™ Wi-Fi chip. We outline these for each category in the data model.

## Events

An event is an issue or error experienced by a device. Below is a list of events that the CIRRENT™ Agent collects and sends to the CIRRENT™ Cloud. When you’re in your instance of the CIRRENT™ Console, you may see some or all of these metrics affecting the devices in your fleet. You can also add custom events to monitor your application.

> **_NOTE_** Note that some events are instantaneous – where there is no duration to the event. Other events are continuous, with a specific start and end. 

The following events indicate that your device is disconnected from the internet, and will help you to understand what caused the disconnection.

* **Wi-Fi Not Associated:** A continuous event indicating that the device is not connected to the Wi-Fi network.

* **Wi-Fi Disassociated:** Received disconnected or disassociated event from Wi-Fi library: an instantaneous event indicating that the device just lost connectivity.

* **Wi-Fi Failed Association:** Wi-Fi association process started, but failed.

* **Gateway Error:** Device is having trouble communicating with the router.

* **Gateway Internet Error:** Gateway Internet Error: The user’s router is not connected to the internet.

* **TLS Errors:** HTTPS request to a configurable validation target fails with a TLS error, either due to certificate expired, or certificate valid in the future, or certificate hostname mismatch.

* **DHCP Errors:** DHCP errors due to any of the following: no gateway present, no IP address present, no netmask present; indicates a DNS configuration error.

* **DNS Error/DNS Timeout:** DNS lookup to a configurable URL failed, but the device is connected to the internet.

* **Destination Service Unreachable:** Device is connected to internet, but unable to reach a configurable destination server.

These metrics indicate atypical or unusual Wi-fi radiofrequency conditions that may impair connectivity:

* **High PER:** High % of packets sent over Wi-fi are either failing or experiencing retries – this is a configurable value, with a default threshold of 5%.

* **BSSID Switch:** BSSID of Wi-Fi router changed since last sample, it indicates that the device may have an unstable Wi-Fi connection because of your mesh router or extender.

* **Low Signal Strength:** Device is too far from the router or there is something blocking the Wi-Fi signal to the device (configurable minimum value).

* **Wi-Fi Interference:** Device is experiencing Wi-Fi interference while uploading data.

* **Low Storage:** The available storage capacity on the device is below a threshold.

The following metric-based events enable you to understand system level performance of your fleet of connected products in the field:

* **High CPU Usage:** CPU usage is above a configurable threshold.

* **High Memory Usage:** Memory usage is above a configurable threshold.

* **Restarted:** The system was restarted.

* **Restart Triggered:** CIRRENT™ Agent detected that something in the system triggered a restart.

* **Shutdown Triggered:** CIRRENT™ Agent detected that something in the system triggered a shutdown.


Note that for users of Infineon AIROC™ Wi-Fi, the CIRRENT™ Agent will also collect the following events: 

* High Beacon Loss
* High Glitch Count
* High SNR
* High Noise Level

## Measurements

A measurement represents numerical data that varies with time, and which may help determine system conditions when an event occurs. Measurements are reported in CIRRENT™ Console for each individual device. The CIRRENT™ Agent collects the following measurements for network monitoring:

* **Network Performance Score:** This metric shows the overall connectivity score. The score is a calculation based on the reported DHCP, DNS, gateway, TLS and Wi-Fi events.

Analyzing this score is sensitive to the requirements of the device – for example, distinguishing between the minimal connectivity required by a microwave and the higher throughput required by a streaming device. 

* **Download Speed and Upload Speed (in Kbps):** measure the upstream and downstream throughput of the device.

* **Packet Error Rate %:** calculated (if total number of tx packets larger than 100) as ratio between number of retried and failed tx packets.

* **Signal Strength:** The signal strength of the link to the Wi-Fi access point.

* **ICMP Packet Loss measurements:** Packet loss measured as a percentage of packets lost with respect to packets sent (default gateways are google.com and yahoo.com).

Note that for users of Infineon AIROC™ Wi-Fi, the CIRRENT™ Agent will also collect the following measurements: 

* **RX/TX Counters:** including bad fcs, bad plcp, beacons – mbss, beacons – ombss, crs glitches

* **CCA Statistics:** ibss, obss, interference

**Measurement date type**

The measurement data type is a special data type in the CIRRENT™ Cloud. Based on measurement data, the CIRRENT™ Cloud automatically generates a range of calculations to support your analysis, including:

* **Average Measurement Value**, calculated by dividing the sum of the measurements by the number of measurements submitted

* **The Total Sample Count**, a simple count of the number of measurements submitted

* **A Sampling Interval**, e.g. 30 or 60, a calculation of the frequency of sample submission

* **A Maximum Value and a Minimum Value** specifying the highest measurement submitted and the lowest measurement submitted 

* **A Standard Deviation** that specifies the standard deviation of the measurements taken


> **_NOTE_** The CIRRENT™ Agent API allows you to add your own custom measurements to report numerical data relevant to your application or system. For example, you could report memory usage or CPU temperature data. Read more about using the CIRRENT™ Agent API here.

## Attributes

An attribute is a characteristic or parameter of a group of devices. Attributes may change over time but a change will typically only occur over a longer time horizon, whereas measurements may change continually. In addition to the attributes listed below, you can add custom attributes relevant to your products and customers such as firmware version, radio driver, and more – read more about custom attributes here.

* **ISP:** Internet service provider that the device is connected to.

* **Router:** Router that the device is connected to.

* **City:** City where the device is located.

* **Country:** Country where the device is located.

* **Region:** Region where the device is located.

* **OS:** Operating System.

* **Device Type:** Device type of the device e.g. microwave, fridge, oven.

* **Device Type ID:** Device type identification of the device.

* **ca_version:** The version of CIRRENT™ Agent running on the device.

* **CPU:** CPU model of the device.

* **Wi-Fi Driver version:** The Wi-Fi driver version of the device.

* **Wi-Fi Radio version:** The Wi-Fi radio version of the device.

## States

Similar to attributes, state values are also likely to remain consistent for longer than a measurement but are more likely to change than attributes – for example, if the device is restarted. By default, the CIRRENT™ Agent collects the following state values:

* **Ssid:** The SSID of the network the device is associated with.

* **Bssid.** The BSSID of the network device is associated with.

* **Frequency:** Wi-Fi frequency the device is operating on.

* **Channel:** The Wi-Fi channel the device is operating on.

* **Wi-Fi Scan:** Monitors whether the device is currently performing a Wi-Fi Scan.


If you’re using an AIROC™ device the CIRRENT™ Agent will also collect the following states:
 
* Signal to Noise Ratio 

* Beacon Interval 

* Beacon Timeout

* Bluetooth co-existence settings  

* Roam settings including scan period, signal trigger, signal delta 
