import { left } from "fp-ts/lib/Either";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/deps/prisma";
import { errResp, expressUnwrappErr } from "../../../../lib/helpers/apiResp";
import { queryValidator } from "../../../../lib/middleware/reqValidator";
import { MenteeResumeReq } from "../../../../lib/requests/menteeResume";

const ERR_MENTEE_NF = errResp(404, "Mentee not found");

async function handler(req: NextApiRequest, res: NextApiResponse, { menteeId }: MenteeResumeReq) {
    const user = await prisma.mentee.findFirst({
        select: { resume: true },
        where: { id: menteeId }
    });
    if (!user) return expressUnwrappErr(res, left(ERR_MENTEE_NF));

    res.setHeader("content-type", "application/pdf");
    return res.send(user.resume);
}

export default queryValidator(MenteeResumeReq, handler);