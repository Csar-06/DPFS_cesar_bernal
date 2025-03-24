const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');
const db = require('../database/models');
const { where } = require('sequelize');
const { error } = require('console');

const usersFilePath = path.join(__dirname, '../data/users.json'); //Dirección del archivo.json con la data
const getUsers = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));// Función para obtener transfromar el archivo .json a texto 

const userController = {
    index: (req, res, next) => {
        res.render('users/login', { title: 'Login', error: "" });
    },
    createUser: (req, res, next) => {
        res.render('users/signup', { title: 'Sign-Up', error: "" });
    },
    storeUser: async (req, res, next) => {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        console.log(req.file);


        let avatarPath = req.file ? `/uploads/user_avatar/${req.file.originalname}` : ''; // Guardar esta ruta en el JSON

        const date = DateTime.now().setLocale('en');
        // console.log(date.toFormat('MMMM yyyy'));
        console.log(date);

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            return res.render('users/signup', { title: 'Sign-Up', error: "Passwords don't match", email });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10); // Genera un "salt" (valor aleatorio)
        const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña

        // Creación del Usuario

        let user = await db.User.findOne({ where: { email: email } })
        if (!user) {
            user = await db.User.create(
                {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password: hashedPassword,
                    joinDate: date,
                    avatar: avatarPath,
                }
            );
        } else {
            throw new Error('Usuario ya Existente')
        }
        console.log(user.id);

        // Confirmación que el rol a asignar exista
        const role = await db.Role.findOne({ where: { role_name: 'admin' } })
        if (!role) {
            throw new Error('Error al asignar rol al usuario');
        };

        // Creación de relación Rol-Usuario 
        db.UserRole.create(
            {
                user_id: user.id,
                role_id: role.id,
            }
        )
        res.redirect('/users/login');
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // const users = getUsers(); // Obtener usuarios desde el archivo JSON o BD
            // const user = users.find(u => u.email === email);

            const user = await db.User.findOne({ where: { email: email } })
            if (!user) {
                return res.render('users/login', {
                    title: 'Login',
                    error: "Incorrect email or password. Please try again.",
                    email
                });
            }
            console.log(user);

            // Comparar la contraseña ingresada con la encriptada
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.render('users/login', {
                    title: 'Login',
                    error: "Incorrect email or password. Please try again.",
                    email
                });
            }

            // Guardar datos del usuario en sesión
            req.session.user = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar,
                joinDate: user.join_date
            };

            const role = await db.UserRole.findOne(
                {
                    include: [
                        {
                            model: db.User,
                            required: true,
                            attributes: ['id']
                        },
                        {
                            model: db.Role,
                            required: true,

                        }
                    ],
                    where: { user_id: user.id }
                });

            // Redirigir según el tipo de usuario
            if (user.id === role.user_id && role.Role.id === 1) {
                return res.redirect('/products'); // Ruta específica para admins
            } else {
                return res.redirect('/'); // Ruta normal para clientes
            }

        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).render('users/login', {
                title: 'Login',
                error: "An error occurred. Please try again later.",
                email: req.body.email
            });
        }
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/users/login');
        });
    },
    showProfile: (req, res, next) => {
        const user = req.session.user
        // const data = getUsers()
        // const user = data[31]
        res.render('users/profile', { title: 'Profile', user })
    },
    editProfile: (req, res) => {
        const user = req.session.user;
        let error = '';
        console.log(user);


        res.render('users/edit', { title: 'Edit Profile', user, error })
    },
    updateProfile: async (req, res) => {

        try {
            const { firstName, lastName } = req.body;
            let user = req.session.user;
            const id = user.id;

                await db.User.update(
                    {
                        first_name: firstName,
                        last_name: lastName,        
                    },
                    { where: { id: id } }
                );


               user = await db.User.findOne(

                    { where: { id: id } }
                )

                req.session.user = {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                    joinDate: user.join_date
                }

            return res.redirect('/users/profile')

        } catch (e) {
            console.log(e);
            return res.send(e)
        }
    }
}

module.exports = userController;
