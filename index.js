require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const { loginModel, startMongoose } = require('./mongodb');
const templatePath = path.join(__dirname, '../template');
const twilio = require('twilio');


app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/kwr', (req, res) => {
    res.render('kwr');
});

app.get('/report', (req, res) => {
    res.render('report');
});

app.get('/track', (req, res) => {
    res.render('track');
});

app.get('/emergency', (req, resp) => {
    resp.render('emergency');
});

app.get('/home', (req, resp) => {
    resp.render('home2');
});

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
app.post('/emergency', async (req, res) => {
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

app.get('/maps', (req, resp) => {
    resp.render('maps');
});

app.post('/login', async (req, resp) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return resp.status(400).send('All fields are required');
    }

    const data = {
        name,
        email,
        password
    };

    
    // resp.json(data);

    try {
        const newdata = await loginModel.create(data);
        // resp.render('home2');
        resp.json(newdata);

    } catch (error) {
        console.error('Error inserting data:', error);
        resp.status(500).send('Internal Server Error');
    }
});

app.listen(5000, () => {
    startMongoose();
    console.log('Server is connected');
});