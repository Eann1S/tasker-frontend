"use client";

import { loginUser } from "@/lib/api";
import useAuthStore from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

export default function useLogin(form: UseFormReturn<any>) {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess(data) {
      setToken(data.accessToken);
      router.push("/app/tasks");
    },
    onError(error) {
      console.log(error);
      form.setError("root", { message: error.message });
    },
  });

  return mutation;
}