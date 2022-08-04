import { createContext } from "react";
import type { ProjectRes } from "../../pages/api/projects";

export const ApplyProjectCtx = createContext({
    cache: undefined as (undefined | ProjectRes),
});