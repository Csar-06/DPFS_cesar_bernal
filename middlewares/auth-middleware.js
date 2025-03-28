const authentication = {
    isLoged : (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/users/login'); // Redirige a login si no estas logeado
          }
          next();
    },
    
     isAdmin : (req, res, next) => {
        if (req.session.user && req.session.user.type === 'admin') {
            console.log(req.session.user.type);
            return next(); // Permite el acceso si es Admin
            
            }
            return res.redirect('/users/login'); // Redirige si no es Admin
        },
}

 

module.exports = authentication