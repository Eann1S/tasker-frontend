export type UserDto = {
    id: string;
    email: string;
    username: string;
}

export type JwtDto = {
    accessToken: string;
    refreshToken: string;
}