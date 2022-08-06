import axios, { AxiosError } from "axios";
import { left, right } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import { ProjectRes } from "../../pages/api/projects";
import { ErrResp, OkResp } from "../helpers/apiResp";
import { ApplyProjectReq } from "../requests/applyProject";
import { FinalizeProjectReq } from "../requests/finalizeProject";

export function applyToProject(client: BackendClient, req: ApplyProjectReq) {
    return axios.post("/api/mentee/apply-project", req, client)
        .then(() => right(undefined))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));
}

export function getAppliedProjects(client: BackendClient) {
    return axios.get<OkResp<ProjectRes[]>>("/api/mentee/applied-project", client)
        .then(res => right(res.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));

}

export function getAcceptedProjects(client: BackendClient) {
    return axios.get<OkResp<ProjectRes[]>>("/api/mentee/accepted-projects", client)
        .then(res => right(res.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));
}

export function getFinalizedProject(client: BackendClient) {
    return axios.get<OkResp<ProjectRes>>("/api/mentee/finalized-project", client)
        .then(res => right(res.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));
}

export function finalizeProject(client: BackendClient, req: FinalizeProjectReq) {
    return axios.post("/api/mentee/finalize-project", req, client)
        .then(() => right(undefined))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));
}