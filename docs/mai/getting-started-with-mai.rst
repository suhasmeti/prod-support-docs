Getting started with MAI
=============================

Getting started with MAI is easy, hassle-free and secure. To get started, `register for a free account <https://cirrent.infineon.com/login>`_. The next step is to integrate the CIRRENT™ Mobile App SDK into the Android or iOS app that connectes to your IoT device, which on average takes less than two hours and less than 50 lines of code. Once integration is complete, simply watch the data flow into the CIRRENT™ Console, a secure dashboard that provides deep visibility into the performance of your IoT products.

Key terms
++++++++++

Some of the key terms you should know before you start to include the CIRRENT™ Mobile SDK in your app include:

* **AppID:** Each app instance has a unique AppID that is provided by customer
* **OnboardingID:** Each onboarding attempt is assigned a unique OnboardingID by the CIRRENT™ Mobile SDK.
* **DeviceID:** A unique ID for each connected product

Sample App and SDK repos
+++++++++++++++++++++++++

You can find sample apps and the SDK repos for Android and iOS here.

* Android Sample App
* iOS Sample App

SDK (binaries) repos:

* CIRRENT™ Mobile SDK for Android
* CIRRENT™ Mobile SDK for iOS


App permissions
+++++++++++++++

You will need to ask the user of the mobile device on which your app is installed for the following app permissions in order for the CIRRENT™ SDK to be able to collect the data needed for MAI:

* **iOS**: Location and Local Network (iOS 14 and later).
* **Android**: Location

Steps to getting started with MAI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1.  Register for an account on CIRRENT™ Cloud. 

    Registration is free and you can do so via this link. Registering automatically creates a user profile on CIRRENT™ Cloud, and gives you full access to CIRRENT™ Console.

2.  Integrate the CIRRENT™ Mobile SDK into your mobile app

    You need to integrate the CIRRENT™ Mobile SDK into your mobile app in order to start collecting data for CIRRENT™ MAI. We provide links to sample apps and the SDK binaries below. 

3.  Reviewing your analytics on CIRRENT™ Console

    Once data starts steaming in from the CIRRENT™ Mobile SDK you will be able to review a range of onboarding analytics across all your devices, and drill down into device specific analytics too. You can read more about the CIRRENT™ Console here.


Using CIRRENT™ MAI within your app
^^^^^^^^^^^^^^^^^^^^^^^


Create Analytics JWT
+++++++++++++++++++++++++

The connected product mobile app will use a JSON web token (JWT) to confirm its scope of control when it calls the CIRRENT™ cloud. The App API Key and Secret are generated using Cirrent Console using link  https://console.cirrent.com/api-keys . Please click “Create API Key” button and choose key type as “app” as shown below.

.. image:: ../img/image-1.png

Using the App API Key and Secret, you will need to generate `Analytics token <analytics-token-generation.rst>`_ .

Please use one of these options to generate analytics JWT token:

1. Generate the token using your cloud and sign with App API Secret.

OR

2. Generate the analytics JWT token using the SDK.

.. code:: java

    /**
     * Method that generates Analytics JWT token.
     *
     * @param expiresIn Token lifetime in seconds.
     * @param accountId Account Id.
     * @param appId App Id.
     * @param appKey App key.
     * @param appSecret App secret key.
     * @return The output of this method will be “{appKey}::{JwtToken}”.
     */
    public static String createToken(int expiresIn, String accountId, String appId, String appKey, String appSecret)

Add SDK Functions to the app
+++++++++++++++++++++++++++++++++

It is useful to look at the SDK functions as two separate categories:

**I. Init Function**

It is possible to get started within minutes by using only the Init Function. Using just the Init function provides a way to get quick time to value from Cirrent Mobile SDK. Note that any communication between the app and Cirrent cloud needs an analytics JWT token.

Android:

.. code:: java

    /**
     * Required method that initializes Mobile Application Intelligence. Must be called before any other MAI methods.
     * Starts the SDK Captures and sends the phone information (phone model, OS), and the Wi-Fi information used
     * to identify router, ISP, SSID for the network, etc.
     *
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     *
     * @param appContext Application Context.
     * @param token      Analytics token.
     * @param callback   {@link MaiCallback}
     */
    public static void init(Context appContext, String token, MaiCallback callback)

