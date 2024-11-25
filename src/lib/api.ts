"use server";

import { LoginSchema, RegisterSchema } from "./zod";
import { JwtDto, UserDto } from "./types";
import axiosInstance from "./axios";
import { cookies } from "next/headers";

export const registerUser = async (data: RegisterSchema) => {
  console.log(`registering user ${data.email}`);
  const { data: res } = await axiosInstance.post<UserDto>(
    `/auth/register`,
    JSON.stringify(data)
  );
  return res;
};

export const loginUser = async (data: LoginSchema) => {
  console.log(`attempting to login user ${data.email}`);
  const { data: res } = await axiosInstance.post<JwtDto>(
    `/auth/login`,
    JSON.stringify(data)
  );
  storeAccessTokenInCookie(res.accessToken);
  return res;
};

export const logoutUser = async () => {
  console.log(`attempting to logout user`);
  const { data: res } = await axiosInstance.post<void>(`/auth/logout`, {});
  deleteAccessTokenFromCookie();
  return res;
};

export const refreshAccesstoken = async () => {
  console.log(`attempting to refresh token`);
  const { data: res } = await axiosInstance.post<JwtDto>(
    `/auth/refresh-tokens`,
    {},
    { withCredentials: true }
  );
  storeAccessTokenInCookie(res.accessToken);
  return res;
};

export const getProfile = async () => {
  console.log(`attempting to get profile`);
  const { data: res } = await axiosInstance.get<UserDto>(`/users/me`);
  return res;
};

function storeAccessTokenInCookie(accessToken: string) {
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60,
    sameSite: "strict",
  });
}

function deleteAccessTokenFromCookie() {
  cookies().delete("accessToken");
}
