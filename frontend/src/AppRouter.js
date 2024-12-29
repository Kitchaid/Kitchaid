import React, { useContext, useEffect } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import { contextData } from "./ContextApi";
import Login from "./pages/login_logout/Login";
import { appRoutes, dashboardRoutes } from "./appRoutes";
import FrameWrapper from "./Partials/frameWrapper";
const AppRouter = () => {
    const location = useLocation(); // This needs to be inside Router context
    const mainPanel = React.useRef(null);
    const { userdata } = useContext(contextData);
    const renderRoutes = (routes, userdata) =>
        routes?.map(({ path, element, layout, component }, key) => {
            const isPublicRoute = path === "/" || path === "/login";
            const isDashboardRoute =
                (layout === "/producer") ||
                (layout === "/receiver") ||
                (layout === '' ) ||
                (layout === "/admin" && userdata?.isAdmin) ||
                (layout === "/superiorAdmin" && userdata?.isSuperiorAdmin);
                console.log(dashboardRoutes())
            return (
                <Route
                    key={key}
                    path={path}
                    element={
                        isPublicRoute ? (
                            component || element
                        ) : userdata && userdata?._id ? (
                            isDashboardRoute ? (
                                <FrameWrapper>
                                    {component || element}
                                </FrameWrapper>
                            ) : typeof element === "function" ? (
                                <FrameWrapper>
                                    {element(userdata)}
                                </FrameWrapper>
                            ) : (
                                    component || element
                            )
                        ) : (
                            <Login />
                        )
                    }
                />

            );
        });


    useEffect(() => {
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
        <div ref={mainPanel}>
            <Routes>
                {renderRoutes(appRoutes, userdata)}
                {renderRoutes(dashboardRoutes(), userdata)}
            </Routes>
        </div>
    );
};

export default AppRouter;
