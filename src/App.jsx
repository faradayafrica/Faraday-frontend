import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./common/components/ProtectedRoute.jsx";
import Qfeed from "./routes/Qfeed.jsx";
import Notification from "./routes/Notification";
import Profile from "./routes/Profile";
import MobileSideNav from "./components/styledComponents/MobileSideNav.jsx";
import NotFound from "./routes/NotFound";
import LoginPage from "./Authentication/pages/Login";
import SignUpPage from "./Authentication/pages/SignUp";
import ConfirmEmail from "./Authentication/pages/SignUp/ConfirmEmail";
import AddSchoolDetail from "./Authentication/pages/SignUp/AddSchoolDetail";
import PersonalData from "./Authentication/pages/SignUp/PersonalData";
import TermsAndCondition from "./routes/other pages/termsAndCondition.jsx";
import PrivacyPolicy from "./routes/other pages/privacyPolicy";
import Logout from "./Authentication/pages/Logout.jsx";
import "./styles/App.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Authentication/context/userContext";
import SideNav from "./components/styledComponents/SideNav.jsx";

import http from "./common/services/httpService";
import { SuccessToast } from "./common/components/CustomToast.jsx";
import MissingQuestion from "./routes/MissingQuestion.jsx";
import ForgotPassword from "./Authentication/pages/Login/forgot-password/ForgotPassword";
import ConfirmAccount from "./Authentication/pages/Login/forgot-password/ConfirmAccount";
import ResetPassword from "./Authentication/pages/Login/forgot-password/ResetPassword";

const App = () => {
  const [online, setOnline] = useState(true);
  const [hideOnlineStatus, setHideOnlineStatus] = useState(false);
  const [clearCache, setClearCache] = useState(false);

  useEffect(() => {
    if (window.location.pathname == "/login" && clearCache) {
      window.location.reload(true);
      setClearCache(false);
    }
  });

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
    <BrowserRouter>
      <UserProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="text-faraday-night max-w-[1024px] p-0 mx-auto flex">
          <MobileSideNav />
          <SideNav online={online} hideOnlineStatus={hideOnlineStatus} />
          <Switch>
            <Route path="/signup" component={SignUpPage} />
            <Route path="/confirm-email" component={ConfirmEmail} />
            <Route path="/update-school-detail" component={AddSchoolDetail} />
            <Route path="/update-personal-data" component={PersonalData} />
            <Route path="/terms-and-condition" component={TermsAndCondition} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/login"
              render={(props) => (
                <LoginPage clearCache={clearCache} {...props} />
              )}
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
            {/* Routes for password recovery starts here */}
            <Route
              path="/forgot-password"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              path="/confirm-account"
              render={(props) => <ConfirmAccount {...props} />}
            />
            <Route
              path="/reset-password"
              render={(props) => <ResetPassword {...props} />}
            />
            {/* Routes for password recovery ends here */}
            <Route
              path="/qfeed"
              render={(props) => <Qfeed online={online} {...props} />}
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
  );
};

export default App;
