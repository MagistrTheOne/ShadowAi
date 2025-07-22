import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';

// Расширяем ctx, добавим поле session для удобства
interface Context {
  userId?: string;
  session?: Awaited<ReturnType<typeof auth.api.getSession>>;
}

export const createTRPCContext = cache(async (): Promise<Context> => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new TRPCError({ code:"UNAUTHORIZED",message: "UNAUTHORIZED"})
  }

  ctx.session = session; // теперь типы в ctx совпадают

  return next({ctx: {...ctx,auth:session}}); // важный момент — верни next()
});
