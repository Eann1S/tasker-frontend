"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthForm, { Field } from "./AuthForm";
import { LoginSchema, loginSchema } from "@/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import useStore from "@/store/useStore";

export default function LoginForm() {
  const router = useRouter();
  const { setTokens } = useStore();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess(data) {
      setTokens(data);
      router.push("/app/tasks");
    },
    onError(error) {
      console.log(error);
      form.setError("root", { message: error.message });
    },
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    await mutation.mutateAsync(data);
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      fields={fields}
      buttonText="Login to account"
    />
  );
}

const fields: Field[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
];
