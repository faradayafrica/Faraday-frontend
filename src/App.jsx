/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./common/components/ProtectedRoute.jsx";
import Qfeed from "./Qfeed/pages";
import Notification from "./Notification/pages";
import Profile from "./Profile/pages";
import MobileSideNav from "./common/components/MobileSideNav.jsx";
import NotFound from "./common/components/NotFound";
import Logout from "./Authentication/pages/Logout.jsx";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Authentication/context/userContext";
import SideNav from "./common/components/SideNav.jsx";
import MissingQuestion from "./Qfeed/components/MissingQuestion.jsx";
import { root_route } from "./rootRoutes.js";

const App = () => {
  const [clearCache, setClearCache] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    if (window.location.pathname === "/login" && clearCache) {
      window.location.reload(true);
      setClearCache(false);
    }
  }, []);

  const handleClearCache = () => {
    setClearCache(true);
    // console.log("Made ", clearCache);
  };

  // const syncPendingComments = async () => {
  //   const apiEndpoint =
  //     process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

  //   var storedComments = JSON.parse(localStorage.getItem("pendingComments"));

  //   window.localStorage.setItem("pendingComments", JSON.stringify([]));

  //   storedComments?.forEach(async (item, index, array) => {
  //     const { content, postid } = item;

  //     try {
  //       await http.post(apiEndpoint, {
  //         postid,
  //         content,
  //       });

  //       if (index === array.length - 1) {
  //         SuccessToast("Offline comments synced");
  //       }
  //     } catch (e) {
  //       console.warn(e.message);
  //     }
  //   });
  // };

  // const syncPendingQuestions = async () => {
  //   const apiEndpoint =
  //     process.env.REACT_APP_API_URL + "/qfeed/que/create_que/";

  //   var storedComments = JSON.parse(localStorage.getItem("pendingQuestions"));

  //   window.localStorage.setItem("pendingQuestions", JSON.stringify([]));

  //   storedComments?.forEach(async (item, index, array) => {
  //     const { title, content } = item;

  //     try {
  //       await http.post(apiEndpoint, {
  //         title,
  //         content,
  //       });

  //       if (index === array.length - 1) {
  //         SuccessToast("Offline questions synced");
  //       }
  //     } catch (e) {
  //       console.warn(e.message);
  //     }
  //   });
  // };

  return (
    <BrowserRouter>
      <UserProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="text-faraday-night max-w-[1024px] p-0 mx-auto flex bg-white">
          <MobileSideNav />
          <SideNav />
          <Switch>
            {root_route.map((route) => (
              <Route key={route.path} exact {...route} />
            ))}
            <Route path="/qfeed" render={(props) => <Qfeed {...props} />} />
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
            <Route path="/" render={(props) => <Qfeed {...props} />} />
            <Redirect push to="/not-found" />
          </Switch>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