**Information about MAICallback:**

The ``init()`` has a ``MaiCallback`` parameter.

``MaiCallback`` is an abstract class which you can extend once(e.g in your base class) and just reuse. It has the following methods:

.. code:: java

 public abstract class MaiCallback {
    /**
     * Called when token is invalid.
     *
     * @param retrier Allows you to pass a new token and resend collected data.
     *                In case of {@link MobileAppIntelligence.Retrier#retry(String)} failure
     *                {@link MaiCallback#onFailed(MAIError)} will be called.
     */
    public abstract void onTokenInvalid(MobileAppIntelligence.Retrier retrier);

    /**
     * Will be called when:
     * - {@link MobileAppIntelligence.Retrier#retry(String)} is failed to resend data using a new token;
     * - the conditions for calling the method are not met(e.g. attempt to call
     * {@link MobileAppIntelligence#endOnboarding()} before {@link MobileAppIntelligence#startOnboarding(int)} etc.);
     * - data hasn't been sent due to some issues on the cloud side.
     *
     * @param e An object that contains information about failure causes.
     */
    public void onFailed(MAIError e) {
        final MAIError.Type errorType = e.getType();
        MAILog.w(
                "MAI",
                String.format(
                        "%s, errorCode: %s, message: %s",
                        errorType.toString(),
                        e.getErrorCode(),
                        e.getMessage()
                )
        );
    }
 }

iOS:

.. code:: swift

    /// Required method that initializes MobileAppIntelligence. Must be called before any other MAI methods.
    /// Starts the SDK Captures and sends the phone information (phone model, OS), and the Wi-Fi information used
    /// to identify router, ISP, SSID for the network, etc.
    ///
    /// In case of failure to send collected data:
    /// 1.) All unsent data will be saved in the app-specific storage. The SDK will try to send stored data during next API calls;
    /// 2.) `onTokenInvalid(Retrier)` or `onError(MAIError)` will be called.
    ///
    /// - Parameters:
    ///   - analyticsToken: Analytics token
    ///   - onTokenInvalid: Will be called if token is invalid.
    ///   - retrier: Allows you to pass a new token and resend collected data. In case of failure `onError(MAIError)` will be called.
    ///   - onError: (Optional) Will be called when: 1. `Retrier.retry(token: String)` is failed to resend data using a new token; 2. the conditions for calling the method are not met(e.g. attempt to call `enterStep(thisStepName: String, reason: String? = nil)` before `startOnboarding()` etc.).
    ///   - error: An object that contains information about failure causes.
    public static func initialize(token: String, onTokenInvalid: @escaping (_ retrier: Retrier) -> (), onError: ((_ error: MAIError) -> ())? = nil)

**II. Onboarding related functions**

These functions help capture data related to particular onboarding. A single try of one app instance onboarding one Wi-Fi connected device is considered to be a unique *OnboardingID*. It is essential to use ``startOnboarding()`` and ``endOnboarding()`` functions to identify the start and end of a unique *OnboardingID*.

The SDK gives the app developers flexibility to decide on which steps in the app to collect data. App developers can also annotate moving from one step to the next with reason codes.

Android:

