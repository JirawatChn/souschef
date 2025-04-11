import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LuChefHat, LuCookingPot, LuDices } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { useChatHistory } from "./useHistory";

export const Sidebar = () => {
  const { history, clearHistory, removeHistory } = useChatHistory();
  const navigate = useNavigate();

  const handleClearClick = () => {
    clearHistory();
    navigate("/");
  };
  return (
    <aside className="sidebar">
      <div className="flex justify-end px-2 ">
        <a href="/" className="icon">
          <HiOutlinePencilSquare className="w-6 h-6" />
        </a>
      </div>
      <div className="sidebar-header">
        <span className="sidebar-title">sousChef AI</span>
      </div>
      <nav className="sidebar-menu">
        <Link to="/" className="menu-item">
          <LuChefHat className="w-6 h-6" />
          <span className="bold">sousChef</span>
        </Link>
        <Link to="/random" className="menu-item">
          <LuDices className="w-6 h-6" />
          <span className="bold">สุ่มเมนู</span>
        </Link>
        <Link to="/recommendation" className="menu-item">
          <LuCookingPot className="w-6 h-6" />
          <span className="bold">เมนูแนะนำ</span>
        </Link>
        {history && history.length > 0 && (
          <div className="menu-group flex justify-between">
            <span>History</span>

            <span className="cursor-pointer" onClick={() => handleClearClick()}>
              Clear
            </span>
          </div>
        )}
        {history
          .slice()
          .reverse()
          .map((item, index) => {
            const realIndex = history.length - 1 - index;

            return (
              <div
                key={realIndex}
                className="flex justify-between items-center mb-2 group menu-history"
              >
                <Link to={`/detail/${realIndex}`}>
                  {item.display.length > 20
                    ? item.display.slice(0, 20) + " ..."
                    : item.display}
                </Link>

                <button
                  onClick={() => removeHistory(realIndex)}
                  className="text-rose-500 text-sm ml-4 hover:underline cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  ลบ
                </button>
              </div>
            );
          })}
      </nav>
    </aside>
  );
};
