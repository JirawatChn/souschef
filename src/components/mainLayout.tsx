import { useState } from "react";
import { Header, MobileHeader } from "./header";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebarContent";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile top bar — visible only below md breakpoint */}
      <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Mobile sidebar Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[250px] p-0 border-r border-amber-200"
          style={{ background: "linear-gradient(to bottom, #FFF6D1, #FFE4B5)" }}
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar — fixed, hidden below md */}
      <div className="hidden md:block fixed top-0 left-0 h-full z-40">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 md:ml-[250px]">
        <div className="w-full z-50 md:fixed md:top-0 md:left-[250px] md:w-[calc(100%-250px)]">
          <Header />
        </div>
        <div className="lg:mt-[3rem] md:pl-[1.5rem] md:pt-[1rem] pt-[1rem] px-2">
          {children}
        </div>
      </div>
    </div>
  );
};
