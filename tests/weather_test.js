var should = require('chai').should()
  , sinon = require('sinon')
  , request = require('request')
  , apiKey = require('../wunderground').key
  , Weather = require('../lib/weather')
  , fixtures = require('./fixtures')
  , conditions =  fixtures.conditions;

describe('Weather', function(){

  it('class instantiates correctly', function(done){
    var w = new Weather(apiKey);
    done();
  });

  describe('mocked request', function(){
    before(function(done){
      sinon.stub(request, 'get')
      .yields(null, null, JSON.stringify(conditions));
      done();
    });

    after(function(done){
     request.get.restore();
     done();
    });

    it('can get the condition', function(done){
      var w = new Weather(apiKey);

      w.condition('Australia', 'Melbourne', function(err, conditionData){
        if (err) return done(err);
        request.get.should.have.been.calledOnce;
        conditionData.should.have.property('current_observation');
        done();
      });
    });
  });

  describe('negative tests', function(){
    var w;

    before(function(done){
      w = new Weather(apiKey);
      done();
    });

    it('when returned data is empty and missing `current_observation`', function(done){
      sinon.stub(request, 'get').yields(null, null, JSON.stringify(''));
      request.get.should.have.been.calledOnce;

      w.condition('Australia', 'Melbourne', function(err, conditionData){
        err.should.not.be.null;
        request.get.restore();
        done();
      });

    });
  });

});
