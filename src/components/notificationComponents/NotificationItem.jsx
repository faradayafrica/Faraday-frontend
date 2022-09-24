import { Link } from "react-router-dom";

// icons import -unread variants
import liked from "../../images/qfeed/red-love.svg";
import profile from "../../images/profile2.png";

import followUnread from "../../images/notification/follow_unread.svg";
import markUnread from "../../images/notification/mark_unread.svg";
import queUnread from "../../images/notification/add_que_unread.svg";
import commentUnread from "../../images/notification/add_comment_unread.svg";

// read variants
import follow from "../../images/notification/follow.svg";
import mark from "../../images/notification/mark.svg";
import queIcon from "../../images/notification/add_que.svg";
import comment from "../../images/notification/add_comment.svg";

const NotificationItem = ({
  id,
  is_read,
  notification_type,
  message,
  markAsRead,
  que,
  follow_by,
}) => {
  return (
    <>
      {/* follow type */}
      {notification_type === "follow" ? (
        <Link
          to={`/me/${follow_by.username}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item"
              : "bg-brand-highlight w-full p-3 flex notification-item"
          }
          onClick={() => markAsRead(id)}
        >
          <img
            src={is_read ? follow : followUnread}
            className="w-6 h-6  mr-2"
            style={{ objectFit: "fill" }}
            alt=""
          />

          <div className="">
            <img
              src={follow_by.profile_pic}
              className="w-8 h-8 rounded-full bg-background2"
              style={{ objectFit: "cover" }}
              alt=""
            />
            {message}
          </div>
        </Link>
      ) : (
        ""
      )}

      {/* question type */}
      {notification_type === "que" ? (
        <Link
          to={`/qfeed/${que.id}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item"
              : "bg-brand-highlight w-full p-3 flex notification-item"
          }
          onClick={() => markAsRead(id)}
        >
          <img
            src={is_read ? queIcon : queUnread}
            className="w-6 h-6  mr-2"
            style={{ objectFit: "fill" }}
            alt=""
          />

          <div className="">
            <img
              src={que.user.profile_pic}
              className="w-8 h-8 rounded-full  bg-background2"
              style={{ objectFit: "cover" }}
              alt=""
            />
            {message}
          </div>
        </Link>
      ) : (
        ""
      )}

      {/* solution type */}
      {notification_type === "solution" ? (
        <Link
          to={`/qfeed/${que.id}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item"
              : "bg-brand-highlight w-full p-3 flex notification-item"
          }
          onClick={() => markAsRead(id)}
        >
          <img
            src={is_read ? mark : markUnread}
            className="w-6 h-6  mr-2"
            style={{ objectFit: "fill" }}
            alt=""
          />

          <div className="">
            <img
              src={que.user.profile_pic}
              className="w-8 h-8 rounded-full  bg-background2"
              style={{ objectFit: "cover" }}
              alt=""
            />
            {message}
          </div>
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default NotificationItem;
