import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import RaceInfo from './pages/RaceInfo';
import NewsInfo from './pages/NewsInfo';
import PlayerInfo from './pages/PlayerInfo';
import GameInfo from './pages/GameInfo';
import SubRace from './pages/SideRace';
import Download from './pages/Download';
import PaySuccess from './pages/PaySuccess';
import PayFail from './pages/PayFail';

import SharePage from './pages/SharePage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Route exact path="/race/:id/:lang" component={RaceInfo}/>
                        {/*<Route path="/loadApp" component={Download}/>*/}
                    {/*</Route>*/}
                    <Route path="/race/:id/:lang/loadApp" component={Download}/>

                    <Route path="/news/:id/:lang" component={NewsInfo}/>
                    <Route path="/rankPlayer/:id/:lang" component={PlayerInfo}/>
                    <Route path="/rankGame/:id/:lang" component={GameInfo}/>
                    <Route path="/race/:id/:lang/sidedetail/:subId" component={SubRace}/>
                    <Route path="/pay/success" component={PaySuccess}/>
                    <Route path="/pay/pay/fail" component={PayFail}/>

                    <Route path="/sharePage" component={SharePage}/>




                </div>
            </Router>
        );
    }
}

export default App;


const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
