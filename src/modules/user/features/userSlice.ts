import { PayloadAction, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../interface";
import { createModel } from "../../../services/api.service";
import { UserResponseStatus } from "../enums";
import { Status } from "../../../interfaces";
import { translateErrors } from "../../../utils/commons";

const initialState: IUserState = {
    data: null,
    status: Status.idle,
    statusCode: null,
    message: ""
};

export const createUser = createAsyncThunk("users/create", async (payload: unknown) => {
    const response = await createModel("users/signup-webapp")(payload);
    return response.data;
});

export const logout = createAction("user/logout", () => {
    return {
        payload: {
            data: null,
            statusCode: null,
            status: Status.idle,
            message: ""
        }
    };
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: {
            reducer: (state, action: PayloadAction<IUserState>) => {
                return { ...state, data: action.payload.data || null };
            },
            prepare: logout
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state) => {
                state.data = null;
                state.statusCode = null;
                state.status = Status.loading;
                state.message = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.data = action.payload.data || null;
                state.statusCode = action.payload.statusCode || null;
                state.status =
                    [UserResponseStatus.USER_CREATED].indexOf(action.payload.statusCode) > -1
                        ? Status.success
                        : Status.error;
                state.message = action.payload.message || "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.data = null;
                state.status = Status.error;
                if (action.error.message && JSON.parse(action.error.message)?.statusCode !== "") {
                    const response: IUserState = JSON.parse(action.error.message);
                    state.message = response.statusCode
                        ? translateErrors(response.statusCode)
                        : action.error.message || "";
                    state.statusCode = response.statusCode || null;
                } else {
                    state.message = action.error.message || "";
                    state.statusCode = action.error.message || "";
                }
            });
    }
});

export const { logout: logoutUser } = userSlice.actions;
