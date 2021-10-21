import './App.css';
import React from 'react';
import Qfeed from './components/Qfeed.jsx';

import { BrowserRouter } from 'react-router-dom';
import Courses from './components/Courses';
import Connect from './components/Connect';
import Notification from './components/Notification';
import Profile from './components/other pages/profile';

import { Route, Switch, Redirect } from 'react-router-dom';
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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Body className='row'>
          <SideNav />
          <MobileSidenav />
          <Switch>
            <Route path='/signup' component={SignUpForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/saved-courses' component={SavedCourses} />
            <Route path='/setting' component={Setting} />
            <Route path='/sponsors' component={Sponsors} />
            <Route path='/bookmarks' component={Bookmarks} />
            <Route path='/explore' component={Explore} />
            <Route path='/courses' component={Courses} />
            <Route path='/profile' component={Profile} />
            <Route path='/qfeed' component={Qfeed} />
            <Route path='/connect' component={Connect} />
            <Route path='/notification' component={Notification} />
            <Route path='/post' component={Post} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/' exact component={Courses} />
            <Redirect push to='not-found' />
          </Switch>
        </Body>
      </BrowserRouter>
    );
  }
}

export default App;