.. code:: java

    /**
     * Required method that tells the cloud that onboarding has been started.
     * Also creates a unique onboarding id and stores it for subsequent calls.
     * <p>
     * Calling this method is not allowed and
     * you will receive {@link MaiCallback#onFailed(MAIError)} in the following cases:
     * - if {@link #init(Context, String, MaiCallback)} wasn't called;
     * - if onboarding already started and you try to call it again without
     * calling {@link #endOnboarding()} or {@link #endOnboarding(EndData)}.
     * <p>
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     *
     * @param onboardingSessionTimeout if the time gap between onboarding steps > this value then
     *                                 onboarding duration timers will be paused till the next
     *                                 step is performed.
     *                                 By default this value = {@link #DEFAULT_ONBOARDING_SESSION_TIMEOUT}
     */
    public static void startOnboarding(int onboardingSessionTimeout)

    /**
     * Required method that tells the cloud that onboarding has been started.
     * Also creates a unique onboarding id and stores it for subsequent calls.
     * <p>
     * Calling this method is not allowed and
     * you will receive {@link MaiCallback#onFailed(MAIError)} in the following cases:
     * - if {@link #init(Context, String, MaiCallback)} wasn't called;
     * - if onboarding already started and you try to call it again without
     * calling {@link #endOnboarding()} or {@link #endOnboarding(EndData)}.
     * <p>
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     */
    public static void startOnboarding()

    /**
     * Same as {@link #startOnboarding()} but this method allows you to set {@link OnboardingType}.
     *
     * @param type {@link OnboardingType}.
     */
    public static void startOnboarding(OnboardingType type)

    /**
     * Same as {@link #startOnboarding()} but this method allows you to set a custom on-boarding type.
     *
     * @param customType Custom on-boarding type.
     */
    public static void startOnboarding(String customType)

    /**
     * Same as {@link #startOnboarding(int)} but this method allows you to set {@link OnboardingType}.
     *
     * @param onboardingSessionTimeout if the time gap between onboarding steps > this value then
     *                                 onboarding duration timers will be paused till the next
     *                                 step is performed.
     *                                 By default this value = {@link #DEFAULT_ONBOARDING_SESSION_TIMEOUT}
     * @param type                     {@link OnboardingType}.
     */
    public static void startOnboarding(int onboardingSessionTimeout, OnboardingType type)

    /**
     * Same as {@link #startOnboarding(int)} but this method allows you to set  a custom on-boarding type.
     *
     * @param onboardingSessionTimeout if the time gap between onboarding steps > this value then
     *                                 onboarding duration timers will be paused till the next
     *                                 step is performed.
     *                                 By default this value = {@link #DEFAULT_ONBOARDING_SESSION_TIMEOUT}
     * @param customType               Custom on-boarding type.
     */
    public static void startOnboarding(int onboardingSessionTimeout, String customType)

    /**
     * Required method that allows you to set {@link OnboardingType}.
     * Onboarding type should be set until {@link #endOnboarding()} is called.
     * <p>
     * Calling this method is not allowed and
     * you will receive {@link MaiCallback#onFailed(MAIError)} in the following cases:
     * - if {@link #init(Context, String, MaiCallback)} wasn't called;
     * - if onboarding wasn't started.
     * <p>
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     *
     * @param type {@link OnboardingType}
     */
    public static void setOnboardingType(OnboardingType type)

    /**
     * Same as {@link #setOnboardingType(OnboardingType)} but this method allows you to set
     * a custom on-boarding type.
     * @param customType    Custom on-boarding type.
     *
     */
    public static void setOnboardingType(String customType)

    /**
     * Optional method that allows you to send a Device ID to the cloud.
     * <p>
     * Calling this method is not allowed and
     * you will receive {@link MaiCallback#onFailed(MAIError)} in the following cases:
     * - if {@link #init(Context, String, MaiCallback)} wasn't called;
     * - if onboarding wasn't started.
     * <p>
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     *
     * @param deviceId Currently on-boarding Device ID.
     */
    public static void setOnboardingDeviceInfo(String deviceId)

    /**
     * Same as {@link #setOnboardingDeviceInfo(String)} but this method allows you to add
     * additional device attributes that will be sent along with the Device ID.
     * @param deviceId             Currently on-boarding Device ID.
     * @param additionalAttributes Additional attributes.
     */
    public static void setOnboardingDeviceInfo(String deviceId,
                                               Map<String, String> additionalAttributes)

    /**
     * Sends to the cloud information about previous(if it occurred) and current step.
     * <p>
     * Calling this method is not allowed and
     * you will receive {@link MaiCallback#onFailed(MAIError)} in the following cases:
     * - if {@link #init(Context, String, MaiCallback)} wasn't called.
     * <p>
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     *
     * @param stepData {@link StepData}
     */
    public static void enterStep(StepData stepData)

    /**
     * Tells the cloud that onboarding has been ended. Close out the onboarding id.
     * <p>
     * Calling this method is not allowed and
     * you will receive {@link MaiCallback#onFailed(MAIError)} in the following cases:
     * - if {@link #init(Context, String, MaiCallback)} wasn't called;
     * - if {@link #startOnboarding(int)} method wasn't called;
     * - if {@link #setOnboardingType(String)} OR
     * {@link #setOnboardingType(OnboardingType)} (String, Callback)} method
     * wasn't called.
     * Use {@link #endOnboarding(EndData)} with {@link EndData#createFailure(String)} to
     * "end" a failed onboarding without setting a type.
     * <p>
     * In case of failure to send collected data:
     * - All unsent data will be saved in the app-specific storage. The SDK will try to send stored
     * data during next API calls;
     * - {@link MaiCallback#onTokenInvalid(Retrier)} or {@link MaiCallback#onFailed(MAIError)}
     * will be called.
     *
     */
    public static void endOnboarding()

    /**
     * Same as the function above, but in this case it has an additional {@link EndData} parameter.
     * Can be used to report additional data of an unsuccessful on-boarding.
     * Also you can call this method to "end" a failed onboarding without setting an onboarding type. In this case
     * {@link MaiCallback#onFailed(MAIError)} will not be called.
     * Close out the onboarding id.
     *
     * @param endData {@link EndData}
     */
    public static void endOnboarding(EndData endData)

    /**
     * Cancels all tasks.
     */
    public static void cancel()

    /**
     * Removes all cached collected data.
     */
    public static void removeAllCollectedData(Context appContext)

