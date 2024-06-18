import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
const payOrder = async (order_id: string | null) => {
  return await client.put(`orders/payments/${order_id}/status?status=paid`);
};
const usePayOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order_id: string) => payOrder(order_id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data, variables) => {
      console.log(data);
      toast.success(`Pay order ${variables} successfully`);
      queryClient.invalidateQueries({ queryKey: ["order", variables] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onSettled: () => {},
  });
};

export default usePayOrder;
