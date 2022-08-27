CIRRENT™ IoT Network Intelligence (INI)
========================================

CIRRENT™ IoT Network Intelligence (INI) delivers IoT device analytics for IoT devices at home (including appliances, home security and home entertainment, and smart home devices) and for IoT devices in industry. With INI you can drive product development to improve the user experience – which leads to better product reviews, fewer returns, and increased sales. 


.. topic:: What can INI do?


	The data that INI collects works in combination with powerful analytics tools to give you deep insight into how your devices behave in the field, and how users make use of your devices every day. Using INI you can: 

	* **Get deep insight into customer environments** to identify and prioritize your customer’s pain points and solve issues faster. With INI you get unique data covering environmental factors including ISP, router make and model, and much more.

	* **Optimize product performance using actionable data,** including real-world performance analytics pre and post product launch. That includes product lifecycle data such as wireless performance, ensuring your pre-production testing algins with performance in the real world.

	* **Identify and prioritize product issues** thanks to full visibility into all your products in the field. You can compare performance of products in your fleet at scale or deep dive into a single device – empowering you to improve product performance in the field and enabling timely identification of device failures and network issues in the field.

	* **Leverage pre-built dashboards and reports to solve problems,** thanks to 10+ pre-built dashboards and 25+ out of the box events. Analyze data to understand root causes and spend less time trying to get to root cause of the product issue or customer environment.


.. topic:: How INI works

	CIRRENT™ INI works on its own, or in combination with CIRRENT™ MAI, to deliver insight into how your IoT devices perform and how devices are used in practice. INI uses the CIRRENT™ Agent, a lean application that’s embedded in your IoT product to securely report data into the CIRRENT™ Cloud, providing real-time access for your product management and engineering teams via the CIRRENT™ Console. 

	.. image:: img/ini-img.png
	    :align: center
	    :alt: Dashboard 2


	.. topic:: Components of INI

	CIRRENT™ IoT Network Intelligence consists out of several interacting components working together to provide device analytics:

	* **Your device** or fleet of devices in the field, including any Linux-based device including devices based on Raspberry Pi, or devices using RTOS.

	* **The CIRRENT™ Agent** and its data collection engine which collects data on your device and facilitates communication with CIRRENT™ Cloud. You integrate the CIRRENT™ Agent into your IoT device software before shipment.

	* **CIRRENT™ Cloud** acts as the central repository for data collected by CIRRENT™Agent, securely storing your device analytics and providing data manipulation and analytics services.

	* **CIRRENT™ Console** provides real-time visibility into the data from your devices, including out-of-the-box dashboards that analyzes a standard set of events and attributes. Simply log in to the CIRRENT™ Console to see the data and access the reports that helps you to understand the performance of your devices.


.. toctree::
   :maxdepth: 1
   :hidden:

   /ini/ini-getting-started
   /ini/ini-data-model
   /ini/cirrent-agent
   /ini/cirrent-agent-api
   /ini/ini-console-user-guide
