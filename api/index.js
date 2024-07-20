const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require("../routes/userRoutes");
const auth = require('../auth');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose
.connect("mongodb+srv://sherazmoiz9:FMGxSK0XXAOR42S0@cluster0.l6qfsrz.mongodb.net/buygold", {
})
.then((data) => {
  console.log(`Mongodb connected with server: ${data.connection.host}`);
});


const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
}));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User signup endpoint
app.use("/api/v1", user);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.get('/', (req, res) => {
  res.send('Server is running..');
})


module.exports = app;