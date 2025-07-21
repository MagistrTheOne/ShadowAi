"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <ResponsiveDialog
        title="Responsive test"
        description="Responsive description"
        open={open}
        onOpenChange={setOpen}
      >
        <Button onClick={() => setOpen(false)}>Some Action</Button>
      </ResponsiveDialog>

      <pre className="whitespace-pre-wrap break-words text-sm mt-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents for Evil"
      description="Take a moment, my friend… don’t panic!"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Agents"
      description="We couldn't load your agents. Please try refreshing the page or contact support if the problem persists."
    />
  );
};
