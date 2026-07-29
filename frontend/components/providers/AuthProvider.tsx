"use client";

import {
    useEffect,
    useState,
} from "react";
import { useAuth } from "@clerk/nextjs";

import {
    registerAuthTokenGetter,
} from "@/lib/api";

type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({
    children,
}: AuthProviderProps) {
    const {
        getToken,
        isLoaded,
    } = useAuth();

    const [isApiAuthReady, setIsApiAuthReady] =
        useState(false);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        registerAuthTokenGetter(
            async () => {
                return await getToken();
            }
        );

        setIsApiAuthReady(true);

        return () => {
            registerAuthTokenGetter(null);
            setIsApiAuthReady(false);
        };
    }, [getToken, isLoaded]);

    if (
        !isLoaded ||
        !isApiAuthReady
    ) {
        return null;
    }

    return children;
}