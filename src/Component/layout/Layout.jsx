import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";   // تمت الإضافة
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function Layout() {
  const location = useLocation();
  const { t } = useTranslation();   // جاهز لاستخدام الترجمة

  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
}

export default Layout;