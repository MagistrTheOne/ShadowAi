"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <div className="w-full py-8">
        <div className="relative overflow-hidden bg-gray-50 flex items-center justify-between rounded-2xl px-8 py-6 shadow-lg border border-gray-200">
          {/* Мягкий паттерн поверх */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/[0.02] via-transparent to-black/[0.02] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_50%)]" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-sm" />
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight select-none">
              My Agents
            </h2>
          </div>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="relative z-10 group bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 shadow-md hover:shadow-lg transition-all duration-300 font-medium text-white px-6 py-3 rounded-xl hover:scale-[1.02] active:scale-95"
          >
            <div className="relative z-10 flex items-center gap-2">
              <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>New Agent</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
