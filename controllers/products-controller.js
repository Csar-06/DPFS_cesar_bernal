const db = require('../database/models');
const { Op } = require("sequelize");


const productsController = {
    index: (req, res) => {
        query = '';
        db.ProductColor.findAll({
            include: [
                {
                    model: db.Color,
                    require: true,
                    attributes: ['color']
                },
                {
                    model: db.Product,
                    require: true,
                    attributes: ['description', 'image', 'render', 'unit_price'],
                    include: [
                        {
                            model: db.Brand,
                            require: true,
                            attributes: ['brand_name']
                        },
                        {
                            model: db.Model,
                            required: true,
                            attributes: ['model']
                        },
                    ]
                },

            ]
        }).then((data) => {
            if (!data) {
                res.status(404).send('Productos no encontrados');
            }
            // return res.send(data);
            const products = data.map(d => {
                return p = {
                    id: d.id,
                    brand: d.Product.Brand.brand_name,
                    model: d.Product.Model.model,
                    color: d.Color.color,
                    stock: d.stock,
                    description: d.Product.description,
                    image: d.Product.image,
                    price: d.Product.unit_price,
                }

            });

            return res.render('./products/index', { title: 'CRUD', products, query });
        })
            .catch()
    },
    create: (req, res) => {
        res.render('products/create', { title: 'Create Product' });
    },
    show: (req, res) => {
        const id = req.params.id

        db.ProductColor.findByPk(id, {// metodo para filtrar producto por PK, en este caso el id.
            // Consulta anidada (JOIN) de 1 producto junto a su marca, modelo y colores del producto
            include: [
                {
                    model: db.Color,
                    require: true,
                    attributes: ['color']
                },
                {
                    model: db.Product,
                    require: true,
                    attributes: ['description', 'image', 'render', 'unit_price'],
                    include: [
                        {
                            model: db.Brand,
                            require: true,
                            attributes: ['brand_name']
                        },
                        {
                            model: db.Model,
                            required: true,
                            attributes: ['model']
                        },
                    ]
                },

            ]

        })
            .then((data) => {
                if (!data) {
                    res.status(404).send('Producto no encontrado')
                }
                const product = {
                    id: data.id,
                    brand: data.Product.Brand.brand_name,
                    model: data.Product.Model.model,
                    color: data.Color.color,
                    stock: data.stock,
                    description: data.Product.description,
                    image: data.Product.image,
                    render: data.Product.render,
                    price: data.Product.unit_price,
                };

                return res.render('products/show', { title: product.brand + ' ' + product.model, product });
            })
            .catch((e) => {
                console.log(e);
                return res.send(e);
            })

    },
    store: async (req, res) => {
        try {

            const { brand, model, description, price, colors, stock } = req.body;
            console.log(req.files.image); // Para depurar
            console.log(req.files.render); // Para depurar

            //Verificar si los archivos existen antes de acceder a ellos
            const imagePath = req.files.image ? `/uploads/product_image/${req.files.image[0].originalname}` : null;
            const renderPath = req.files.render ? `/uploads/product_model/${req.files.render[0].originalname}` : null;

            // Buscar o crear la marca
            let brand_name = await db.Brand.findOne({ where: { brand_name: brand } });
            if (!brand_name) {
                brand_name = await db.Brand.create({ brand });
            }

            // Buscar o crear el modelo
            let model_name = await db.Model.findOne({ where: { model: model } });
            if (!model_name) {
                model_name = await db.Model.create({ brand_id: brand_name.id, model: model });
            }
            // console.log(brand_name); // depuración
            // console.log(model_name); // depuración

            // Crear el producto
            const product = await db.Product.create({
                brand_id: brand_name.id,
                model_id: model_name.id,
                description,
                unit_price: parseFloat(price),
                image: imagePath,
                render: renderPath
            });

            // Buscar o crear el color
            let color = await db.Color.findOne({ where: { color: colors } });
            if (!color) {
                color = await db.Color.create({ color: colors });
            }

            // Crear la relación en ProductColor
            const productColor = await db.ProductColor.create({
                product_id: product.id,
                color_id: color.id,
                stock: parseInt(stock)
            });

            console.log({// Debuggin
                message: "Producto creado exitosamente",
                product: {
                    id: product.id,
                    brand: brand_name.brand_name,
                    model: model_name.model,
                    description: product.description,
                    price: product.unit_price,
                    image: product.image,
                    render: product.render,
                    color: color.color,
                    stock: productColor.stock
                }
            });

            return res.redirect('/products')

        } catch (error) {
            console.error("Error al crear el producto:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    edit: (req, res) => {
        let id = req.params.id
        db.ProductColor.findByPk(id, {// metodo para filtrar producto por PK, en este caso el id.
            include: [
                {
                    model: db.Color,
                    require: true,
                    attributes: ['color']
                },
                {
                    model: db.Product,
                    require: true,
                    attributes: ['description', 'image', 'render', 'unit_price'],
                    include: [
                        {
                            model: db.Brand,
                            require: true,
                            attributes: ['brand_name']
                        },
                        {
                            model: db.Model,
                            required: true,
                            attributes: ['model']
                        },
                    ]
                },

            ]

        })
            .then((data) => {
                if (!data) {
                    res.status(404).send('Producto no encontrado')
                }
                // return res.send(data)
                const product = {
                    id: data.id,
                    brand: data.Product.Brand.brand_name,
                    model: data.Product.Model.model,
                    color: data.Color.color,
                    stock: data.stock,
                    description: data.Product.description,
                    image: data.Product.image,
                    render: data.Product.render,
                    price: data.Product.unit_price,
                };
                console.log(product);

                res.render('products/edit', { title: 'Edit Product', product });
            })
            .catch((e) => {
                console.log(e);
                return res.send(e);
            })


    },
    update: async (req, res) => {
        try {
            const { brand, model, description, price, colors, stock } = req.body;
            const id = req.params.id;
            console.log(id);

            console.log(req.files.image); // Para depurar
            console.log(req.files.render); // Para depurar

            const productColor = await db.ProductColor.findByPk(id, {
                include: [
                    { model: db.Product, include: [{ model: db.Brand }, { model: db.Model }] },
                    { model: db.Color }
                ]
            });

            if (!productColor) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            //Verificar si los archivos existen antes de acceder a ellos
            const imagePath = req.files.image ? `/uploads/product_image/${req.files.image[0].originalname}` : null;
            const renderPath = req.files.render ? `/uploads/product_model/${req.files.render[0].originalname}` : null;

            // Buscar la marca
            let brand_name = await db.Brand.findOne({ where: { brand_name: brand } });
            if (!brand_name) {
                throw new Error('Marca ingresada no encontrada')
            }

            // Buscar el modelo
            let model_name = await db.Model.findOne({ where: { model: model } });
            if (!model_name) {
                throw new Error('Modelo ingresado no encontrado');
            };
            // console.log(brand_name); // depuración
            // console.log(model_name); // depuración

            // Buscar el color
            let color = await db.Color.findOne({ where: { color: colors } });
            if (!color) {
                throw new Error('Color ingresado no encontrado');
            };

            // Actualizar el producto
            const product = await db.Product.update({
                brand_id: brand_name.id,
                model_id: model_name.id,
                description,
                unit_price: price,
                image: imagePath,
                render: renderPath
            },
                { where: { id: productColor.product_id } }
            );
            console.log(product);

            // Actualización de la tabla ProductColor
            await db.ProductColor.update(
                {
                    color_id: color.id,
                    stock
                },
                { where: { id: id } }
            );

            return res.redirect('/products');

        } catch (e) {
            console.log("Error has ocurred, we couldn't update the product", e);
            return res.send(e)
        };
    },
    fetch: async (req, res) => {
        try {
            const query = req.query.fetch; // Obtiene el término de búsqueda desde la URL

            if (!query) {
                return res.redirect('/products'); // Si no hay consulta, redirigir a la lista de productos
            }
            const products_db = await db.ProductColor.findAll({
                include: [
                    {
                        model: db.Color,
                        required: true,
                        attributes: ['color']
                    },
                    {
                        model: db.Product,
                        required: true,
                        attributes: ['description', 'image', 'render', 'unit_price'],
                        include: [
                            {
                                model: db.Brand,
                                required: true,
                                attributes: ['brand_name']
                            },
                            {
                                model: db.Model,
                                required: true,
                                attributes: ['model']
                            },
                        ]
                    },

                ],
                where: {
                    [Op.or]: [
                        { id: { [Op.like]: `%${query}%` } },
                        { stock: { [Op.like]: `%${query}%` } },
                        { '$Product.description$': { [Op.like]: `%${query}%` } },
                        { '$Product.Brand.brand_name$': { [Op.like]: `%${query}%` } },
                        { '$Product.Model.model$': { [Op.like]: `%${query}%` } },
                        { '$Color.color$': { [Op.like]: `%${query}%` } }
                    ]
                }
            });


            const products = products_db.map(d => {
                return p = {
                    id: d.id,
                    brand: d.Product.Brand.brand_name,
                    model: d.Product.Model.model,
                    color: d.Color.color,
                    stock: d.stock,
                    description: d.Product.description,
                    image: d.Product.image,
                    price: d.Product.unit_price,
                }

            });
            console.log(products);
            return res.render('products/fetch', { title: "Resultados de búsqueda", products, query });
        } catch (e) {
            console.log(e);
            return res.send(e);
        }
    },
    destroy: async (req, res) => {
        try {

            const id = req.params.id;
            const pc = await db.ProductColor.findOne({ where: { id: id } })
            console.log(pc.product_id);

            db.ProductColor.destroy(
                {
                    where: { id: id } // Si se omite se borrará toda la tabla.
                }
            );
            db.Product.destroy(
                {
                    where: { id: pc.product_id } // Si se omite se borrará toda la tabla.
                }
            )
            return res.redirect('/products');

        } catch (e) {
            console.error(e);
            return res.send(e);
        }
    },

};

module.exports = productsController