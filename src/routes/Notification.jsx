import { useEffect, useState, useRef } from "react";
import NotificationItem from "../components/notificationComponents/NotificationItem";
import NotificationLoader from "../components/notificationComponents/NotificationLoader";
import SecondaryButton from "../components/styledComponents/SecondaryButton";
import http from "../services/httpService";
import auth from "../services/authService";
import gsap from "gsap";

import "../styles/notification.css";
import caretIcon from "../images/caret.svg";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/`;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const el = useRef();
  const filter_modal = useRef();
  const q = gsap.utils.selector(el);

  const readNotifications = notifications.filter((n) => n.is_read === true);
  const unreadNotifications = notifications.filter((n) => n.is_read === false);

  useEffect(() => {
    gsap.fromTo(
      q(".notification-item"),
      {
        y: +200,
        ease: "power2.inOut",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      }
    );
  }, [loading]);

  const markAsRead = async (notificationId) => {
    const notificationsClone = [...notifications];
    const target_index = notifications.findIndex(
      (item) => item.id === notificationId
    );
    try {
      notificationsClone[target_index].is_read = true;
      await http.put(apiEndpoint + `${notificationId}/read/`);
    } catch (e) {
      notificationsClone[target_index].is_read = false;
      throw e;
    }
    setNotifications(notificationsClone);
  };

  const toggleFilterDropDown = () => {
    if (!showFilter) {
      setShowFilter(true);
      setTimeout(() => {
        gsap.fromTo(
          filter_modal.current,
          { y: +100, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.inOut" }
        );
      }, 50);
    } else {
      gsap.fromTo(
        filter_modal.current,
        { y: 0, opacity: 1 },
        { y: +100, opacity: 0.3, ease: "power2.inOut" }
      );
      setTimeout(() => {
        setShowFilter(false);
      }, 200);
    }
  };

  const filterNotification = async (type) => {
    setError("");
    setLoading(true);
    toggleFilterDropDown();

    if (type === "read") {
      setFilter("Read");
      setLoading(false);
    } else if (type === "unread") {
      setFilter("Unread");
      setLoading(false);
      console.log(filter, "Filter");
    } else {
      setFilter("All");
      setLoading(false);
      console.log(filter, "Filter");
    }
  };

  let nextNotificationPageUrl = "";
  const notificationRequestQueue = [];

  const fetchNotifications = async (urlEndpoint) => {
    notificationRequestQueue.push(urlEndpoint);
    try {
      await http.get(urlEndpoint).then((resp) => {
        setNotifications((prev) => prev.concat(...resp.data.results.data));
        nextNotificationPageUrl = resp.data.next;
        console.log("New data", ...resp.data.results.data);
        setLoading(false);
        setLoadMore(false);
      });
    } catch (e) {
      console.log(e);
      setError("Can't fetch notifications at this time. Try again later");
    }
  };

  //we have the scroll function but haven't called it
  const handleScroll = (e) => {
    if (
      nextNotificationPageUrl &&
      document.getElementById("notification-wrapper") !== null
    ) {
      if (
        e.target.documentElement.scrollTop + window.innerHeight + 200 >=
        e.target.documentElement.scrollHeight
      ) {
        if (!notificationRequestQueue.includes(nextNotificationPageUrl)) {
          // console.log("Request Q>", questionRequestQueue);
          setLoadMore(true);
          fetchNotifications(nextNotificationPageUrl);
        } else {
          console.warn("Duplicate request from notification blocked");
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchNotifications(apiEndpoint);
  }, []);

  return (
    <div className="relative w-full route-wrapper" id="notification-wrapper">
      <div className="min-h-[70px] sm:min-h-[0px] bg-transparent"> </div>
      <div className="flex justify-between items-center m-3">
        <h1 className="text-2xl sm:text-2xl font-bold">Notification</h1>

        <div className="relative">
          <button
            onClick={() => {
              toggleFilterDropDown();
            }}
            className={
              filter
                ? "border-y border-x border-brand rounded-lg py-2 bg-brand-highlight"
                : "border-y border-x border-faraday-night rounded-lg py-2 "
            }
          >
            <p className="m-0 pl-3 pr-2 inline">{filter ? filter : "Filter"}</p>{" "}
            <img className="inline px-2" src={caretIcon} alt="" />
          </button>
          {showFilter ? (
            <div
              ref={filter_modal}
              className="p-1 border rounded-xl filter-dropdown absolute right-0 top-12 bg-white z-40 ask-shadow w-24 opacity-0"
            >
              <p
                className="border-b px-3 py-2 m-0 rounded-t-lg"
                onClick={() => filterNotification("unread")}
              >
                Unread{" "}
              </p>
              <p
                className="border-b px-3 py-2 m-0"
                onClick={() => filterNotification("read")}
              >
                Read{" "}
              </p>
              <p
                className=" px-3 py-2 m-0 rounded-b-lg"
                onClick={() => {
                  filterNotification("all");
                }}
              >
                All{" "}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {loading ? (
        !error ? (
          <NotificationLoader />
        ) : (
          <div className="p-3 border-brand-highlight rounded-lg border bg-background m-3 text-center">
            <>
              <p className="text-xs sm:text-base ">{error}</p>
              <SecondaryButton
                cta="Retry"
                action={() => {
                  fetchNotifications(apiEndpoint);
                  setError("");
                }}
              />
            </>
          </div>
        )
      ) : (
        <div ref={el}>
          <>
            {filter === "Read"
              ? readNotifications.map((item) => (
                  <NotificationItem
                    key={item.id}
                    id={item.id}
                    is_read={item.is_read}
                    notification_type={item.notification_type}
                    message={item.content}
                    created={item.created}
                    markAsRead={markAsRead}
                    // notification type content
                    que={item.que}
                    follow_by={item.followed_by}
                    commentQue={item.que_with_comment}
                  />
                ))
              : ""}

            {filter === "Unread"
              ? unreadNotifications.map((item) => (
                  <NotificationItem
                    key={item.id}
                    id={item.id}
                    is_read={item.is_read}
                    notification_type={item.notification_type}
                    message={item.content}
                    created={item.created}
                    markAsRead={markAsRead}
                    // notification type content
                    que={item.que}
                    follow_by={item.followed_by}
                    commentQue={item.que_with_comment}
                  />
                ))
              : ""}
            {filter === "All" || filter === ""
              ? notifications.map((item) => (
                  <NotificationItem
                    key={item.id}
                    id={item.id}
                    is_read={item.is_read}
                    notification_type={item.notification_type}
                    message={item.content}
                    created={item.created}
                    markAsRead={markAsRead}
                    // notification type content
                    que={item.que}
                    follow_by={item.followed_by}
                    commentQue={item.que_with_comment}
                  />
                ))
              : ""}
          </>
        </div>
      )}

      <>
        {loadMore ? (
          <>
            <div className="animate-pulse border-b notification-loader-item">
              <div className="w-full p-3 flex  bg-white">
                <div className="w-6 h-6 mr-2 bg-background2"></div>

                <div className="w-full">
                  <div className="w-8 h-8 rounded-full  bg-background2"></div>
                  <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
                  <div className="w-[55px] h-3 rounded-xl  bg-background2 mt-2"></div>
                </div>
              </div>
            </div>

            <div className="animate-pulse border-b notification-loader-item">
              <div className="w-full p-3 flex  bg-white">
                <div className="w-6 h-6 mr-2 bg-background2"></div>

                <div className="w-full">
                  <div className="w-8 h-8 rounded-full  bg-background2"></div>
                  <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
                  <div className="w-[140px] h-3 rounded-xl  bg-background2 mt-2"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Notification;
