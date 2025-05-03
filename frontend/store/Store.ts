import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiReducers, apiMiddleware } from "./api";

export const store = configureStore({
    reducer: {
        ...apiReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...apiMiddleware),
});

setupListeners(store.dispatch);