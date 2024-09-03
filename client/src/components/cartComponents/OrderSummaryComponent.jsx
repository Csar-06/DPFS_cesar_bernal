import React from 'react';

// Componente "Orden de compra" muestra la facturación de los productos agregados en el carrito de compra
const OrderSummary = ({ subtotal, shipping, taxes, total }) => (
    <div className="p-4 border bg-slate-100 rounded-lg">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="flex justify-between mt-2">
            <p>Subtotal</p>
            <p>${subtotal}</p>
        </div>
        <div className="flex justify-between mt-2">
            <p>Shipping</p>
            <p>${shipping}</p>
        </div>
        <div className="flex justify-between mt-2">
            <p>Taxes</p>
            <p>${taxes}</p>
        </div>
        <div className="flex justify-between mt-2 font-bold">
            <p>Total</p>
            <p>${total}</p>
        </div>
        <button className="w-full mt-4 rounded-lg bg-slate-900 text-white py-2 transition-colors hover:bg-slate-500">Checkout</button>
    </div>
);

export default OrderSummary;