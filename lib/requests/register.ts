import * as t from "io-ts";
import { Base64T } from "../helpers/b64T";

const MenteeInfo = t.type({
    resume: Base64T
});

export const RegisterReq = t.intersection([
    t.type({
        name: t.string,
        email: t.string,
        password: t.string,
    }),
    t.union([
        t.type({ mentee: MenteeInfo }),
        t.type({ mentor: t.literal(true) })
    ])
]);

export type RegisterReq = t.TypeOf<typeof RegisterReq>;