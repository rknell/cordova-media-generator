var screenshots = require('../screenshots'),
  assert = require("chai").assert,
  should = require('chai').should(),
  expect = require('chai').expect,
  chai = require("chai"),
  chaiAsPromised = require("chai-as-promised"),
  fs = require('fs');

chai.use(chaiAsPromised);

var settings = {
  url: 'http://www.google.com',
  width: 1280,
  height: 720,
  path: "Media/Google",
  fileName: '7Inch.png'
};

describe('Screenshots', function () {
  this.timeout(30000);
  describe('generate', function () {
    it('should return no errors', function (done) {
      return screenshots.generate(settings.url, settings.width, settings.height, 1, settings.path, settings.fileName).should.eventually.have.property("success").notify(done);
    });

    it('should have created a file', function (done) {
      fs.exists(settings.path + "/" + settings.fileName, function (result) {
        result.should.be.true;
        done();
      });
    });

    it('should die when nothing is supplied', function (done) {
      screenshots.generate()
        .then(function (result) {
          done("Should not have worked");
        })
        .catch(function (err) {
          expect(err).to.exist;
          done();
        });
    });
  });

  describe('generate all', function () {
    this.timeout(30000);
    screenshots.pages.push({url: "http://www.google.com", name: "home"});

    it('should return', function (done) {
      screenshots.generateAll().should.eventually.equal(true).notify(done);
    });

    it('should have created a file', function (done) {
      fs.exists("Media/android/screenshots/10in/android-10in-1280x720-google.png", function (result) {
        result.should.be.true;
        done();
      });
    });
  });

});
