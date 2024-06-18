import { useQuery } from "@tanstack/react-query";
import client from "../clientAPI";
const getProductDetail = async (product_id: string | undefined) => {
  const response = await client.get(`view/product/${product_id}`);
  return response.data;
};

const useProductDetail = (product_id: string | undefined) => {
  return useQuery({
    queryKey: ["product", product_id],
    queryFn: () => getProductDetail(product_id),
  });
};

export default useProductDetail;