iOS:

.. code:: swift

    /// Required method that tells the cloud that onboarding has been started. Also creates a unique onboarding id and stores it for subsequent calls.
    ///
    ///     Calling this method is not allowed and `onError(MAIError)` will be called in the following cases:
    ///         1.) if `initialize(token: String, onTokenInvalid: (Retrier) -> ())` wasn't called;
    ///         2.) if `startOnboarding()` method has been already called and you try to call it again without calling `endOnboarding(endData: EndData?)`.
    ///     In case of failure to send collected data:
    ///         1.) All unsent data will be saved in the app-specific storage. The SDK will try to send stored data during next API calls;
    ///         2.) `onTokenInvalid(Retrier)` or `onError(MAIError)` will be called.
    ///
    /// - Parameter onboardingSessionTimeout: if the time gap between onboarding steps > this value(in seconds) then onboarding duration timers will be paused till the next step is performed. By default this value = 15 minutes
    /// - Parameter type: `OnboardingType`
    /// - Parameter customType: Custom on-boarding type.
    public static func startOnboarding(onboardingSessionTimeout: Int? = nil, type: OnboardingType? = nil, customType: String? = nil)

    /// Required method that allows you to set `OnboardingType`.
    /// Onboarding type should be set until `endOnboarding(reason: String? = nil)` is called.
    ///
    ///     Calling this method is not allowed and `onError(MAIError)` will be called in the following cases:
    ///         1.) if `initialize(token: String, onTokenInvalid: (Retrier) -> ())` wasn't called;
    ///         2.) if `startOnboarding()` wasn't called.
    ///     In case of failure to send collected data:
    ///         1.) All unsent data will be saved in the app-specific storage. The SDK will try to send stored data during next API calls;
    ///         2.) `onTokenInvalid(Retrier)` or `onError(MAIError)` will be called.
    ///
    /// - Parameters:
    ///   - type: `OnboardingType`
    public static func setOnboardingType(type: OnboardingType)


    /// Same as `setOnboardingType(type: OnboardingType)` but this method allows you to set a custom on-boarding type.
    /// - Parameters:
    ///   - customType: Custom on-boarding type.
    public static func setOnboardingType(customType: String)


    /// Optional method that allows you to send a Device ID and additional device attributes to the cloud.
    ///
    ///     Calling this method is not allowed and `onError(MAIError)` will be called in the following cases:
    ///         1.) if `initialize(token: String, onTokenInvalid: (Retrier) -> ())` wasn't called;
    ///         2.) if `startOnboarding()` wasn't called.
    ///     In case of failure to send collected data:
    ///         1.) All unsent data will be saved in the app-specific storage. The SDK will try to send stored data during next API calls;
    ///         2.) `onTokenInvalid(Retrier)` or `onError(MAIError)` will be called.
    ///
    /// - Parameters:
    ///   - deviceId: Currently on-boarding Device ID.
    ///   - additionalAttributes: (Optional) Additional attributes.
    public static func setOnboardingDeviceInfo(deviceId: String, additionalAttributes: [String: String]? = nil)


    /// Sends to the cloud information about previous(if it occurred) and current step.
    ///
    ///     Calling this method is not allowed and `onError(MAIError)` will be called in the following cases:
    ///         1.) if `initialize(token: String, onTokenInvalid: (Retrier) -> ())` and `startOnboarding()` weren't called.
    ///
    ///     In case of failure to send collected data:
    ///         1.) All unsent data will be saved in the app-specific storage. The SDK will try to send stored data during next API calls;
    ///         2.) `onTokenInvalid(Retrier)` or `onError(MAIError)` will be called.
    ///
    /// - Parameters:
    ///   - stepData: `StepData`
    public static func enterStep(_ stepData: StepData)


    /// Tells the cloud that onboarding has been ended.
    /// Close out the onboarding id.
    ///
    ///     Calling this method is not allowed and `onError(MAIError)` will be called in the following cases:
    ///         1.) if `initialize(token: String, onTokenInvalid: (Retrier) -> ())` wasn't called;
    ///         2.) if `startOnboarding()` wasn't called.
    ///         3.) if `setOnboardingType(type: OnboardingType)` or `setOnboardingType(customType: String)` function wasn't called. Please note, `onError(MAIError)` won't be called if `endOnboarding(EndData)` with `EndData.createFailure(String)` was passed.
    ///
    ///     In case of failure to send collected data:
    ///         1.) All unsent data will be saved in the app-specific storage. The SDK will try to send stored data during next API calls;
    ///         2.) `onTokenInvalid(Retrier)` or `onError(MAIError)` will be called.
    ///
    /// - Parameters:
    ///   - endData: `EndData`
    public static func endOnboarding(_ endData: EndData? = nil)

    /// Removes all cached collected data.
    public static func removeAllCollectedData()

    /// Cancels all tasks.
    public static func cancelAllTasks()

