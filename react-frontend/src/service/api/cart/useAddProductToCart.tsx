import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";

const addProductToCart = async (product_id: string | undefined) => {
  return await client.post(`cart/product/${product_id}?quantity=1&session_id=1`);
};
const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product_id: string | undefined) => addProductToCart(product_id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data, variables) => {
      console.log(data);
      toast.success(`Add product ${variables} successfully`);
      queryClient.invalidateQueries({ queryKey: ["product", variables]});
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {},
  });
};

export default useAddProductToCart;
