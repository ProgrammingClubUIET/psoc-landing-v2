// WARN: THIS ENDPOINT SHOULDN'T BE PRESENT IN PRODUCTION

import { Role } from "@prisma/client";
import { right, left } from "fp-ts/lib/Either";
import { NextApiRequest, NextApiResponse } from "next";
import authRepo from "../../../lib/deps/auth";
import prisma from "../../../lib/deps/prisma";
import { errResp, expressRes, expressUnwrappErr } from "../../../lib/helpers/apiResp";
import { scryptHash } from "../../../lib/helpers/scrypt";
import { bodyValidator } from "../../../lib/middleware/reqValidator";
import { RegisterReq } from "../../../lib/requests/register";

async function handler(_: NextApiRequest, res: NextApiResponse, user: RegisterReq) {
    const pwHash = await scryptHash(user.password);
    let mentee;
    let mentor;
    let role;
    if ("mentee" in user) {
        mentee = { create: { resume: user.mentee.resume } };
        role = Role.MENTEE;
    } else {
        mentor = { create: { } };
        role = Role.MENTOR;
    }
    const newUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: pwHash,
            nonce: 0,
            role,
            mentee,
            mentor
        }
    });

    const token = await authRepo.generateToken({
        userId: newUser.id,
        nonce: 0
    });

    return expressRes(res, right({
        user_info: {
            name: user.name,
            email: user.email,
            role
        },
        token
    }))
}

export default bodyValidator(RegisterReq, handler);