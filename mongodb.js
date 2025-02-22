const mongoose = require('mongoose');
require('dotenv').config();

const startMongoose = ()=>{
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connection Successful');
    })
    .catch((error) => {
        console.error('Connection Error:', error);
    });
}

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const loginModel = mongoose.model("login", loginSchema);

module.exports = {loginModel, startMongoose};