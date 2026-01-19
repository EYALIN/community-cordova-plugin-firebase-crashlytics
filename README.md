# community-cordova-plugin-firebase-crashlytics

Community maintained Cordova plugin for [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics/).

[![NPM version](https://img.shields.io/npm/v/community-cordova-plugin-firebase-crashlytics.svg)](https://www.npmjs.com/package/community-cordova-plugin-firebase-crashlytics)
[![Downloads](https://img.shields.io/npm/dm/community-cordova-plugin-firebase-crashlytics)](https://www.npmjs.com/package/community-cordova-plugin-firebase-crashlytics)

## Support This Plugin

I dedicate a considerable amount of my free time to developing and maintaining many Cordova plugins for the community ([See the list with all my maintained plugins][community_plugins]).

To help ensure this plugin is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance.

Please consider donating if you're using this plugin in an app that makes you money, or if you're asking for new features or priority bug fixes. Thank you!

[![Sponsor Me](https://img.shields.io/static/v1?label=Sponsor%20Me&style=for-the-badge&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/EYALIN)

## Credits & Acknowledgments

This plugin was originally forked from [cordova-plugin-firebase-crash](https://github.com/chemerisuk/cordova-plugin-firebase-crash) by [Maksim Chemerisuk](https://github.com/chemerisuk).

A huge thank you to the original author for creating and maintaining the original plugin. The original work laid the foundation for this plugin, and we are grateful for their contributions to the Cordova community.

Due to the original plugin no longer being actively maintained, this standalone repository was created to continue development, provide updates, and ensure compatibility with the latest Firebase SDK versions.

## Related Community Plugins

This plugin is part of a larger ecosystem of community-maintained Cordova plugins:

| Plugin | Description |
|--------|-------------|
| [community-cordova-plugin-firebase-analytics](https://github.com/EYALIN/community-cordova-plugin-firebase-analytics) | Firebase Analytics |
| [community-cordova-plugin-admob](https://github.com/EYALIN/community-cordova-plugin-admob) | Google AdMob |
| [community-cordova-plugin-consent](https://github.com/EYALIN/community-cordova-plugin-consent) | Google UMP Consent |

[View all community plugins][community_plugins]

## Index

<!-- MarkdownTOC levels="2" autolink="true" -->

- [Supported Platforms](#supported-platforms)
- [Installation](#installation)
- [SDK Versions](#sdk-versions)
- [Variables](#variables)
- [Disable data collection](#disable-data-collection)
- [Adding required configuration files](#adding-required-configuration-files)
- [Functions](#functions)

<!-- /MarkdownTOC -->

## Supported Platforms

- iOS
- Android

## Installation

```bash
cordova plugin add community-cordova-plugin-firebase-crashlytics
```

If you get an error about CocoaPods being unable to find compatible versions, run:

```bash
pod repo update
```

Use variables `IOS_FIREBASE_POD_VERSION` and `ANDROID_FIREBASE_BOM_VERSION` to override dependency versions for Firebase SDKs:

```bash
cordova plugin add community-cordova-plugin-firebase-crashlytics \
    --variable IOS_FIREBASE_POD_VERSION="11.12.0" \
    --variable ANDROID_FIREBASE_BOM_VERSION="33.8.0"
```

## SDK Versions

| Platform | SDK | Default Version |
|----------|-----|-----------------|
| Android | Firebase BOM | 33.8.0 |
| iOS | Firebase CocoaPods | 11.12.0 |

## Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `CRASHLYTICS_COLLECTION_ENABLED` | `true` | Enable/disable crashlytics collection on startup |
| `ANDROID_FIREBASE_BOM_VERSION` | `33.8.0` | Firebase BOM version for Android |
| `IOS_FIREBASE_POD_VERSION` | `11.12.0` | Firebase pod version for iOS |

## Disable data collection

In some cases, you may wish to temporarily or permanently disable collection of crash data. You can set the value of variable `CRASHLYTICS_COLLECTION_ENABLED` to `false` to prevent collecting any user data:

```bash
cordova plugin add community-cordova-plugin-firebase-crashlytics \
    --variable CRASHLYTICS_COLLECTION_ENABLED=false
```

Later you can re-enable crashlytics (for instance after getting end-user consent) using method [setEnabled](#setenabledenabled).

## Adding required configuration files

Cordova supports `resource-file` tag for easy copying resources files. Firebase SDK requires `google-services.json` on Android and `GoogleService-Info.plist` on iOS platforms.

1. Put `google-services.json` and/or `GoogleService-Info.plist` into the root directory of your Cordova project
2. Add new tag for Android platform

```xml
<platform name="android">
    ...
    <resource-file src="google-services.json" target="app/google-services.json" />
</platform>
...
<platform name="ios">
    ...
    <resource-file src="GoogleService-Info.plist" />
</platform>
```

This way config files will be copied on `cordova prepare` step.

## Functions

### log

**log**(`message`): `Promise`<`void`\>

Add logging that will be sent with your crash data in case of app crash.

**See**

https://firebase.google.com/docs/crashlytics/customize-crash-reports?authuser=0#add_custom_log_messages

**Example**

```ts
cordova.plugins.firebase.crashlytics.log("my custom log message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Log message |

#### Returns

`Promise`<`void`\>

Callback when operation is completed

---

### logError

**logError**(`message`): `Promise`<`void`\>

Log non-fatal exceptions in addition to automatically reported app crashes.

**See**

https://firebase.google.com/docs/crashlytics/customize-crash-reports?authuser=0#log_non-fatal_exceptions

**Example**

```ts
cordova.plugins.firebase.crashlytics.logError("my non-fatal exception message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Log message |

#### Returns

`Promise`<`void`\>

Callback when operation is completed

---

### setCustomKey

**setCustomKey**(`key`, `value`): `Promise`<`void`\>

Add custom key/value pairs to crashlytics report.

**See**

https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=android

**Example**

```ts
cordova.plugins.firebase.crashlytics.setCustomKey("my-string-key", "test value");
cordova.plugins.firebase.crashlytics.setCustomKey("my-number-key", 123);
cordova.plugins.firebase.crashlytics.setCustomKey("my-boolean-key", true);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Name of the custom key |
| `value` | `string` \| `number` \| `boolean` | Value of the custom key |

#### Returns

`Promise`<`void`\>

Callback when operation is completed

---

### setEnabled

**setEnabled**(`enabled`): `Promise`<`void`\>

Sets whether crashlytics collection is enabled for this app on this device.

**Example**

```ts
cordova.plugins.firebase.crashlytics.setEnabled(false);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | Flag that specifies new state |

#### Returns

`Promise`<`void`\>

Callback when operation is completed

---

### setUserId

**setUserId**(`userId`): `Promise`<`void`\>

Sets the user identifier property for crashlytics reporting.

**See**

https://firebase.google.com/docs/crashlytics/customize-crash-reports?authuser=0#set_user_identifiers

**Example**

```ts
cordova.plugins.firebase.crashlytics.setUserId("12345");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` | User's identifier string |

#### Returns

`Promise`<`void`\>

Callback when operation is completed

## Contributing

- Star this repository
- Open issue for feature requests
- [Sponsor this project](https://github.com/sponsors/EYALIN)

## License

MIT

[community_plugins]: https://github.com/EYALIN?tab=repositories&q=community&type=&language=&sort=
