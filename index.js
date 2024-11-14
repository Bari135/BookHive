const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { times, uniq } = require('ramda');


require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

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
});
const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    books: { type: [bookSchema]}
  });



const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Note = mongoose.model('Note', noteSchema);

app.post('/register', async(req, res) => {
    const { username, email } = req.body;
    
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({ message: 'Email already in use' });
        }
        
        const newUser = new User({ username, email });
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser); 
        return res.json({ message: 'User registered successfully', userId: savedUser._id });
    } catch (err) {
        return res.json({ error: 'Server error' });
    }
});

app.get('/users/:_id/books', async(req, res)=>{
    const userId = req.params._id;
    try {
        const user = await User.findById(userId);
        if (!user) res.json({message: 'user not found'});
        res.json(user.books);

    } catch (err){
        res.json({message: 'server error'});
    }
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});