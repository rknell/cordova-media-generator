cordova-media-generator
=======================

CLI Utility that generates Cordova / Phonegap image assets required for app store submission, icons, and splash screens.

Usage:

with NodeJS installed:

[sudo] npm install -g cordova-media-generator

Once installed simply run:
mediagen <logofilename.jpg> <backgroundcolourinhex-egFFF>

It will create a subfolder /Resources

Which will contain images in the right format to go directly into the cordova app.

In the VERY near future the app will insert it into the right directories. There are also some new image formats that have come out recently to be updated... But in all its working and saves hours of time.