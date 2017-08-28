import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getGameInfo, getRankInfo, setLang} from '../service/RaceDao';
import '../styles/GameInfo.css';
import Time from 'react-time-format';
import Clamp from '../utils/Clamp';
import {isEmptyObject} from '../service/utils';

export default class GameInfo extends Component {

    state = {
        game: {},
        items: []
    };

    componentDidMount() {

        const {id, lang} = this.props.match.params;
        setLang(lang);

        const body = {gameId: id};
        document.title = '扑客';
        getGameInfo(body, data => {
            console.log('GameInfo', data)
            this.setState({
                game: data
            })
        }, err => {

        })
    }

    render() {

        const {
            race, ranks
        } = this.state.game;

        if (isEmptyObject(race))
            return <div/>;
        return (
            <div className="container">

                <div className="top-race">
                    <img className="img-logo"
                         src={race.big_logo} alt="Big"/>

                    <div className="race-info">
                        <p className="title">{race.name}</p>
                        <div className="div_flex"/>

                        <span className="race-info-time"><Time value={race.begin_date} format="YYYY:MM:DD" />-<Time value={race.end_date} format="YYYY:MM:DD" /></span>
                        <span className="race-info-location "> {race.location}</span>

                    </div>

                </div>
                <div className="line"/>

                <div className="race-massage">
                    <div className="race-buy">
                        <span>买入</span>
                        <span>{race.ticket_price}</span>
                    </div>
                    <div className="race-prize">
                        <span>奖池</span>
                        <span>{race.prize}</span>
                    </div>
                    <div className="race-person">
                        <span>参赛人数</span>
                        <span>{race.participants}人</span>
                    </div>
                </div>

                <div>
                    <table className="race-table">
                        <thead>
                        <tr>
                            <th>名次</th>
                            <th>参赛人</th>
                            <th>奖金</th>
                            <th>积分</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ranks.map((item, key) => {
                            return <tr >
                                <td>{item.ranking}</td>
                                <td className="table-name">{item.player.name}</td>
                                <td>¥{item.earning}</td>
                                <td>{item.score}</td>
                            </tr>
                        })}

                        </tbody>
                    </table>
                </div>

            </div>
        )
    };
}
