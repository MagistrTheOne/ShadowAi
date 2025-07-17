import { SidebarProvider } from "@/components/ui/sidebar";
import { DasboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <Dialog.Root>
        <DashboardSidebar />
      </Dialog.Root>
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DasboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
