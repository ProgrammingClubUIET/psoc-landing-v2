import axios, { AxiosError } from "axios";
import { left, right } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import type { ApplicantsRes } from "../../pages/api/mentor/project-applicants";
import { ErrResp, OkResp } from "../helpers/apiResp";

export function getApplicants(client: BackendClient) {
    return axios.get<OkResp<ApplicantsRes[]>>("/api/mentor/project-applicants", client)
        .then(v => right(v.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp))
}