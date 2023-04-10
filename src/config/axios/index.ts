import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import configAuth from "../auth";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error.response?.data || error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
    axiosInstance.defaults.timeout = 900000;
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

const instance = axios.create({
    baseURL: configAuth.api.url
});

setupInterceptorsTo(instance);

export default instance;
