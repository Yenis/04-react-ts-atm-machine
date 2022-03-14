import { useTranslation } from "react-i18next";
import { centerText } from "../helpers/inlineStyles";

const ServicingReport: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="main-menu-header">
      <h2 style={{ ...centerText, color: "gold" }}>{t("service-report-1")}</h2>
      <h2 style={{ ...centerText, color: "gold" }}>{t("service-report-2")}</h2>
      <h2 style={{ ...centerText, color: "gold" }}>{t("service-report-3")}</h2>
    </div>
  );
};

export default ServicingReport;
