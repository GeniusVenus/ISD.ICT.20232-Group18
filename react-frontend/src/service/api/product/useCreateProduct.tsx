import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../clientAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Product from "../../../types/Product";
const createProduct = async (data: Product) => {
  return await client.post("add/product", data);
};
const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: Product) => createProduct(body),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something wrong happened");
    },
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => toast.success("Create product successfully"), 200);
      navigate("/manage-product");
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
    onSettled: () => {},
  });
};

export default useCreateProduct;
