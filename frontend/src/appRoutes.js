import React, { useContext } from "react";
import { routerMaster } from "./routes";
import { contextData } from "./ContextApi";
import Index from './pages/index'
import Login from "./pages/login_logout/Login";
export const appRoutes = [
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/secure",
        element: (userdata) => {
            if (userdata && userdata._id) {
                return <>
                    <div className="backgroundImg mb-5">
                        <img src="/opprateBackGround.png" alt="backgroundPic" />
                        <div className="welcomeText">
                            <h1>Välkomna till Kitchaid</h1>
                        </div>
                    </div>
                </>
            } else {
                return <Login />;
            }
        },

    },
];

export const dashboardRoutes = () => {
    const { userdata } = useContext(contextData);
    const groupedRoutes = {
        producer: [],
        receiver: [],
        share: [],
        admin: [],
        superiorAdmin: []
    };
    console.log(groupedRoutes.admin)
    console.log(groupedRoutes.superiorAdmin)
    routerMaster?.forEach(route => {
        switch (route.layout) {
            case '/producer' :
                groupedRoutes.producer.push(route);
                break;
            case '/receiver':
                groupedRoutes.receiver.push(route);
                break;
            case '':
                groupedRoutes.share.push(route);
                break;
            case '/admin':
                groupedRoutes.admin.push(route);
                break;
            case '/superiorAdmin':
                groupedRoutes.superiorAdmin.push(route);
                break;
            default:
                // Handle any other cases if needed
                break;
        }
    });
    // Return the appropriate route group based on the user's role
    if (userdata?.isProducer && !userdata?.isAdmin && !userdata?.isSuperiorAdmin) {
        return groupedRoutes.producer.concat(groupedRoutes.share);
    } else if (!userdata?.isProducer && !userdata?.isSuperiorAdmin && !userdata?.isAdmin ){
        return groupedRoutes.receiver.concat(groupedRoutes.share);
    }
     if (userdata?.isAdmin && !userdata?.isProducer && !userdata?.isSuperiorAdmin ) {
        return groupedRoutes.admin;
    } else if (userdata?.isSuperiorAdmin && !userdata?.isProducer && !userdata?.isAdmin) {
        return groupedRoutes.superiorAdmin
    }
};
