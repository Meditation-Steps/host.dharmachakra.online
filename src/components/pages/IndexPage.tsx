import { useTranslation } from "react-i18next";
import { usePageNavigation } from "../Layout/Navigation";
import "./Page.css";

export default function IndexPage() {
  const { t } = useTranslation("pages");

  // Set navigation config for this page
  usePageNavigation({ next: "prabhat-samgiita" });

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title font-title">{t("index.title")}</h1>
        <p className="page-subtitle font-regular">{t("index.subtitle")}</p>
      </header>
    </div>
  );
}
