import multer from "multer";

const storage = multer.diskStorage({
    filename : (req,file,callback) => {
        console.log(file.originalname);
        callback(null,file.originalname);
    }
});

const upload = multer({storage});

export default upload;