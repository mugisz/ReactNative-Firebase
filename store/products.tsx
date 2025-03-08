import { productsService } from "@/service";
import { IProduct } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { create } from "zustand";

interface IProductStore {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useProductStore = create<IProductStore>((set) => ({
  products: [],
  setProducts: (products: IProduct[]) => set({ products }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

const useProductsQuery = () => {
  const { products, setProducts, loading, setLoading } = useProductStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: productsService.getProducts,
  });
  useEffect(() => {
    setProducts(data?.products || []);
    setLoading(isLoading);
  }, [data]);
};

export { useProductsQuery, useProductStore };
