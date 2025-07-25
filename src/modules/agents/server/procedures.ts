import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { auth } from '@/lib/auth';
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Input } from "@/components/ui/input";
 

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input,  }) => {
    const [existingAgent] = await db
      .select({
        meetingCount: sql <number>`5`,
        ...getTableColumns(agents),
        //TDL:CHANGE TO ACTUAL COUNT
         
      })
      .from(agents)
      .where(eq(agents.id, input.id));
    return existingAgent;
  }),

  getMany: baseProcedure.query(async () => {
    const data = await db
      .select()
      .from(agents);
    return data;
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id
        })
        .returning();
      return createdAgent;
    }),
});
