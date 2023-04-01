const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(process.env.MONGO_URL);


mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
})

module.exports = { connection }