var should = require('chai').should()
  , sinon = require('sinon')
  , r = require('request')
  , apiKey = require('../wunderground').key
  , Weather = require('../lib/weather');

describe('Weather', function(){
  it('class instantiates correctly', function(done){
    var w = new Weather(apiKey);
    done();
  });

  it('can get the condition', function(done){
    var w = new Weather(apiKey);
    w.condition('Australia', 'Melbourne', function(err, conditionData){
      if (err) return done(err);
      console.log(conditionData);
      done();
    });
  });

});
