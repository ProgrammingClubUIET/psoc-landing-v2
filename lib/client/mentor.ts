import axios, { AxiosError } from "axios";
import { left, right } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import type { ApplicantsRes } from "../../pages/api/mentor/project-applicants";
import { MenteeRes } from "../../pages/api/mentor/project-mentees";
import { ErrResp, OkResp } from "../helpers/apiResp";
import type { AcceptMenteeReq } from "../requests/acceptMentee";

export function getApplicants(client: BackendClient) {
    return axios.get<OkResp<ApplicantsRes>>("/api/mentor/project-applicants", client)
        .then(v => right(v.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp))
}

export function getProjectMentees(client: BackendClient) {
    return axios.get<OkResp<MenteeRes>>("/api/mentor/project-mentees", client)
        .then(v => right(v.data.data))
        .catch((e: AxiosError) => left(e.response!.data as ErrResp));
}

export function acceptMentee(client: BackendClient, req: AcceptMenteeReq) {
    return axios.post("/api/mentor/accept-mentee", req, client);
}