import { LoginSchema, RegisterSchema } from "./zod";
import { JwtDto, UserDto } from "./types";
import axiosInstance from "./axios";

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
  return res;
};

export const refresh_token = async (refreshToken: string) => {
  console.log(`attempting to refresh token`);
  const { data: res } = await axiosInstance.post<JwtDto>(
    `/auth/refresh-token`,
    getHeaders(refreshToken)
  );
  return res;
};

export const getProfile = async (accessToken: string) => {
  console.log(`attempting to get profile`);
  const { data: res } = await axiosInstance.get<UserDto>(`/users/me`, getHeaders(accessToken));
  return res;
};

function getHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
