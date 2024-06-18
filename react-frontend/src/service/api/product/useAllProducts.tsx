import { useQuery } from "@tanstack/react-query";
import client from "../clientAPI";
const getAllProducts = async () => {
  const response = await client.get("view/product");
  return response.data;
};

const useAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
    staleTime: 5000,
    gcTime: 60000,
  });
};

export default useAllProducts;
