import { useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import auth from "../services/authService";

const Logout = ({ handleClearCache, clearCache }) => {
  useEffect(() => {
    handleClearCache();
    auth.logout();
  });

  if (clearCache) return <Redirect to={"/login"} />;
  return <div>We will miss you</div>;
};

export default Logout;
