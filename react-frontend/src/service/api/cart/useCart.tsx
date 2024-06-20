import { useQuery } from "@tanstack/react-query";
import client from "../clientAPI";
import { useSelector } from "react-redux";
import { selectCurrentSessionId } from "../../redux/auth/authSlice";
const getCart = async (session_id: string | null) => {
  const response = await client.get(`cart?session_id=${session_id}`);
  return response.data;
};

const useCart = () => {
  const session_id = useSelector(selectCurrentSessionId);
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(session_id),
  });
};

export default useCart;
