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
        <DrawerTrigger className="w-full flex items-center justify-between gap-3 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 shadow-sm">
          {user.image ? (
            <Avatar className="w-9 h-9">
              <AvatarImage src={user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={user.name}
              variant="initials"
              className="w-9 h-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-white/60 truncate">{user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0 text-white/70" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{user.name}</DrawerTitle>
            <DrawerDescription>{user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              <CreditCardIcon className="size-4 mr-2" />
              Billing
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4 mr-2" />
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
      <DropdownMenuTrigger className="group w-full flex items-center justify-between gap-3 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 shadow-sm">
        {user.image ? (
          <Avatar className="w-9 h-9 group-hover:ring-2 group-hover:ring-white/20 transition">
            <AvatarImage src={user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={user.name}
            variant="initials"
            className="w-9 h-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-xs text-white/60 truncate">{user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-white/70" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        side="top"
        sideOffset={12}
        alignOffset={6}
        className="w-72 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg p-4 text-white"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{user.name}</span>
            <span className="text-sm font-normal text-white/60 truncate">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2 border-white/10" />

        <DropdownMenuItem className="cursor-pointer flex items-center justify-between px-2 py-2 rounded-md hover:bg-white/10 transition">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between px-2 py-2 rounded-md hover:bg-white/10 transition"
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};