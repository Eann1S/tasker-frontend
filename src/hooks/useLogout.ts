"use client";

import { logoutUser } from "@/lib/api";
import useAuthStore from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess() {
      logout();
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error);
      throw error;
    },
  });

  return mutation;
}
