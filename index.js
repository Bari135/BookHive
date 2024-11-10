const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { times } = require('ramda');


require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Date, default: Date.now }
    });
const bookSchema = new Schema({
  title: { type: String, required: true },
  notes: {type: [noteSchema]},
  followers
});
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    books: { type: [bookSchema]}
  });

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Log', logSchema);
const Note = mongoose.model('Note', noteSchema);

