CIRRENT™ Mobile App Intelligence (MAI)
=========================================

.. topic:: What is MAI?

	CIRRENT™ Mobile App Intelligence is a cloud software solution that provides data-driven Wi-Fi onboarding improvement, leading to higher connectivity rates and better app reviews. CIRRENT™ MAI uses the CIRRENT™ App SDK that you integrate into your IoT Android or IOS mobile app to securely report data into the CIRRENT™ Cloud where you enjoy real-time access for your product management and engineering teams via the CIRRENT™ Console.

	With CIRRENT™ MAI, your product and software engineering teams can understand mobile app usage and customer environments to increase connectivity rates for IoT products in the field. MAI works either on its own, or in conjunction with CIRRENT™ IoT Network Intelligence (INI).

	.. image:: img/mai.png
	    :align: center
	    :alt: Dashboard 2

.. topic:: What can MAI do?

	MAI allows you to identify Wi-Fi onboarding problems by looking at broad trends from your entire fleet and correlating performance metrics and onboarding issues across multiple variables (router, ISP, fw/hw version, or your own custom parameters).

	You can also drill down to the impacted products and customers and isolate issues by characterizing across additional environmental, user, or product variables. This includes the ability to identify problematic products, diagnosing the cause of the problem by analyzing data to understand root cause. Benefits of using MAI include:

	Higher device connectivity rates

	* Identify and fix onboarding steps with a high failure rate
	* Improve customer experience so more customers succeed

	Rapid integration, with results in less than a month

	* Integrate in less than 2 hours
	* Prebuilt, easy to use, flexible dashboards
	* 50 lines of code means simple integration

	MAI data provides leads to better app reviews

	* Increased customer satisfaction and brand loyalty
	* Increased user engagement via in-app optimizations
	* Increased app store ratings by average of 1 star
	* Reduced customer support calls and costs

.. topic::  How MAI works

	MAI relies on the CIRRENT™ Mobile SDK code which you integrate into your Android or iOS device app to collect key information during the Wi-Fi onboarding process. The mobile SDK code submits this information to the CIRRENT™ Cloud, where you can access and analyze data covering the behavior of your device onboarding process using the CIRRENT™ Console.	

.. topic::  Components of MAI

	CIRRENT™ Mobile App Intelligence (MAI) consists out of several interacting components working together to provide device analytics.

	* **Your device or fleet of devices** in the field, including any Linux-based device, devices based on Raspberry Pi, or devices using RTOS.
	* **Your iOS or Android app** which you use to manage device onboarding and other device features. You integrate the CIRRENT™ Mobile SDK into your mobile app to collect data for MAI.
	* **The CIRRENT™ Mobile SDK** is the code that you include in your mobile app that enables you to collect MAI data.
	* **The CIRRENT™ Cloud** acts as the central repository for data collected by the CIRRENT™ Mobile SDK, securely storing your onboarding analytics and providing data manipulation and analytics services.
	* **The CIRRENT™ Console** provides real-time visibility into the data from your devices, including 10+ out-of-the-box dashboards that collect 25+ events and attributes. Simply log in to the CIRRENT™ Console to see the data and access the reports that helps you to understand the performance of your devices.

.. topic:: Learn more

	This GitHub set of documents will provide all of the information on CIRRENT™ MAI including:

	* `Getting Started with MAI <mai/getting-started-with-mai.rst>`_
	* `Android Analytics Token Generator <mai/analytics-token-generation.rst>`_
	* `Android Sample Application <mai/android-sample-application.rst>`_
	* `iOS Sample Application <mai/ios-sample-application.rst>`_

	**Reporting, Analytics and Data Modeling with MAI**

	* `Using MAI Dashboards <mai/using-the-mai-dashboards.rst>`_


.. toctree::
   :maxdepth: 2
   :hidden:

   /mai/what-is-mai
   /mai/getting-started-with-mai
   /mai/using-the-mai-dashboards
   /mai/mai-console
