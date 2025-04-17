import { useEffect, useRef, useState } from "react";
import { useChatHistory } from "../components/useHistory";
import { MainLayout } from "../components/mainLayout";
import { Link } from "react-router";
import { LuMessageCircleMore, LuMessagesSquare } from "react-icons/lu";
import { useTranslation } from "react-i18next";

export const History = () => {
  const { t } = useTranslation();
  const { history, removeHistory } = useChatHistory();
  const [visibleCount, setVisibleCount] = useState(10);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const sortedHistory = history.slice().reverse(); // เรียงใหม่ล่าสุดไว้บน
  const visibleHistory = sortedHistory.slice(0, visibleCount);
  const hasMore = visibleCount < sortedHistory.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasMore]);

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center mx-auto my-[3rem]">
        <div className="flex flex-col justify-start w-1/2">
          <LuMessageCircleMore className="w-10 h-10" />
          <p className="mt-3 bold text-2xl">
            {t("history")}
          </p>
        </div>
        <div className="w-1/2 mt-4 divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {visibleHistory.map((item) => {
            const lastBotMsg = [...item.messages]
              .reverse()
              .find((msg) => msg.sender === "bot")?.message;

            const preview = lastBotMsg
              ? lastBotMsg
                  .replace(/\*/g, "")
                  .split(" ")
                  .slice(0, 25)
                  .join(" ") + "..."
              : "";

            return (
              <div key={item.id} className="relative group">
                <Link
                  to={`/detail/${item.id}`}
                  className="h-[80px] px-4 py-2 flex flex-col justify-center gap-1 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  <div className="flex items-start justify-between h-full">
                    <div className="flex gap-x-3 h-full">
                      <LuMessagesSquare className="w-5 h-5 flex-shrink-0 self-center text-gray-400" />
                      <div className="flex flex-col justify-center">
                        <p className="font-semibold line-clamp-1 break-words">
                          {item.display}
                        </p>
                        {preview && (
                          <div className="text-sm text-gray-500 line-clamp-1 break-words">
                            {preview}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault(); // ไม่ให้ลิงก์ทำงาน
                    e.stopPropagation(); // ไม่ให้ลิงก์โดนคลิก
                    removeHistory(item.id);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-rose-500 text-sm hover:underline transition cursor-pointer"
                >
                  {t("delete")}
                </button>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div
            ref={loaderRef}
            className="h-10 flex justify-center items-center mt-4 text-gray-400"
          >
            กำลังโหลดเพิ่มเติม...
          </div>
        )}
      </div>
    </MainLayout>
  );
};
