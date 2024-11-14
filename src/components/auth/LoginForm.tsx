"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthForm, { Field } from "./AuthForm";
import { LoginSchema, loginSchema } from "@/lib/zod";
import useLogin from "@/hooks/useLogin";

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useLogin(form);

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
