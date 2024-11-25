"use client";

import { loginUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

export default function useLogin(form: UseFormReturn<any>) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess() {
      router.push("/app/tasks");
    },
    onError(error) {
      console.log(error);
      form.setError("root", { message: error.message });
    },
  });

  return mutation;
}
