import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Qfeed from './components/Qfeed.jsx';
import jwtDecode from "jwt-decode"
import Courses from './components/Courses';
import Connect from './components/Connect';
import Notification from './components/Notification';
import Profile from './components/other pages/profile';

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
import Logout from './components/styledComponents/logout.jsx';
import './App.css';

class App extends React.Component {
  state ={};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token')
      const user = jwtDecode(jwt);
      this.setState({ user })
    }
    catch (ex) {

    }
  }

  render() {
    return (
      <BrowserRouter>
        <Body className='row'>
          <SideNav  user={this.state.user}/>
          <MobileSidenav user={this.state.user}/>
          <Switch>
            <Route path='/signup' component={SignUpForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/saved-courses' component={SavedCourses} />
            <Route path='/setting' component={Setting} />
            <Route path='/sponsors' component={Sponsors} />
            <Route path='/bookmarks' component={Bookmarks} />
            <Route path='/explore' component={Explore} />
            <Route path='/courses' component={Courses} />
            <Route path='/profile' component={Profile} />
            {/* <Route path='/qfeed' component={Qfeed} user={this.state.user}/> */}
            <Route
            path='/qfeed'
            render={props => (
              <Qfeed
                user={this.state.user}
                {...props}
              />
            )}
          />
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
