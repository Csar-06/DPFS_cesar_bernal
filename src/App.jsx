import { useState, useEffect } from 'react';
import { Route, Routes , BrowserRouter} from 'react-router-dom';
import './app.css';
import NavbarComponent from './components/NavbarComponent';
import HomeScreen from './routes/HomeScreen';
import FetchProductScreen from './routes/FetchProductScreen';
import LogInScreen from './routes/LogInScreen';
import SignUpScreen from './routes/SignUpScreen';
import ProductDetailScreen from './routes/ProductDetailScreen';
import CartScreen from './routes/CartScreen';
import NotFoundScreen from './routes/NotFoundScreen';


const App = () => {

  
  useEffect(() => {
    // Crear el script para el módulo
    const scriptModule = document.createElement('script');
    scriptModule.type = 'module';
    scriptModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(scriptModule);

    // Crear el script para el nomodule
    const scriptNoModule = document.createElement('script');
    scriptNoModule.nomodule = true;
    scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    document.body.appendChild(scriptNoModule);

    // Limpiar los scripts al desmontar el componente
    return () => {
        document.body.removeChild(scriptModule);
        document.body.removeChild(scriptNoModule);
    };
}, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <BrowserRouter>
      <NavbarComponent />

      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/items' element={<FetchProductScreen />}></Route>
        <Route path='/login' element={<LogInScreen />}></Route>
        <Route path='/signup' element={<SignUpScreen />}></Route>
        <Route path='/item' element={<ProductDetailScreen />}></Route>
        <Route path='/cart' element={<CartScreen />}></Route>
        <Route path="*" element={<NotFoundScreen />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
