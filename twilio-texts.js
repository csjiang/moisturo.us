var config = require('./config');
var client = require('twilio')(config.accountSid, config.authToken);

//for sending intervaled sms in the future 
module.exports.sendSms = function(to, message) {

	client.sms.messages.create({
	    to: to,
	    from: config.sendingNumber,
	    body: message,
	}, function(error, message) {

	    if (!error) {

	        console.log('Success! The SID for this SMS message is:');
	        console.log(message.sid);
	 
	        console.log('Message sent on:');
	        console.log(message.dateCreated);
	    } else {
	        console.log('Oops! There was an error.');
	    }
	});




}
