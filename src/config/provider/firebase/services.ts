/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { authFirebase, google, facebook, apple } from "./index";
import { IContext, IUserContext, IError, AuthIdType } from "../../../interfaces";

import { postModel } from "../../../services/api.service";
import { resetUserPasswordByEmail } from "../../../modules/user/services";
import { useAppDispatch } from "../../../store";
import { logoutUser } from "../../../modules/user/features/userSlice";

export const useProvideAuthFirebase = (): IContext => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IError | null>(null);
    const [user, setUser] = useState<IUserContext | null | undefined>();
    const [token, setToken] = useState<string | null | undefined>(null);
    const [restorePassword, setRestorePassword] = useState<string | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // LOGIN DESPUES DEL FIREBASE PASO 2
    const loginApi = async (uid: AuthIdType): Promise<IUserContext | undefined> => {
        try {
            setError(null);
            const resultLogin = await postModel("users/login")(uid);
            const login = resultLogin?.data && resultLogin?.data?.data ? resultLogin.data.data : null;
            if (login && login.type && ["client", "manager"].indexOf(login.type) > -1) {
                const user = authFirebase.currentUser;
                const getToken = await user?.getIdToken();
                setToken(getToken);
                if (user != null) {
                    const auth = {
                        email: user.email ? user.email : "",
                        firstName: login.firstName,
                        lastName: login.lastName,
                        fullName: user.displayName ? user.displayName : "",
                        photoURL: user.photoURL ? user.photoURL : "",
                        uid: user.uid ? user.uid : "",
                        type: login.type,
                        superAdmin: login.superAdmin,
                        userId: login.client.userId,
                        clientId: login.clientId,
                        organizationId: login.organizationId,
                        isAuthenticated: !user.isAnonymous
                    };
                    setRestorePassword(null);
                    setIsNewUser(login.firstLogin);
                    setUser(auth);
                    setLoggedIn(true);
                }
                return login;
            } else {
                await authFirebase.signOut();
                setError({
                    statusCode: "UNAUTHORIZED_USER",
                    message: "Usuario No autorizado",
                    error: "unauthorized user"
                });
                setIsLoading(false);
                setLoggedIn(false);
            }
        } catch (error: any) {
            await authFirebase.signOut();
            setError({
                statusCode: error.code,
                message: error.message,
                error: error.message
            });
            setLoggedIn(false);
            setIsLoading(false);
        }
    };

    // LOGIN FIREBASE PASO 1
    const loginEmail = async (email: string, password: string): Promise<any> => {
        setIsLoading(true);
        try {
            const userAuth = await authFirebase.signInWithEmailAndPassword(email.toLowerCase().trim(), password);
            const uid = { authId: userAuth.user?.uid };
            const login = await loginApi(uid);
            setIsLoading(false);
            return login;
        } catch (error: any) {
            setError({
                statusCode: error.code,
                message: error.message,
                error: error.message
            });
            setLoggedIn(false);
            setIsLoading(false);
        }
    };

    // LOGIN FIREBASE PASO 1
    const loginAnonymous = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            if (!isLoggedIn) {
                const user = authFirebase.currentUser;
                const getToken = await user?.getIdToken();
                setToken(getToken);
                if (user != null) {
                    setLoggedIn(true);
                } else {
                    const userAuth = await authFirebase.signInAnonymously();
                    if (userAuth?.user?.uid) {
                        const uid = { authId: userAuth.user.uid };
                        await loginApi(uid);
                    }
                }
            }
            setIsLoading(false);
        } catch (error: any) {
            setError({
                statusCode: error.code,
                message: error.message,
                error: error.message
            });
            setLoggedIn(false);
            setIsLoading(false);
        }
    };

    // botones google, facebook
    const loginProvider = async (provider: string) => {
        setIsLoading(true);
        switch (provider) {
            case "google":
                try {
                    const userAuth = await authFirebase.signInWithPopup(google);
                    const uid = { authId: userAuth.user?.uid };
                    const login = await loginApi(uid);
                    if (login) {
                        setLoggedIn(true);
                        setIsLoading(false);
                    }
                } catch (error: any) {
                    setError({
                        statusCode: error.code,
                        message: error.message,
                        error: error.message
                    });
                    setLoggedIn(false);
                    setIsLoading(false);
                }
                break;
            case "facebook":
                try {
                    const userAuth = await authFirebase.signInWithPopup(facebook);
                    const uid = { authId: userAuth.user?.uid };
                    const login = await loginApi(uid);
                    if (login) {
                        setLoggedIn(true);
                        setIsLoading(false);
                    }
                } catch (error: any) {
                    setError({
                        statusCode: error.code,
                        message: error.message,
                        error: error.message
                    });
                    setLoggedIn(false);
                    setIsLoading(false);
                }
                break;
            case "apple":
                try {
                    const userAuth = await authFirebase.signInWithPopup(apple);
                    const uid = { authId: userAuth.user?.uid };
                    const login = await loginApi(uid);
                    if (login) {
                        setLoggedIn(true);
                        setIsLoading(false);
                    }
                } catch (error: any) {
                    setError({
                        statusCode: error.code,
                        message: error.message,
                        error: error.message
                    });
                    setLoggedIn(false);
                    setIsLoading(false);
                }
                break;

            default:
                break;
        }
    };

    const register = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        await authFirebase.createUserWithEmailAndPassword(email, password).then(() => {
            setIsLoading(false);
        });
    };

    const resetPassword = async (email: string): Promise<void> => {
        await resetUserPasswordByEmail(email).then(() => {
            setIsLoading(false);
        });
    };

    const changePassword = async (password: string): Promise<void> => {
        const user = authFirebase.currentUser;
        await user?.updatePassword(password);
    };

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        await authFirebase.signOut().then(async () => {
            dispatch(logoutUser());
            setLoggedIn(false);
            setUser(null);
            setToken(null);
            await loginAnonymous();
            setIsLoading(false);
        });
    };

    useEffect(() => {
        try {
            const unsubscribe = authFirebase.onAuthStateChanged(async (userAuth): Promise<void> => {
                if (isLoggedIn && !user) {
                    if (userAuth) {
                        const uid = { authId: userAuth.uid };
                        await loginApi(uid);
                    }
                } else {
                    if (!user?.uid) {
                        await loginAnonymous();
                    }
                }
            });
            return () => unsubscribe();
        } catch (e) {
            setLoggedIn(false);
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    return {
        user,
        isLoggedIn,
        loading,
        error,
        token,
        isNewUser,
        loginEmail,
        loginAnonymous,
        loginProvider,
        register,
        logout,
        resetPassword,
        changePassword,
        restorePassword,
        loginApi
    };
};
