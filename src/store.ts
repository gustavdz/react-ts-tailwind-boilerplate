import { configureStore, combineReducers, AnyAction, Reducer } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { IReduce } from "./interfaces";
import { userSlice } from "./modules/user/features";

const reducers: IReduce = {
    user: userSlice.reducer
};

const rootReducer: Reducer = combineReducers(reducers);

const resettableRootReducer = (state: ReturnType<typeof rootReducer> | undefined, action: AnyAction) => {
    if (action.type === "user/logout") {
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

export const store = configureStore({
    reducer: resettableRootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
