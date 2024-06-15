import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/authSlice";
import client from "../clientAPI";
const doSignOut = async () => {
  return await client.post("logout", {});
};
const useSignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: () => doSignOut(),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log("error");
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: () => {
      console.log("success");
      dispatch(logOut());
      setTimeout(() => {
        toast.success("Log out successfully");
      }, 200);
      navigate("/");
    },
    onSettled: () => {
      console.log("settled");
    },
  });
};

export default useSignOut;
