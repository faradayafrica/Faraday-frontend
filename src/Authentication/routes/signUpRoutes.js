import SignUp from "../pages/SignUp";
import ConfirmEmail from "../pages/SignUp/ConfirmEmail";
import AddSchoolDetail from "../pages/SignUp/AddSchoolDetail";
import PersonalData from "../pages/SignUp/PersonalData";
import TermsAndCondition from "../pages/other pages/termsAndCondition";
import PrivacyPolicy from "../pages/other pages/privacyPolicy";

export const signUp_route_group = [
  { path: "/signup", component: SignUp },
  { path: "/confirm-email", component: ConfirmEmail },
  { path: "/update-school-detail", component: AddSchoolDetail },
  { path: "/update-personal-data", component: PersonalData },
  { path: "/terms-and-condition", component: TermsAndCondition },
  { path: "/privacy-policy", component: PrivacyPolicy },
];
