const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { DateTime } = require('luxon');

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
        
        const avatarPath = `/uploads/user_avatar/${req.file.filename}`; // Guardar esta ruta en el JSON
        const date = DateTime.now().setLocale('en');
        console.log(date.toFormat('MMMM yyyy'));

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            return res.render('users/signup', { title: 'Sign-Up', error: "Passwords don't match", email });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10); // Genera un "salt" (valor aleatorio)
        const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña

        const users = getUsers();// Obtención de los usuarios
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            type: 'Customer',
            joinDate: date.toFormat('MMMM yyyy'),
            avatar: avatarPath,
            avatarInfo: req.file
        };

        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));// subida del array con los usuarios + el nuevo usuario
        res.redirect('/users/login');
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const users = getUsers(); // Obtener usuarios desde el archivo JSON o BD
            const user = users.find(u => u.email === email);

            if (!user) {
                return res.render('users/login', {
                    title: 'Login',
                    error: "Incorrect email or password. Please try again.",
                    email
                });
            }

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
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                type: user.type,
                joinDate: user.joinDate
            };

            // Redirigir según el tipo de usuario
            if (user.type === 'Admin') {
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
}

module.exports = userController;
