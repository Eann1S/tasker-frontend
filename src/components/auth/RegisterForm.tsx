"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthForm, { Field } from "./AuthForm";
import { RegisterSchema, registerSchema } from "@/lib/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
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

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

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
