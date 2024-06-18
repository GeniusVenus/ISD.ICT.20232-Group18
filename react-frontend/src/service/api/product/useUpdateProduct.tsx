import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
import Product from "../../../types/Product";

const updateProduct = async (product_id: string | undefined, data: Product) => {
  return await client.put(`update/product/${product_id}`, data);
};
const useUpdateProduct = (product_id: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Product) => updateProduct(product_id, body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Update product ${product_id} successfully`);
      queryClient.invalidateQueries({ queryKey: ["product", product_id] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
    onSettled: () => {},
  });
};

export default useUpdateProduct;
