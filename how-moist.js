const rp = require('request-promise');
const moment = require('moment');
const config = require('./config');

const generateMessage = (zip) => {
  let message = ''; 

  const zipCode = zip.toString();

  const appId = config.appId; 
  const options = {
    uri: `http://api.wunderground.com/api/${appId}/geolookup/conditions/q/${zipCode}.json`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };

  return rp(options)
  .then(data => {
    //return the appropriate message based on humidity 
    const humidity = data.current_observation.relative_humidity;
    const moistMessage = `Humidity for today is ${humidity}... not quite dry enough to require moisturizing, but moisturo.us wishes you a most beautiful and moist day!`;
    const dryMessage = `Oh, dear! Relative humidity in your area today is only ${humidity}% ... please remember to apply moisturizer liberally and frequently to provide dry skin! Also, moisturo.us wishes you a most beautiful and moist day!`;

    parseInt(humidity.match(/\d+/)) < 50 
    ? message = dryMessage
    : message = moistMessage

    return message;
  });
};


module.exports = generateMessage;