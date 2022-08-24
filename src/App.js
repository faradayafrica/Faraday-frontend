import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Qfeed from "./routes/Qfeed.jsx";
import Notification from "./routes/Notification";
import Profile from "./routes/Profile";
import MobileSideNav from "./components/styledComponents/MobileSideNav.jsx";
import PostPage from "./components/qfeedComponents/PostPage.jsx";
import NotFound from "./routes/NotFound";
import LoginForm from "./routes/LoginForm";
import SignUpForm from "./routes/SignUpForm";
import ConfirmEmail from "./routes/ConfirmEmail";
import AddSchoolDetail from "./routes/AddSchoolDetail";
import PersonalData from "./routes/PersonalData";
import TermsAndCondition from "./components/other pages/termsAndCondition.jsx";
import PrivacyPolicy from "./components/other pages/privacyPolicy";
import Logout from "./routes/Logout.jsx";
import "./styles/App.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext";


const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Toaster position='top-center' reverseOrder={false} />
        <div className='text-faraday-night max-w-[1024px] p-0 mx-auto flex'>
          <MobileSideNav />
          <Switch>
            <Route path='/signup' component={SignUpForm} />
            <Route path='/confirm-email' component={ConfirmEmail} />
            <Route path='/update-school-detail' component={AddSchoolDetail} />
            <Route path='/update-personal-data' component={PersonalData} />
            <Route path='/terms-and-condition' component={TermsAndCondition} />
            <Route path='/privacy-policy' component={PrivacyPolicy} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <ProtectedRoute
              path='/qfeed'
              render={(props) => <Qfeed {...props} />}
            />
            <ProtectedRoute
              path='/post'
              render={(props) => <PostPage {...props} />}
            />
            <ProtectedRoute path='/notification' component={Notification} />
            <ProtectedRoute
              path='/me/:username'
              render={(props) => <Profile {...props} />}
            />
            <Route path='/not-found' component={NotFound} />
            <ProtectedRoute path='/' exact component={Qfeed} />
            <Redirect push to='/not-found' />
          </Switch>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
