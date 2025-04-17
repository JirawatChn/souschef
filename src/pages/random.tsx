import { useState } from "react";
import { MainLayout } from "../components/mainLayout";
import souschefLogo from "../assets/souschef.png";
import { LuDices, LuChevronRight } from "react-icons/lu";
import { Card, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { UrlPages } from "../components/props";
import { useTranslation } from "react-i18next";
import { useChatHistory } from "../components/useHistory";

export const RandomMenu: React.FC<UrlPages> = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { createHistory } = useChatHistory();

  const menu = [
    "menu.friedRice",
    "menu.tomYumGoong",
    "menu.somtam",
    "menu.greenCurry",
    "menu.padThai",
    "menu.hainaneseChickenRice",
    "menu.larbMoo",
    "menu.yumWoonSen",
    "menu.khanomJeenNamYa",
    "menu.kaengSom",
    "menu.padKrapow",
    "menu.khaoSoi",
  ];

  const [randomMenus, setRandomMenus] = useState<string[]>([]);

  const randomClick = () => {
    if (randomMenus.length >= 9) {
      setRandomMenus([]);
      return;
    }
  
    const remainingMenus = menu.filter((item) => !randomMenus.includes(item));
  
    if (remainingMenus.length === 0) {
      setRandomMenus([]);
      return;
    }
  
    const random =
      remainingMenus[Math.floor(Math.random() * remainingMenus.length)];
  
    setRandomMenus((prev) => [...prev, random]);
  };
  
  const handleClick = (menuKey: string) => {
    const translatedMenu = t(menuKey);
    const lang = i18n.language;
    const question =
      lang === "th"
        ? `วิธีทำ${translatedMenu}`
        : `How to cook ${translatedMenu}`;

    const newId = createHistory(question);
    navigate(`/detail/${newId}`);
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center mx-auto my-[3rem]">
        <img
          src={souschefLogo}
          alt="logo"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "2px solid #c2c2c2",
            backgroundColor: "white",
          }}
        />
        <span className="bold text-3xl mt-4">sousChef AI</span>
        <span className="bold text-lg">{t("randomHeading")}</span>

        <div className="mt-8">
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF6D1] text-black font-medium rounded-full shadow hover:bg-[#fde6ba] transition-colors cursor-pointer"
            onClick={randomClick}
          >
            <LuDices className="w-5 h-5" />
            {t("randomClick")}
            <LuChevronRight className="w-5 h-5" />
          </button>
        </div>

        {randomMenus.length > 0 && (
          <div className="mt-6 w-full px-4 max-w-[50%]">
            <Flex direction="row" gap="3" wrap="wrap" justify="center">
              {randomMenus.map((item, index) => (
                <Card
                  key={index}
                  className="relative p-4 w-[250px] h-[60px] cursor-pointer hover:shadow-md transition flex items-center whitespace-pre-line"
                  onClick={() => handleClick(item)}
                >
                  <span className="text-left text-base">{t(item)}</span>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2E3440] text-white flex items-center justify-center">
                    <LuChevronRight className="w-4 h-4" />
                  </div>
                </Card>
              ))}
            </Flex>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
