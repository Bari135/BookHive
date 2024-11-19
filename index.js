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

app.set('view engine', 'ejs');
app.set('views', './views');

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
        res.redirect(`/users/${savedUser._id}/books`);
    } catch (err) {
        return res.json({ error: 'Server error' });
    }
});
  
app.get('/users/:_id/books', async(req, res) => {
    const userId = req.params._id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.json({message: 'user not found'});
        
        res.render('books', { username: user.username, userId: userId });
    } catch (err) {
        res.json({message: 'server error'});
    }
});


app.get('/users/:_id/loadBooks', async (req, res) => {
    const userId = req.params._id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.json({message: 'user not found'});
        res.json(user.books);
    } catch (err) {
        console.error(err);
        res.json({message: 'server error'});
    }
});

app.post('/users/:_id/addbook', async(req, res) => {
    const userId = req.params._id;
    const { booktitle } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) return res.json({message: 'user not found'});

        const newBook = new Book({ title: booktitle });
        user.books.push(newBook);
        await user.save();
        res.json({message: 'book added successfully', books: user.books});
    } catch (err) {
        console.error(err);
        res.json({message: 'server error'});
    }
});

app.post('/users/:_id/books/:bookId/notes', async(req, res) => {
    const userId = req.params._id;
    const bookId = req.params.bookId;
    const { title, content } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) return res.json({message: 'user not found'});

        // Find the book in the user's books array
        const book = user.books.id(bookId);
        if (!book) return res.json({message: 'book not found'});

        // Create and add the new note
        const newNote = new Note({
            userId,
            title,
            content
        });

        book.notes.push(newNote);
        await user.save();
        
        res.json({
            message: 'note added successfully',
            book: book
        });
    } catch (err) {
        console.error(err);
        res.json({message: 'server error'});
    }
});

app.get('/users/:_id/books/:bookId/notes', async(req, res) => {
    const userId = req.params._id;
    const bookId = req.params.bookId;
    
    try {
        const user = await User.findById(userId);
        if (!user) return res.json({message: 'user not found'});

        const book = user.books.id(bookId);
        if (!book) return res.json({message: 'book not found'});

        res.json(book.notes);
    } catch (err) {
        console.error(err);
        res.json({message: 'server error'});
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});