import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useParams } from "react-router-dom";
import "./Layout.css";
import { NavigationProvider } from "./Navigation";
import TopBar from "./TopBar";
import { isSupportedLang } from "@/utils/lang.ts";
import { LANG_RU } from "@/constants/lang.ts";

export default function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  // Validate and sync language from URL
  useEffect(() => {
    if (isSupportedLang(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang, i18n]);

  // Redirect to Russian if invalid language
  if (!isSupportedLang(lang)) {
    return <Navigate to={`/${LANG_RU}`} replace />;
  }

  return (
    <NavigationProvider config={{}}>
      <div className="layout-wrapper">
        <div className="layout-content">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </NavigationProvider>
  );
}
