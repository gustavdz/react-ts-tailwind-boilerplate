import { createModel, updateModel } from "../../services/api.service";
import { IResetPasswordUserReturn } from "./interface";

/**
 * function to reset password of a user
 * @param id string with the id of the user to reset the password
 */
export const resetUserPassword = async (id: string): Promise<IResetPasswordUserReturn> => {
    const result = await updateModel(`users/${id}/password`)({});
    return result.data;
};

/**
 * function to reset password of a user
 * @param id string with the id of the user to reset the password
 */
export const resetUserPasswordByEmail = async (email: string): Promise<IResetPasswordUserReturn> => {
    const result = await createModel("users/password-recovery")({ email });
    return result.data;
};
