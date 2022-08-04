import type { Role } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Either, left, right } from "fp-ts/lib/Either";
import { BackendClient } from ".";
import { ErrResp, OkResp } from "../helpers/apiResp";
import { LoginReq } from "../requests/login";

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