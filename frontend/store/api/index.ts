
import { homeApi } from "./homeApi";

export const apiReducers = {
    [homeApi.reducerPath]: homeApi.reducer,
};

export const apiMiddleware = [
    homeApi.middleware,
];