import multer from "multer";

  import multer from "multer";

  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, "./public/temp");
      },
      filename: function (req, file, cb) {
          // Generating a unique word, you can use any method you prefer
          const uniqueWord = Math.random().toString(36).substring(7); // Generates a random 7-character string
          // Creating the new filename
          const newFilename = `${uniqueWord}_${file.originalname}`;
          cb(null, newFilename);
      }
  });
  
  export const upload = multer({ storage: storage });
  
