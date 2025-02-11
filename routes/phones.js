var express = require('express');
const { title } = require('process');
var router = express.Router();
const path = require('path');
const fs = require('fs');


/* GET home page. */

router.get('/', async function (req, res, next) {

  // console.log(src);
  
  let leerJSON = async (src) => {
    try {
      const data = await fs.readFileSync(src, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo JSON: ', error);
    }
  }
  
  try {
    
    let src = path.join(__dirname, '../DB/phones.json');
    const data = await leerJSON(src);
    
    let jsonString = JSON.stringify(data)
    let phones = JSON.parse(jsonString)
    
    res.render('./users/fetch-phones', { title: "Phones", phones });

  } catch (error) {
    res.status(500).json({error: 'Error al obtener telefonos'});
  }

  // let items = fetch('DB/phones.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     const phones = data.phones;
  //     const itemList = document.getElementById("item-list");
  //     phones.forEach(phone => {
  //       const item = document.createElement("li");
  //       item.className = "item";
  //       item.innerHTML = `
  //                   <a href="/items/${phone.modelo.replace(/\s+/g, '-').toLowerCase()}">
  //                       <img src="${phone.imagen}" alt="${phone.modelo}" class="item-image">
  //                       <h2 class="item-title">${phone.marca} ${phone.modelo}</h2>
  //                       <p class="item-price">$${phone.precio}</p>
  //                   </a>
  //               `;
  //       itemList.appendChild(item);
  //     });
  //   })
  //   .catch(error => console.error("Error cargando los datos: ", error));
  // console.log(items);

  
});

// Ruta para obtener un producto por ID
router.get('/id/:id', function (req, res, next) {
  const id = req.params.id
  const src = path.join(__dirname, '../DB/phones.json');

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

          // Renderizar la vista y pasar el objeto del celular
          res.render('./users/details', { title: 'Detalles del Producto', item });

      } catch (parseError) {
          console.error("Error al analizar JSON:", parseError);
          return res.status(500).send("Error interno del servidor");
      }
  });
});


module.exports = router;
