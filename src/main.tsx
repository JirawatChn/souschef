import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { PersonalityProvider } from "./contexts/personalityContext.tsx";
import './i18n'; // ← ต้อง import ก่อนใช้ <App />

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <div className="min-h-screen bg-[#FFFEF8]">
        <PersonalityProvider>
          <App />
        </PersonalityProvider>
      </div>
    </Theme>
  </StrictMode>
);
