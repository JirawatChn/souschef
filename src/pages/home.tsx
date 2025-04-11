import { MainLayout } from "../components/mainLayout";
import souschefLogo from "../assets/souschef.png";
import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import {  LuMessageCircleQuestion } from "react-icons/lu";
import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { InputText } from "../components/input";
import { useChatHistory } from "../components/useHistory";

const allQuestions = [
  { value: "มีหมูเหลือทำเมนูอะไรกินดี ?", result: "pass" },
  { value: "ขอเมนูญี่ปุ่นสักเมนูนึงได้ไหม ?", result: "pass" },
  { value: "มื้อเย็นวันนี้ทำอะไรกินดี ?", result: "pass" },
  { value: "ข้าวเย็นวันนี้ทำอะไรกินดี ?", result: "fail" },
  { value: "ขอเมนูอาหารไทยง่ายๆ หน่อย", result: "pass" },
  { value: "ขอเมนูของหวานง่ายๆ ได้มั้ย ?", result: "pass" },
];

export const Home = () => {
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
    const newId: number = createHistory(q);
    navigate(`/detail/${newId}`);
  };

  function getRandomSubset<T>(arr: T[], n: number): T[] {
    return arr.sort(() => Math.random() - 0.5).slice(0, n);
  }

  const questions = useMemo(() => getRandomSubset(allQuestions, 3), []);

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
        <span className="bold ">ผู้ช่วยเซฟแนะนำการทำอาหาร</span>
        <Flex
          direction="row"
          wrap="wrap"
          justify="center"
          gap="4"
          className="mt-8 max-w-[1200px] mx-auto"
        >
          {questions.map((q, i) => (
            <div
              key={i}
              style={{ textDecoration: "none" }}
              onClick={() => handleCardClick(q.value)}
            >
              <Card
                variant="classic"
                style={{
                  width: "250px",
                  height: "120px",
                  padding: "1.2rem",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                className="hover:shadow-xl hover:scale-[1.03] bg-white relative"
              >
                <div className="absolute top-2 right-2">
                  <Badge color="amber">{q.result}</Badge>
                </div>

                <Flex direction="column" gap="2" align="start">
                  <Box
                    style={{
                      backgroundColor: "#fff2de",
                      borderRadius: "50%",
                      padding: "0.4rem",
                    }}
                  >
                    <LuMessageCircleQuestion size={20} />
                  </Box>
                  <Text
                    size="3"
                    weight="medium"
                    color="gray"
                    className="whitespace-pre-line"
                  >
                    {q.value}
                  </Text>
                </Flex>
              </Card>
            </div>
          ))}
        </Flex>
        <InputText
          inputRef={inputRef}
          handleSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  );
};
