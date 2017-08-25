import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getPlayerInfo} from '../service/RaceDao';
import '../styles/PlayerInfo.css';

export default class PlayerInfo extends Component {

    state = {
        player: {}
    };

    componentDidMount() {
        const body = {playerId: 91};
        document.title = '扑客';
        getPlayerInfo(body, data => {
            console.log('PlayerInfo', data)
            this.setState({
                player: data
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
            return (
                <div className="Player">
                    <div className='Player-head'>
                        <div className='Player-head-top'>
                            <img alt='' src='../assets/images/返回图标.png'/>
                            <img alt='' src='../assets/images/Group@2x.png'/>
                            <h2>国内排行</h2>
                            <img alt='' src='../assets/images/Group.png'/>
                        </div>
                    </div>
                    <div className='Player-body'>

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
