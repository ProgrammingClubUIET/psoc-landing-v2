import axios, { AxiosError } from "axios";
import { right, left } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import type { ProjectRes } from "../../pages/api/projects";
import { ErrResp, OkResp } from "../helpers/apiResp";

export function getProjects(client: BackendClient) {
    return axios.get<OkResp<ProjectRes[]>>("/api/projects", client)
        .then(v => right(v.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp))
}

export function getProject(client: BackendClient, projectId: string) {
    return axios.get<OkResp<ProjectRes>>(`/api/projects/${projectId}`, client)
        .then(v => right(v.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp))
}

export function getProjectsByMentor(client: BackendClient) {
    return axios.get<OkResp<ProjectRes[]>>("/api/projects/by-mentor", client)
        .then(v => right(v.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp))
}