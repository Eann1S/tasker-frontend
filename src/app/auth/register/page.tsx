import RegisterForm from "@/components/auth/RegisterForm";
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your credentials below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        If you already have an account{" "}
        <Link
          className={buttonVariants({ variant: "link" })}
          href={"/auth/login"}
        >
          click here
        </Link>
      </CardFooter>
    </>
  );
}
