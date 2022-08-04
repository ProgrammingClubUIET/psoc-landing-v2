import * as t from "io-ts";
import { ObjectIdT } from "../helpers/objectIdT";

export const MenteeResumeReq = t.type({
    menteeId: ObjectIdT
});

export type MenteeResumeReq = t.TypeOf<typeof MenteeResumeReq>;