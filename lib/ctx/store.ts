import type { Role } from "@prisma/client";
import create from "zustand";
import { persist } from "zustand/middleware";
import { BackendClient, backendClient } from "../client";

export type AuthInfo = {
    token: string,
    role: Role
};

type GlobalStore = {
    auth: AuthInfo | undefined,
    client: BackendClient,
    setAuth: (token: AuthInfo | undefined) => void
};

export const useGlobalStore = create(persist<GlobalStore>((set, get) => {
    return {
        auth: undefined,
        client: backendClient(get()?.auth?.token),
        setAuth: (auth) => {
            set(() => ({ auth, client: backendClient(auth?.token) }));
        }
    }
}));