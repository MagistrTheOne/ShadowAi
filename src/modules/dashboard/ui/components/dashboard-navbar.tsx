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

      <nav
        className="flex items-center justify-between px-4 py-3 bg-green-950"
      >
        {/* Левая кнопка сайдбара */}
        <div className="flex items-center gap-x-2">
          <Button variant="outline" onClick={toggleSidebar}>
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
            className="h-9 w-[260px] justify-start font-normal text-muted-foreground hover:text-white transition-all"
            variant="outline"
            size="sm"
            onClick={() => setcommandOpen((open) => !open)}
          >
            <SearchIcon className="mr-2" />
            Search
            <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
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
