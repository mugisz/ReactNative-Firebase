import { DUMMY_API } from "@/constant/urls";
import { IProduct, IProductsResponse } from "@/type";
import axios from "axios";

export const productsService = {
  getProducts: async () => {
    const { data } = await axios.get<IProductsResponse>(
      `${DUMMY_API}?limit=10`
    );
    return data;
  },
  getProductById: async (productId: number) => {
    const { data } = await axios.get<IProduct>(`${DUMMY_API}/${productId}`);
    return data;
  },
};
