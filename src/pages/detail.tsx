import { MainLayout } from "../components/mainLayout";
import { InputText } from "../components/input";
import { OutputCard } from "../components/outputCard";
import React, { useEffect, useRef, useState } from "react";
import { useChatHistory } from "../components/useHistory";
import { useParams } from "react-router";
import axios from "axios";
import { UrlPages } from "../components/props";
import { usePersonality } from "../contexts/usePersonality";
import { LuLoaderCircle } from "react-icons/lu";

export const Detail: React.FC<UrlPages> = ({ url }) => {
  const { id } = useParams();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { history, addMessageToHistory } = useChatHistory();
  const { personality } = usePersonality();

  const [loading, setLoading] = useState(false);

  const historyIndex = Number(id);
  const chatHistory = history[historyIndex];

  const isSubmitting = useRef(false);
  const [isLoadingFirstAnswer, setIsLoadingFirstAnswer] = useState(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatHistory) {
      scrollToBottom();

      const hasBotReply = chatHistory.messages.some((m) => m.sender === "bot");

      if (!hasBotReply) {
        setIsLoadingFirstAnswer(true);

        axios
          .post(`${url}/ask`, {
            question: chatHistory.display,
            personality: personality,
          })
          .then((res) => {
            addMessageToHistory(historyIndex, "bot", res.data.answer);
          })
          .catch(() => {
            addMessageToHistory(
              historyIndex,
              "bot",
              "เกิดข้อผิดพลาดในการดึงคำตอบจากเซิร์ฟเวอร์ 😢"
            );
          })
          .finally(() => {
            setIsLoadingFirstAnswer(false);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatHistory]);

  const handleSubmit = async () => {
    scrollToBottom();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true); // ← เพิ่มตรงนี้

    const input = inputRef.current;
    if (!input) return;

    const value = input.value.trim();
    if (!value) {
      isSubmitting.current = false;
      setLoading(false); // ← และตรงนี้
      return;
    }

    addMessageToHistory(historyIndex, "user", value);
    input.value = "";

    try {
      const response = await axios.post(`${url}/ask`, {
        question: value,
        personality: personality,
      });

      const answer: string = response.data.answer;
      addMessageToHistory(historyIndex, "bot", answer);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching bot response:", error);
      addMessageToHistory(
        historyIndex,
        "bot",
        "เกิดข้อผิดพลาดในการดึงคำตอบจากเซิร์ฟเวอร์ 😢"
      );
      scrollToBottom();
    } finally {
      isSubmitting.current = false;
      setLoading(false); // ← ปิดโหลด
    }
  };

  if (!chatHistory) {
    return (
      <MainLayout>
        <div className="text-center">ไม่พบประวัติการสนทนา</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-center space-y-4 overflow-y-auto h-[calc(100vh-200px)] pr-4">
        <div className="w-1/2 relative">
          <div className="flex flex-col space-y-4">
            {chatHistory.messages.map((msg, index) => (
              <React.Fragment key={index}>
                {msg.sender === "user" ? (
                  <div className="self-end mt-10">
                    <OutputCard text={msg.message} />
                  </div>
                ) : (
                  <div className="self-start whitespace-pre-line mt-6">
                    {msg.message}
                  </div>
                )}
              </React.Fragment>
            ))}
            {isLoadingFirstAnswer ||
              (loading && (
                <div className="self-start text-gray-400 mt-4 flex items-center gap-2">
                  <LuLoaderCircle className="animate-spin" /> กำลังคิดคำตอบ...
                </div>
              ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 mb-6 flex justify-center z-50 pl-[250px] ">
        <InputText
          inputRef={inputRef}
          handleSubmit={handleSubmit}
          loading={isLoadingFirstAnswer || loading}
        />
      </div>
    </MainLayout>
  );
};
