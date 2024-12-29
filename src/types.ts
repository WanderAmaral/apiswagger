import type { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifytypedInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>