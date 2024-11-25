"use client";

import { logoutUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess() {
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error);
      throw error;
    },
  });

  return mutation;
}
