import multer from "multer";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const path = require('path');

// Get the directory name of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.join(__dirname, 'uploads'); // Corrected path
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}.${file.originalname}`;
        callback(null, filename);
    }
});

// Filter
const fileFilter = (req, file, callback) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Only .png .jpg & .jpeg formatted Allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;
