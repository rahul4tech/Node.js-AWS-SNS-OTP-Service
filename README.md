# Node.js AWS SNS OTP Service

This is a Node.js application that demonstrates how to use the AWS SDK and the AWS SNS service to send a message for OTP.

## Dependencies

This application has the following dependencies:

- `aws-sdk: "^2.480.0"`
- `dotenv: "^8.0.0"`
- `express: "^4.17.1"`

You can install these dependencies by running the following command:

```bash
npm install
```


## Configuration

Before running the application, you need to set up your AWS credentials and SNS topic ARN. You can do this by creating a `.env` file in the root directory of the project based on the `.env.example` file. The values in the `.env` file will be used as environment variables in the application.

Here's an example `.env` file:

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_aws_region
SNS_TOPIC_ARN=your_sns_topic_arn
API_KEYS=Your_API_Keys1,Your_API_Keys2 #separated by comma (,) if you want to use multiple API keys
```
## Authentication

To use the OTP service, you need to include an API key in the request headers. The API key should match the value of the `API_KEY` environment variable in the `.env` file, Which Can Contain Multiple Keys based on Comma Separated. If the API key is not included in the request headers or does not match the expected value, the OTP service will return a 401 Unauthorized error.

## Usage

Once you have set up your AWS credentials and SNS topic ARN, you can start the OTP service by running the following command:

```bash
npm start
```

This will start the OTP service on port 3000. You can then send a message for OTP to the SNS topic by making a POST request to the following URL:

```bash
http://localhost:3000/send_otp
```

Include the following parameters in the request body:

message: The message for OTP
number: The phone number to send the OTP to (in international format, without any spaces or special characters)
subject: The sender ID to display on the receiver's phone
api_key: The API key for authentication (multiple keys can be separated by commas)
For example, to send an OTP message with the message "1234" to the phone number "+1234567890" with the sender ID "OTP" and an API key of "12345", you can make the following request:

```bash
POST http://localhost:3000/send_otp
Content-Type: application/json

{
    "message": "Your OTP is 1234",
    "number": "+1234567890",
    "subject": "OTP",
    "api_key": "some_api_key"
}
```


Note that the phone number should be in E.164 format, which removes the leading zero and adds the country code. For example, the mobile number "0678901234" in Spain should be formatted as "+34678901234".

The OTP service will send the message to the specified phone number using the AWS SNS message service. If the message is sent successfully, the response will include the MessageID of the message. If there is an error, the response will include an Error message.
