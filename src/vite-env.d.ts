interface ImportMetaEnv {
    readonly VITE_ENVIRONMENT: string;
    readonly VITE_APIURL: string;
    readonly VITE_AUTH_PROVIDER: string;
    readonly VITE_APIKEY: string;
    readonly VITE_AUTHDOMAIN: string;
    readonly VITE_DATABASEURL: string;
    readonly VITE_PROJECTID: string;
    readonly VITE_STORAGEBUCKET: string;
    readonly VITE_MEASUREMENTID: string;
    readonly VITE_MESSAGINGSENDERID: string;
    readonly VITE_APPID: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
