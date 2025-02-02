import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "light" && "bg-lightGray"
      } flex flex-col min-h-screen m-2 mb-0 mt-0 md:m-0`}
    >
      <header>
        <Navbar />
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
