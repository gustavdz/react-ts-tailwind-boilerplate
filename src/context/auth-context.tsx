import { useState, createContext, useContext } from "react";
import * as React from "react";
import configAuth from "../config/auth/index";
import { IContext, IUserContext } from "../interfaces";
import { useProvideAuthFirebase } from "../config/provider/firebase/services";

const user: IUserContext = {
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    uid: "",
    isAuthenticated: false
};

const context: IContext = {
    user: user,
    isLoggedIn: null,
    loading: true,
    error: null,
    token: null,
    isNewUser: false,
    loginEmail: async () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new Promise<any>(() => {
            return "";
        }),
    loginAnonymous: async () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new Promise<any>(() => {
            return "";
        }),
    loginProvider: async () =>
        new Promise<void>(() => {
            return "";
        }),
    register: async () =>
        new Promise<void>(() => {
            return "";
        }),
    logout: async () =>
        new Promise<void>(() => {
            return "";
        }),
    resetPassword: async () =>
        new Promise<void>(() => {
            return "";
        }),
    changePassword: async () =>
        new Promise<void>(() => {
            return "";
        }),
    loginApi: function (): Promise<IUserContext | undefined> {
        throw new Error("Function not implemented.");
    },
    restorePassword: null
};

export const UserContext = createContext<IContext>(context);
export const PasswordRestoreContext = createContext<IContext>(context);

export function UserProvider(props: { children: React.ReactNode }): JSX.Element {
    const { children } = props;
    const [provider] = useState(configAuth.authProviderConfig.authProvider);
    let auth = context;
    if (provider === "firebase") {
        auth = useProvideAuthFirebase();
    } else if (provider === "aws") {
        auth = useProvideAuthFirebase();
    }
    return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

export const useAuth = (): IContext => {
    const context = useContext(UserContext);
    if (!context) {
        throw Error("useAuth must be used within a ProvideAuth");
    }
    return context;
};
