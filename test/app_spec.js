var expect = require('chai').expect;
var mediaGen = require('../media-gen');


describe('main app', function () {
  this.timeout(5000);
  describe('__resize', function () {
    it('should not error out', function (done) {
      mediaGen.__resize(10, 10, "#fff", "./icon.png", "output2.png", "./")
        .then(function(result){
          console.log(result);
          expect(result).to.exist;
          done();
        })
        .catch(done)
    })
  })

  describe('__generate', function(){
    it('should not error out', function(done){
      mediaGen.__generate()
        .then(function(result){
          done()
        })
        .catch(done)
    })
  })

  describe('__genConfig', function(){
    it('should not error out', function(done){
      mediaGen.__genConfig()
        .then(function(result){
          expect(result).to.equal("success");
          done();
        })
        .catch(done);
    })
  })
})
