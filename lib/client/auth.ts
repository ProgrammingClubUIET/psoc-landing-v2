import type { Role } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Either, left, right } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import { ErrResp, OkResp } from "../helpers/apiResp";
import { LoginReq } from "../requests/login";
import { RegisterReq } from "../requests/register";

type LoginResp = {
    token: string,
    user_info: {
        name: string,
        email: string,
        role: Role
    }
}

export function authClient(
    client: BackendClient,
    req: LoginReq
): Promise<Either<string, LoginResp>> {
    return axios.post<OkResp<LoginResp>>("/api/auth/login", req, client)
    .then((v) => {
        return right(v.data.data);
    })
    .catch((e: AxiosError) => {
        const res = e.response!.data as ErrResp;
        return left(res.data);
    })
}

export type RegisterReqClient = RegisterReq & ({ mentee: { resume: string } } | { mentor: true });

export function registerUser(
    client: BackendClient,
    req: RegisterReqClient
): Promise<Either<string, LoginResp>> {
    return axios.post<OkResp<LoginResp>>("/api/auth/register", req, client)
    .then((v) => {
        return right(v.data.data);
    })
    .catch((e: AxiosError) => {
        const res = e.response!.data as ErrResp;
        return left(res.data);
    });
}

export function me(client: BackendClient) {
    return axios.get<OkResp<{ name: string}>>("/api/user/me", client)
    .then(v => right(v.data.data))
    .catch((e: AxiosError) => left(e.response!.data as ErrResp))
}