import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";

const deleteOrder = async (order_id: string | null) => {
  await client.delete(`orders/${order_id}`);
};
const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order_id: string | null) => deleteOrder(order_id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: () => {
      toast.success(`Delete order successfully`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export default useDeleteOrder;
