/**
 * User model
 */

export interface IUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserState {
    statusCode?: string | null;
    status: string;
    data: IUser | null;
    message: string;
}

export interface IUserResetPassword {
    id: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IResetPasswordUserReturn {
    statusCode: string | null;
    status: string;
    data: IUserResetPassword;
    message: string;
}
