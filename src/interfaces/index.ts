import { Reducer } from "@reduxjs/toolkit";
import { IUserState } from "../modules/user/interface";

export enum Status {
    idle = "idle",
    loading = "loading",
    success = "success",
    error = "error"
}
export interface IErrorCode {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message: string;
    code: string;
}

export interface IUserContext {
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    uid: string;
    isAuthenticated: boolean;
}
export interface IValues {
    acceptTerms: boolean;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface IFirebase {
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
    values: IValues;
}

export interface IUi {
    user: { uid: string };
}

export interface IAuth {
    email: string;
    password: string;
}

export interface IEmail {
    email: string;
}

export interface IUserRegister {
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface IError {
    statusCode: string;
    message: string;
    error: string;
}
export interface IContext {
    user: IUserContext | null | undefined;
    isLoggedIn: boolean | null;
    error: IError | null;
    loading: boolean;
    token: string | null | undefined;
    isNewUser: boolean;
    loginEmail: (email: string, password: string) => Promise<void>;
    loginAnonymous: () => Promise<void>;
    loginApi: (uid: { authId: string | undefined }) => Promise<IUserContext | undefined>;
    loginProvider: (provider: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changePassword: (password: string) => Promise<void>;
    restorePassword: string | null;
}

export type AuthIdType = {
    authId: string | undefined;
};

export interface IReduce {
    user: Reducer<IUserState>;
}
