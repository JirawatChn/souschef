import { useContext } from "react";
import { PersonalityContext } from "./personalityContext";

export const usePersonality = () => {
  const context = useContext(PersonalityContext);
  if (!context) {
    throw new Error("usePersonality must be used within PersonalityProvider");
  }
  return context;
};
