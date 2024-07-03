const express = require('express');
const router = express.Router();
const multer = require('../config/multer');
const Book = require('../models/book');

router.post('/', multer.single('img'), async (req, res) => {
    try {
        const { name, summary } = req.body;
        const imgPath = req.file.path;

        const newBook = new Book({ name, imgPath, summary });
        await newBook.save();

        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (err) {
        console.error('Failed to create book:', err);
        res.status(500).json({ message: 'Failed to create book', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error('Failed to fetch books:', err);
        res.status(500).json({ message: 'Failed to fetch books', error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        console.error('Failed to fetch book:', err);
        res.status(500).json({ message: 'Failed to fetch book', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (err) {
        console.error('Failed to delete book:', err);
        res.status(500).json({ message: 'Failed to delete book', error: err.message });
    }
});

router.put('/:id', multer.single('img'), async (req, res) => {
    const { id } = req.params;
    const { name, summary } = req.body;
    
    try {
        let imgPath = '';

        // Check if a new image file is uploaded
        if (req.file) {
            imgPath = req.file.path;
        } else {
            // If no new image file, retain the existing image path (if you have one)
            const existingBook = await Book.findById(id);
            imgPath = existingBook.imgPath;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, summary, imgPath },
            { new: true } // To return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        console.error('Failed to update book:', err);
        res.status(500).json({ message: 'Failed to update book', error: err.message });
    }
});

module.exports = router;
