import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./sideBar";
import Footer from "../Partials/Footer";
import NavIcons from "../Partials/Nav";
import { dashboardRoutes } from "../appRoutes";
const FrameWrapper = ({ children }) => {
  const location = useLocation();
  const mainPanel = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      const element = document.getElementById("bodyClick");
      element?.parentNode?.removeChild(element);
    }
  }, [location]);

  return (
    <div className="wrapper">
      <Sidebar color="white" image={null} routes={dashboardRoutes()} />
      <div className="main-panel" ref={mainPanel}>
        <NavIcons />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default FrameWrapper;
