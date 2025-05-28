export type LoginFormData = {
    email: string,
    password: string
}

export type LoginResponseData = {
    access_token: string,
    refresh_token: string
}

export type RootState = {
    user: {
        access_token: string;
        refresh_token: string;
    }
}