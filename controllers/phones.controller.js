const db = require('../database/models');

let phonesControllers = {
  index: async (req, res) => {

    db.Product.findAll({ // metodo para llamar todas las col de una tabla
      // Consulta anidada (JOIN) de productos junto a su marca y modelo
      include: [
        {
          model: db.Brand,
          required: true,
          attributes: ['brand_name'] //col del nombre de la marca
        },
        {
          model: db.Model,
          required: true,
          attributes: ['model'] // col del modelo
        },
      ],
      order: [['id', 'ASC']],
      raw: true,
      nest: true // Para que los resultados sean más estructurados
    })
      .then((data) => {
        if (!data) {
          res.status(404).send('No se encuentran Productos')
        }
        // return res.send(data)
        // console.log(data);
        const phones = data;
        res.render('./index/fetch-phones', { title: "Phones", phones });
      })
      .catch((e) => {
        console.log(e);
        return res.send(e);
      })
  },

  show: (req, res) => {
    const id = req.params.id
    db.Product.findByPk(id, {// metodo para filtrar producto por PK, en este caso el id.
      // Consulta anidada (JOIN) de 1 producto junto a su marca, modelo y colores del producto
      include: [
        {
          model: db.Brand,
          required: true,
          attributes: ['brand_name'] // marca del telefono
        },
        {
          model: db.Model,
          required: true,
          attributes: ['model'] // nombre del modelo de telefono
        },
        {
          model: db.ProductColor,
          required: true,
          include: [{
            model: db.Color,
            required: true,
            attributes: ['color'] //col nombre del color
          }]
        },
      ],
      order: [['id', 'ASC']],
      
    })
      .then((data) => {
        if (!data) {
          res.status(404).send('Producto no encontrado')
        }
        // return res.send(data)
        const colors = data.ProductColors.map(pc => pc.Color.color)        
        const item = data;
        res.render('./index/details', { title: 'Detalles del Producto', item, colors });
      })
      .catch((e) => {
        console.log(e);
        return res.send(e);
      })
  },
}

module.exports = phonesControllers