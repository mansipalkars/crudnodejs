const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

module.exports = multer({ storage, fileFilter });
