Android Sample Application
------------------------------

Along with the CIRRENT™ Android SDK, we will provide you with the source code to a sample application that uses the CIRRENT™ SDK to onboard a device onto the user's private Wi-Fi network. The CIRRENT™ Android sample application is written in Java, and provided in source code form to help you while you are modifying your app to incorporate the CIRRENT™ SDK. The CIRRENT™ sample app shows the on-boarding flow for a typical connected product.

The main areas of functionality that you should look at are:

- Fragments - these are some screens for the sample app that call the main methods in the CirrentService

- LoginFragment - this is the first screen where the user logs in. You should replace this with a login to your cloud.
- ConnectViaBluetoothLoadingFragment, ConnectViaSoftApLoadingFragment - these are the screens where the user searches for nearby devices.
- SetupDeviceViaBluetoothFragment, SetupDeviceViaSoftApFragment - these are the screens that enable the user to choose which network they would like the connected product to join
- SendCredentialsViaSoftApFragment - this fragment sends the private credentials over the softAP network to the device and waits for the device to confirm that it has JOINED the private network.
- SendCredentialsViaBluetoothFragment - this fragment sends the private credentials over the BLE and waits for the device to confirm that it has JOINED the private network.
- SuccessFragment - this is the screen that is shown when the device has successfully joined the user's private network. This screen will typically be replaced with the main screen for your connected product.

- MaiHelper - Helper class. It gets a ANALYTICS token that will be used to authenticate your app to the CIRRENT™ cloud. Do not forget to change apiKey/apiSecret here if you plan to generate the analytics JWT token using the SDK. See the article on  `tokens <analytics-token-generation.rst>`_  for more information.

You can download the sample app at https://github.com/Cirrent/ZipKey-Android-App