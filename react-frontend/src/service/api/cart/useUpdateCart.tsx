import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";

type Body = {
    product_id: string | null; 
    quantity: number;
}
const updateCart = async (body: Body) => {
  return await client.put(`cart/product/${body?.product_id}?quantity=${body?.quantity}&session_id=1`);
};
const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Body) => updateCart(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data, variables) => {
      console.log(data);
      toast.success(`Update product ${variables?.product_id} successfully`);
      queryClient.invalidateQueries({ queryKey: ["product", variables.product_id]});
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {},
  });
};

export default useUpdateCart;
