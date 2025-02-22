const express = require('express');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your actual Twilio Account SID, Auth Token, and Twilio phone number
const accountSid = 'AC5d1bd71dc2acbe2b1c4ee8ee0c5fa4e8';
const authToken = '371dc55d06da016b7bc0081d5a257292';
const twilioNumber = '+15178006582'; 

const client = twilio(accountSid, authToken);

// List of 5 mobile numbers to send the SOS message to
const sosNumbers = [
    '+919142958452'
];

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to trigger the SOS SMS
app.post('/sos', async (req, res) => {
    const messageBody = 'SOS Alert: I need help!';
    try {
        // Send the SMS to each number
        const smsPromises = sosNumbers.map(number => {
            return client.messages.create({
                body: messageBody,
                from: twilioNumber,
                to: number
            });
        });
        await Promise.all(smsPromises);
        res.status(200).send('SOS messages sent successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to send SOS messages');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});