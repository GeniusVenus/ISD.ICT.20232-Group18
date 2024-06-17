import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
type Product = {
  product: { id: string };
  quantity: number;
};
type Order = {
  user: {
    id: string | null;
  };
  total: number;
  payment: {
    amount: number;
    provider: string;
    status: string;
  };
  orderItems: Array<Product>;
};
const placeOrder = async (data: Order) => {
  return await client.post("orders", data);
};
const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: Order) => placeOrder(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => toast.success("Place order successfully"), 200);
      navigate("/user/orders");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onSettled: () => {},
  });
};

export default usePlaceOrder;
