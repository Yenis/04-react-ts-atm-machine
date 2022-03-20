import { useTranslation } from "react-i18next";

const InServiceDisplay: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="main-display">
        <h3>{t("service-report-1")}</h3>
        <h3>{t("service-report-2")}</h3>
        <h3>{t("service-report-3")}</h3>
    </div>
  );
};

export default InServiceDisplay;
