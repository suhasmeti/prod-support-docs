Quick Start Guide: Cloud ID Virtual Developer Kit
==================================================

Objective of this kit
**********************

The objective of this developer kit is to provide an initial overview of CIRRENT™ Cloud ID, and to help developers try Cloud ID software capabilities for themselves. The developer kit outlines all the essential steps you need to take to get started with Cloud ID. Once device support for Cloud ID is released, any logins and APIs you’ve configured will be fully transferrable and usable.


.. note:: This is only an introductory guide. For full CIRRENT™ Cloud ID documentation, `please visit this URL <https://swdocs.cypress.com/html/cirrent-support-documentation/en/latest/>`_.

What is Cloud ID?
******************

CIRRENT™ Cloud ID is designed to solve many of the device authentication difficulties associated with hardware security modules (HSMs), while avoiding the security risks of software-only alternatives.

Cloud ID works by extending the silicon-based chain of trust from Product Company devices to the Product Cloud. It does so by acting as a registration intermediary, using hardware-based certificates in compatible chips for authentication, and subsequently confirming the authentication with your Product Cloud.

By using Cloud ID you no longer need to manually handle devices on the manufacturing line to process registration, nor do you risk using insecure software solutions.

**How Cloud ID integrates with your manufacturing process and your Product Cloud**

CIRRENT™ Cloud ID is pre-populated with the device certificates for Cloud ID-compatible chips. During the manufacturing process you install Cloud ID-compatible chips into your devices. When you receive a batch of chips and when these chips are ready for installation, you or your contract manufacturer simply need to scan a QR code to “bind” the devices with your Cloud ID account. 

Cloud ID then securely informs your Product Cloud that a batch of devices has been binded and that these devices should be allowed to communicate with your Product Cloud. The Cloud ID process ensures that only genuine, authorized devices get access to your Product Cloud.

What do you need for this developer kit?  
*****************************************

* A PC or Mac and a web browser.
* A smartphone with a QR code scanner.  Most modern smartphones these days have a QR code scanner in the camera software, or you can download a QR code app.

Steps to complete the virtual developer kit
*********************************************

We’ve split this guide into five steps that guide you through setting up CIRRENT™ Cloud ID and that illustrates just how easy it is to use Cloud ID in practice.

1. Sign up for a Cloud ID account
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Cloud ID is a CIRRENT™ service that you access through the CIRRENT™ Console. Before you get started testing Cloud ID you first need to create a CIRRENT™ account.

**> Complete these steps using a PC and browser**

A.  Go to https://cirrent.infineon.com/newaccount and create a new CIRRENT™ account.

B.  Remember to respond to the verification email in your inbox.

C.  Now, log in at https://cirrent.infineon.com/login using the credentials you set up in A.

D.  By default, you’ll have access to the Test account. Click **Next**.

E.  Try to find the Cloud ID section in the CIRRENT™ Console – navigate to **Device Management** and **Cloud ID**. You can also directly access the page with this URL: https://cirrent.infineon.com/cloud-devices/infineon-devices.

2. Try to bind a batch of devices using a QR Code
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Cloud-ID compatible devices must first be associated with a Cloud ID account before device certificates are sent to your Product Cloud. Binding is the step you need to take to associate your devices with your Cloud ID account. We offer a convenient one-step binding process using a QR code.

**> Complete these steps using a mobile phone**


A.  Open a QR code-capable camera app on your phone.

B.  Using your camera app or QR code scanner, scan one of the sample QR codes we provide at the end of this document. 

    The QR code contains both a URL and a Product Batch ID (BID). Scanning the code automatically sends you to the URL for the CIRRENT™ Console, and directly to the device binding page, pre-populated with the BID.

C.  Log in using the credentials you configured in Step 1.   

D.  Next, you will see a screen requesting a **Product Batch ID** and **Product Cloud API**. The Product Batch ID should be pre-populated, but if it is not, type the BID into the system. Leave the Product Cloud API field blank for now.

E.  The system will provide you with an indication of success. 

The above steps show you how simple it is to associate a batch of devices with your CIRRENT™ Cloud ID account.

.. note:: If you try and bind a reel for the second time, you will get an error condition saying that you've already binded it.



3. Verify that devices are now binded in CIRRENT™ Cloud ID
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now that you’ve binded a batch of devices in the CIRRENT™ Cloud you can view the results in the CIRRENT™ Console.

**> Complete these steps using a PC and browser**

A.  Navigate to **Device Management** and **Cloud ID**. You can also directly access the page with this URL: https://cirrent.infineon.com/cloud-devices/infineon-devices

B.  Verify that the devices you binded through a QR code are listed under the **Infineon Devices** section. You’ll notice a device count under **# of Registered Devices**.

PS: Now is also a good time to test downloading the Manifest File. For some use cases, you may prefer to get manual access to device certificates – to manually upload these into your Product Cloud. Click the 

.. image:: ../img/qsn-1.png
    :align: center
    :alt: Dashboard 2

button to download the Manifest File in .csv format.


4. Set up a Cloud API and test Product Cloud provisioning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In most scenarios, you will want to provision claimed devices directly into your Product Cloud using an API, instead of downloading and importing a Manifest File. The steps below highlight how you configure a cloud API link and show you how to trigger the provisioning process.

