import { useQuery } from "@tanstack/react-query";
import client from "../clientAPI";
const getOrderDetail = async (order_id: string | undefined) => {
  const response = await client.get(`orders/${order_id}`);
  return response.data;
};

const useOrderDetail = (order_id: string | undefined) => {
  return useQuery({
    queryKey: ["order", order_id],
    queryFn: () => getOrderDetail(order_id),
  });
};

export default useOrderDetail;
