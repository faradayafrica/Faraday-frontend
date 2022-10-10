import { Link } from "react-router-dom";

// icons import -unread variants

import followUnread from "../../images/notification/follow_unread.svg";
import markUnread from "../../images/notification/mark_unread.svg";
import queUnread from "../../images/notification/add_que_unread.svg";
import commentUnread from "../../images/notification/add_comment_unread.svg";

// read variants
import follow from "../../images/notification/follow.svg";
import mark from "../../images/notification/mark.svg";
import queIcon from "../../images/notification/add_que.svg";
import commentIcon from "../../images/notification/add_comment.svg";
import { useState } from "react";

const NotificationItem = ({
  id,
  is_read,
  notification_type,
  message,
  created,
  markAsRead,
  que,
  follow_by,
  commentQue,
}) => {
  const [limit, setLimit] = useState(180);

  return (
    <>
      {/* follow type */}
      {notification_type === "follow" ? (
        <Link
          to={`/me/${follow_by?.username}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item relative border-b"
              : "bg-brand-highlight w-full p-3 flex notification-item relative border-b"
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
            <span className="absolute text-xs top-3 right-3">{created}</span>
          </div>
        </Link>
      ) : (
        ""
      )}

      {/* question type */}
      {notification_type === "que" ? (
        <Link
          to={`/qfeed/${que?.id}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item relative border-b"
              : "bg-brand-highlight w-full p-3 flex notification-item relative border-b"
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
            <span className="absolute text-xs top-3 right-3">{created}</span>

            <div className="border p-2 bg-white mt-2 rounded-lg text-secondary font-semibold ">
              {que?.title}?{" "}
              <span className="text-xs font-normal">
                {que?.content.length >= limit
                  ? que?.content.substring(0, limit) + "..."
                  : que?.content}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        ""
      )}

      {/* solution type */}
      {notification_type === "solution" ? (
        <Link
          to={`/qfeed/${que?.id}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item relative border-b"
              : "bg-brand-highlight w-full p-3 flex notification-item relative border-b"
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
              src={que?.user.profile_pic}
              className="w-8 h-8 rounded-full  bg-background2"
              style={{ objectFit: "cover" }}
              alt=""
            />
            {message}
            <span className="absolute text-xs top-3 right-3">{created}</span>

            {que.solution ? (
              <div className="border p-2 bg-white text-sm mt-2 rounded-lg text-secondary">
                {que.solution.content.length >= limit
                  ? que?.solution.content.substring(0, limit) + "..."
                  : que?.solution.content}
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
      ) : (
        ""
      )}

      {/* comment type */}
      {notification_type === "comment" ? (
        <Link
          to={`/qfeed/${commentQue.id}`}
          style={{ textDecoration: "none", color: "var(--faraday-night)" }}
          className={
            is_read
              ? "w-full p-3 flex notification-item relative border-b"
              : "bg-brand-highlight w-full p-3 flex notification-item relative border-b"
          }
          onClick={() => markAsRead(id)}
        >
          <img
            src={is_read ? commentIcon : commentUnread}
            className="w-6 h-6  mr-2"
            style={{ objectFit: "fill" }}
            alt=""
          />

          <div className="">
            <img
              src={commentQue?.comment.user.profile_pic}
              className="w-8 h-8 rounded-full  bg-background2"
              style={{ objectFit: "cover" }}
              alt=""
            />
            {message}
            <span className="absolute text-xs top-3 right-3">{created}</span>

            <div className="border p-2 bg-white text-sm mt-2 rounded-lg text-secondary">
              {commentQue?.comment.content.length >= limit
                ? commentQue?.comment.content.substring(0, limit) + "..."
                : commentQue?.comment.content}
            </div>
          </div>
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default NotificationItem;
