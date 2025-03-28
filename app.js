const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require("cors");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const phonesRoutes = require('./routes/phones')
const productsRoutes = require('./routes/products')
const usersRoutesApi = require('./routes/API/user.routes')
const productsRoutesApi = require('./routes/API/products.routes')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuraciones
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mi_secreto_super_seguro', // clave "segura"
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 60 minutos de sesión
}));
app.use((req,res,next)=>{
  res.locals.user = req.session.user || null; //si no hay sesión, user será null
  next();
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
console.log(path.join(__dirname,'public'));
app.use(cors({ origin: "http://localhost:5173" })); // Permite todas las solicitudes desde el origen especificado


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/phones', phonesRoutes);
app.use('/products', productsRoutes); 
app.use('/products', productsRoutes); 
app.use('/api/users', usersRoutesApi); 
app.use('/api/products', productsRoutesApi); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
