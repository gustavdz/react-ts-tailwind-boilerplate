/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import Axios from "../config/axios";
import { authFirebase } from "../config/provider/firebase/index";
async function getToken() {
    const user = authFirebase.currentUser;
    const token = await user?.getIdToken();
    return token;
}

async function getHeaders(headersParams?: { contentType?: string }) {
    const environment = import.meta.env.VITE_ENVIRONMENT || "production";
    const token = await getToken();
    if (token) {
        const headers = {
            Authorization: `Bearer ${token}`,
            ...(headersParams && headersParams.contentType && { "Content-Type": headersParams.contentType }),
            ...(["local", "development"].indexOf(environment) > -1 &&
                token?.split(".")[1] && {
                    "x-apigateway-api-userinfo": token.split(".")[1]
                })
        };
        return headers;
    }
}

const setParameters = (url: string, params?: string): string => {
    let withToken = `${url}`;
    if (params && Object.keys(params).length) {
        const queryParams = Object.keys(params).reduce(
            (par, key: any) => (par += `&${key}=${params[key]}`),
            `?tick=${new Date().getTime()}`
        );
        withToken = withToken + queryParams;
    }
    return withToken;
};

const get = async (model: string, options?: { id: string; params: string }): Promise<any> => {
    try {
        const { id, params } = options || {};
        const headers = await getHeaders();
        return await Axios.get(setParameters(`/${model}${id ? "/" + id : ""}`, params), {
            headers
        });
    } catch (error: any) {
        if ("statusCode" in error) {
            throw new Error(JSON.stringify(error));
        }
    }
};

const create =
    (model: string) =>
    async (body: any): Promise<any> => {
        try {
            const headers = await getHeaders();
            return await Axios.post(`/${model}`, body, {
                headers
            });
        } catch (error: any) {
            if ("statusCode" in error) {
                throw new Error(JSON.stringify(error));
            }
        }
    };

const update =
    (model: string) =>
    async (body: any): Promise<any> => {
        try {
            // const token = await getToken();
            const headers = await getHeaders();
            return await Axios.patch(`/${model}`, body, {
                headers
            });
        } catch (error: any) {
            if ("statusCode" in error) {
                throw new Error(JSON.stringify(error));
            }
        }
    };

const remove = async (model: string): Promise<any> => {
    try {
        // const token = await getToken();
        const headers = await getHeaders();
        return await Axios.delete(`/${model}`, {
            headers
        });
    } catch (error: any) {
        if ("statusCode" in error) {
            throw new Error(JSON.stringify(error));
        }
    }
};

const upload =
    (url: string, contentType: string) =>
    async (body: any): Promise<any> => {
        try {
            const headers = {
                "Content-Type": contentType
            };
            return await Axios.put(`${url}`, body, {
                headers
            });
        } catch (error: any) {
            if ("statusCode" in error) {
                throw new Error(JSON.stringify(error));
            }
        }
    };

const download = async (url: string, contentType: string): Promise<any> => {
    try {
        const headers = await getHeaders({ contentType });
        return await Axios.post(
            `/${url}`,
            {},
            {
                headers
            }
        );
    } catch (error: any) {
        if ("statusCode" in error) {
            throw new Error(JSON.stringify(error));
        }
    }
};

export const getModel = get;
export const createModel = create;
export const updateModel = update;
export const postModel = create;
export const deleteModel = remove;
export const uploadToGCP = upload;
export const downloadFile = download;
