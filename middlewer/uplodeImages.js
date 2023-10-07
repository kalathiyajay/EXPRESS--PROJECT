const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {        // PDF Remove Space
      cb(null, `${Date.now()}_${file.originalname.replaceAll(" ","_")}`);
    }
  })
  
  const upload = multer({ storage: storage })


module.exports =upload;