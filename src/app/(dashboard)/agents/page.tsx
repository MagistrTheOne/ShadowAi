// app/(dashboard)/agents/page.tsx
import { getQueryClient, trpc, HydrateClient } from '@/trpc/server';
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['agents.getMany'],
    queryFn: () => trpc.agents.getMany(),
  });

  return (
    <HydrateClient>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default Page;
