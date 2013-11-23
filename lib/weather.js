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

  request.get(_url, function(error, response, body){
    if (error) return callback(error);

    var data;
    try {
      // expect body to be json
      data = JSON.parse(body);
    } catch (e) {
      return callback(e);
    }

    if (!data.hasOwnProperty('current_observation'))
      return callback(new Error('return data does not have a `current_observation` key'));

    callback(null, data);

  });
};

module.exports = Weather;
