import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const attentionsRouter = createTRPCRouter({
    userAttentions: protectedProcedure.input(z.object({id: z.string()})).query(async ({input, ctx: {db}}) => {
        const attentions = await db.attention.findMany({
            where: {partnerId: input.id}
        })

        return attentions
    })
})