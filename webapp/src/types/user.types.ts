export interface Users {
    id: string;
    createdAt: string;
    updatedAt?: null;
    deletedAt?: null;
    email: string;
    name: string;
    password: string;
    userName: string;
}

export interface UsersDto {
    email: string;
    name: string;
    password: string;
    userName: string;
}

export interface UpdateUsersDto {
    email: string;
    name: string;
    userName: string;
}

