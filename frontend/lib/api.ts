import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

type TokenGetter = () => Promise<string | null>;

let getAuthToken: TokenGetter | null = null;

export function registerAuthTokenGetter(
    tokenGetter: TokenGetter | null
) {
    getAuthToken = tokenGetter;
}

api.interceptors.request.use(
    async (config) => {
        if (!getAuthToken) {
            return config;
        }

        const token = await getAuthToken();

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);