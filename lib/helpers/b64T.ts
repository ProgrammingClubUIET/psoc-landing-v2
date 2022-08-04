import { pipe } from "fp-ts/lib/function"
import { flatten, map, right } from "fp-ts/lib/Either"
import * as t from "io-ts"

export const Base64T = new t.Type<Buffer, string, unknown>(
    'Base64',
    (u): u is Buffer => u instanceof Buffer,
    (i, ctx) => pipe(
        t.string.validate(i, ctx),
        map((v) => {
            try {
                return right(Buffer.from(v, "base64"));
            } catch {
                return t.failure<Buffer>(v, ctx, "string is not an base64")
            }
        }),
        flatten
    ),
    String
);