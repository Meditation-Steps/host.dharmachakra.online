import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import pagesEn from "./locales/en/pages.json";
import timerEn from "./locales/en/timer.json";
import pagesRu from "./locales/ru/pages.json";
// Import translation files directly
import timerRu from "./locales/ru/timer.json";
import { LANG_EN, LANG_RU, SUPPORTED_LANGS } from "./constants/lang.ts";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [LANG_RU]: {
        timer: timerRu,
        pages: pagesRu,
      },
      [LANG_EN]: {
        timer: timerEn,
        pages: pagesEn,
      },
    },
    fallbackLng: LANG_RU,
    supportedLngs: SUPPORTED_LANGS,
    defaultNS: "common",
    ns: ["common", "timer", "pages"],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
  });

export default i18n;
