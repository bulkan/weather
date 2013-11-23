var should = require('chai').should()
  , sinon = require('sinon')
  , r = require('request')
  , Weather = require('../lib/weather');


describe('Weather', function(){
  it('class instantiates correctly', function(done){
    var w = new Weather('apikey');
    done();
  });

});
