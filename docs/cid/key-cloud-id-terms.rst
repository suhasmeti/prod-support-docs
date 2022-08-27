Key Cloud ID terms
===================

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
