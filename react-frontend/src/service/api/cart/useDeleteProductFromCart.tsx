import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
type Body = {
  session_id: string | null;
  product_id: string | null;
};
const deleteProductFromCart = async (body: Body) => {
  await client.delete(
    `cart/product/${body?.product_id}?session_id=${body?.session_id}`
  );
};
const useDeleteProductFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Body) => deleteProductFromCart(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data, variables) => {
      console.log(data);
      toast.success(`Delete product ${variables.product_id} successfully`);
      queryClient.invalidateQueries({
        queryKey: ["product", variables.product_id],
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {},
  });
};

export default useDeleteProductFromCart;
