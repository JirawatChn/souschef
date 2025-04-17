import { MainLayout } from "../components/mainLayout";
import souschefLogo from "../assets/souschef.png";
import { useTranslation } from "react-i18next";
import { Card, Flex } from "@radix-ui/themes";
import { LuChevronRight } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useChatHistory } from "../components/useHistory";

export const Recommendation = () => {
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
        <span className="bold text-lg">{t("recommendation")}</span>
        <div className="mt-6 w-full px-4 max-w-[50%]">
          <Flex direction="row" gap="3" wrap="wrap" justify="center">
            {menu.map((item, index) => (
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
      </div>
    </MainLayout>
  );
};
