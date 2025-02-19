import multer from "multer";
import path from "path";

// Disk storage setup to store files in a specific folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/profile-pictures');  // Destination folder (ensure it exists)
    },
    filename: (req, file, cb) => {
        // Creating a unique filename using original name and current timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Save file with a unique name
    }
});

// Create multer instance for file upload
export const singleUpload = multer({ storage }).single("file");  // field name is "file" for single file upload
