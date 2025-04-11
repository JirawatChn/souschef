import { useState, useEffect } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

interface ChatHistory {
  display: string;
  messages: ChatMessage[];
}

const LOCAL_STORAGE_KEY = "history";

export const useChatHistory = () => {
  const [history, setHistory] = useState<ChatHistory[]>(() => {
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // สร้าง history ใหม่ (คำถามใหม่ที่ user ส่ง)
  // เพิ่ม optional botReply parameter
  const createHistory = (initialMessage: string, botReply?: string) => {
    const userMessage: ChatMessage = {
      sender: "user",
      message: initialMessage,
    };
    const botMessage: ChatMessage | undefined = botReply
      ? { sender: "bot", message: botReply }
      : undefined;

    const newHistory: ChatHistory = {
      display: initialMessage,
      messages: botMessage ? [userMessage, botMessage] : [userMessage],
    };

    const newIndex = history.length;
    setHistory((prevHistory) => [...prevHistory, newHistory]);

    return newIndex;
  };

  // เพิ่มข้อความลงใน history ที่มีอยู่แล้ว
  const addMessageToHistory = (
    historyIndex: number,
    sender: "user" | "bot",
    message: string
  ) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const target = newHistory[historyIndex];

      if (target) {
        const lastMessage = target.messages[target.messages.length - 1];

        // ถ้าเป็นข้อความกำลังโหลด และ sender เดิมเป็น bot → แทนที่
        const isLoadingReply =
          lastMessage?.sender === "bot" &&
          lastMessage?.message === "กำลังหาคำตอบให้อยู่... 🍳";

        if (isLoadingReply) {
          lastMessage.message = message; // แทนที่ข้อความ
        } else {
          // ตรวจสอบซ้ำว่าข้อความซ้ำไหมก่อนเพิ่ม
          if (
            lastMessage?.sender !== sender ||
            lastMessage?.message !== message
          ) {
            target.messages.push({ sender, message });
          }
        }
      }

      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const removeHistory = (index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return { history, createHistory, addMessageToHistory, clearHistory , removeHistory };
};
