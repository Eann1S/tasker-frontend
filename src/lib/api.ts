"use server";

import { LoginSchema, RegisterSchema } from "./zod";
import { JwtDto, UserDto } from "./types";
import axiosInstance from "./axios";
import { cookies } from "next/headers";
import axios from "axios";

const REFRESH_JWT_EXPIRATION_SECONDS: number = Number.parseInt(process.env.REFRESH_JWT_EXPIRATION_SECONDS || '0');

export const registerUser = async (data: RegisterSchema) => {
  console.log(`registering user ${data.email}`);

  const { data: res } = await axiosInstance.post<UserDto>(
    `/auth/register`,
    JSON.stringify(data)
  );

  console.log(`registered successfully`);
  return res;
};

export const loginUser = async (data: LoginSchema) => {
  console.log(`attempting to login user ${data.email}`);

  const {data: res} = await axiosInstance.post<JwtDto>(
    `/auth/login`,
    JSON.stringify(data)
  );
  storeTokensInCookies(res);
  
  console.log(`logged in successfully`);
  return res;
};

export const logoutUser = async () => {
  console.log(`attempting to logout user`);

  const { data: res } = await axiosInstance.post<void>(`/auth/logout`, {});
  deleteTokensFromCookies();

  console.log(`logged out successfully`);
  return res;
};

export const refreshAccesstoken = async () => {
  console.log(`attempting to refresh token`);

  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const { data: res } = await axios.post<JwtDto>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-tokens`,
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  storeTokensInCookies(res);
  console.log(`refreshed tokens successfully`);
  return res;
};

export const getProfile = async () => {
  console.log(`attempting to get profile`);
  
  const res = await axiosInstance.get<UserDto>(`/users/me`);
  console.log(`got profile successfully`);
  
  return res.data;
};

function storeTokensInCookies(jwtDto: JwtDto) {
  cookies().set("accessToken", jwtDto.accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });
  cookies().set("refreshToken", jwtDto.refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_JWT_EXPIRATION_SECONDS,
    sameSite: "strict",
  });
}

function deleteTokensFromCookies() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
}
