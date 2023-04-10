type typeError = {
    [key: string]: string;
};
export const typeErrors: typeError = {
    DEFAULT: "Ha ocurrido un error, por favor intenta nuevamente o comunícate con el administrador del sistema.",
    INTERNAL_SERVER_ERROR: "Error inesperado, consulte al administrador del sistema.",
    NOT_FOUND: "Recurso no encontrado.",
    USER_NOT_FOUND: "Usuario no encontrado.",
    "auth/wrong-password": "Contraseña incorrecta, verifique y vuelva a intentar.",
    "auth/too-many-requests":
        "El acceso a esta cuenta ha sido deshabilitado temporalmente debido a continuos intentos fallidos. Puede habilitarse inmediatamente restaurando su contraseña o puede intentarlo de nuevo más tarde.",
    "auth/user-not-found": "El email no ha sido registrado como usuario, verifique y vuelva a intentar."
};
