"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "../../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white border border-gray-200 shadow-lg py-8 px-6 rounded-2xl space-y-8">
      {/* Верхняя панель */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Agents
        </h2>
        <Button
          variant="ghost"
          className="bg-gray-900 hover:bg-gray-800 active:scale-95 
                     border border-gray-700 hover:border-gray-600
                     text-white font-medium px-6 py-2.5 rounded-lg
                     shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setOpen(true)}
        >
          Open Dialog
        </Button>
      </div>

      {/* Диалог */}
      <ResponsiveDialog
        title="Responsive test"
        description="Responsive description"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => setOpen(false)}
            className="self-end bg-gray-900 hover:bg-gray-800 active:scale-95
                       text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg
                       transition-all duration-300"
          >
            Exit
          </Button>
        </div>
      </ResponsiveDialog>

      {/* Таблица */}
      <div className="flex-1 pb-6 px-2 flex flex-col gap-y-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <DataTable data={data} columns={columns} />
          {data.length === 0 && (
            <EmptyState
            title="Create you first AGI Agent"
            description="Create an AGI to join in meetings & Interact with Agents & video call"
            
            />
          )
          }
        </div>
      </div>
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <div className="w-full bg-white border border-gray-200 shadow-lg py-12 px-8 rounded-2xl">
      <LoadingState
        title="Loading Agents for Evil"
        description="Take a moment, my friend… don’t panic!"
      />
    </div>
  );
};

export const AgentsViewError = () => {
  return (
    <div className="w-full bg-white border border-gray-200 shadow-lg py-12 px-8 rounded-2xl">
      <ErrorState
        title="Failed to Load Agents"
        description="We couldn't load your agents. Please try refreshing the page or contact support if the problem persists."
      />
    </div>
  );
};
