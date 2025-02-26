const path = require('path');
const fs = require('fs');

let phonesControllers = {
    index: async (req, res) => {
        
        let leerJSON = async (src) => {
           try {
             const data = await fs.readFileSync(src, 'utf-8');
             return JSON.parse(data);
           } catch (error) {
             console.error('Error al leer el archivo JSON: ', error);
           }
         }
         
         try {
           
           let src = path.join(__dirname, '../data/products.json');
           const data = await leerJSON(src);
           
           let jsonString = JSON.stringify(data)
           let phones = JSON.parse(jsonString)
           
           res.render('./users/fetch-phones', { title: "Phones", phones });
       
         } catch (error) {
           res.status(500).json({error: 'Error al obtener telefonos'});
         }
   } , 

   show: (req, res) =>{
     const id = req.params.id
      const src = path.join(__dirname, '../data/products.json');
    
      // Leer el archivo listado.json
      fs.readFile(src, 'utf8', (err, data) => {
          if (err) {
              console.error("Error al leer el archivo JSON:", err);
              return res.status(500).send("Error interno del servidor");
          }
    
          try {
              const phones = JSON.parse(data);          
              // Buscar el celular que coincida con el ID
              const item = phones.find(phone => 
                  phone.id === id
              );
    
              if (!item) {
                  return res.status(404).render("error",{
                    error:{
                      message: 'Error al cargar pagina',
                      status: '404 Not Found',
                      stack: 'No se encontro el producto',
                    }
                  });
              }
              console.log(item.render);
              
              // Renderizar la vista y pasar el objeto del celular
              res.render('./users/details', { title: 'Detalles del Producto', item });
    
          } catch (parseError) {
              console.error("Error al analizar JSON:", parseError);
              return res.status(500).send("Error interno del servidor");
          }
      });
   },
}

module.exports = phonesControllers