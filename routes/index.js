var appKey = require('../wunderground').key;

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
    title: 'Weather',
    appKey: appKey
  });
};
