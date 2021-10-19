Provisioning devices with Cloud ID
===================================

CIRRENT™ Cloud ID helps you to ensure that only authorized devices get access to your Product Cloud. It does so by facilitating a secure device provisioning process. The exact steps involved in the provisioning process depend on your product workflow. However, broadly speaking, the onboarding process involves two key stages:

**Stage One: Binding devices to your Cloud ID account**

You inform CIRRENT™ Cloud ID that a device or batch of devices should be granted access to your Product Cloud. Cloud ID authenticates the devices, ensuring that only authorized devices are permitted to enter your Product Cloud.

**Stage Two: Provisioning devices into your Product Cloud**

CIRRENT™ Cloud ID uses an API to communicate to your Product Cloud that a device or batch of devices have been authenticated and that your Product Cloud should allow communications with these devices. If you do not want to or cannot set up an API link to your Product Cloud you can, as an alternative, manually download the device certificates and inject these into your Product Cloud.

We will now separately look at the two routes – provisioning via Manifest File, and provisioning via API.

Provisioning devices via a Manifest File
*****************************************

You have the option to manually onboard devices by obtaining a Manifest File containing certificates from CIRRENT™ Cloud ID and uploading the Manifest File to your Product Cloud. A Manifest File is a list of Device Certificates that can be used to manually provision devices into the Product Cloud.  This use case is currently implemented in Cloud ID through downloading a CSV file and subsequently uploading the CSV file into your Product Cloud.  

The workflow is as follows: 

1.	Device ships with a built-in Device Certificate prepopulated in CIRRENT™ Cloud ID service.
2.	Use any smartphone to scan the QR Code on the reel and bind ownership.
3.	Log onto the CIRRENT™ Console and download the Manifest File.
4.	Upload the Manifest File into the Product Cloud.
5.	Chain of Trust is established between the Product and the Product Cloud.  All ongoing communications are directly between device and Product Cloud.

 
.. figure:: ../img/pd-1.png

	Provisioning devices using a Manifest File

We will now outline the steps you need to take to complete the above workflow. There are two stages to this process. First, you need to bind ownership of the devices, adding the devices to your CIRRENT™ Cloud ID account. Next, you need to download the Manifest File containing the device certificates and upload these certificates into your API.

.. note:: The steps below outline a manual onboarding process, your devices will not automatically be provisioned to your Product Cloud.

Binding devices
^^^^^^^^^^^^^^^^

Your Cloud ID-compatible devices come pre-installed with a device certificate, but you first need to “bind” the devices to claim these as your own. To bind ownership with these devices you need to add the devices to CIRRENT™ Cloud ID by entering the Product Batch ID for the batch of devices into the Cloud ID section in the CIRRENT™ Console.

