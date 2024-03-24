import axios from "axios";
import { Product } from "./types";

const API_URL = "https://reqres.in/api/products";

export const fetchProducts = async (page: number, filterId?: number) => {
  try {
    const response = await axios.get<{ data: Product[] }>(API_URL, {
      params: {
        page,
        per_page: 5,
        id: filterId,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