**Information about StepData and EndData:**

``StepData`` class helps to form information about onboarding steps and consist of the following functions:

Android:

.. code:: java

    /**
     * Creates a {@link StepData} object with the "SUCCESS" result.
     *
     * @param thisStepName name of the current step.
     * @return {@link StepData} object with the current step name.
     */
    public static StepData create(@NonNull String thisStepName)

    /**
     * This function creates a bit more complex {@link StepData} object that can contain more step-related data.
     * For example, using "result" you can flag the step as "FAILED" due to some "reason".
     *
     * @param result       result of the previous step.
     * @param thisStepName name of the current step.
     * @param reason       reason that initiated this(current) step.
     * @return {@link StepData} object.
     */
    public static StepData create(@NonNull StepResult result, @NonNull String thisStepName, @NonNull String reason)

    /**
     * Adds a debug info to the {@link StepData} object.
     *
     * @param debugInfo debug info that you want to add to the {@link StepData} object.
     * @return {@link StepData}
     */
    public StepData setDebugInfo(@NonNull Map<String, String> debugInfo)

iOS:

.. code:: swift

    /// Creates a `StepData` object with the "SUCCESS" result.
    ///
    /// - Parameters:
    ///   - stepName: name of the current step.
    /// - Returns: `StepData` object.
    public static func create(stepName: String) -> StepData

    /// This function creates a bit more complex `StepData` object that can contain more step-related data.
    /// For example, using "result" you can flag the step as "FAILED" due to some "reason".
    ///
    /// - Parameters:
    ///   - result: result of the previous step.
    ///   - stepName: name of the current step.
    ///   - reason: reason that initiated this(current) step.
    /// - Returns: `StepData` object.
    public static func create(result: StepResult, stepName: String, reason: String) -> StepData

    /// Adds a debug info to the `StepData` object.
    ///
    /// - Parameter debugInfo: debug info that you want to add to the `StepData` object.
    /// - Returns: `StepData` object.
    public func setDebugInfo(_ debugInfo: [String: String]) -> StepData

``EndData`` class helps to form information about the end of current onboarding and consist of the following functions:

Android:

