import React from 'react';

// Componente del carrito de compras, el cual muestra la informacion del producto a comprar
const ProductItem = ({ product }) => (
    // contenedor del producto
    <div className="flex items-center justify-between p-4 border-b">
        <img src={product.image} alt={product.name} className="w-16 h-16" />
        {/* detalle del producto */}
        <div className="flex-1 ml-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm">Quantity: {product.quantity}</p>
        </div>
        <p className="text-lg font-bold">${product.price}</p>
        <button className="ml-4 p-1 text-slate-950 transition-all  hover:bg-slate-200 hover:rounded-lg">Remove</button>
    </div>
);

export default ProductItem;
