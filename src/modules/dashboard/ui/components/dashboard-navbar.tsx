"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  PanelLeftCloseIcon,
  PanelLeftIcon,
  SearchIcon,
} from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const iseMobile = useIsMobile();
  const [commandOpen, setcommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setcommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setcommandOpen} />

      <nav className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        {/* Левая кнопка сайдбара */}
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            onClick={toggleSidebar}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            {(state === "collapsed" || isMobile) ? (
              <PanelLeftIcon className="size-4" />
            ) : (
              <PanelLeftCloseIcon className="size-4" />
            )}
          </Button>
        </div>

        {/* Центр — Поиск */}
        <div className="flex-1 flex justify-center">
          <Button
            className="h-9 w-[260px] justify-start font-normal text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all"
            variant="outline"
            size="sm"
            onClick={() => setcommandOpen((open) => !open)}
          >
            <SearchIcon className="mr-2" />
            Search
            <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-500">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </Button>
        </div>

        {/* Правый блок под аватар или уведомления */}
        <div className="w-[40px]" />
      </nav>
    </>
  );

};
