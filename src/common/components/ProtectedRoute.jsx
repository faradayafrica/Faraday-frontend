import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = auth.getCurrentUser();
        if (!user.email_verified) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
