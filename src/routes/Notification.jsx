import { useEffect, useState, useRef } from "react";
import NotificationItem from "../components/notificationComponents/NotificationItem";
import NotificationLoader from "../components/notificationComponents/NotificationLoader";
import http from "../services/httpService";
import gsap from "gsap";

import "../styles/notification.css";
import caretIcon from "../images/caret.svg";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/`;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchNotifications();
  }, []);

  const el = useRef();
  const filter_modal = useRef();
  const q = gsap.utils.selector(el);

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
  }, [loading, notifications]);

  const fetchNotifications = async () => {
    try {
      await http.get(apiEndpoint).then((resp) => {
        setNotifications(resp.data.results.data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

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
    if (type === "read") {
      try {
        await http.get(apiEndpoint + "?is_read=True").then((resp) => {
          setNotifications(resp.data.results.data);
          setFilter("Read");
          toggleFilterDropDown();
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    } else if (type === "unread") {
      try {
        await http.get(apiEndpoint + "?is_read=False").then((resp) => {
          setNotifications(resp.data.results.data);
          toggleFilterDropDown();
          setFilter("Unread");
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await http.get(apiEndpoint).then((resp) => {
          setNotifications(resp.data.results.data);
          toggleFilterDropDown();
          setFilter("All");
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="relative w-full route-wrapper ">
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
            <img className="inline pr-2" src={caretIcon} alt="" />
          </button>
          {showFilter ? (
            <div
              ref={filter_modal}
              className="border rounded-lg filter-dropdown absolute right-0 top-12 bg-white z-40 ask-shadow w-24 opacity-0"
            >
              <p
                className=" p-3 m-0"
                onClick={() => filterNotification("unread")}
              >
                Unread{" "}
              </p>
              <p
                className="border-b p-3 m-0"
                onClick={() => filterNotification("read")}
              >
                Read{" "}
              </p>
              <p
                className="border-b p-3 m-0"
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
        <NotificationLoader />
      ) : (
        <div ref={el}>
          {notifications.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
