var Weather  = require('../lib/weather')
  , apiKey = require('../wunderground').key
  , w = new Weather(apiKey);


module.exports.index = function(req, res){
  var link = req.query.link;
  if (!link) return res.send(404);

  w.condition(link, function(err, conditionData){
    if (err) {
      console.error(err);
      return res.send(500, err);
    }

    res.send(conditionData);
  });
};
