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
createFolders(["public/uploads/product_image", "public/uploads/product_model"]);

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "";
        // Guardar las imagenes en /uploads/product_image    
        if (file.mimetype.startsWith("model/gltf-binary") || file.originalname.endsWith(".glb")) {
            uploadPath = "public/uploads/product_model";
        } else {
            uploadPath = "public/uploads/product_image";
        }   
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nombre único
    }

})

const upload = multer({ storage });
// console.log(upload);


module.exports = upload;
