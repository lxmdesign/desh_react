import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getGameInfo} from '../service/RaceDao';
import '../styles/GameInfo.css';
import Clamp from '../utils/Clamp';

export default class GameInfo extends Component {

    state = {
        game: {}
    };

    componentDidMount() {

        const body = {gameId: 91};
        document.title = '扑客';
        getGameInfo(body, data => {
            console.log('GameInfo', data)
            this.setState({
                player: data
            })
        }, err => {

        })
    }


    render() {
        return (
            <div className="container">

                <div className="top-race">
                    <img className="img-logo"
                        src="" alt="Big"/>

                    <div className="race-info">
                        <p className="title">无限注德州扑克锦标赛#</p>

                    </div>

                </div>


            </div>
        )
    };
}
