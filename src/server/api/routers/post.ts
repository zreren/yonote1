import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {post, user} from "@/server/db/schema";
import {eq} from "drizzle-orm";
import {getCurrentTime} from "@/tools/getCurrentTime";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1),
      content: z.string(),
      tag: z.string(),
      status: z.boolean(),}))
    .mutation( async ({ ctx, input }) => {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      ctx.db.select().from(post).where(eq(post.name, input.name))
      return await ctx.db.insert(post).values({
        name: input.name,
        content: input.content,
        tag: input.tag,
        status: true,
          updatedAt: getCurrentTime()
      }).returning({name: post.name,content:post.content,tag:post.tag,status:post.status});
    }),

    updateIsTop:publicProcedure
        .input(z.object({id:z.number(),isTop:z.boolean()}))
        .mutation( async ({ ctx, input }) => {
            return ctx.db.update(post).set({isTop:input.isTop}).where(eq(post.id,input.id));
        }),
    updateIsFree:publicProcedure
        .input(z.object({id:z.number(),isFree:z.boolean()}))
        .mutation( async ({ ctx, input }) => {
            return ctx.db.update(post).set({isFree:input.isFree}).where(eq(post.id,input.id));
        }),
  deletePost:publicProcedure.input(z.object({id:z.number()}))
      .mutation(({ctx,input})=>{
          ctx.db.delete(post).where(eq(post.id,input.id))
      }),
  getLatest: publicProcedure.query(async({ ctx }) => {
    return await ctx.db.query.post.findFirst({
      orderBy: (post, { desc }) => [desc(post.createdAt)],
    });
  }),

    getAll: publicProcedure
        .input(z.object({columnId:z.string(),limit:z.number(),offset:z.number()}))
        .query(async ({ ctx,input})=>{
            return ctx.db.query.post.findMany({
                limit: input.limit,
                offset: input.offset,
                where: eq(post.columnId, input.columnId),
            })
        }),

});
