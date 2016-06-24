#! /usr/bin/env node
"use strict";
var gm = require('gm'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  fs = require('fs'),
  config, iOSProjectName,
  q = require('q');

function resize(width, height, bgColour, imagePath, outputFilename, outputPath) {
  var deferred = q.defer()
  gm(path.join(process.cwd(), imagePath)).size(function (error, size) {

    if (error) {
      console.error("GM Error", error);
      deferred.reject(error);
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

      mkdirp(path.join(process.cwd(), outputPath), function (err) {
        image.background(bgColour)
          .gravity('Center')
          .extent(width, height)
          .write(path.join(process.cwd(), outputPath, outputFilename), function (error) {
            if (error) {
              console.error("Write file error", error);
              deferred.reject(error);
            } else {
              console.log(this.outname);
              deferred.resolve(this.outname);
            }
          });
      });
    }

  });
  return deferred.promise;
}

function generate() {
  var deferred = q.defer();

  var images = require('./assets.json');

  if(!config){
    console.log("Please run `mediagen init` first to create a configuration file, edit that and re-run mediagen");
    return;
  }

  if (config.customImages) {
    config.customImages.forEach(function (item) {
      images.push(item);
    });
  }

  var totalImages = images.length;
  console.log("------------------------------");
  console.log("   cordova-media-generator");
  console.log("------------------------------");
  console.log("Generating " + totalImages + " images so you don't have to!");
  console.log("------------------------------");

  images.forEach(function (image) {
    var background, sourceImage;

    if (image.source) {
      sourceImage = image.source.filename;
      background = image.source.background;
    } else {
      if (image.path.indexOf("screen") === -1) {
        sourceImage = config.icon.filename;
        background = config.icon.background;
      } else {
        sourceImage = config.splash.filename;
        background = config.splash.background;
      }
    }
    if (sourceImage)
      resize(image.width, image.height, '#' + background, sourceImage, image.filename, image.path);
  });
  deferred.resolve();
  return deferred.promise;
}

function genConfig() {
  var deferred = q.defer();
  var destFile = path.join(process.cwd(), "mediagen-config.json");

  fs.writeFile(destFile, JSON.stringify({
    "icon": {"filename": "icon.png", "background": "fff"},
    "splash": {"filename": "splash.png", "background": "fff"},
    "customImages": [
      {
        "width": 120,
        "height": 120,
        "path": "res/custom",
        "filename": "outputFilename.png",
        "source": {"filename": "image.png", "background": "fff"}
      }
    ]
  }, null, 4), function (err) {
    deferred.resolve("success");
  });
  console.log("Created `mediagen-config.json` file in the current directory.");
  return deferred.promise;
}

try {
  config = require(process.cwd() + "/mediagen-config");
} catch (e) {
  if (process.argv[2] !== "init") {
    console.log("Could not find configuration file. To create one run `$ mediagen init`");
  }
}

switch (process.argv[2]) {
  case "init":
    genConfig();
    break;
  default:
    generate();
}

module.exports = {
  __resize: resize,
  __generate: generate,
  __genConfig: genConfig
};