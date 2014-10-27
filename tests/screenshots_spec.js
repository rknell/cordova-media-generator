var screenshots = require('../screenshots'),
    assert = require("chai").assert,
    should = require('chai').should(),
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
}
describe('Screenshots', function () {
    describe('generate', function () {
        it('should return no errors', function (done) {
            return screenshots.generate(settings.url, settings.width, settings.height, settings.path, settings.fileName).should.eventually.have.property("success").notify(done);
        });

        it('should have created a file', function (done) {
            fs.exists(settings.path + "/" + settings.fileName, function (result) {
                result.should.be.true;
                done();
            })
        });

        it('should die when nothing is supplied', function (done) {
            return screenshots.generate().should.eventually.have.property("success").notify(done);
        });
    })

    describe('generate app', function () {

        screenshots.pages.push({url: "http://localhost:1337/app/#/app/home", name: "home"});

        it('should return', function (done) {
            screenshots.generateAll().should.eventually.equal(true).notify(done);
        })

        it('should have created a file', function (done) {

            fs.exists("Media/android/screenshots/10in/android-10in-1280x720-google.png", function (result) {
                result.should.be.true;
                done();
            })
        });
    })

});