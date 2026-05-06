import { MainLayout } from "../components/mainLayout";
import souschefLogo from "../assets/souschef.png";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { InputText } from "../components/input";
import { useChatHistory } from "../components/useHistory";
import { useTranslation } from "react-i18next";

const allQuestions = [
  { key: "question.porkMenu", result: "pass" },
  { key: "question.japaneseMenu", result: "pass" },
  { key: "question.dinnerIdea1", result: "pass" },
  { key: "question.thaiEasyMenu", result: "pass" },
  { key: "question.dessertEasyMenu", result: "pass" },
  { key: "question.eggLeftover", result: "pass" },
  { key: "question.healthyDinner", result: "pass" },
];

export const Home = () => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { createHistory } = useChatHistory();

  const handleSubmit = () => {
    const input = inputRef.current;
    if (!input) return;

    const value = input.value.trim();
    if (!value) return;

    const newId = createHistory(value);
    input.value = "";
    navigate(`/detail/${newId}`);
  };

  const handleCardClick = (q: string) => {
    const newId: string = createHistory(q);
    navigate(`/detail/${newId}`);
  };

  function getRandomSubset<T>(arr: T[], n: number): T[] {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
  }

  const questions = useMemo(() => getRandomSubset(allQuestions, 3), []);

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center mx-auto lg:my-[3rem] ">
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
        <span className="bold ">{t("heading")}</span>
        <div className="flex flex-row flex-wrap justify-center gap-4 mt-8 max-w-[1200px] mx-auto">
          {questions.map((q, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(t(q.key))}
              className="bg-white rounded-xl border border-gray-200 p-5 w-[220px] min-h-[110px] flex flex-col gap-3 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="bg-[#fff2de] rounded-full p-2 w-fit">
                <LuMessageCircleQuestion size={20} className="text-gray-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium leading-snug">
                {t(q.key)}
              </span>
            </div>
          ))}
        </div>
        <InputText inputRef={inputRef} handleSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
};
