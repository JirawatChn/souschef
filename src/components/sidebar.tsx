// src/components/sidebar.tsx
import { SidebarContent } from "./sidebarContent";

export const Sidebar = () => {
  return (
    <aside
      className="w-[250px] h-screen shadow-[2px_0_8px_rgba(0,0,0,0.1)]"
      style={{ background: "linear-gradient(to bottom, #FFF6D1, #FFE4B5)" }}
    >
      <SidebarContent />
    </aside>
  );
};
