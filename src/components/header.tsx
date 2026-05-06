// src/components/header.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuChevronDown, LuMenu, LuChefHat } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { usePersonality } from "../contexts/usePersonality";
import type { Personalitys } from "../contexts/personalityContext";
import { useTranslation } from "react-i18next";

const Personality = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useTranslation();
  const { personality, setPersonality } = usePersonality();
  const personalities: {
    label: string;
    value: Personalitys;
    description: string;
  }[] = [
    {
      value: "souschef",
      label: t("mode.souschef.label"),
      description: t("mode.souschef.description"),
    },
    {
      value: "buddy",
      label: t("mode.buddy.label"),
      description: t("mode.buddy.description"),
    },
    {
      value: "chef-ian",
      label: t("mode.chef.label"),
      description: t("mode.chef.description"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button variant="ghost" size="icon">
            <LuChefHat className="w-5 h-5" />
          </Button>
        ) : (
          <Button variant="outline" className="min-w-48 gap-1">
            {personalities.find((p) => p.value === personality)?.label ??
              "Select Personality"}
            <LuChevronDown className="w-4 h-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {personalities.map((mode) => (
          <DropdownMenuItem
            key={mode.value}
            onSelect={() => setPersonality(mode.value)}
            className="focus:bg-[#fde6ba]"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{mode.label}</span>
              <span className="text-xs text-gray-500 whitespace-pre-line">
                {mode.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Language = ({ compact = false }: { compact?: boolean }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const normalizedLanguage = language.split("-")[0] as "th" | "en" | "cn";
  const languageLabelMap = {
    th: "ภาษาไทย",
    en: "English",
    cn: "中文",
  } as const;
  const languageLabel =
    languageLabelMap[normalizedLanguage] ?? languageLabelMap.en;

  const changeLanguage = (lng: "th" | "en" | "cn") => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button variant="ghost" size="icon">
            <MdLanguage className="w-5 h-5" />
          </Button>
        ) : (
          <Button variant="outline" className="gap-1">
            <MdLanguage className="w-5 h-5" />
            {languageLabel}
            <LuChevronDown className="w-4 h-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => changeLanguage("th")}>
          ภาษาไทย
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("cn")}>
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  return (
    <div className="hidden md:flex justify-between mt-4">
      <div className="pl-6">
        <Personality />
      </div>
      <div className="pr-6">
        <Language />
      </div>
    </div>
  );
};

export const MobileHeader = ({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) => {
  return (
    <div className="flex md:hidden items-center justify-between h-14 px-3 bg-[#FFFEF8] border-b border-amber-200 sticky top-0 z-50">
      <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
        <LuMenu className="w-5 h-5" />
      </Button>
      <span className="font-bold text-[#2E3440]">sousChef AI</span>
      <div className="flex items-center gap-1">
        <Personality compact />
        <Language compact />
      </div>
    </div>
  );
};
