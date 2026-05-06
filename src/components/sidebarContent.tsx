// src/components/sidebarContent.tsx
import { HiOutlinePencilSquare } from "react-icons/hi2";
import {
  LuBot,
  LuChefHat,
  LuDices,
  LuEllipsis,
  LuHistory,
  LuHandHeart,
} from "react-icons/lu";
import { Link, useLocation, useParams } from "react-router";
import { useChatHistory } from "./useHistory";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const SidebarContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const { history, clearHistory, removeHistory } = useChatHistory();

  const showHistory = history.slice().reverse();
  const isMoreThanFive = showHistory.length > 5;
  const visibleHistory = isMoreThanFive ? showHistory.slice(0, 5) : showHistory;

  const navItems = [
    { to: "/", icon: <LuBot className="w-5 h-5" />, label: "sousChef" },
    { to: "/random", icon: <LuDices className="w-5 h-5" />, label: t("random") },
    {
      to: "/recommendation",
      icon: <LuChefHat className="w-5 h-5" />,
      label: t("recommendation"),
    },
    {
      to: "/nutrition",
      icon: <LuHandHeart className="w-5 h-5" />,
      label: t("nutrition_daily"),
    },
    {
      to: "/history",
      icon: <LuHistory className="w-5 h-5" />,
      label: t("history"),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-3 py-4">
        <span className="text-lg font-bold text-[#2E3440]">sousChef AI</span>
        <Button variant="ghost" size="icon" className="hover:bg-[#fde6ba] text-black hover:text-black" asChild>
          <Link to="/">
            <HiOutlinePencilSquare className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <nav className="flex flex-col gap-1 mb-2">
          {navItems.map((item) => (
            <Button
              key={item.to}
              variant="ghost"
              className={`w-full justify-start gap-2 font-bold text-[#2E3440] ${
                location.pathname === item.to
                  ? "bg-[#fde6ba] hover:bg-[#fde6ba]"
                  : "hover:bg-[#fde6ba]"
              }`}
              asChild
            >
              <Link to={item.to}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {history.length > 0 && (
          <>
            <Separator className="my-2" />
            <div className="flex justify-between items-center px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                History
              </span>
              <button
                onClick={() => clearHistory(id)}
                className="text-xs text-gray-500 hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>

            {visibleHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center group rounded-md hover:bg-[#fde6ba]"
              >
                <Link
                  to={`/detail/${item.id}`}
                  className="text-sm px-2 py-1.5 w-full truncate text-[#444]"
                >
                  {item.display}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHistory(item.id, id)}
                  className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-500 hover:bg-transparent shrink-0 text-xs px-2"
                >
                  {t("delete")}
                </Button>
              </div>
            ))}

            {isMoreThanFive && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-[#fde6ba] text-gray-600"
                asChild
              >
                <Link to="/history">
                  <LuEllipsis className="w-4 h-4 text-gray-500" />
                  {t("seeAll")}
                </Link>
              </Button>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};
