import { useQuery } from "@tanstack/react-query";
import client from "../clientAPI";
const getCart = async () => {
  const response = await client.get(`cart?session_id=1`);
  return response.data;
};

const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export default useCart;
