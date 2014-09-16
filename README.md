cordova-media-generator
=======================

CLI Utility that generates Cordova / Phonegap image assets required for app store submission, icons, and splash screens.

Usage:

with NodeJS installed:

```bash
$ npm install -g cordova-media-generator
```

Once installed, cd to the root of your Cordova application and run:
```bash
$ mediagen <logofilename.jpg> <backgroundcolourinhex-egFFF>
```

EXAMPLE:
```bash
$ mediagen logo.jpg fff
```

This will overwrite all images in the platforms/ directory with the correct sizes and in the correct location for Cordova
The recommended image or logo size is 2000px x 2000px. Its not a problem if the logo isn't square.

It also creates a <projectdir>/Media directory that has images for the Apple and Android stores such as an app icon.