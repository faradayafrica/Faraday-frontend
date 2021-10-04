import './App.css';
import Qfeed from './components/Qfeed.jsx';
import Body from './components/styledComponents/Body';
import SideNav from './components/SideNav.jsx';
import Trends from './components/Trends';

function App() {
  return (
    <Body className='row'>
      <SideNav />
      <Qfeed />
      <Trends />
    </Body>
  );
}

export default App;
