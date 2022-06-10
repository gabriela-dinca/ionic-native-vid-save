# Proof of Concept for Video file saving on a device
# Installation

```bash
$ npm i -g typescript
$ npm i -g @ionic/cli
$ npm install
```
* [Install the JAVA SDK](https://www.oracle.com/java/technologies/downloads/#java8-windows) and set the ``JAVA_HOME`` system variable.
* In Android Studio Tools > SDK Manager, install
  * the Android SDK Build-Tools 30.0.3
  * Android Emulator
  * Android SDK Platform-Tools and accept the licences
  * add the ``ANDROID_SDK_ROOT`` system variable
  * and the ``CAPACITOR_ANDROID_STUDIO_PATH`` system variable (path to studio64.exe on Windows)
* No need in install Gradle separately, android studio will do it automatically during the build process
* Install the Android Debug Bridge Utility
* In Android Studio Tools > ADV Manager install a device, for example Pixel_2_API_30

# Running the app

```bash
# web lab 
ionic serve -l
# using .apk
ng build
ionic capacitator add android
ionic cap sync android
# emulator 
ionic capacitor run android --emulator --livereload --target=Pixel_2_API_30  --host=0.0.0.0 --address=localhost
# real device
ionic capacitor run android --device
```

# Permissions
```bash
# Android, in AndroidManifest.xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

# Install .apk manually on a device
```bash
# Turn on the Develpment Mode on the device (click on service number 5 times) and enable USB transfer
$ cd %ANDROID_SDK_ROOT%/platform-tools
# connect your Device with an USB cable
$ adb devices
$ adb start-server
$ adb install <path-to-project>\android/app/build/outputs/apk/debug\app-debug.apk
```
# Remote Debugging the Android Device App
```bash
chrome://inspect#devices
```


# Debug emulator or build process versions
```bash
npx cap doctor
```

# Workaround for old plugins for AndroidX (avoid using those)
```bash
npm install -D jetifier
npx jetify
npx cap sync android
```

# Build
```bash 
ionic capacitor build android
```

# 3. Tests
... to be added
