import { useMutation } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/authSlice";
type SignIn = {
  email: string;
  password: string;
};
const signIn = async (data: SignIn) => {
  return await client.post("login", data);
};
const useSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (body: SignIn) => signIn(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
    onSuccess: (response) => {
      console.log("success");
      console.log(response);
      dispatch(logIn());
      setTimeout(() => {
        toast.success("Login successfully");
      }, 200);
      navigate("/");
    },
    onSettled: () => {
      console.log("settled");
    },
  });
};

export default useSignIn;
