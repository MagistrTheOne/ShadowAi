"use client";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardUserButton } from "./dashboard-user-button";

// 🧠 Меню — вынесено в конфиги
const firstSection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

// 📦 Общий компонент меню
const MenuItems = ({ items, pathname }: { items: typeof firstSection; pathname: string }) => (
  <div className="space-y-1">
    {items.map((item) => {
      const active = pathname === item.href;
      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            className={cn(
              // Base styles
              "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out select-none overflow-hidden",
              // Background and hover effects
              "bg-gradient-to-r from-green-800/20 to-green-700/10 hover:from-green-700/40 hover:to-green-600/20",
              "backdrop-blur-sm border border-green-700/20 hover:border-green-600/40",
              // Shadow effects
              "shadow-sm hover:shadow-lg hover:shadow-green-900/30",
              // Text colors
              "text-green-100/80 hover:text-white",
              // Active state
              active && [
                "bg-gradient-to-r from-green-600/50 to-green-500/30",
                "border-green-500/60 text-white",
                "shadow-lg shadow-green-900/40",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:rounded-xl"
              ]
            )}
            isActive={active}
          >
            <Link href={item.href} className="flex items-center gap-3 w-full relative z-10">
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                "text-green-200/70 group-hover:text-white group-hover:scale-110",
                active && "text-white scale-110"
              )} />
              <span className="text-sm font-semibold tracking-wide">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    })}
  </div>
);

export const DashboardSidebar = () => {
  const pathname = usePathname() || "/";

  return (
    <Sidebar
      className="bg-gradient-to-b from-green-900 via-green-900/95 to-green-800/90 backdrop-blur-xl border-r border-green-700/30"
    >
      {/* 🔰 Шапка — стекло, тёмный фон, жирный заголовок */}
      <SidebarHeader className="px-6 py-6 bg-gradient-to-r from-green-800/40 to-green-700/30 backdrop-blur-md shadow-lg border-b border-green-700/40">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image 
              src="/logo.svg" 
              height={40} 
              width={40} 
              alt="Shadow AI Logo" 
              priority 
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-3xl font-black tracking-tight select-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-all duration-300">
            Shadow.Ai
          </h1>
        </Link>
      </SidebarHeader>

      <div className="px-6 py-3">
        <Separator className="bg-gradient-to-r from-transparent via-green-600/60 to-transparent h-px" />
      </div>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={firstSection} pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarSeparator className="my-6 bg-gradient-to-r from-transparent via-green-600/50 to-transparent h-px border-none" />

          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={secondSection} pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 👤 Футер с кнопкой юзера */}
      <SidebarFooter className="bg-gradient-to-r from-green-800/60 to-green-700/40 backdrop-blur-md border-t border-green-600/40 shadow-inner p-4">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};