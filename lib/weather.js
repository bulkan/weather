/**
 * Abstract out the weather api service
 */

var request = require('request');


/**
 * Constructor for Wunderground
 */
var Weather = function(apiKey){
  if (typeof this !== 'function') return new Weather(apiKey);
  this.apiKey = apiKey;
};

module.exports = Weather;
