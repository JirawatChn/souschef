import { createContext, useState, useEffect, ReactNode } from "react";

export type Personalitys = "souschef" | "buddy" | "chef-ian";

export interface PersonalityContextType {
  personality: Personalitys;
  setPersonality: (value: Personalitys) => void;
}

const PersonalityContext = createContext<PersonalityContextType | undefined>(undefined);
PersonalityContext.displayName = "PersonalityContext";

export const PersonalityProvider = ({ children }: { children: ReactNode }) => {
  const [personality, setPersonality] = useState<Personalitys>(() => {
    const stored = localStorage.getItem("personality");
    if (stored === "souschef" || stored === "buddy" || stored === "chef-ian") {
      return stored;
    }
    return "souschef";
  });

  useEffect(() => {
    localStorage.setItem("personality", personality);
  }, [personality]);

  return (
    <PersonalityContext.Provider value={{ personality, setPersonality }}>
      {children}
    </PersonalityContext.Provider>
  );
};

export { PersonalityContext };
