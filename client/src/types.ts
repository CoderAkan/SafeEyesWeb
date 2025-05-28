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

export type RegistrationFormData = {
    email: string,
    password: string,
    full_name: string,
    emergency_contact?: string,
    role?: string,
    department?: string,
    access_permissions?: string[],
    refresh_token?: string
}