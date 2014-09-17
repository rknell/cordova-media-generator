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

This will overwrite all images in the `<projectdir>/platforms` directory with the correct sizes and in the correct location for Cordova
> The recommended image or logo size is 2000px x 2000px. Its not a problem if the logo isn't square.

It also creates a `<projectdir>/Media` directory that has images for the Apple and Android stores such as an app icon.

## Custom Assets
You can create additional custom images if you need to submit to alternative app stores or have other needs that we haven't thought of yet.

Simply go to your project directory and run
```bash
$ mediagen init
```

It will create an example file called `mediagen-config.json` which you can now edit. Add as many or few files as you need to the array.

> Note: The default path for files is the `<projectdir>/platforms` directory, you might need to use `../` as in the example below

###Example `mediagen-config.json`
```javascript
[
    {"width": 120, "height": 120, "path": "../Media/custom/filename.png"}
]
```

