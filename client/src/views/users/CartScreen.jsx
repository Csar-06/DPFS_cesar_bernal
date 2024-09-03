import React from 'react';
import ProductItem from '../../components/cartComponents/ProductItemComponent';
import OrderSummary from '../../components/cartComponents/OrderSummaryComponent';
import Image from '/vite.svg';
import FooterComponent from '../../components/FooterComponent';

const products = [
    { image: Image, name: 'Galaxy Buds3', size: 'M', quantity: 1, price: 32.00 },
    // Añade más productos si es necesario
];

const CartScreen = () => {
    const subtotal = products.reduce((sum, product) => sum + product.price, 0);
    const shipping = subtotal > 100 ? 0 : 5;
    const taxes = subtotal * 0.1;
    const total = subtotal + shipping + taxes;

    return (
        <div className='min-h-screen mt-16 flex flex-col justify-between'>
            <div className="container relative top-20 mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                        {products.map((product, index) => (
                            <ProductItem key={index} product={product} />
                        ))}
                    </div>
                    <OrderSummary subtotal={subtotal} shipping={shipping} taxes={taxes} total={total} />
                </div>
            </div>
            <FooterComponent />
        </div>
    );
};


export default CartScreen;
