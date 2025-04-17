import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  sender: "user" | "bot";
  message: string;
}

interface ChatHistory {
  id: string;
  display: string;
  messages: ChatMessage[];
}

const LOCAL_STORAGE_KEY = "history";

export const useChatHistory = () => {
  const navigate = useNavigate();
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
    const id = uuidv4(); // 🆔 สร้าง id ใหม่ทุกครั้ง

    const userMessage: ChatMessage = {
      sender: "user",
      message: initialMessage,
    };
    const botMessage: ChatMessage | undefined = botReply
      ? { sender: "bot", message: botReply }
      : undefined;

    const newHistory: ChatHistory = {
      id,
      display: initialMessage,
      messages: botMessage ? [userMessage, botMessage] : [userMessage],
    };

    setHistory((prevHistory) => [...prevHistory, newHistory]);

    return id;
  };

  // เพิ่มข้อความลงใน history ที่มีอยู่แล้ว
  const addMessageToHistory = (
    id: string,
    sender: "user" | "bot",
    message: string
  ) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const target = newHistory.find((h) => h.id === id);
  
      if (target) {
        const lastMessage = target.messages[target.messages.length - 1];
  
        const isLoadingReply =
          lastMessage?.sender === "bot" &&
          lastMessage?.message === "กำลังหาคำตอบให้อยู่... 🍳";
  
        if (isLoadingReply) {
          lastMessage.message = message; // แทนที่ข้อความ
        } else {
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
  
  const updateLastBotMessage = (id: string, newText: string) => {
    setHistory((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              messages: h.messages.map((m, i, arr) =>
                i === arr.length - 1 && m.sender === "bot"
                  ? { ...m, message: newText }
                  : m
              ),
            }
          : h
      )
    );
  };
  

  const clearHistory = (currentId?: string) => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  
    if (currentId) {
      navigate("/"); // กลับหน้าหลักถ้าอยู่ในหน้าที่มี id
    }
  };
  

  const removeHistory = (idToRemove: string, currentId?: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== idToRemove));
  
    if (currentId && idToRemove === currentId) {
      navigate("/");
    }
  };
  

  return {
    history,
    createHistory,
    addMessageToHistory,
    clearHistory,
    removeHistory,
    updateLastBotMessage
  };
};
