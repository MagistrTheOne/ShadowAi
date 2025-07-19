import 'server-only';  
import { createHydrationHelpers } from '@trpc/react-query/rsc';

import { cache } from 'react';
import { createCallerFactory, createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';

export const getQueryClient = cache(makeQueryClient);

// Если нужна фабрика caller
const callerFromFactory = createCallerFactory(appRouter)(createTRPCContext);

// Если нужна стандартная версия caller из appRouter
export const caller = appRouter.createCaller(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  callerFromFactory,
  getQueryClient,
);
