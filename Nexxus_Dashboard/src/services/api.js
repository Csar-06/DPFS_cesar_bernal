import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    //   console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return null;
  }
};


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    //   console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return null;
  }
};

