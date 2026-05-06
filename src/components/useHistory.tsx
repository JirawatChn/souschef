import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";
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

interface ChatHistoryContextType {
  history: ChatHistory[];
  createHistory: (initialMessage: string, botReply?: string) => string;
  addMessageToHistory: (id: string, sender: "user" | "bot", message: string) => void;
  clearHistory: (currentId?: string) => void;
  removeHistory: (idToRemove: string, currentId?: string) => void;
  updateLastBotMessage: (id: string, newText: string) => void;
}

const LOCAL_STORAGE_KEY = "history";

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export const ChatHistoryProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<ChatHistory[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const createHistory = useCallback((initialMessage: string, botReply?: string) => {
    const id = uuidv4();
    const userMessage: ChatMessage = { sender: "user", message: initialMessage };
    const botMessage: ChatMessage | undefined = botReply
      ? { sender: "bot", message: botReply }
      : undefined;
    const newEntry: ChatHistory = {
      id,
      display: initialMessage,
      messages: botMessage ? [userMessage, botMessage] : [userMessage],
    };
    setHistory((prev) => [...prev, newEntry]);
    return id;
  }, []);

  const addMessageToHistory = useCallback((id: string, sender: "user" | "bot", message: string) => {
    setHistory((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const last = h.messages[h.messages.length - 1];
        const isLoadingReply =
          last?.sender === "bot" && last?.message === "กำลังหาคำตอบให้อยู่... 🍳";
        if (isLoadingReply) {
          return { ...h, messages: [...h.messages.slice(0, -1), { ...last, message }] };
        }
        if (last?.sender === sender && last?.message === message) return h;
        return { ...h, messages: [...h.messages, { sender, message }] };
      })
    );
  }, []);

  const updateLastBotMessage = useCallback((id: string, newText: string) => {
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
  }, []);

  const clearHistory = useCallback((currentId?: string) => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    if (currentId) navigate("/");
  }, [navigate]);

  const removeHistory = useCallback((idToRemove: string, currentId?: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== idToRemove));
    if (currentId && idToRemove === currentId) navigate("/");
  }, [navigate]);

  const value = useMemo(
    () => ({ history, createHistory, addMessageToHistory, clearHistory, removeHistory, updateLastBotMessage }),
    [history, createHistory, addMessageToHistory, clearHistory, removeHistory, updateLastBotMessage]
  );

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) throw new Error("useChatHistory must be used within ChatHistoryProvider");
  return context;
};
