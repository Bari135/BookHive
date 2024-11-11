const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { times, uniq } = require('ramda');


require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
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
    username: { type: String, required: true, unique: true},
    password: { type: String },
    email: { type: String, required: true, unique: true },
    books: { type: [bookSchema]}
  });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
            this.password = hash;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Note = mongoose.model('Note', noteSchema);

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    
    const existingUser = User.findOne({email}, (err, existingUser) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });
        
        const newUser = new User({ username, password, email });
        newUser.save((err, user) => {
            if (err) return res.status(500).json({ error: 'error saving user' });
            res.status(201).json({ message: 'User registered successfully', userId: user._id });
        });
    });
    
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

})