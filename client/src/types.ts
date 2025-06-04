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

export type IUser = {
    id: Number,
    email: string,
    password: string,
    full_name: string,
    emergency_contact: string,
    role: string,
    department: string,
    refresh_token: string,
    boss_id: string | undefined | null,
    access_permissions: string[],
    createdAt: Date, 
    updatedAt: Date
}

export type ICamera = {
    id: Number, 
    location: string,
    status: string,
    last_maintenance: Date,
    rtsp_address: string,
    resolution: string,
    responsible_person_id: Number,
    responsible_person: IUser
}

export type FireIncident = {
    timestamp: Date,
    severity: Number,
    detected_by_camera: ICamera,
    detected_by_camera_id: Number,
    worker: IUser,
    worker_id: Number,
    status: String
}