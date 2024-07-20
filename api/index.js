const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send({ message: 'User created' });
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

  // Exclude the password from the user data
  const { password: userPassword, ...userData } = user.toObject();

  res.send({ token, user: userData });
});

// Support form endpoint

// forget-password endpoint



app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.get('/', (req, res) => {
  res.send('Server is running..');
})


module.exports = app;