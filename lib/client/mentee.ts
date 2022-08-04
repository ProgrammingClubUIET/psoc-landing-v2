import axios, { AxiosError } from "axios";
import { left, right } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import { ErrResp } from "../helpers/apiResp";
import { ApplyProjectReq } from "../requests/applyProject";

export function applyToProject(client: BackendClient, req: ApplyProjectReq) {
    return axios.post("/api/mentee/apply-project", req, client)
        .then(() => right(undefined))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));
}