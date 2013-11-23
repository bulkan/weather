var Weather  = require('../lib/weather')
  , apiKey = require('../wunderground').key
  , w = new Weather(apiKey);


module.exports.index = function(req, res){
  w.condition('Australia', 'Melbourne', function(err, conditionData){
    if (err) {
      console.error(err);
      return res.send(500, err);
    }

    res.send(conditionData);
  });
};
