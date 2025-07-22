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
    <div
      // Тёмная, более "гласморфная" панель с эффектом стекла
      className="w-full max-w-3xl mx-auto p-6 bg-green-950 border  rounded-xl shadow-xl   space-y-6"
    >
      {/* Заголовок и кнопка открытия диалога */}
      <div className="flex items-center justify-between">
        {/* Усиленный жирный и тёмный заголовок Agents */}
        <h2 className="text-lg font-extrabold text-white drop-shadow-md select-none">
          Agents
        </h2>
        <Button
          variant="ghost"
          className="bg-white"
          onClick={() => setOpen(true)}
        >
          Open Dialog
        </Button>
      </div>

      {/* Диалог с кнопкой внутри */}
      <ResponsiveDialog
        title="Responsive test"
        description="Responsive description"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex flex-col space-y-4">
          <Button onClick={() => setOpen(false)} className="self-end">
            Exit
          </Button>
        </div>
      </ResponsiveDialog>

      {/* Карточки агентов вместо JSON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data?.map((agent: any) => (
          <div
            key={agent.id}
            // Немного темнее, гласморфный стиль для карточек агентов
            className="bg-emerald-900  p-4 border border-white/10 rounded-lg shadow-md backdrop-blur-md"
          >
            {/* Имя агента */}
            <h3 className="text-white font-semibold truncate">{agent.name}</h3>
            {/* Инструкции */}
            <p className="text-white/70 text-sm mt-1 line-clamp-3">
              {agent.instructions}
            </p>
            {/* Можно добавить email или userId, если нужно */}
            <p className="text-white/40 text-xs mt-2 truncate">{agent.userId}</p>
          </div>
        ))}
      </div>
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
