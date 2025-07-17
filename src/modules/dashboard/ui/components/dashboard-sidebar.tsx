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

const firstSection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
];

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

const MenuItems = ({ items, pathname }: { items: typeof firstSection; pathname: string }) => (
  <div className="space-y-2"> {/* Добавлен отступ между пунктами */}
    {items.map((item) => {
      const active = pathname === item.href;
      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            className={cn(
              "group flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-250 ease-out select-none",
              "bg-sidebar-accent/10 hover:bg-sidebar-accent/30",
              "hover:border hover:border-[#5D6B68]/50",
              "hover:shadow-lg hover:shadow-[#5D6B68]/20",
              "text-sidebar-accent-foreground hover:text-white",
              active &&
                "bg-gradient-to-r from-[#5D6B68]/30 to-[#5D6B68]/10 border border-[#5D6B68]/40 text-white shadow-[0_0_10px_#5D6B68]"
            )}
            isActive={active}
          >
            <Link href={item.href} className="flex items-center gap-4 w-full">
              <item.icon className="w-6 h-6 text-sidebar-accent-foreground group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
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
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground px-4 py-3 border-b border-[#5D6B68]/30 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" height={36} width={36} alt="Shadow AI Logo" priority />
          <p className="text-2xl font-extrabold tracking-tight select-none">Shadow.Ai</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-100 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItems items={firstSection} pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Разделитель между секциями */}
          <SidebarSeparator className="my-4 border-t-2 border-[#5D6B68]/70" />

          {/* ↓ Здесь я добавил отступ сверху у второй секции, чтобы её чуть опустить */}
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              <MenuItems items={secondSection} pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
