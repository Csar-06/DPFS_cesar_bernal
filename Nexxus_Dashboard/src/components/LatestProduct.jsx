import React, { useEffect, useState } from 'react';
import {  Package } from "lucide-react"
import axios from 'axios';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"



const LatestProduct = ({ product }) => {
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        if (product?.id) {
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/products/${product.id}`);

                    setDetail(response.data);
                } catch (error) {
                    console.error("Error fetching product details", error);
                }
            };

            fetchProductDetails();
        }
    }, [product]);

    if (!product) return <p>No latest product available.</p>;

    return (
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle className='flex text-2xl'>Latest Product</CardTitle>
                {/* <CardDescription>Added on {formatDate(latestProduct.addedAt)}</CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-xl">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <div className="flex items-baseline gap-4 ">
                            <Badge variant="outline" className='text-sm'>
                                {detail ? `$ ${detail.price}` : "Cargando..."}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                                {detail ? `${detail.stock} in stock` : "Cargando..."}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default LatestProduct;
