import { isLeft, left, right } from "fp-ts/lib/Either";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/deps/prisma";
import { expressRes, expressUnwrappErr } from "../../../lib/helpers/apiResp";
import { ERR_PROJECT_NF } from "../mentee/apply-project";
import { getMentor } from "./create-project";

export type MenteeInfo = {
    name: string,
    project: {
        id: string,
        logo: string,
        name: string
    }
}

export type MenteeRes = {
    selectedMentees: MenteeInfo[],
    finalizedMentees: MenteeInfo[]
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mentor = await getMentor(req);
    if (isLeft(mentor)) return expressUnwrappErr(res, mentor);

    const proj = await prisma.project.findMany({
        where: {
            mentorId: mentor.right.mentor.id
        },
        select: {
            id: true,
            logo: true,
            name: true,
            selectedMentees: {
                select: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            finalizedMentees: {
                select: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });

    if (!proj) return expressUnwrappErr(res, left(ERR_PROJECT_NF));
    const selectedMentees: MenteeInfo[] = [];
    const finalizedMentees: MenteeInfo[] = [];
    proj.map(p => {
        selectedMentees.push(...p.selectedMentees.map(m => ({
            name: m.user.name,
            project: {
                id: p.id,
                logo: p.logo,
                name: p.name
            }
        })));

        finalizedMentees.push(...p.finalizedMentees.map(m => ({
            name: m.user.name,
            project: {
                id: p.id,
                logo: p.logo,
                name: p.name
            }          
        })))
    })

    const ret: MenteeRes = {
        selectedMentees,
        finalizedMentees
    };

    return expressRes(res, right(ret));
}

export default handler;