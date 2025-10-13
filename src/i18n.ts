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
            thaiEasyMenu: "ขออาหารไทยทำง่ายๆ",
            dessertEasyMenu: "ทำของหวานอะไรดี",
            eggLeftover: "เหลือไข่ทำอะไรดี",
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
          delete: "ลบ",
          history: "ประวัติการแชท",
          no_history: "ไม่มีประวัติการแชท",
          seeAll: "ดูเพิ่มเติม",
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
            thaiEasyMenu: "Give me a simple Thai recipe.",
            dessertEasyMenu: "Any easy dessert ideas?",
            eggLeftover: "What can I cook with leftover eggs?",
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
          delete: "Delete",
          history: "Chat History",
          no_history: "No chat history",
          seeAll: "See all",
        },
      },
      cn: {
        translation: {
          heading: "你的 AI 烹饪助手",
          random: "随机菜谱",
          recommendation: "推荐菜谱",
          input: "输入想做的菜或现有的食材",
          sending: "正在发送问题...",
          loading: "正在思考答案...",
          mode: {
            souschef: {
              label: "副厨模式",
              description: "提供专业正式的烹饪指导",
            },
            buddy: {
              label: "好友模式",
              description: "像朋友一样提供轻松的烹饪建议",
            },
            chef: {
              label: "Chef Ian 模式",
              description: "提供像\nMasterChef Thailand 的 Ian 主厨一样的建议",
            },
          },
          question: {
            porkMenu: "剩下的猪肉可以做什么？",
            japaneseMenu: "可以推荐一道日本料理吗？",
            dinnerIdea1: "今晚吃什么好？",
            thaiEasyMenu: "给我一道简单的泰国菜。",
            dessertEasyMenu: "做什么甜点好？",
            eggLeftover: "剩下的鸡蛋可以做什么？",
            healthyDinner: "有什么健康菜谱推荐？",
          },
          randomHeading: "点击随机生成菜谱",
          randomClick: "随机生成菜谱",
          menu: {
            friedRice: "炒饭",
            tomYumGoong: "冬阴功汤",
            somtam: "青木瓜沙拉",
            greenCurry: "泰式绿咖喱",
            padThai: "泰式炒河粉",
            hainaneseChickenRice: "海南鸡饭",
            larbMoo: "泰式辣拌猪肉 (Larb Moo)",
            yumWoonSen: "泰式粉丝沙拉",
            khanomJeenNamYa: "泰式咖喱米粉",
            kaengSom: "泰式酸咖喱 (Kaeng Som)",
            padKrapow: "泰式罗勒炒肉",
            khaoSoi: "泰北咖喱面",
          },
          delete: "删除",
          history: "聊天历史",
          no_history: "暂无聊天记录",
          seeAll: "查看全部",
        },
      },
    },
  });

export default i18n;
