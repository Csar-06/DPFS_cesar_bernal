import { useState, useEffect } from 'react';
import { Route, Routes , BrowserRouter} from 'react-router-dom';
import './app.css';
import NavbarComponent from './components/NavbarComponent';
import HomeScreen from './views/products/HomeScreen';
import LogInScreen from './views/users/LogInScreen';
import SignUpScreen from './views/users/SignUpScreen';
import ProductDetailScreen from './views/products/ProductDetailScreen';
import CartScreen from './views/users/CartScreen';
import NotFoundScreen from './views/NotFoundScreen';
import AddItem from './views/admin/AddItemScreen';
import EditItem from './views/admin/EditItemScreen';
import CrudScreen from './views/admin/CrudScreen';
import FetchItemScreen from './views/products/FetchItemScreen';


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
        <Route path='/items' element={<FetchItemScreen />}></Route>
        <Route path='/login' element={<LogInScreen />}></Route>
        <Route path='/signup' element={<SignUpScreen />}></Route>
        <Route path='/items/:id' element={<ProductDetailScreen />}></Route>
        <Route path='/cart' element={<CartScreen />}></Route>


        <Route path='/admin' element={<CrudScreen	/>}></Route>
        <Route path='/admin/additem' element={<AddItem	/>}></Route>
        <Route path='/admin/moditem' element={<EditItem	/>}></Route>
        <Route path="*" element={<NotFoundScreen />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
