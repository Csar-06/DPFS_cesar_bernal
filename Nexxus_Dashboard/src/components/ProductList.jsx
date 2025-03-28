import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductList = ({ products = [] }) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const data = await Promise.all( // Busqueda de los detalles de producto en la api
            products.map(async (p) => {
              const res = await axios.get(`http://localhost:3000/api/products/${p.id}`);
              return { id: p.id, ...res.data };
            })
          );

          // Convertir el array en un objeto con `id` como clave para acceso rápido
          const detailsObject = data.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});

          setDetails(detailsObject);
        } catch (error) {
          console.error("Error fetching product details", error);
        }
      };

      fetchProductDetails();
    }
  }, [products]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product List</CardTitle>
        <CardDescription>Showing all {products.length} products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  {details[product.id] ? `${details[product.id].stock} in stock` : `Cargando...`}
                </Badge>
                <span className="font-medium">
                  {details[product.id] ? `$${details[product.id].price}` : `Cargando...`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
