import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";

const deleteProduct = async (product_id: string | null) => {
  await client.delete(`delete/product/${product_id}`);
};
const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product_id: string | null) => deleteProduct(product_id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: () => {
      toast.success(`Delete product successfully`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

export default useDeleteProduct;
