/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
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
import { getCurrentUser } from "./common/services/authService.js";
import { useDispatch, useSelector } from "react-redux";
import { addNewNotification } from "./common/features/notification/notificationSlice.js";
import { getJwt } from "./common/services/authService.js";

const App = () => {
  const [clearCache, setClearCache] = useState(false);
  const [alertWS, setAlertWS] = useState();
  // const location = useLocation();

  const socketRef = useRef(null);
  const user = getCurrentUser();

  const dispatch = useDispatch();
  const { notificationFeed: notifications } = useSelector(
    (state) => state.notification
  );
  console.log(notifications, "**********");

  useEffect(() => {
    if (window.location.pathname === "/login" && clearCache) {
      window.location.reload(true);
      setClearCache(false);
    }
  }, []);

  let interval = "1h";

  useEffect(() => {
    // const WSS_NOTIFICATION_URL = `wss://stream.binance.com:9443/ws/btcusdt@kline_${interval}`;
    const WSS_NOTIFICATION_URL = `wss://faradayapi-staging.azurewebsites.net/ws/notifications/${
      user?.username
    }/?token=${getJwt()}`;
    socketRef.current = new WebSocket(WSS_NOTIFICATION_URL);

    // Receive data from the server
    socketRef.current.onmessage = (event) => {
      if (user?.username) {
        dispatch(addNewNotification({ value: JSON.parse(event.data) }));
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  // Close Realtime Notification connection when user is logged out
  useEffect(() => {
    if (!user.username) {
      socketRef.current.close();
    }
  }, [user]);

  const handleClearCache = () => {
    setClearCache(true);
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
        <Toaster position="top-center" reverseOrder={true} />
        <div className="text-faraday-night max-w-[1024px] p-0 mx-auto flex bg-[#F8F9FA]">
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
