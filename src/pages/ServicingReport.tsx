import { useTranslation } from "react-i18next";

const ServicingReport: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="main-menu-header">
      <h3 style={{color: "purple"}}>{t("service-report-1")}</h3>
      <h3 style={{color: "purple"}}>{t("service-report-2")}</h3>
      <h3 style={{color: "purple"}}>{t("service-report-3")}</h3>
    </div>
  );
};

export default ServicingReport;
