"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isPending || !data?.user) return null;

  const { user } = data;

  // =============================
  // Mobile Drawer
  // =============================
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="w-full group relative overflow-hidden flex items-center justify-between gap-4 p-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-800/30 to-green-700/20 backdrop-blur-md hover:from-green-700/40 hover:to-green-600/30 hover:border-green-400/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-900/20">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {user.image ? (
            <Avatar className="w-10 h-10 ring-2 ring-green-400/20 group-hover:ring-green-300/40 transition-all duration-300 relative z-10">
              <AvatarImage src={user.image} className="object-cover" />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={user.name}
              variant="initials"
              className="w-10 h-10 ring-2 ring-green-400/20 group-hover:ring-green-300/40 transition-all duration-300 relative z-10"
            />
          )}
          
          <div className="flex flex-col gap-1 text-left overflow-hidden flex-1 min-w-0 relative z-10">
            <p className="text-sm font-semibold text-white truncate group-hover:text-green-50 transition-colors duration-300">
              {user.name}
            </p>
            <p className="text-xs text-green-200/70 truncate group-hover:text-green-100/80 transition-colors duration-300">
              {user.email}
            </p>
          </div>
          
          <ChevronDownIcon className="w-4 h-4 shrink-0 text-green-200/80 group-hover:text-white group-hover:rotate-180 transition-all duration-300 relative z-10" />
        </DrawerTrigger>
        
        <DrawerContent className="bg-gradient-to-b from-green-900/95 to-green-800/90 backdrop-blur-xl border-t border-green-600/40">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-white font-bold">{user.name}</DrawerTitle>
            <DrawerDescription className="text-green-200/70">{user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="gap-3">
            <Button 
              variant="outline" 
              onClick={() => {}}
              className="bg-green-800/40 border-green-600/40 text-white hover:bg-green-700/60 hover:border-green-500/60 transition-all duration-300"
            >
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Billing
            </Button>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="bg-red-800/40 border-red-600/40 text-white hover:bg-red-700/60 hover:border-red-500/60 transition-all duration-300"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // =============================
  // Desktop Dropdown
  // =============================
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group relative overflow-hidden w-full flex items-center justify-between gap-4 p-4 rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-800/30 to-green-700/20 backdrop-blur-md hover:from-green-700/40 hover:to-green-600/30 hover:border-green-400/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-900/20 focus:outline-none focus:ring-2 focus:ring-green-400/40">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {user.image ? (
          <Avatar className="w-10 h-10 ring-2 ring-green-400/20 group-hover:ring-green-300/40 group-hover:scale-105 transition-all duration-300 relative z-10">
            <AvatarImage src={user.image} className="object-cover" />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={user.name}
            variant="initials"
            className="w-10 h-10 ring-2 ring-green-400/20 group-hover:ring-green-300/40 group-hover:scale-105 transition-all duration-300 relative z-10"
          />
        )}
        
        <div className="flex flex-col gap-1 text-left overflow-hidden flex-1 min-w-0 relative z-10">
          <p className="text-sm font-semibold text-white truncate group-hover:text-green-50 transition-colors duration-300">
            {user.name}
          </p>
          <p className="text-xs text-green-200/70 truncate group-hover:text-green-100/80 transition-colors duration-300">
            {user.email}
          </p>
        </div>
        
        <ChevronDownIcon className="w-4 h-4 shrink-0 text-green-200/80 group-hover:text-white group-hover:rotate-180 transition-all duration-300 relative z-10" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        side="top"
        sideOffset={16}
        alignOffset={8}
        className="w-80 rounded-2xl border border-green-500/30 bg-gradient-to-b from-green-800/90 to-green-900/95 backdrop-blur-xl shadow-2xl shadow-green-900/40 p-6 text-white animate-in slide-in-from-bottom-2 duration-300"
      >
        <DropdownMenuLabel className="px-0 pb-4">
          <div className="flex items-center gap-3">
            {user.image ? (
              <Avatar className="w-12 h-12 ring-2 ring-green-400/30">
                <AvatarImage src={user.image} className="object-cover" />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={user.name}
                variant="initials"
                className="w-12 h-12 ring-2 ring-green-400/30"
              />
            )}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <span className="font-semibold text-white truncate text-base">{user.name}</span>
              <span className="text-sm text-green-200/70 truncate">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-4 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent border-none" />

        <div className="space-y-2">
          <DropdownMenuItem className="cursor-pointer group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-green-700/40 hover:to-green-600/30 transition-all duration-300 focus:outline-none focus:bg-gradient-to-r focus:from-green-700/40 focus:to-green-600/30">
            <div className="flex items-center gap-3">
              <CreditCardIcon className="w-4 h-4 text-green-200/80 group-hover:text-white transition-colors duration-300" />
              <span className="font-medium group-hover:text-white transition-colors duration-300">Billing</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onLogout}
            className="cursor-pointer group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-700/40 hover:to-red-600/30 transition-all duration-300 focus:outline-none focus:bg-gradient-to-r focus:from-red-700/40 focus:to-red-600/30"
          >
            <div className="flex items-center gap-3">
              <LogOutIcon className="w-4 h-4 text-green-200/80 group-hover:text-red-100 transition-colors duration-300" />
              <span className="font-medium group-hover:text-red-100 transition-colors duration-300">Logout</span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};