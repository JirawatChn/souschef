import { useLocation } from "react-router";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const HIDE_HEADER_PATHS = ["/recommendation", "/random"];
  const hideHeader = HIDE_HEADER_PATHS.includes(location.pathname);

  return (
    <div>
      <Sidebar />
      <div
        style={{
          marginLeft: "250px",
          paddingLeft: "1.5rem",
          paddingTop: "1rem",
        }}
        className="text-primary"
      >
        {!hideHeader && (
          <div className="fixed top-0 left-[250px] w-[calc(100%-250px)] z-50 ">
            <Header />
          </div>
        )}
        <div className="mt-[3rem]">{children}</div>
      </div>
    </div>
  );
};
