import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LANG_RU, SUPPORTED_LANGS } from "@/constants/lang.ts";
import type { Language } from "@/utils/lang.ts";

export default function LandingPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get language from localStorage or use fallback
    const storedLang: Language = localStorage.getItem("i18nextLng") as any;
    const lang = storedLang && SUPPORTED_LANGS.includes(storedLang) ? storedLang : LANG_RU;

    // Set the language in i18next if needed
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    // Redirect to the language-specific route
    navigate(`/${lang}`, { replace: true });
  }, [navigate, i18n]);

  // Show nothing while redirecting
  return null;
}
