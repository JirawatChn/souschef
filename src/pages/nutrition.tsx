// Nutrition.tsx (หรือ HealthyDietSummary.tsx)
import React from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../components/mainLayout";

export const Nutrition = () => (
  <MainLayout>
    <HealthyDietSummary />
  </MainLayout>
);

export default function HealthyDietSummary() {
  const { t } = useTranslation();

  const cards: Array<{
    id: string;
    title: string;
    icon: string;
    highlight?: string;
    body: React.ReactNode;
    foot?: React.ReactNode;
  }> = [
    {
      id: "emphasize-foods",
      title: t("nutrition.emphasize_foods"),
      icon: "🥗",
      body: <>{t("nutrition.emphasize_foods_desc")}</>,
    },
    {
      id: "fruit-veg",
      title: t("nutrition.fruit_vegetables"),
      icon: "🍎",
      highlight: t("nutrition.fruit_vegetables_highlight"),
      body: <>{t("nutrition.fruit_vegetables_note")}</>,
    },
    {
      id: "free-sugars",
      title: t("nutrition.free_sugars"),
      icon: "🍬",
      highlight: t("nutrition.free_sugars_highlight"),
      body: <>{t("nutrition.free_sugars_desc")}</>,
      foot: <span>{t("nutrition.free_sugars_foot")}</span>,
    },
    {
      id: "fats",
      title: t("nutrition.fats"),
      icon: "🧪",
      highlight: t("nutrition.fats_highlight"),
      body: <>{t("nutrition.fats_desc")}</>,
    },
    {
      id: "salt",
      title: t("nutrition.salt"),
      icon: "🧂",
      highlight: t("nutrition.salt_highlight"),
      body: <>{t("nutrition.salt_desc")}</>,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t("nutrition.head")}
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          {t("nutrition.source")}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {cards.map((c) => (
          <section
            key={c.id}
            className="relative rounded-2xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm hover:shadow transition-shadow"
            aria-labelledby={`${c.id}-title`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl" aria-hidden>
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id={`${c.id}-title`}
                  className="text-lg md:text-xl font-semibold leading-snug"
                >
                  {c.title}
                </h2>
                {c.highlight && (
                  <p className="mt-1 inline-flex items-center text-xs md:text-sm font-medium rounded-full px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {c.highlight}
                  </p>
                )}
                <p className="mt-2 text-sm md:text-base text-gray-700">{c.body}</p>
                {c.foot && (
                  <p className="mt-2 text-xs text-gray-500">{c.foot}</p>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-6 text-xs text-gray-500">
        <p>{t("nutrition.note")}</p>
      </footer>
    </div>
  );
}