.. code:: java

    /**
     * Creates a failed onboarding {@link EndData} object.
     *
     * @param failureReason reason of failure.
     * @return {@link EndData} object with a reason of failure.
     */
    public static EndData createFailure(@NonNull String failureReason)

    /**
     * Adds a debug info to the {@link EndData} object.
     *
     * @param debugInfo debug info that you want to add to the {@link EndData} object.
     * @return {@link EndData}
     */
    public EndData setDebugInfo(@NonNull Map<String, String> debugInfo)

iOS:

.. code:: swift

    /// Creates a failed onboarding `EndData` object.
    ///
    /// - Parameter failureReason: reason of failure.
    /// - Returns: `EndData` object with a reason of failure.
    public static func create(failureReason: String? = nil) -> EndData

    /// Adds a debug info to the `EndData` object.
    ///
    /// - Parameter debugInfo: debug info that you want to add to the `EndData` object.
    /// - Returns: `EndData` object.
    public func setDebugInfo(_ debugInfo: [String: String]) -> EndData

Using MAI in practice
^^^^^^^^^^^^^^^^^^^^^^^

1.  **Single line of code to collect Phone and Wi-Fi Environment details**

To get only environmental details such as Phone OS / model, app version and Wi-Fi environment details such as router, ISP, etc, you need to use only one function call

Android:

.. code:: java

    MobileAppIntelligence.init(appContext, token, callback);

iOS:

.. code:: swift

    MobileAppIntelligence.initialize(token: token, onTokenInvalid: onTokenInvalid, onError: onError)

2.  **Getting success rates and onboarding durations**

This example allows the app developers to understand how many onboarding attempts succeeded and what is the duration that a user spent to onboard a device to Wi-Fi. This allows developers to also see what was the last step that the user was on before abandoning in case of unsuccessful onboarding attempts.

Java-based example:

.. code:: java

    //#1
    MobileAppIntelligence.init(appContext, token, callback);

    //#2
    MobileAppIntelligence.startOnboarding(OnboardingType.SOFTAP);

    //#3a
    MobileAppIntelligence.endOnboarding();

    //OR

    //#3b
    MobileAppIntelligence.endOnboarding(EndData.createFailure("SoftAP_web_Server_timeout_error"));

However, this example will not give details on what is the order of steps that the user takes before the end of onboarding.

3.  **Understand which steps cause users to abandon onboarding and why**

You will need to annotate the various onboarding steps with step names to understand where users abandon the process. Consider SoftAP onboarding process shown below where the user goes through a series of steps such as scanning for a device, connecting to SoftAP SSID, and then going to the step where the user enters private Wi-Fi network credentials. At this step, let’s say the user spent too much time entering his Wi-Fi password and gets a timeout error from the SoftAP connected device. As Cirrent SDK captures all steps and their duration all this information allows developers to understand the root cause of the issue. A similar approach can be used for onboarding steps for BLE.

Java-based example:

.. code:: java

    //#1
    MobileAppIntelligence.init(appContext, token, callback);

    //#2
    MobileAppIntelligence.startOnboarding(OnboardingType.SOFTAP);

    //#3
    MobileAppIntelligence.enterStep(StepData.create(StepResult.SUCCESS, "scanning_for_device", "onboarding_started"));

    //#4
    MobileAppIntelligence.enterStep(StepData.create(StepResult.SUCCESS, "connecting_to_device", "device_found"));

    //#5
    MobileAppIntelligence.enterStep(
                    StepData.create(
                            StepResult.SUCCESS,
                            "entering_private_creds",
                            "joined_soft_ap_ssid"
                    ).setDebugInfo(
                            new HashMap<String, String>() {
                                {
                                    put("softap_ssid", "ssid_name");
                                }
                            }
                    )
    );

    // <Getting a timeout error from the SoftAP connected device>

    //#6
    MobileAppIntelligence.endOnboarding(EndData.createFailure("SoftAP_web_Server_timeout_error"));

4.  **Adding App Version using Custom Attributes**

Custom attributes enable an app developer to add specific pieces of data that might be relevant to understanding the onboarding performance. A typical example is App Version.

Java-based example:

.. code:: java

    MobileAppIntelligence.setOnboardingDeviceInfo(deviceId, getAppVersion());

    Map<String, String> getAppVersion() {
        final Map<String, String> appVersion = new HashMap<>();
        appVersion.put("app_version", BuildConfig.VERSION_NAME);
        return appVersion;
    }
