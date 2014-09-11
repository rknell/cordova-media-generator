#! /usr/bin/env node

var gm = require('gm'),
    mkdirp = require('mkdirp'),
    path = require('path');

function resize(width, height, bgColour, imagePath, outputFilename, outputPath) {
    gm(path.join(__dirname, imagePath)).size(function (error, size) {
        if (error) {
            console.error(error);
        } else {
            // current image size
            var imageWidth = size.width;
            var imageHeight = size.height;
            var ratio = width / height,
                imageRatio = imageWidth / imageHeight;
            var image = this;

            // center placement
            if (ratio >= 1) {
                //Landscape or square
                var newWidth = height * imageRatio;

                console.log(newWidth, width, outputFilename);

                if (newWidth >= width) {
                    this.resize(width);
                } else {
                    this.resize(null, height);
                }


            } else {
                var newHeight = width / imageRatio;

                if (newHeight >= height) {
                    this.resize(null, height);
                } else {
                    this.resize(width);
                }

            }

            var x = (width / 2) - (imageWidth / 2);
            var y = (height / 2) - (imageHeight / 2);
            console.log(x, y);

            mkdirp(__dirname + "/Resources/" + outputPath, function (err) {
                image.background(bgColour)
                    .gravity('Center')
                    .extent(width, height)
                    .write(__dirname + "/" + outputPath + "/" + outputFilename, function (error) {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(this.outname);
                        }
                    });
            });
        }
    });
}

var images = [
    //IOS Icons
    {width: 120, height: 120, path: "ios/Resources/icons", filename: "icon-60@2x.png"},
    {width: 40, height: 40, path: "ios/Resources/icons", filename: "icon-40.png"},
    {width: 80, height: 80, path: "ios/Resources/icons", filename: "icon-40@2x.png"},
    {width: 50, height: 50, path: "ios/Resources/icons", filename: "icon-50.png"},
    {width: 100, height: 100, path: "ios/Resources/icons", filename: "icon-50@2x.png"},
    {width: 60, height: 60, path: "ios/Resources/icons", filename: "icon-60.png"},
    {width: 72, height: 72, path: "ios/Resources/icons", filename: "icon-72.png"},
    {width: 114, height: 114, path: "ios/Resources/icons", filename: "icon-72@2x.png"},
    {width: 76, height: 76, path: "ios/Resources/icons", filename: "icon-76.png"},
    {width: 152, height: 152, path: "ios/Resources/icons", filename: "icon-76@2x.png"},
    {width: 29, height: 29, path: "ios/Resources/icons", filename: "icon-small.png"},
    {width: 58, height: 58, path: "ios/Resources/icons", filename: "icon-small@2x.png"},
    {width: 57, height: 57, path: "ios/Resources/icons", filename: "icon.png"},
    {width: 114, height: 114, path: "ios/Resources/icons", filename: "icon@2x.png"},

    //iOS Spash
    {width: 640, height: 1136, path: "ios/Resources/splash", filename: "Default-568h@2x~iphone.png"},
    {width: 2048, height: 1536, path: "ios/Resources/splash", filename: "Default-Landscape@2x~ipad.png"},
    {width: 1024, height: 768, path: "ios/Resources/splash", filename: "Default-Landscape~ipad.png"},
    {width: 1536, height: 2048, path: "ios/Resources/splash", filename: "Default-Portrait@2x~ipad.png"},
    {width: 768, height: 1024, path: "ios/Resources/splash", filename: "Default-Portrait~ipad.png"},
    {width: 640, height: 960, path: "ios/Resources/splash", filename: "Default@2x~iphone.png"},
    {width: 320, height: 480, path: "ios/Resources/splash", filename: "Default~iphone.png"},

    //Android Icon
    {width: 96, height: 96, path: "android/res/drawable", filename: "icon.png"},
    {width: 72, height: 72, path: "android/res/drawable-hdpi", filename: "icon.png"},
    {width: 36, height: 36, path: "android/res/drawable-ldpi", filename: "icon.png"},
    {width: 48, height: 48, path: "android/res/drawable-mdpi", filename: "icon.png"},
    {width: 96, height: 96, path: "android/res/drawable-xhdpi", filename: "icon.png"},

    //Android Store Icons
    {width: 512, height: 512, path: "android/store", filename: "512.png"},
    {width: 1024, height: 500, path: "android/store", filename: "1024x500.png"},
    {width: 180, height: 120, path: "android/store", filename: "180x120.png"}
];


if (!process.argv[2]) {
    console.log('You must specify a filename as the second argument');
} else if (!process.argv[3]) {
    console.log("Please specify a background colour in hex values as the third argument");
} else {
    images.forEach(function (image) {
        resize(image.width, image.height, '#' + process.argv[3], process.argv[2], image.filename, image.path);
    });
}

