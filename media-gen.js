#! /usr/bin/env node
"use strict";
var gm = require('gm'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    fs = require('fs'),
    config;

function resize(width, height, bgColour, imagePath, outputFilename, outputPath) {
    gm(path.join(process.cwd(), imagePath)).size(function (error, size) {
        if (error) {
            console.error("GM Error", error);
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

            mkdirp(path.join(process.cwd(), "platforms", outputPath), function (err) {
                image.background(bgColour)
                    .gravity('Center')
                    .extent(width, height)
                    .write(path.join(process.cwd(), "platforms", outputPath, outputFilename), function (error) {
                        if (error) {
                            console.error("Write file error", error);
                        } else {
                            console.log(this.outname);
                        }
                    });
            });
        }
    });
}

var iOSProjectName;


function generate() {


//Get iOS Project Path
    fs.readdir(path.join(process.cwd(), "platforms", "ios"), function (err, result) {
        if (err) {
            console.log("Error getting iOS path", err);
        } else {
            result.forEach(function (item) {
                var match = item.match(/(.+?)(\.[^.]*$|$)/i);
                if (match[2] == ".xcodeproj") {
                    iOSProjectName = match[1];
                    //console.log("Detected iOS Project Name", iOSProjectName);
                }
            });
        }




        var images = [
            //IOS Icons
            {width: 120, height: 120, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-60@2x.png"},
            {width: 40, height: 40, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-40.png"},
            {width: 80, height: 80, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-40@2x.png"},
            {width: 50, height: 50, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-50.png"},
            {width: 100, height: 100, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-50@2x.png"},
            {width: 60, height: 60, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-60.png"},
            {width: 72, height: 72, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-72.png"},
            {width: 114, height: 114, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-72@2x.png"},
            {width: 76, height: 76, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-76.png"},
            {width: 152, height: 152, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-76@2x.png"},
            {width: 29, height: 29, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-small.png"},
            {width: 58, height: 58, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon-small@2x.png"},
            {width: 57, height: 57, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon.png"},
            {width: 114, height: 114, path: "ios/" + iOSProjectName + "/Resources/icons", filename: "icon@2x.png"},

            //iOS Spash
            {width: 640, height: 1136, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default-568h@2x~iphone.png"},
            {width: 2048, height: 1536, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default-Landscape@2x~ipad.png"},
            {width: 1024, height: 768, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default-Landscape~ipad.png"},
            {width: 1536, height: 2048, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default-Portrait@2x~ipad.png"},
            {width: 768, height: 1024, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default-Portrait~ipad.png"},
            {width: 640, height: 960, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default@2x~iphone.png"},
            {width: 320, height: 480, path: "ios/" + iOSProjectName + "/Resources/splash", filename: "Default~iphone.png"},

            //Android Icon & Splash
            {width: 96, height: 96, path: "android/res/drawable", filename: "icon.png"},
            {width: 72, height: 72, path: "android/res/drawable-hdpi", filename: "icon.png"},
            {width: 800, height: 480, path: "android/res/drawable-land-hdpi", filename: "screen.png"},
            {width: 320, height: 200, path: "android/res/drawable-land-ldpi", filename: "screen.png"},
            {width: 480, height: 320, path: "android/res/drawable-land-mdpi", filename: "screen.png"},
            {width: 1280, height: 720, path: "android/res/drawable-land-xhdpi", filename: "screen.png"},
            {width: 36, height: 36, path: "android/res/drawable-ldpi", filename: "icon.png"},
            {width: 48, height: 48, path: "android/res/drawable-mdpi", filename: "icon.png"},
            {width: 480, height: 800, path: "android/res/drawable-port-hdpi", filename: "screen.png"},
            {width: 200, height: 320, path: "android/res/drawable-port-ldpi", filename: "screen.png"},
            {width: 320, height: 480, path: "android/res/drawable-port-mdpi", filename: "screen.png"},
            {width: 720, height: 1280, path: "android/res/drawable-port-xhdpi", filename: "screen.png"},
            {width: 96, height: 96, path: "android/res/drawable-xhdpi", filename: "icon.png"},


            //Android Icon & Splash (/bin/res)
            {width: 96, height: 96, path: "android/bin/res/drawable", filename: "icon.png"},
            {width: 72, height: 72, path: "android/bin/res/drawable-hdpi", filename: "icon.png"},
            {width: 800, height: 480, path: "android/bin/res/drawable-land-hdpi", filename: "screen.png"},
            {width: 320, height: 200, path: "android/bin/res/drawable-land-ldpi", filename: "screen.png"},
            {width: 480, height: 320, path: "android/bin/res/drawable-land-mdpi", filename: "screen.png"},
            {width: 1280, height: 720, path: "android/bin/res/drawable-land-xhdpi", filename: "screen.png"},
            {width: 36, height: 36, path: "android/bin/res/drawable-ldpi", filename: "icon.png"},
            {width: 48, height: 48, path: "android/bin/res/drawable-mdpi", filename: "icon.png"},
            {width: 480, height: 800, path: "android/bin/res/drawable-port-hdpi", filename: "screen.png"},
            {width: 200, height: 320, path: "android/bin/res/drawable-port-ldpi", filename: "screen.png"},
            {width: 320, height: 480, path: "android/bin/res/drawable-port-mdpi", filename: "screen.png"},
            {width: 720, height: 1280, path: "android/bin/res/drawable-port-xhdpi", filename: "screen.png"},
            {width: 96, height: 96, path: "android/bin/res/drawable-xhdpi", filename: "icon.png"},

            //Android Icon & Splash (/ant-build/res)
            {width: 96, height: 96, path: "android/ant-build/res/drawable", filename: "icon.png"},
            {width: 72, height: 72, path: "android/ant-build/res/drawable-hdpi", filename: "icon.png"},
            {width: 800, height: 480, path: "android/ant-build/res/drawable-land-hdpi", filename: "screen.png"},
            {width: 320, height: 200, path: "android/ant-build/res/drawable-land-ldpi", filename: "screen.png"},
            {width: 480, height: 320, path: "android/ant-build/res/drawable-land-mdpi", filename: "screen.png"},
            {width: 1280, height: 720, path: "android/ant-build/res/drawable-land-xhdpi", filename: "screen.png"},
            {width: 36, height: 36, path: "android/ant-build/res/drawable-ldpi", filename: "icon.png"},
            {width: 48, height: 48, path: "android/ant-build/res/drawable-mdpi", filename: "icon.png"},
            {width: 480, height: 800, path: "android/ant-build/res/drawable-port-hdpi", filename: "screen.png"},
            {width: 200, height: 320, path: "android/ant-build/res/drawable-port-ldpi", filename: "screen.png"},
            {width: 320, height: 480, path: "android/ant-build/res/drawable-port-mdpi", filename: "screen.png"},
            {width: 720, height: 1280, path: "android/ant-build/res/drawable-port-xhdpi", filename: "screen.png"},
            {width: 96, height: 96, path: "android/ant-build/res/drawable-xhdpi", filename: "icon.png"},

            //Android Store Icons
            {width: 512, height: 512, path: "../Media/android/store", filename: "512.png"},
            {width: 1024, height: 500, path: "../Media/android/store", filename: "1024x500.png"},
            {width: 180, height: 120, path: "../Media/android/store", filename: "180x120.png"},

            //Apple store icons
            {width: 1024, height: 1024, path: "../Media/ios/store", filename: "1024x1024-AppIcon.png"}

        ];

        if(config.customImages){
            config.customImages.forEach(function (item) {
                images.push(item);
            });
        }



        if (!process.argv[2] && !config.image) {
            console.log('You must specify a filename as the second argument, or in a config file');
        } else if (!process.argv[3] && !config.background) {
            console.log("Please specify a background colour in hex values as the third argument, or in a config file");
        } else {
            console.log("------------------------------");
            console.log("   cordova-media-generator");
            console.log("------------------------------");
            console.log("Generating " + images.length + " images so you don't have to");
            console.log("------------------------------");
            images.forEach(function (image) {
                var background, sourceImage;
                if(process.argv[3]){
                    background = process.argv[3];
                } else {
                    background = config.background;
                }

                if(process.argv[2]){
                    sourceImage = process.argv[2];
                } else {
                    sourceImage = config.image;
                }
                resize(image.width, image.height, '#' + background, sourceImage, image.filename, image.path);
            });
        }
    });
}

function genConfig() {
    var destFile = path.join(process.cwd(), "mediagen-config.json"),
        sourceFile = path.join(__dirname, "mediagen-config.json");
    fs.createReadStream(sourceFile).pipe(fs.createWriteStream(destFile));
}

try {
    config = require(process.cwd() + "/mediagen-config");
} catch (e){
    console.log("Could not find configuration file. To create one run `$ mediagen init`");
}

switch (process.argv[2]) {
    case "init":
        genConfig();
        break;
    default:
        generate();
}
