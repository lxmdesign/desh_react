import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getPlayerInfo} from '../service/RaceDao';
import Time from 'react-time-format'
import {getRankInfo} from '../service/RaceDao';
import '../styles/PlayerInfo.css';
import 返回图标 from '../assets/images/返回图标.png';
import Group2x from '../assets/images/Group@2x.png';
import Group from '../assets/images/Group.png';

export default class PlayerInfo extends Component {

    state = {
        player: {},
        items: []
    };

    componentDidMount() {
        const body = {playerId: '2bd77416'};
        document.title = '扑客';
        getPlayerInfo(body, data => {
            console.log('PlayerInfo', data)
            this.setState({
                player: data
            })
        }, err => {

        })
        getRankInfo(body, data => {
            console.log('RankInfo', data)
            this.setState({
                items: data
            })
        }, err => {

        })
    }

    desc = (description) => {
        var des = markdown(description)
        return {__html:des}
    }

    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
    //click事件


    content = () => {
        if (!this.isEmptyObject(this.state.player)) {
            const {
                avatar, country, dpi_total_score, dpi_total_earning, followed, id, memo,
                name, ranking
            } = this.state.player;
            const {
             items
            } = this.state;

            return (
                <div className="player">
                    <div className='player-head'>
                        <div className='player-head-top'>
                            {/*<img alt='' src={返回图标}/>*/}
                            {/*<img alt='' src={Group2x}/>*/}
                            <h2>国内排行</h2>
                            {/*<img alt='' src={Group}/>*/}
                        </div>
                        <img className='personImg' src=''/>
                        <span className="personName">{name}</span><br/>
                        <span className="country">{country}</span>

                        <div className="player-head-nav">
                            <div className="nav-rank">
                                <span>{ranking}</span>
                                <span>名次</span>
                            </div>
                            <div className="nav-score">
                                <span>{dpi_total_score}</span>
                                <span>积分</span>
                            </div>
                            <div className="nav-prize">
                                <span>¥{dpi_total_earning}</span>
                                <span>奖金</span>
                            </div>
                        </div>

                    </div>

                    <div className='player-body'>
                        <table >
                            <tbody>
                            {items.map(item =>{
                                const {race,rank} = item;

                                console.log('list',race,rank)
                                return <tr>
                                    <td>
                                        <a>
                                            <div className="table-header">
                                                <span>{race.name}</span>
                                                <span>{rank.ranking}</span>
                                            </div>
                                            <div className="table-detail">
                                                <div className="table-num">
                                                    <span>买入</span>
                                                    <span>¥{race.ticket_price}</span>
                                                </div>
                                                <div className="table-person">
                                                    <span>参赛人数</span>
                                                    <span>{race.participants}</span>
                                                </div>
                                                <div className="table-prize">
                                                    <span>奖金</span>
                                                    <span>¥{rank.earning}</span>
                                                </div>
                                                <div className="table-score">
                                                    <span>积分</span>
                                                    <span>{rank.score}</span>
                                                </div>
                                            </div>
                                            <div className="table-time"><Time value={race.begin_date} format="YYYY:MM:DD" />-<Time value={race.end_date} format="YYYY:MM:DD" /></div>
                                            <div className="table-location">{race.location}</div>
                                        </a>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                      </table>
                    </div>

                </div>

            );
        }

    }


    render() {
        return (
            <div className='content'>

                {this.content()}

            </div>
        )
    };
}
