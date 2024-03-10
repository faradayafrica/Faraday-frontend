import Login from "../pages/Login";
import ForgotPassword from "../pages/Login/forgot-password/ForgotPassword";
import ConfirmAccount from "../pages/Login/forgot-password/ConfirmAccount";
import ResetPassword from "../pages/Login/forgot-password/ResetPassword";
import CreateUsername from "../pages/other pages/create-username";

export const login_route_group = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/confirm-account", component: ConfirmAccount },
  { path: "/reset-password", component: ResetPassword },
  { path: "/create-username", component: CreateUsername },
];
