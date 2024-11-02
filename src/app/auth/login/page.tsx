import LoginForm from "@/components/auth/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password below to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        If you do not have an account{" "}
        <Link
          className={buttonVariants({ variant: "link" })}
          href={"/auth/register"}
        >
          click here
        </Link>
      </CardFooter>
    </>
  );
}
