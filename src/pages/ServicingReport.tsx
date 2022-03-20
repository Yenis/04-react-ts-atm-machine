import { useTranslation } from "react-i18next";
import { Routes, Route, Link } from "react-router-dom";
import { ButtonAdminMenu } from "../components/VariousButtons";
import { TopLayout } from "../components/TopLayout/TopLayout";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";
import { Page } from "../helpers/pageLinks";
import AdminLoginPage from "./AdminLogin";
import AdminMenu from "./Admin";
import RegisterPage from "./Register";
import AdminServicePage from "./Service";
import { useAtmState } from "../helpers/customHooks/adminServiceHook";
import InServiceDisplay from "../components/Admin/ServicePageDisplay";

const ServicingReportPage: React.FC = () => {
  const { PageProvider } = useDisplay();
  const { isServicing } = useAtmState();
  const { t } = useTranslation();

  return (
    <div className="main-menu-header">
      <TopLayout>
        <PageProvider>
          <InServiceDisplay />
          <Routes>
            <Route path={Page.ADMIN} element={<AdminMenu />}></Route>
            <Route path={Page.REGISTER} element={<RegisterPage />}></Route>
            <Route path={Page.SERVICE} element={<AdminServicePage />}></Route>
            <Route path={Page.IN_SERVICE} element={<ServicingReportPage />}></Route>
            <Route path={Page.ADMIN_LOGIN} element={<AdminLoginPage />}></Route>
          </Routes>
          {isServicing && (
            <Link to={Page.ADMIN_LOGIN} style={{textDecoration: 'none'}}>
              <ButtonAdminMenu>
                {t("admin-menu-button")}
              </ButtonAdminMenu>
            </Link>
          )}
        </PageProvider>
      </TopLayout>
    </div>
  );
};

export default ServicingReportPage;
