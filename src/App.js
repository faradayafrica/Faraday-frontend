import './App.css';
import React from 'react';
import Qfeed from './components/Qfeed.jsx';

import { BrowserRouter } from 'react-router-dom';
import Courses from './components/Courses';
import Connect from './components/Connect';
import Notification from './components/Notification';

import { Route, Switch, Redirect } from 'react-router-dom';
import SideNav from './components/SideNav';
import Body from './components/styledComponents/Body';
import Post from './components/Post';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Body className='row'>
          <SideNav />
          <Switch>
            <Route path='/Courses' component={Courses} />
            <Route path='/Qfeed' component={Qfeed} />
            <Route path='/Connect' component={Connect} />
            <Route path='/Notification' component={Notification} />
            <Route path='/Post' component={Post} />
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
