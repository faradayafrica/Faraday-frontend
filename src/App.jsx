import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./common/components/ProtectedRoute.jsx";
import Qfeed from "./Qfeed/pages";
import Notification from "./Notification/pages";
import Profile from "./Profile/pages";
import MobileSideNav from "./common/components/MobileSideNav.jsx";
import NotFound from "./common/components/NotFound";
import LoginPage from "./Authentication/pages/Login";
import SignUpPage from "./Authentication/pages/SignUp";
import ConfirmEmail from "./Authentication/pages/SignUp/ConfirmEmail";
import AddSchoolDetail from "./Authentication/pages/SignUp/AddSchoolDetail";
import PersonalData from "./Authentication/pages/SignUp/PersonalData";
import TermsAndCondition from "./Authentication/pages/other pages/termsAndCondition.jsx";
import PrivacyPolicy from "./Authentication/pages/other pages/privacyPolicy";
import Logout from "./Authentication/pages/Logout.jsx";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Authentication/context/userContext";
import SideNav from "./common/components/SideNav.jsx";

import http from "./common/services/httpService";
import { SuccessToast } from "./common/components/CustomToast.jsx";
import MissingQuestion from "./Qfeed/components/MissingQuestion.jsx";
import ForgotPassword from "./Authentication/pages/Login/forgot-password/ForgotPassword";
import ConfirmAccount from "./Authentication/pages/Login/forgot-password/ConfirmAccount";
import ResetPassword from "./Authentication/pages/Login/forgot-password/ResetPassword";

import { Provider } from "react-redux";
import store from "./common/store/index.js";
import { root_route } from "./rootRoutes.js";

const App = () => {
  const [online, setOnline] = useState(true);
  const [hideOnlineStatus, setHideOnlineStatus] = useState(false);
  const [clearCache, setClearCache] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/login" && clearCache) {
      window.location.reload(true);
      setClearCache(false);
    }
  }, []);

  const handleClearCache = () => {
    setClearCache(true);
    console.log("Made ", clearCache);
  };

  const syncPendingComments = async () => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

    var storedComments = JSON.parse(localStorage.getItem("pendingComments"));

    window.localStorage.setItem("pendingComments", JSON.stringify([]));

    storedComments?.forEach(async (item, index, array) => {
      const { content, postid } = item;

      try {
        await http.post(apiEndpoint, {
          postid,
          content,
        });

        if (index === array.length - 1) {
          SuccessToast("Offline comments synced");
        }
      } catch (e) {
        console.warn(e.message);
      }
    });
  };

  const syncPendingQuestions = async () => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + "/qfeed/que/create_que/";

    var storedComments = JSON.parse(localStorage.getItem("pendingQuestions"));

    window.localStorage.setItem("pendingQuestions", JSON.stringify([]));

    storedComments?.forEach(async (item, index, array) => {
      const { title, content } = item;

      try {
        await http.post(apiEndpoint, {
          title,
          content,
        });

        if (index === array.length - 1) {
          SuccessToast("Offline questions synced");
        }
      } catch (e) {
        console.warn(e.message);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("online", () => {
      setOnline(true);
    });

    window.addEventListener("offline", () => {
      setHideOnlineStatus(true);
      setOnline(false);
    });
  }, []);

  useEffect(() => {
    if (online) {
      setTimeout(() => {
        setHideOnlineStatus(false);
      }, 3000);
      syncPendingComments();
      syncPendingQuestions();
    }
  }, [online]);

  useEffect(() => {
    let lastScrollTop = 0;

    if (document.getElementById("timeline") !== null) {
      window.addEventListener(
        "scroll",
        (e) => {
          let st = e.target.documentElement.scrollTop;
          if (st > lastScrollTop) {
            document.getElementById("topnav").classList.add("hide-up"); // downscroll code
          } else {
            document.getElementById("topnav").classList.remove("hide-up"); // upscroll code
          }
          lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        },
        false
      );
    }
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="text-faraday-night max-w-[1024px] p-0 mx-auto flex">
            <MobileSideNav />
            <SideNav online={online} hideOnlineStatus={hideOnlineStatus} />
            <Switch>
              {root_route.map((route) => (
                <Route key={route.path} exact {...route} />
              ))}
              <Route
                path="/qfeed"
                render={(props) => <Qfeed online={online} {...props} />}
              />
              <Route
                path="/logout"
                render={(props) => (
                  <Logout
                    handleClearCache={handleClearCache}
                    clearCache={clearCache}
                    {...props}
                  />
                )}
              />
              <ProtectedRoute path="/notification" component={Notification} />
              <ProtectedRoute
                path="/me/:username"
                render={(props) => <Profile {...props} />}
              />
              <Route path="/missing-question" component={MissingQuestion} />
              <Route path="/not-found" component={NotFound} />
              <Route
                path="/"
                render={(props) => <Qfeed online={online} {...props} />}
              />
              <Redirect push to="/not-found" />
            </Switch>
          </div>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
