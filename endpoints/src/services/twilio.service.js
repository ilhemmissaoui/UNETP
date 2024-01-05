import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

export default twilioClient;
