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
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

export const Detail: React.FC<UrlPages> = ({ url }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { history, addMessageToHistory, updateLastBotMessage } =
    useChatHistory();
  const { personality } = usePersonality();

  const [loading, setLoading] = useState(false);

  const historyId = String(id);
  const chatHistory = history.find((h) => h.id === id);

  const isSubmitting = useRef(false);
  const [isLoadingFirstAnswer, setIsLoadingFirstAnswer] = useState(false);

  const simulateStreaming = (
    fullText: string,
    onUpdate: (text: string) => void,
    onDone: () => void
  ) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      onUpdate(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        onDone();
      }
    }, 15); // ปรับความเร็วได้ตามใจ
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hasFetched = useRef(false);
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    if (!chatHistory || hasFetched.current || isAsking) return;

    const hasBotReply = chatHistory.messages.some((m) => m.sender === "bot");
    if (hasBotReply) return;

    hasFetched.current = true;
    setIsLoadingFirstAnswer(true);
    setIsAsking(true);

    axios
      .post(
        `${url}/ask`,
        {
          question: chatHistory.display,
          personality: personality,
          lang: i18n.language,
        },
        {
          headers: {
            "X-Session-ID": historyId,
          },
        }
      )
      .then((res) => {
        addMessageToHistory(historyId, "bot", "");

        simulateStreaming(
          res.data.answer,
          (partialText) => updateLastBotMessage(historyId, partialText),
          () => scrollToBottom()
        );
      })
      .catch(() => {
        addMessageToHistory(
          historyId,
          "bot",
          t("error")
        );
      })
      .finally(() => {
        setIsLoadingFirstAnswer(false);
        setIsAsking(false);
      });

    scrollToBottom();
  }, [
    chatHistory,
    url,
    personality,
    i18n.language,
    historyId,
    addMessageToHistory,
    updateLastBotMessage,
    isAsking,
    t
  ]);

  const handleSubmit = async () => {
    scrollToBottom();
    if (isSubmitting.current || isAsking) return;

    isSubmitting.current = true;
    setIsAsking(true);
    setLoading(true);

    const input = inputRef.current;
    if (!input) {
      isSubmitting.current = false;
      setIsAsking(false);
      setLoading(false);
      return;
    }

    const value = input.value.trim();
    if (!value) {
      isSubmitting.current = false;
      setIsAsking(false);
      setLoading(false);
      return;
    }

    addMessageToHistory(historyId, "user", value);
    input.value = "";

    try {
      const response = await axios.post(
        `${url}/ask`,
        {
          question: value,
          personality: personality,
          lang: i18n.language,
        },
        {
          headers: {
            "X-Session-ID": historyId,
          },
        }
      );

      addMessageToHistory(historyId, "bot", response.data.answer);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching bot response:", error);
      addMessageToHistory(
        historyId,
        "bot",
        t("error")
      );
      scrollToBottom();
    } finally {
      isSubmitting.current = false;
      setIsAsking(false);
      setLoading(false);
    }
  };

  if (!chatHistory) {
    return (
      <MainLayout>
        <div className="text-center">{t("no_history")}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-center space-y-4 overflow-y-auto h-[calc(100vh-200px)] pr-0 md:pr-4 w-full">
        <div className="w-full md:w-1/2 relative px-2">
          <div className="flex flex-col space-y-4">
            {chatHistory.messages.map((msg, index) => (
              <React.Fragment key={index}>
                {msg.sender === "user" ? (
                  <div className="self-end mt-10">
                    <OutputCard text={msg.message} />
                  </div>
                ) : (
                  <div className="self-start whitespace-pre-line mt-6">
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  </div>
                )}
              </React.Fragment>
            ))}
            {(isLoadingFirstAnswer || loading) && (
              <div className="self-start text-gray-400 mt-4 flex items-center gap-2">
                <LuLoaderCircle className="animate-spin" /> {t("loading")}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full px-2 md:px-4 mb-4 flex justify-center z-50 md:pl-[250px] ">
          <InputText
            inputRef={inputRef}
            handleSubmit={handleSubmit}
            loading={isLoadingFirstAnswer || loading}
          />
        </div>
    </MainLayout>
  );
};
