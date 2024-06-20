import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
type Body = {
  session_id: string | null;
  order_id: string | null;
};
const payOrder = async (body: Body) => {
  return await client.put(
    `orders/payments/${body?.order_id}/status?status=paid&session_id=${body?.session_id}`
  );
};
const usePayOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Body) => payOrder(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data, variables) => {
      console.log(data);
      toast.success(`Pay order ${variables.order_id} successfully`);
      queryClient.invalidateQueries({
        queryKey: ["order", variables.order_id],
      });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onSettled: () => {},
  });
};

export default usePayOrder;
