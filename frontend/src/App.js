/* eslint-disable react/prop-types */
import React, { useState, Suspense } from "react";
import AppLogout from "./pages/login_logout/Logout";
import { BrowserRouter as Router} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { contextData } from "./ContextApi";
import AppRouter from "./AppRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./sass/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

export const queryClient = new QueryClient();

function App() {
  const [userdata, setUserData] = useState({});
  //disable mouse wheel with number input on whole app
  document.addEventListener("wheel", function () {
    if (document.activeElement.type === "number" &&
      document.activeElement.classList.contains("form-control")) {
      document.activeElement.blur();
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <contextData.Provider value={{ userdata, setUserData }}>
        <Suspense>
          <AppLogout>
              <Router>
              <AppRouter userdata={userdata} />
              </Router>
              <ToastContainer
                theme="colored"
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
          </AppLogout>
        </Suspense>
      </contextData.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;