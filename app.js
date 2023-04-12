const express = require('express');
const verifyApiKey = require('./middleware/verifyApiKey');
const app = express();
require('dotenv').config();

const AWS = require('aws-sdk');


app.use(express.json()); // middleware to parse JSON request bodies
app.post('/', verifyApiKey, async (req, res) => {
  try {
    console.log("Message = " + req.body.message);
    console.log("Number = " + req.body.number);
    console.log("Subject = " + req.body.subject);
    
    const params = {
      Message: req.body.message,
      PhoneNumber: '+' + req.body.number,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          'DataType': 'String',
          'StringValue': req.body.subject
        }
      }
    };
    
    const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
    const data = await sns.publish(params).promise();
    const response = {
        // get country code from number query param
        countryCode: req.body.number.substring(0, 2),
        // get phone number from number query param
        phoneNumber: req.body.number.substring(2),
        // get message id from data
        messageId: data.MessageId,
        // get request id from data
        requestId: data.ResponseMetadata.RequestId,
    };
    res.json(response);
      
    // res.end(JSON.stringify({ MessageID: data.MessageId }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('AWS SNS SMS OTP Service Listening on PORT 3000'));