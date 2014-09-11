cordova-media-generator
=======================

CLI Utility that generates Cordova / Phonegap image assets required for app store submission, icons, and splash screens.

Usage:

with NodeJS installed:

```bash
$ npm install -g cordova-media-generator
```

Once installed, cd to the root of your codova application and run:
```bash
$ mediagen <logofilename.jpg> <backgroundcolourinhex-egFFF>
```

EXAMPLE:
```bash
$ mediagen logo.jpg fff
```

This will overwrite all images in the platforms/ directory with the correct sizes and in the correct location for Cordova
The recommended image / logo size if 2000x2000 or so. Its not a problem if the logo isn't square.