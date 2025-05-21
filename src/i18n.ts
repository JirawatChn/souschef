import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "th",
    lng: "th",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      th: {
        translation: {
          heading: "ผู้ช่วยเซฟแนะนำการทำอาหาร",
          random: "สุ่มเมนู",
          recommendation: "เมนูแนะนำ",
          input: "พิมพ์เมนูที่ต้องการหรือวัตถุดิบที่มีอยู่",
          sending: "กำลังส่งคำถาม...",
          loading: "กำลังคิดคำตอบ...",
          mode: {
            souschef: {
              label: "SousChef Mode",
              description: "แนะนำการทำอาหารแบบ\nมืออาชีพและเป็นทางการ",
            },
            buddy: {
              label: "Buddy Mode",
              description: "แนะนำการทำอาหารแบบ\nเพื่อนสนิทสอนทำอาหาร",
            },
            chef: {
              label: "Chef Ian Mode",
              description: "แนะนำการทำอาหารแบบ\nเชฟเอียน Masterchef",
            },
          },
          question: {
            porkMenu: "มีหมูเหลือทำอะไรดี",
            japaneseMenu: "ขอเมนูญี่ปุ่นเมนูนึง",
            dinnerIdea1: "มื้อเย็นวันนี้ทำอะไรดี",
            dinnerIdea2: "ข้าวเย็นทำอะไรดี?",
            thaiEasyMenu: "ขออาหารไทยทำง่ายๆ",
            dessertEasyMenu: "ทำของหวานอะไรดี",
            eggLeftover: "เหลือไข่ทำอะไรดี",
            noCooking: "ขอเมนูไม่ต้องใช้เตา",
            onePanEasy: "ขอเมนูที่ใช้กระทะเดียว",
            healthyDinner: "ขอเมนูสุขภาพดี",
          },
          randomHeading: "กดเพื่อสุ่มเมนูอาหาร",
          randomClick: "สุ่มเมนูอาหาร",
          menu: {
            friedRice: "ข้าวผัด",
            tomYumGoong: "ต้มยำกุ้ง",
            somtam: "ส้มตำ",
            greenCurry: "แกงเขียวหวาน",
            padThai: "ผัดไทย",
            hainaneseChickenRice: "ข้าวมันไก่",
            larbMoo: "ลาบหมู",
            yumWoonSen: "ยำวุ้นเส้น",
            khanomJeenNamYa: "ขนมจีนน้ำยา",
            kaengSom: "แกงส้ม",
            padKrapow: "ผัดกระเพรา",
            khaoSoi: "ข้าวซอย",
          },
          delete:"ลบ",
          history:"ประวัติการแชท",
          no_history:"ไม่มีประวัติการแชท",
          seeAll:"ดูเพิ่มเติม"
        },
      },
      en: {
        translation: {
          heading: "Your AI Cooking Assistant",
          random: "Random",
          recommendation: "Recommendation",
          input: "Type the menu you want or the ingredients you have",
          sending: "Sending your question...",
          loading: "Thinking of an answer...",
          mode: {
            souschef: {
              label: "SousChef Mode",
              description: "Professional and formal cooking guidance",
            },
            buddy: {
              label: "Buddy Mode",
              description: "Friendly and casual cooking advice",
            },
            chef: {
              label: "Chef Ian Mode",
              description:
                "Cooking advice like\nChef Ian from MasterChef Thailand",
            },
          },
          question: {
            porkMenu: "What can I cook with leftover pork?",
            japaneseMenu: "Can you suggest a\n Japanese dish?",
            dinnerIdea1: "What should I eat for dinner tonight?",
            dinnerIdea2: "What should I make for dinner?",
            thaiEasyMenu: "Give me a simple Thai recipe.",
            dessertEasyMenu: "Any easy dessert ideas?",
            eggLeftover: "What can I cook with leftover eggs?",
            noCooking: "Can I get a dish that doesn't need cooking?",
            onePanEasy: "Suggest a one-pan recipe?",
            healthyDinner: "Any healthy ideas?",
          },
          randomHeading: "Tap to generate a random dish",
          randomClick: "Generate a random dish",
          menu: {
            friedRice: "Fried Rice",
            tomYumGoong: "Tom Yum Goong",
            somtam: "Som Tam (Papaya Salad)",
            greenCurry: "Green Curry",
            padThai: "Pad Thai",
            hainaneseChickenRice: "Hainanese Chicken Rice",
            larbMoo: "Spicy Minced Pork Salad\n (Larb Moo)",
            yumWoonSen: "Glass Noodle Salad",
            khanomJeenNamYa: "Rice Noodles\n with Fish Curry",
            kaengSom: "Sour Curry (Kaeng Som)",
            padKrapow: "Stir-fried Basil with Meat",
            khaoSoi: "Northern Thai Curry\n Noodles",
          },
          delete:"Delete",
          history:"Chat History",
          no_history:"No chat history",
          seeAll:"See all"
        },
      },
    },
  });

export default i18n;
