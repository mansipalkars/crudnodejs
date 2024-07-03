const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb://127.0.0.1:27017/Book_Stall';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected successfully to server');
});
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/books', bookRoutes);

app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
