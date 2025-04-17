import { HiOutlinePencilSquare } from "react-icons/hi2";
import {
  LuBot,
  LuChefHat,
  LuDices,
  LuEllipsis,
} from "react-icons/lu";
import { Link , useParams } from "react-router";
import { useChatHistory } from "./useHistory";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { history, clearHistory, removeHistory } = useChatHistory();

  const handleClearClick = () => {
    clearHistory(id);
  };

  const handleRemoveClick = (idToRemove: string) => {
    removeHistory(idToRemove, id);
  };

  const showHistory = history.slice().reverse();
  const isMoreThanFive = showHistory.length > 5;
  const visibleHistory = isMoreThanFive ? showHistory.slice(0, 5) : showHistory;

  return (
    <aside className="sidebar h-screen overflow-y-auto">
      <div className="flex justify-between items-center px-2 mt-4">
        <div className="sidebar-header">
          <span className="sidebar-title">sousChef AI</span>
        </div>
        <a href="/" className="icon">
          <HiOutlinePencilSquare className="w-6 h-6" />
        </a>
      </div>

      <nav className="sidebar-menu">
        <Link to="/" className="menu-item">
          <LuBot className="w-6 h-6" />
          <span className="bold">sousChef</span>
        </Link>
        <Link to="/random" className="menu-item">
          <LuDices className="w-6 h-6" />
          <span className="bold">{t("random")}</span>
        </Link>
        <Link to="/recommendation" className="menu-item">
          <LuChefHat className="w-6 h-6" />
          <span className="bold">{t("recommendation")}</span>
        </Link>

        {history && history.length > 0 && (
          <div className="menu-group flex justify-between">
            <span>History</span>
            <span
              className="cursor-pointer hover:underline"
              onClick={handleClearClick}
            >
              Clear
            </span>
          </div>
        )}

        {visibleHistory.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center group menu-history"
          >
            <Link
              to={`/detail/${item.id}`}
              className="text-sm w-full break-words line-clamp-1"
            >
              {item.display}
            </Link>
            <button
              onClick={() => handleRemoveClick(item.id)}
              className="text-rose-500 text-sm ml-4 hover:underline cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {t("delete")}
            </button>
          </div>
        ))}

        {isMoreThanFive && (
          <Link to="/history" className="text-sm ml-1">
            <div className="flex items-center gap-x-3 menu-history">
              <LuEllipsis className="text-gray-500" />
              <p className="text-gray-600">{t("seeAll")}</p>
            </div>
          </Link>
        )}
      </nav>
    </aside>
  );
};
