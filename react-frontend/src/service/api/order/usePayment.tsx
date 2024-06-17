import { useMutation } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
type Payment = {
  orderInfo: string;
  amount: string | number | null;
};
const Pay = async (data: Payment) => {
  return await client.post(
    `payment?orderInfo=${data.orderInfo}&amount=${data.amount}`
  );
};
const usePayment = () => {
  return useMutation({
    mutationFn: (body: Payment) => Pay(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data) => {
      window.location.href = data?.data;
    },
    onSettled: () => {},
  });
};

export default usePayment;
