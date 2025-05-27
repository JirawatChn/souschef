import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar: ซ่อนบน mobile, แสดงบน desktop */}
      <div className="hidden md:block fixed top-0 left-0 h-full z-40">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-[250px]">
        {/* Header: fixed บน desktop, static บน mobile */}
        <div className="w-full z-50 md:fixed md:top-0 md:left-[250px] md:w-[calc(100%-250px)]">
          <Header />
        </div>
        {/* Content: margin top เฉพาะ desktop */}
        <div className="lg:mt-[3rem] md:pl-[1.5rem] md:pt-[1rem] pt-[1rem] px-2">
          {children}
        </div>
      </div>
    </div>
  );
};
