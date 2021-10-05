iOS Sample Application
------------------------


Along with the CIRRENT™ iOS SDK, we will provide you with the source code to a sample application that uses the CIRRENT™ SDK to onboard a device onto the user's private Wi-Fi network. The CIRRENT™ iOS sample application is written in Swift, and provided in source code form to help you while you are modifying your app to incorporate the CIRRENT™ SDK. The CIRRENT™ sample app shows the on-boarding flow for a typical connected product.

The main areas of functionality that you should look at are:

- Controllers - these are the main screens for the live flow


- SignInViewController - this is the first screen where the user logs in. You should replace this with a login to your cloud.
- ConnectViaBluetoothViewController, ConnectViaSoftApLoadingViewController - these are the screens where the user searches for nearby devices.
- ChooseNetworkViewController - this is the screen that enables the user to choose which network they would like the connected product to join
- SendCredentialsViaSoftApViewController - this fragment sends the private credentials over the softAP network to the device and waits for the device to confirm that it has JOINED the private network.
- SendCredentialsViaBluetoothViewController - this fragment sends the private credentials over the BLE and waits for the device to confirm that it has JOINED the private network.
- SuccessFragment - this is the screen that is shown when the device has successfully joined the user's private network. This screen will typically be replaced with the main screen for your connected product.


- MaiHelper - Helper class. It gets a ANALYTICS token that will be used to authenticate your app to the CIRRENT™ cloud. Do not forget to change apiKey/apiSecret here if you plan to generate the analytics JWT token using the SDK. See the article on  `tokens <analytics-token-generation.rst>`_  for more information.

If you wish to build the sample app, you will need to install CocoaPods, using the following commands:

`sudo gem install cocoapods`

`pod install`

CocoaPods is required for AlamoFire, EVReflection and RxBluetooth (which are used in the CIRRENT™ sample app).

You can download the sample app at https://github.com/Cirrent/ZipKey-iOS-App