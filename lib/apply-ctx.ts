import { createContext } from "react";

export type ProjectRes = {
    id: string,
    name: string,
    url: string,
    logo: string,
    description: string,
    mentorName: string
}

export const ApplyProjectCtx = createContext({
    cache: undefined as (undefined | ProjectRes),
});