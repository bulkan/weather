/**
 * Abstract out the weather api service
 */

var request = require('request')
  , util = require('util');

/**
 * Constructor for Wunderground
 */
var Weather = function(apiKey){
  if(!(this instanceof Weather)) return new Weather(apiKey);

  this.apiKey = apiKey;
  this.apiUrl = util.format('http://api.wunderground.com/api/%s', this.apiKey);
};

/**
 * Get the weather condition for a city within a country
 */
Weather.prototype.condition = function(country, city, callback) {

  if(!country || !city) return callback(new Error('please provide country & city'));

  var _url = util.format('%s/conditions/q/%s/%s.json', this.apiUrl, country, city);

  request(_url, function(error, response, body){
    if (error) return callback(error);

    var data = JSON.parse(body);
    callback(null, data.current_observation);

  });
};

module.exports = Weather;
