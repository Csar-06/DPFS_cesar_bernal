import React, { useEffect, useState } from "react";
import { BarChart3, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import TotalUsers from "../components/TotalUsers.jsx";
import TotalProducts from "../components/TotalProducts.jsx";
import LatestUser from "../components/LatestUser.jsx";
import LatestProduct from "../components/LatestProduct.jsx";
import ProductList from "../components/ProductList.jsx";
import { fetchUsers, fetchProducts } from "../services/api.js";

const Dashboard = () => {
  const [data, setData] = useState({ users: 0, products: 0, latestUser: {}, latestProduct: {}, productList: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetchUsers();
        const productsRes = await fetchProducts();
        // console.log(usersRes);
        // console.log(productsRes.products);

        const latest = usersRes.users.length ? usersRes.users[usersRes.users.length - 1] : null;
        // console.log(latestUser.email);


        // Sort users by join date to get the latest user
        const latestUser = [...usersRes.users].sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())[0]
        // console.log(latestUser);

        // Get latest Product
        const latestProduct = productsRes.products.length ? productsRes.products[productsRes.products.length - 1] : null;
        // console.log(latestProduct);

        setData({
          users: usersRes.count,
          products: productsRes.count,
          latestUser,
          latestProduct,
          productList: productsRes.products,
        });

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <TotalUsers count={data.users} />
              </div>
              <p className="text-xs text-muted-foreground">+{Math.floor(data.users * 0.1)} from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                <TotalProducts count={data.products} />
              </div>
              <p className="text-xs text-muted-foreground">+{Math.floor(data.products * 0.15)} from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$12,543.00</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">+24</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <LatestUser user={data.latestUser} />
          <LatestProduct product={data.latestProduct} />
         
        </div>
         <Tabs defaultValue="all" className="space-y-4"> 
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="space-y-4">
            <ProductList products={data.productList} />
          </TabsContent>
        {/*
          
          */}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
