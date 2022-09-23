import { useEffect, useState } from "react";
import http from "../services/httpService";
import NotificationItem from "../components/notificationComponents/NotificationItem";

import "../styles/notification.css";
import NotificationLoader from "../components/notificationComponents/NotificationLoader";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/`;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      await http.get(apiEndpoint).then((resp) => {
        console.log(resp.data.data);
        setNotifications(resp.data.data);
        setLoading(false);
      });
    } catch (e) {
      console.throw(e);
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
        notifications.map((item) => (
          <NotificationItem
            key={item.id}
            id={item.id}
            is_read={item.is_read}
            notification_type={item.notification_type}
            message={item.content}
            markAsRead={markAsRead}
            // notification type content
            que={item.que}
            follow_by={item.followed_by}
          />
        ))
      )}
    </div>
  );
};

export default Notification;
