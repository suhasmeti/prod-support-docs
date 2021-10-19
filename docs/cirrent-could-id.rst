CIRRENT™ Cloud ID
=========================================

.. topic:: What is CIRRENT™ Cloud ID?

	Only authentic, authorized devices should be allowed to communicate with a Product Company’s cloud environment. Product Companies (OEMs) commonly rely on hardware security modules used on the manufacturing line to ensure only authentic devices are admitted to the Product Cloud. This process involves time-consuming physical handling of individual chips, and often requires delegating security and trust to a third party – a contract manufacturer. Alternative software solutions exist, but these are vulnerable to security breaches.

	CIRRENT™ Cloud ID is designed to solve many of the device authentication difficulties associated with hardware security modules (HSMs), while avoiding the security risks of software-only alternatives. Cloud ID works by extending the silicon-based chain of trust from Product Company devices to the cloud. It does so by acting as a registration intermediary, relying on hardware-based certificates in Cloud ID compatible chips to authenticate devices, subsequently facilitating provisioning of authorized devices with the Product Cloud.

	Thanks to Cloud ID, Product Companies no longer need to manually handle devices on the manufacturing line to process registration, nor do Product Companies need to take a risk with insecure software solutions..

.. topic:: How Cloud ID works

	Cloud ID works by including a secure, unique, unspoofable device identity on a chip that Product Companies install in their products. Cloud ID-compatible chips have a unique X.509 device certificate built in at Infineon’s manufacturing facility. The nature of the asymmetric cryptography used prevents security compromises because the private key never leaves the device – there is no need for contract manufacturers to access the device certificate, for example. The process that enables a device to gain communications access to your Product Cloud looks as follows:

	1.	Device certificates for Cloud ID compatible devices are pre-populated in CIRRENT™ Cloud ID.

	2.	A Product Company designated or authorized representative binds that device or batch of devices with CIRRENT™ Cloud ID. 

	3.	CIRRENT™ Cloud ID uses an API to communicate to your Product Cloud that a device or batch of devices have been authorized to connect with the Product Cloud.

	4.	Your Product Cloud adds the device to its access control list (ACL).

	5.	As the device is now added to your Product Cloud ACL your Product Cloud will allow the device to initiate communications when that device attempts to do so – when the end-user switches it on, for example.

	Your Product Cloud can therefore securely accept data from verified devices and prevent unauthorized or spoofed devices from injecting data into your Product Cloud.

.. topic:: Cloud ID deployment options

	Every manufacturing line is different and to accommodate these needs Cloud ID provides Product Companies with different routes to device provisioning, each with increasing levels of automation.

	* **Manual Product Cloud provisioning via Manifest File.** You start the provisioning process by binding the devices to your Cloud ID account – either by scanning a QR code or by entering the Product Batch ID in the CIRRENT™ Console. You then download a Manifest File containing the device certificates which you import into your Product Cloud to complete the provisioning step.

	* **Manual Product Cloud provisioning via API.** You start the provisioning process by binding the devices to your Cloud ID account – either by scanning a QR code or by entering the Product Batch ID in the CIRRENT™ Console. Next, when ready, you trigger an injection of certificates into your Product Cloud using the API link that you configured with CIRRENT™ Cloud ID, and this completes the provisioning step.

	* **Automatic Product Cloud provisioning via API** You start the provisioning process by binding the devices to your Cloud ID account – either by scanning a QR code or by entering the Product Batch ID in the CIRRENT™ Console. CIRRENT™ Cloud ID automatically injects the device certifications into your Product Cloud using the default cloud API you configured with CIRRENT™ Cloud ID, thereby completing provisioning automatically.

	The different processes allow you to keep just the right level of control across the device onboarding process and allows you to flexibly manage when and where device certificates are injected into your Product Cloud.



.. toctree::
   :maxdepth: 2
   :hidden:

   /cid/getting-started-with-cloud-id
   /cid/provisioning-devices-with-cloud-id
   /cid/cirrent-console-for-cloud-id
   /cid/quick-start-cloud-id-virtual-dev-kit
