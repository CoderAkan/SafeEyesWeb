import { instance } from "../api/axios.api";
import { LoginFormData, LoginResponseData } from "../types";

export const authService = {
    async login(userData: LoginFormData): Promise<LoginResponseData | undefined> {
        const { data } = await instance.post<LoginResponseData>('auth/login', userData)
        return data;
    }
}