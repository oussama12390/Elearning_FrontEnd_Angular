export interface Users {
    statusCode: number;
    error: string;
    message: string;
    token: string;
    refreshToken: string;
    expirationTime: string;
    name: string;
    email: string;
    role: string;
    password: string;
    image: string;
    address: string;
    birth_date: Date;
}
