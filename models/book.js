const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
}, { collection: 'bookscollection' });

module.exports = mongoose.model('Book', bookSchema);
