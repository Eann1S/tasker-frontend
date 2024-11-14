"use client";

import { registerUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

export default function useRegister(form: UseFormReturn<any>) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error);
      form.setError("root", { message: error.message });
    },
  });

  return mutation;
}
