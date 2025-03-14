const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Crear las carpetas si no existen
const createFolders = (folders) => {
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  });
};
createFolders(["public/uploads/user_avatar"]);

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "public/uploads/user_avatar"

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre único
  }
});

const upload = multer({ storage });

module.exports = upload;
