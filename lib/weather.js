/**
 * Abstract out the weather api service
 */

var request = require('request');

/**
 * Constructor for Wunderground
 */
var Weather = function(apiKey){
  if(!(this instanceof Weather)) return new Weather(offset);
  this.apiKey = apiKey;
};

module.exports = Weather;
