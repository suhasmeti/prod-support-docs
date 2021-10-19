Getting Started with Cloud ID
==============================

Getting started with Cloud ID is simple. What’s more, Cloud ID is highly customizable to adjust to your manufacturing process. You can also easily test CIRRENT™ Cloud ID simply by registering an account with CIRRENT™ Cloud ID, and using the sample Product Batch IDs to test the functionality of CIRRENT™ Cloud ID. View the Cloud ID virtual developers kit here.


Integrating Cloud ID into your manufacturing process 
*****************************************************

You have several options when it comes to ensuring that only genuine, authorized devices gain access to your Product Cloud. CIRRENT™ Cloud ID is a solution that provides a practical, affordable, secure route to ensuring device authentication.

To integrate Cloud ID into your manufacturing process you need to ensure that your devices include a Cloud ID-compatible chip. During the manufacturing process, you install Cloud ID-compatible chips into your devices to enable device authentication via Cloud ID. When you receive a batch of chips and when these chips are ready for installation, you or your contract manufacturer simply needs to scan a QR code, or manually enter the Product Batch ID into CIRRENT™ Console, to “bind” the devices with CIRRENT™ Cloud ID. 

Exactly what happens after binding a device depends on how you configure your CIRRENT™ Cloud ID solution, but the net result is that Cloud ID informs your Product Cloud that a batch of devices has been binded and that these devices should be allowed to communicate with the Product Cloud. The Cloud ID process ensures that only genuine, authorized devices are allowed to communicate with your Product Cloud.


Integrating Cloud ID with your Product Cloud
*****************************************************

Key to the functionality of Cloud ID is the ability of Cloud ID to communicate with your Product Cloud to automate the device provisioning process. We support most common cloud configurations, including:

* Standard cloud environments such as AWS, Azure or Google Cloud Platform
* IoT-specific cloud platforms including AWS IoT, Azure IoT
* Your private cloud configuration

Steps to configuring your Product Cloud API to accept data from CIRRENT™ Cloud ID will vary depending on the exact configuration of your Product Cloud. Once your Product Cloud is correctly configured, you simply add it to CIRRENT™ Cloud ID. We provide complete instructions on adding a cloud API to the CIRRENT™ Console in this section. Finally, you have the option to manually or automatically provision devices into your Product Cloud. You can also provision any specific device or batch of devices into multiple Product Clouds.



Key Cloud ID terms
*****************************************************

**Binding**

Binding is the step where you assign a batch of devices to a specific CIRRENT™ Account. This is typically done by scanning a QR-code, but you can also manually add a Product Batch ID into the browser UI of the CIRRENT™ web console.

**Device**

The Product Company device e.g. washing machine, microwave, connected security device. The device will include a Cloud ID-compatible chip.

**CIRRENT™ Account**

A CIRRENT™ Account is a collection of users with roles; devices, and configuration profiles. A user may have access to multiple accounts.

**CIRRENT™ Console**

This is the web application that allows users to interface with CIRRENT™ software services including CIRRENT™ Cloud ID.

**Device Certificate**

A Device Certificate is a unique X.509 certificate that is built into a specific instance of a product.  Examples of these are Infineon products that house an Infineon signed certificate.  

**Provisioning**

Provisioning is the process of informing your Product Cloud that a particular device should be authorized and how to authenticate the device. This may be done manually outside of the Cloud ID system by uploading a Manifest File, or may be done automatically by the Cloud ID service through a Product Cloud API configuration. This will add the device to your Product Cloud access control list. Note that the provisioning step involves no changes on the physical device.

**Product Cloud API**

Product Cloud APIs are the API provided by the Cloud Infrastructure company (i.e. Azure, AWS) or private cloud to interact with Product Company Clouds.  Supported use cases include device provisioning. 

**Product Company**

The Product Company (aka OEM – Original Equipment Manufacturer) is the company ultimately responsible for the Device. This would typically be the owners of the brand.  This is not the same role as the manufacturer or cloud service provider. 

**Product Cloud**

The Product Cloud is the cloud, owned by the Product Company, that the device is supposed to connect to, and it is operated by you, the Product Company, or your delegate.  This may be a private cloud on private or public infrastructure (e.g. AWS or Azure), or may be an IoT platform (AWS IoT Core, Azure IoT Hub, etc.).
