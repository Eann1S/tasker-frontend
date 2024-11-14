import React, { useEffect } from "react";
import useAuthStore from "@/store/useStore";
import { useRouter } from "next/navigation";

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const Auth: React.FC<P> = (props) => {
    const router = useRouter();
    const { accessToken } = useAuthStore.getState();

    useEffect(() => {
      if (!accessToken) {
        router.replace('/auth/login');
      }
    }, [accessToken, router]);

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
