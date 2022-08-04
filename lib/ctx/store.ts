import create from "zustand";
import { persist } from "zustand/middleware";
import { BackendClient, backendClient } from "../client";


type GlobalStore = {
    auth: string | undefined,
    client: BackendClient,
    setAuth: (token: string | undefined) => void
};

export const useGlobalStore = create(persist<GlobalStore>((set, get) => {
    return {
        auth: undefined,
        client: backendClient(get()?.auth),
        setAuth: (token) => {
            set(() => ({ auth: token, client: backendClient(token) }));
        }
    }
}));