Binding using a desktop browser
"""""""""""""""""""""""""""""""""
If you’re using a desktop browser you can bind devices by navigating to **Device Management** and to **Cloud ID**. The default Cloud ID panel displays the batches of devices you have already onboarded. To add a new batch of devices click on the **Add Infineon Devices** button.

.. image:: ../img/pd-2.png
    :align: center
    :alt: Dashboard 2
 

Next, you’ll see the following screen:


.. image:: ../img/pd-3.png
    :align: center
    :alt: Dashboard 2
 

In the Product Batch ID field you enter the BID associated with the devices you want to bind ownership to. This could be a batch of chips, for example, identified by a unique alpha-numeric string.

.. note:: You can use one of the dummy reels to test functionality.

You can enter the BID manually, by copying and pasting the BID, or by using a barcode scanner attached to your PC. Since you will be downloading the Manifest File to manually upload it to your Product Cloud you need to leave the Product Cloud API field blank. Simply click Add to complete the binding process. You should now see the batch of devices listed in your list of Infineon devices. You should now see the batch of devices listed in your list of Infineon devices:

.. image:: ../img/pd-4.png
    :align: center
    :alt: Dashboard 2
 

You will see a counter reflecting the number of binded devices, indicating the number of devices contained in that Product Batch ID.


Binding using a mobile browser
"""""""""""""""""""""""""""""""

CIRRENT™ Cloud ID offers a simplified mobile experience to speed up device provisioning in certain use cases – the factory floor, for example. To start the process of binding devices using a mobile device, simply navigate to the CIRRENT™ Cloud ID section in the CIRRENT™ Cloud. This will automatically display the following prompt:

.. image:: ../img/pd-5.png
    :align: center
    :alt: Dashboard 2
 
To bind ownership, simply enter the Product Batch ID number. Because you will be downloading the Manifest File to manually upload it to your Product Cloud you need to leave the Product Cloud API field blank. Click Add to complete the binding process.

.. note:: To ensure a simplified onboarding experience the Cloud ID mobile browsing experience is restricted and users can only bind devices using a mobile device. Please switch to a desktop device for further device management features, as well as API management features.


Binding using a mobile device and QR code
""""""""""""""""""""""""""""""""""""""""""

Some Cloud ID compatible devices will come in a container carrying a QR code. Cloud ID offers a one-step onboarding process for devices shipped with a QR code.
To bind devices that are identified with a QR code, simply scan the QR code with a QR-capable app. The QR code contains a link that automatically directs you to the Cloud ID website, and which also automatically populates the Product Batch ID field:

.. image:: ../img/pd-6.png
    :align: center
    :alt: Dashboard 2
 
Because you will be downloading the Manifest File to manually upload it to your Product Cloud you need to leave the Product Cloud API field blank. Simply click Add to confirm the binding step.

Downloading the Manifest File in CIRRENT™ Console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now that you have completed the binding step in CIRRENT™ Cloud ID you can proceed to download the Manifest File containing the device certificates. To do so, click on the download button next to the entry for the list of devices you’d like to provision into your Product Cloud:

.. image:: ../img/pd-7.png
    :align: center
    :alt: Dashboard 2
 
Clicking the download button will automatically trigger the download of an .csv file. This csv file contains three data fields:

* **device_id:** containing the unique device ID for an individual device
* **group_id:** the Product Batch ID the device is associated with
* **certificate:** the full device security certificate

As a final step, you need to ingest the .csv Manifest File into your Product Cloud by using an import tool appropriate for your environment.

.. note:: Only users with an administrator role are able to download Manifest Files.


Provisioning devices via a Product Cloud API
*********************************************

In the previous section, we described how you can use a Manifest File to extract device certificates, which you needed to import into your Product Cloud to complete onboarding.

In this section, we outline how you can use an API that connects to your Product Cloud - including AWS, Azure, or your custom cloud – to inject device certificates into your Product Cloud when you bind a batch of devices to your Cloud ID account. Broadly speaking, the workflow is as follows:

1.	Device ships with built-in Device Certificate prepopulated in CIRRENT™ Cloud ID service.
2.	Log onto the CIRRENT™ Console and set up the automation to provision your reels into the Product Cloud.
3.	Use any smartphone to scan the QR Code on the reel and bind ownership.
4.	CIRRENT™ Cloud ID service pushes the certificates into Product Cloud with a cloud-to-cloud API.
5.	Chain of trust is established between the device and the Product Cloud.  All ongoing communications are directly between the device and the Product Cloud.
 
.. figure:: ../img/pd-8.png

	Provisioning devices to your Product Cloud using an API


You have two options to inject device certificates into your Product Cloud:

* **Automatic.** Choose a default cloud API to automatically accept device certificates as soon as you bind a Batch ID to your account. Cloud ID will automatically provision devices into your cloud API as soon as you activate a Batch ID.

* **Manual.** Once you’ve activated a Batch ID you can instead choose to manually provision batches of devices to a Product Cloud using a cloud API of your choice. You can also trigger the provisioning action multiple times in order to provision batches of devices into multiple Product Clouds.

Your unique manufacturing workflow will determine whether automated or manual API-driven provisioning is your best choice.

Configuring a cloud API
^^^^^^^^^^^^^^^^^^^^^^^^^

In order to provision devices using an API you need to first set up a link to your Product Cloud by configuring a cloud API in the CIRRENT™ Console.
To configure your first cloud API with Cloud ID, navigate to **Device Management** and **Cloud ID**. Select the **Product Cloud APIs** tab, and click on **Add Cloud API**. You’ll be presented with a dialog box where you need to complete your Product Cloud API details.

**Configuring Amazon Web Services**

Cloud ID has specific steps for Cloud ID users that rely on Amazon Web Services for their Product Cloud. In setting up your Product Cloud API, ensure that you select AWS in the Create Cloud API dialog box:
 
.. image:: ../img/amazon.png
    :align: center
    :alt: Dashboard 2

Next, configure the fields as follows:

* **Account ID**. This is your Amazon Web Services account identifier.
* **API Gateway ID**. Here, enter the API gateway ID you have set up.
* **Region**. Select the AWS region your AWS service operates in.
* **Stage**. Provide the name of the stage in your deployment that you want to use for this API link.

You have now added your AWS-based Product Cloud to CIRRENT™ Cloud ID and can now provision devices binded to your Cloud ID account directly into your Product Cloud.

**Configuring other cloud APIs**

First, select the Other option to start configuring your Cloud API, as below:

.. image:: ../img/cloudapi.png
    :align: center
    :alt: Dashboard 2



You can now proceed to complete the necessary fields.

* **Name**: This is the name of your Product Cloud that will appear in CIRRENT™ Cloud ID. This name will help you identify which Product Cloud you are provisioning a device into when you set up automated provisioning – or when you manually provision a device.

* **Type**: To speed up configuration, choose the relevant cloud service you are configuring – including Azure, or your private cloud.

* **Credentials**: The username and password combination that you have set up to allow CIRRENT™ Cloud ID to communicate with your product cloud. Simply enter the combination as username:password, for example: johndoe:abcxyz123

* **URL**: This is the web address of your Product Cloud.

You have now added your Product Cloud to CIRRENT™ Cloud ID and can now provision devices binded to your Cloud ID account directly into your Product Cloud.

Binding and provisioning devices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once you’ve configured your Product Cloud within Cloud ID you can now proceed to provision devices. First, you need to bind ownership of the devices with CIRRENT™ Cloud ID. Your Cloud ID-compatible devices come pre-installed with a device certificate. To bind ownership with these devices you need to add the devices to CIRRENT™ Cloud ID by entering the Product Batch ID for the batch of devices into the Cloud ID section in the CIRRENT™ Console.

Binding and provisioning using a desktop browser
"""""""""""""""""""""""""""""""""""""""""""""""""

To bind and provision devices using a desktop browser, navigate to **Device Management** and to **Cloud ID**. The default Cloud ID panel displays the batches of devices you have already onboarded. To add a new batch of devices click on the **Add Infineon Devices** button.

.. image:: ../img/pd-10.png
    :align: center
    :alt: Dashboard 2
 

Next, you’ll see the following screen:

.. image:: ../img/pd-11.png
    :align: center
    :alt: Dashboard 2
 

In the Product Batch ID field you enter the BID associated with the devices you want to bind ownership to. This could be a batch of chips, for example. 

.. note:: You can use one of the dummy reels to test functionality.

You can enter the BID manually, by copying and pasting the BID, or by using a barcode scanner attached to your PC. Next, you need to specify the Product Cloud API into which you would like to provision the devices. Simply click Add to complete the provisioning process. You should now see the batch of devices listed in your list of Infineon devices:

.. image:: ../img/pd-12.png
    :align: center
    :alt: Dashboard 2

You will see a counter reflecting the number of binded devices and the number of provisioned devices, indicating the number of devices contained in that Product Batch ID.

Binding and provisioning using a mobile browser
""""""""""""""""""""""""""""""""""""""""""""""""

CIRRENT™ Cloud ID offers a simplified mobile experience to speed up device provisioning in certain use cases – the factory floor, for example. To start the process of binding devices using a mobile device, simply navigate to the CIRRENT™ Cloud ID section in the CIRRENT™ Cloud. This will automatically display the following prompt:

.. image:: ../img/pd-13.png
    :align: center
    :alt: Dashboard 2
 
To bind ownership, simply enter the Product Batch ID number and choose the Product Cloud API you’d like to use to bind the devices. Click Add to complete the process.

.. note:: To ensure a simplified mobile device registration experience the Cloud ID mobile browsing experience is restricted and users can only bind devices using a mobile device. Please switch to a desktop device for further device management features, as well as API management features.


Binding and provisioning using a mobile device and QR code
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

Some Cloud ID compatible devices will come in a container carrying a QR code. Cloud ID offers a one-step onboarding process for devices shipped with a QR code. To bind devices that are identified with a QR code, simply scan the QR code with a QR-capable app. The QR code contains a link that automatically directs you to the Cloud ID website, and which also automatically populates the Product Batch ID field:

.. image:: ../img/pd-14.png
    :align: center
    :alt: Dashboard 2

Simply select the **Product Cloud API** you would like to receive the device certificates and click **Add** to confirm the binding and provisioning step.

Setting up a default cloud API to automatically receive device certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For many manufacturing workflows the best way to provision devices is by automatically injecting the device certificates for authorized devices into your Product Cloud. 
By default, you need to manually provision devices. You can, however, set up an automated workflow to ensure that any devices binded with Cloud ID are automatically provisioned into your Product Cloud. First, you need to enable the Automatically Provision Devices to Product Cloud feature. 

To do so, navigate to Device Management and to Cloud ID. Select the Product Cloud APIs tab. Look for the following toggle, which you need to switch to ON:

.. image:: ../img/pd-15.png
    :align: center
    :alt: Dashboard 2

Next, ensure that you select the cloud API you want to use for automated provisioning. You do so by selecting from this drop-down box:
 
.. image:: ../img/pd-16.png
    :align: center
    :alt: Dashboard 2


Triggering a distinct API provisioning step
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You have the option to inject device certificates for a batch of devices into your Product Cloud of choice by triggering a specific API provisioning step. You can trigger this step as many times as needed in order to provision devices into as many Product Clouds as required.

To do so, navigate to **Device Management** and to **Cloud ID**. Select the **Infineon Devices** tab. Next, click the provisioning button 

.. image:: ../img/pd-17.png
    :align: center
    :alt: Dashboard 2

to open the provisioning dialog box. 

Next, simply select the Product Cloud API you’d like to inject the device certificates into, and click **Provision Now**. 

.. image:: ../img/pd-18.png
    :align: center
    :alt: Dashboard 2
