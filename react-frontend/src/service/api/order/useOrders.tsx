import { useQuery } from "@tanstack/react-query";
import client from "../clientAPI";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/auth/authSlice";
const getOrders = async (user_id: string | null) => {
  const response = await client.get(`orders/user/${user_id}`);
  return response.data;
};

const useOrders = () => {
  const user_id = useSelector(selectCurrentUserId);
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(user_id),
  });
};

export default useOrders;
