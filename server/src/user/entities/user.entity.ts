export class User {
    email: string;
    full_name: string;
    emergency_contact
    role: string; // Admin || Manager || Worker
    department: string;
    boss_id?: string; // The person who will receive notifications
    access_permissions: string[];
    password: string;
}
