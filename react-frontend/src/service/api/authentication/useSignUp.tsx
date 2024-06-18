import { useMutation } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type SignUp = {
  email: string;
  username: string;
  password: string;
};
const signUp = async (data: SignUp) => {
  return await client.post("register", data);
};
const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: SignUp) => signUp(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log("error");
      toast.error(error?.response?.data?.message);
    },
    onSuccess: () => {
      console.log("success");
      navigate("/auth/login");
      setTimeout(() => {
        toast.success("Sign up successfully");
      }, 200);
    },
    onSettled: () => {
      console.log("settled");
    },
  });
};

export default useSignUp;
