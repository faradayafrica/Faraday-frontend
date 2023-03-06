import { login_route_group } from "./loginRoutes";
import { signUp_route_group } from "./signUpRoutes";

export const auth_route_group = [...login_route_group, ...signUp_route_group];
