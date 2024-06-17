import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";

const deleteProductFromCart = async (product_id: string | null) => {
  await client.delete(`cart/product/${product_id}?session_id=1`);
};
const useDeleteProductFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product_id: string | null) => deleteProductFromCart(product_id),
    onMutate: () => {
        console.log("mutate");
    },
    onError: (error) => {
        console.log(error);
        toast.error("Something wrong happened");
    },
    onSuccess: (data,variables) => {
        console.log(data); 
        toast.success(`Delete product ${variables} successfully`);
        queryClient.invalidateQueries({ queryKey: ["product", variables]});
        queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
    },
  });
};

export default useDeleteProductFromCart;
