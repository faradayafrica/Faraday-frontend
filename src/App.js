import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute.jsx';

import Qfeed from './routes/Qfeed.jsx';
import Courses from './routes/Courses';
import Direct from './routes/Direct';
import Notification from './components/Notification';
import Profile from './routes/Profile';
import EditProfile from './components/profile/EditProfile.jsx';

import SideNav from './components/SideNav';
import Body from './components/styledComponents/Body';
import Post from './components/Post';
import NotFound from './routes/NotFound';
import Explore from './components/other pages/explore';
import Bookmarks from './components/other pages/bookmarks';
import Setting from './components/other pages/setting';
import Sponsors from './components/other pages/sponsors';
import SavedCourses from './components/other pages/saved-courses';
import LoginForm from './components/loginForm';
import SignUpForm from './components/signUpForm';
import ConfirmEmail from './components/other pages/signup process/confirmEmail.jsx';
import AddSchoolDetail from './components/other pages/signup process/addSchoolDetail';
import PersonalData from './components/other pages/signup process/personalData';
import TermsAndCondition from './components/other pages/termsAndCondition.jsx';
import PrivacyPolicy from './components/other pages/privacyPolicy';
import Logout from './components/styledComponents/logout.jsx';
import './App.css';
import MobileSideNav from './components/MobileSideNav.jsx';

class App extends React.Component {  
  render() {
    return (
      <BrowserRouter>
        <div className=' bg-red-50 max-w-[1024px] p-0 mx-auto flex'>
          <SideNav/>
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
            <ProtectedRoute path='/saved-courses' component={SavedCourses} />
            <ProtectedRoute path='/setting' component={Setting} />
            <ProtectedRoute path='/sponsors' component={Sponsors} />
            <ProtectedRoute path='/bookmarks' component={Bookmarks} />
            <ProtectedRoute path='/explore' component={Explore} />
            <ProtectedRoute path='/courses' component={Courses} />
            {/* <ProtectedRoute
              path='/profile'
              render={props => <Profile user={this.state.user} {...props} />}
            /> */}
            {/* <ProtectedRoute
              path='/qfeed'
              render={(props) => <Qfeed user={this.state.user} {...props} />}
            /> */}
            <ProtectedRoute path='/qfeed' render={props => <Qfeed />} />
            <ProtectedRoute path='/direct' component={Direct} />
            <ProtectedRoute path='/notification' component={Notification} />
            <ProtectedRoute path='/post' component={Post} />
            {/* <ProtectedRoute path='/:username' render={props => <Profile />} /> */}
            <ProtectedRoute path='/me/:username' component={Profile} />
            <ProtectedRoute
              path='/editprofile/:username'
              component={EditProfile}
            />
            <Route path='/not-found' component={NotFound} />
            <ProtectedRoute path='/' exact component={Qfeed} />
            <Redirect push to='/not-found' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
