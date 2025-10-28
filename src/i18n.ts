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
          error: "เกิดข้อผิดพลาดในการดึงคำตอบจากเซิร์ฟเวอร์",
          nutrition_daily: "สารอาหารต่อวัน",
          nutrition: {
            head: "แนวทางการรับประทานอาหารเพื่อสุขภาพ",
            source:
              "ที่มา: องค์การอนามัยโลก (WHO) — แผ่นข้อมูล “อาหารเพื่อสุขภาพ” และหน้าเว็บไซต์ที่เกี่ยวข้อง",
            emphasize_foods: "อาหารที่ควรเน้นรับประทาน",
            emphasize_foods_desc:
              "ผลไม้ ผัก พืชตระกูลถั่ว (เช่น ถั่วเลนทิลและถั่วชนิดต่าง ๆ) ถั่วเปลือกแข็ง และธัญพืชเต็มเมล็ด (เช่น ข้าวโพด ข้าวฟ่าง ข้าวโอ๊ต ข้าวสาลี และข้าวกล้อง)",
            fruit_vegetables: "ผลไม้และผัก",
            fruit_vegetables_highlight: "≥ 400 กรัม/วัน (ประมาณ 5 ส่วน)",
            fruit_vegetables_note:
              "ไม่รวมมันฝรั่ง มันเทศ มันสำปะหลัง และพืชหัวที่มีแป้งอื่น ๆ",
            free_sugars: "น้ำตาลอิสระ",
            free_sugars_highlight:
              "< 10% ของพลังงาน (≈ 50 กรัม ที่ 2,000 กิโลแคลอรี)",
            free_sugars_desc:
              "ควรได้รับพลังงานจากน้ำตาลอิสระไม่เกิน 10% ของพลังงานทั้งหมดต่อวัน (และควรน้อยกว่า 5% เพื่อประโยชน์ต่อสุขภาพเพิ่มเติม) น้ำตาลอิสระรวมถึงน้ำตาลที่เติมโดยผู้ผลิต ผู้ปรุงอาหาร หรือผู้บริโภค และน้ำตาลที่มีอยู่ตามธรรมชาติในน้ำผึ้ง น้ำเชื่อม น้ำผลไม้ และน้ำผลไม้เข้มข้น",
            free_sugars_foot:
              "≈ 12 ช้อนชา สำหรับผู้ที่บริโภค 2,000 กิโลแคลอรีต่อวัน",
            fats: "ไขมัน",
            fats_highlight:
              "< 30% ของพลังงาน (ไขมันอิ่มตัว < 10%, ไขมันทรานส์ < 1%)",
            fats_desc:
              "ควรเลือกบริโภคไขมันไม่อิ่มตัว (พบในปลา อะโวคาโด ถั่ว และน้ำมันจากดอกทานตะวัน ถั่วเหลือง คาโนลา และมะกอก) แทนไขมันอิ่มตัว (พบในเนื้อสัตว์ที่มีไขมันมาก เนย น้ำมันปาล์ม น้ำมันมะพร้าว ครีม ชีส และกี) และหลีกเลี่ยงไขมันทรานส์โดยเฉพาะที่ผลิตจากอุตสาหกรรม เช่น ในขนมอบ ของทอด และอาหารแช่แข็ง",
            salt: "เกลือ (โซเดียม)",
            salt_highlight: "< 5 กรัม/วัน (≈ 1 ช้อนชา)",
            salt_desc:
              "ควรบริโภคเกลือไม่เกินวันละ 5 กรัม (ประมาณ 1 ช้อนชา) และควรใช้เกลือเสริมไอโอดีน",
            note: "หมายเหตุ: ค่าร้อยละของพลังงานหมายถึงสัดส่วนของพลังงานทั้งหมดต่อวัน เนื้อหานี้สอดคล้องกับแนวทางขององค์การอนามัยโลก (WHO)",
          },
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
          error:
            "An error occurred while fetching the response from the server",
          nutrition_daily: "Daily Nutrition",
          head: "Healthy Diet Guidelines",
          nutrition: {
            source:
              "Source: World Health Organization (WHO) — “Healthy Diet” fact sheet and related WHO pages.",
            emphasize_foods: "Emphasize These Foods",
            emphasize_foods_desc:
              "Fruits, vegetables, legumes (e.g., lentils and beans), nuts, and whole grains (e.g., unprocessed maize, millet, oats, wheat, and brown rice).",
            fruit_vegetables: "Fruits and Vegetables",
            fruit_vegetables_highlight: "≥ 400 g/day (about 5 portions)",
            fruit_vegetables_note:
              "Excluding potatoes, sweet potatoes, cassava, and other starchy roots.",
            free_sugars: "Free Sugars",
            free_sugars_highlight: "< 10% of energy (≈ 50 g at 2,000 kcal)",
            free_sugars_desc:
              "Free sugars should provide less than 10% of total daily energy intake (ideally below 5% for additional health benefits). They include sugars added by manufacturers, cooks, or consumers, as well as sugars naturally present in honey, syrups, fruit juices, and fruit juice concentrates.",
            free_sugars_foot: "≈ 12 teaspoons for a 2,000 kcal diet.",
            fats: "Fats",
            fats_highlight: "< 30% of energy (saturated < 10%, trans < 1%)",
            fats_desc:
              "Prefer unsaturated fats (found in fish, avocado, nuts, and in sunflower, soybean, canola, and olive oils) over saturated fats (found in fatty meats, butter, palm and coconut oils, cream, cheese, and ghee). Avoid industrially produced trans-fats found in fried, baked, and packaged foods.",
            salt: "Salt (Sodium)",
            salt_highlight: "< 5 g/day (≈ 1 teaspoon)",
            salt_desc:
              "Salt intake should be less than 5 grams per day (about one teaspoon) and should be iodized.",
            note: "Note: Percentages of energy refer to the proportion of total daily calorie intake. This content follows the World Health Organization (WHO) guidelines.",
          },
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
          error: "从服务器获取回复时发生错误",
          nutrition_daily: "每日营养",
          nutrition: {
            head: "健康饮食指南",
            source: "来源：世界卫生组织（WHO）—《健康饮食》资料页及相关网页。",
            emphasize_foods: "应重点摄入的食物",
            emphasize_foods_desc:
              "水果、蔬菜、豆类（如扁豆和各种豆类）、坚果和全谷物（如未加工的玉米、小米、燕麦、小麦和糙米）。",
            fruit_vegetables: "水果和蔬菜",
            fruit_vegetables_highlight: "≥ 400 克/天（约 5 份）",
            fruit_vegetables_note:
              "不包括马铃薯、红薯、木薯和其他富含淀粉的根茎类植物。",
            free_sugars: "游离糖",
            free_sugars_highlight: "< 10% 能量（≈ 50 克，基于 2000 千卡）",
            free_sugars_desc:
              "游离糖摄入应少于每日总能量的 10%（理想情况下低于 5%，以获得更多健康益处）。游离糖包括制造商、烹饪者或消费者添加的糖，以及天然存在于蜂蜜、糖浆、果汁和果汁浓缩物中的糖。",
            free_sugars_foot: "≈ 相当于每天 12 茶匙（2000 千卡饮食）。",
            fats: "脂肪",
            fats_highlight: "< 30% 能量（饱和脂肪 < 10%，反式脂肪 < 1%）",
            fats_desc:
              "应优先选择不饱和脂肪（存在于鱼类、鳄梨、坚果及葵花籽油、大豆油、菜籽油和橄榄油中），替代饱和脂肪（存在于肥肉、黄油、棕榈油、椰子油、奶油、奶酪和酥油中），并避免工业生产的反式脂肪（常见于油炸、烘焙及包装食品中）。",
            salt: "食盐（钠）",
            salt_highlight: "< 5 克/天（≈ 1 茶匙）",
            salt_desc: "每日盐摄入量应少于 5 克（约 1 茶匙），并应使用碘化盐。",
            note: "注：能量百分比指每日总热量的比例。本内容依据世界卫生组织（WHO）的健康饮食指南。",
          },
        },
      },
    },
  });

export default i18n;
