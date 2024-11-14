"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthForm, { Field } from "./AuthForm";
import { RegisterSchema, registerSchema } from "@/lib/zod";
import useRegister from "@/hooks/useRegister";

export default function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const mutation = useRegister(form);

  async function onSubmit(data: RegisterSchema) {
    await mutation.mutateAsync(data);
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      fields={fields}
      buttonText="Create account"
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
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
];
