import { useEffect, useState, useRef } from "react";
import NotificationItem from "../components/notificationComponents/NotificationItem";
import NotificationLoader from "../components/notificationComponents/NotificationLoader";
import http from "../services/httpService";
import gsap from "gsap";

import "../styles/notification.css";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/`;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchNotifications();
  }, []);

  const activities = useRef();

  useEffect(() => {
    gsap.from(activities.current, {
      y: +200,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.inOut",
      delay: 0.6,
    });
  });

  const fetchNotifications = async () => {
    try {
      await http.get(apiEndpoint).then((resp) => {
        console.log(resp.data.data);
        setNotifications(resp.data.data);
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

  return (
    <div className="relative w-full route-wrapper ">
      <div className="min-h-[70px] sm:min-h-[0px] bg-transparent"> </div>
      <h1 className="text-2xl sm:text-2xl m-3 font-bold">Notification</h1>
      {loading ? (
        <NotificationLoader />
      ) : (
        <div ref={activities}>
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
              comment={item.comment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
