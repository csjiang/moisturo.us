const generateMessage = (zipCode) => {

  var request = require('request');
  var moment = require('moment');
  // var config = require('./config');
  
  var appId = config.appId; 

  var uri = `http://api.wunderground.com/api/${appId}/conditions/q/${zipCode}.json`;
  
  request(uri, function(err, req, body){
    
    // parse response body
    var data = JSON.parse(body);

    //return the appropriate message based on humidity 
    const humidity = data.current_observation.relative_humidity;
    const moistMessage = `Humidity for today is ${humidity}... not quite dry enough to require moisturizing, but moisturo.us wishes you a most beautiful and moist day!`;
    const dryMessage = `Oh, dear! Relative humidity in your area today is only ${humidity}% ... please remember to apply moisturizer liberally and frequently to provide dry skin! Also, moisturo.us wishes you a most beautiful and moist day!`;
    humidity < 50 
    ? message = dryMessage
    : message = moistMessage

    return message;
  });
};

module.exports = generateMessage;
generateMessage(10128); //for testing