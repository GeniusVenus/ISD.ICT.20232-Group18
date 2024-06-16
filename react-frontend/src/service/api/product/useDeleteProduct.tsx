import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";

const deleteProduct = async (product_id: string) => {
  console.log(product_id);
  await client.delete(`delete/product/${product_id}`);
};
const useDeleteProduct = (product_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProduct(product_id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", product_id] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

export default useDeleteProduct;
