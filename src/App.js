import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute.jsx';

import Qfeed from './components/Qfeed.jsx';
import Courses from './components/Courses';
import Connect from './components/Connect';
import Notification from './components/Notification';
// import Profile from './components/other pages/profile';

import SideNav from './components/SideNav';
import Body from './components/styledComponents/Body';
import Post from './components/Post';
import NotFound from './components/NotFound';
import Explore from './components/other pages/explore';
import Bookmarks from './components/other pages/bookmarks';
import Setting from './components/other pages/setting';
import Sponsors from './components/other pages/sponsors';
import SavedCourses from './components/other pages/saved-courses';
import MobileSidenav from './components/other pages/mobileSidenav';
import LoginForm from './components/loginForm';
import SignUpForm from './components/signUpForm';
import ConfirmEmail from './components/other pages/signup process/confirmEmail.jsx';
import AddSchoolDetail from './components/other pages/signup process/addSchoolDetail';
import PersonalData from './components/other pages/signup process/personalData';
import TermsAndCondition from './components/other pages/termsAndCondition.jsx';
import PrivacyPolicy from './components/other pages/privacyPolicy';
import Logout from './components/styledComponents/logout.jsx';
import auth from './services/authService.js';
import './App.css';

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    // console.log(user);
    this.setState({ user });
    // console.log(this.state.user);
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Body className='row'>
          <SideNav user={this.state.user} />
          <MobileSidenav user={this.state.user} />
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
            {/* <ProtectedRoute path='/profile' component={Profile}/> */}
            <ProtectedRoute
              path='/qfeed'
              render={props => <Qfeed user={this.state.user} {...props} />}
            />
            <ProtectedRoute path='/connect' component={Connect} />
            <ProtectedRoute path='/notification' component={Notification} />
            <ProtectedRoute path='/post' component={Post} />
            <Route path='/not-found' component={NotFound} />
            <ProtectedRoute path='/' exact component={Courses} />
            <Redirect push to='not-found' />
          </Switch>
        </Body>
      </BrowserRouter>
    );
  }
}

export default App;
