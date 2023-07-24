import { useSelector } from "react-redux";
import "../styles/Alert.css";

const AlertBadge = () => {
  const { unreadCount } = useSelector((state) => state.notification);

  return (
    <>
      {!!unreadCount && (
        <div className="alert-count bg-brand-dark text-xs text-white">
          {unreadCount}
        </div>
      )}
    </>
  );
};

export default AlertBadge;
