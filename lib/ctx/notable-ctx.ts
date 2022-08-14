import { createContext } from "react";
import type { ProjectRes } from "../../pages/api/projects";

export const NotableContext = createContext({
    cache: undefined as (undefined | { iconPath: string, name: string }[]),
});