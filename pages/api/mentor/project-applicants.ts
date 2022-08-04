import { isLeft, left, right } from "fp-ts/lib/Either";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/deps/prisma";
import { expressRes, expressUnwrappErr } from "../../../lib/helpers/apiResp";
import { ERR_PROJECT_NF } from "../mentee/apply-project";
import { getMentor } from "./create-project";

export type ApplicantsRes = {
    name: string,
    menteeId: string,
    application: string,
    project: {
        id: string,
        logo: string,
        name: string
    }
}[];

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mentor = await getMentor(req);
    if (isLeft(mentor)) return expressUnwrappErr(res, mentor);

    const proj = await prisma.project.findFirst({
        where: {
            mentorId: mentor.right.mentor.id
        },
        select: {
            applications: true,
            appliedMentees: {
                select: {
                    id: true,
                    user: {
                        select: {
                            name: true
                        }
                    },
                }
            },
            id: true,
            name: true,
            logo: true,
        }
    });

    if (!proj) return expressUnwrappErr(res, left(ERR_PROJECT_NF))

    const names: { [menteeId: string]: string } = {};

    for (const mentee of proj.appliedMentees) {
        names[mentee.id] = mentee.user.name;
    }

    const ret: ApplicantsRes = proj.applications.map((a, i) => ({
        name: names[a.menteeId],
        menteeId: a.menteeId,
        application: a.application,
        project: {
            id: proj.id,
            logo: proj.logo,
            name: proj.name
        }
    }));

    return expressRes(res, right(ret));
}

export default handler;