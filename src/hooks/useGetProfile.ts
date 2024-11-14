"use client";

import { getProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetProfile() {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await getProfile();
    },
  });
  return query;
}