**> Complete these steps using a PC and browser**

A.  Navigate to **Device Management, Cloud ID**, and select the **Product Cloud APIs** tab. You can also follow this link: https://cirrent.infineon.com/cloud-devices/provisioning

B.  Next, click on **Add Cloud API**.

C.  Complete your Cloud API details in the dialogue box, and click **Create**. For the purpose of this developer kit you can enter dummy details for testing purposes.

D.  Confirm that the API link you’ve just added appears in the **Product Cloud APIs** screen.

You’ve now configured an API link to your Product Cloud and you’re ready to test provisioning devices directly into your Product Cloud. This is what you need to do to complete the provisioning step:

A.  Navigate to **Device Management, Cloud ID**, and ensure you’re on the **Infineon Devices** tab.

B.  Find the batch of devices you binded in Step 2, and click on the  button in that row.

C.  Select the **Product Cloud API** you’ve configured in the previous section and click **Provision Now**.

D.  Verify that the **# of Provisioned Devices** in that row now matches the **# of Registered Devices**.

You’re all done now – you’ve just provisioned devices into your Product Cloud. You should now also be able to view the device certificates when you log into your Product Cloud.

5. Test automatic Product Cloud provisioning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Ease of use is part of the core appeal of CIRRENT™ Cloud ID. In this section we’ll illustrate how a QR code scan can seamlessly trigger both device binding and device provisioning in a single step. For example, an authorized representative on the factory floor can simply scan the QR code of a batch of Cloud ID-compatible chips to trigger both device binding and secure provisioning.

To automatically provision devices with your Product Cloud as soon as you bind a batch of devices you need to first set up an automatic API provisioning link.

**> Complete these steps using a PC and browser**

A.  Navigate to **Device Management, Cloud ID**, and select the **Product Cloud APIs** tab. You can also follow this link: https://cirrent.infineon.com/cloud-devices/provisioning/

B.  Slide the **Automatically Provision Devices to Product Cloud** slider to the **ON** position

C.  Ensure the Product Cloud API you configured in Step 4 is selected in the **Product Cloud API** drop box.

You’re now set up for automatic device provisioning. Let’s try it out with a QR code.

**> Complete these steps using a mobile phone**

A.  Open a QR code-capable camera app on your phone.

B.  Using your camera app or QR code scanner, scan one of the sample QR codes we provide at the end of this document – but ensure it is a different QR code from the QR code scanned in Step 2.

C.  Once the browser opens, log in using the credentials you configured in Step 1 if prompted.

D.  Next, you will see a screen requesting a **Product Batch ID** and **Product Cloud API**. The Product Batch ID and Product Cloud API should be pre-populated. Tap **Add** to confirm the provisioning.

E.  The system will provide you with an indication of success.  

By scanning this QR code you’ve now binded your devices with CIRRENT™ Cloud ID, and provisioned your devices into your Product Cloud. Let’s take a look at the results in the CIRRENT™ Console:

**> Complete these steps using a PC and browser**

A.  Navigate to **Device Management** and **Cloud ID**. You can also directly access the page with this URL: https://cirrent.infineon.com/cloud-devices/infineon-devices

B.  Verify that on the **Infineon Devices** tab, your additional batch of devices is now listed.

C.  Verify that both the **# of Registered Devices** counter and the **# of Provisioned Devices** counter now displays the new devices.

Step five illustrates the one-step process by which an authorized delegate that operates in a manufacturing environment can ensure a batch of devices is binded with Cloud ID, and also securely provisioned into your Product Cloud.

Virtual Reels
**************

========   ===========   ============================   ===================================================    ============================================
Reel #     GUID          # of Certificates in Reel                                                             QR Code
========   ===========   ============================   ===================================================    ============================================
1          D001          2                              https://cirrent.infineon.com/cloud-id?groupId=D001     .. image:: ../img/QR_D001.png
2          D002          2                              https://cirrent.infineon.com/cloud-id?groupId=D002     .. image:: ../img/QR_D002.png
3          D003          2                              https://cirrent.infineon.com/cloud-id?groupId=D003     .. image:: ../img/QR_D003.png
4          D004          2                              https://cirrent.infineon.com/cloud-id?groupId=D004     .. image:: ../img/QR_D004.png
5          D005          2                              https://cirrent.infineon.com/cloud-id?groupId=D005     .. image:: ../img/QR_D005.png
6          D006          5                              https://cirrent.infineon.com/cloud-id?groupId=D006     .. image:: ../img/QR_D006.png
7          D007          5                              https://cirrent.infineon.com/cloud-id?groupId=D007     .. image:: ../img/QR_D007.png
8          D008          5                              https://cirrent.infineon.com/cloud-id?groupId=D008     .. image:: ../img/QR_D008.png
9          D009          10                             https://cirrent.infineon.com/cloud-id?groupId=D009     .. image:: ../img/QR_D009.png
10         D010          10                             https://cirrent.infineon.com/cloud-id?groupId=D0010    .. image:: ../img/QR_D010.png
========   ===========   ============================   ===================================================    ============================================
