import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getGameInfo} from '../service/RaceDao';
import '../styles/PlayerInfo.css';

export default class GameInfo extends Component {

    state = {
        game: {}
    };

    componentDidMount() {
        const body = {playerId: 91};
        document.title = '扑客';
        getGameInfo(body, data => {
            console.log('GameInfo', data)
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
        if (!this.isEmptyObject(this.state.game)) {
            const {
                title, type, date, source_type, source, image, image_thumb,
                top, description
            } = this.state.game;
            return (
                <div className="Game">
                    <div className='Game-head'>
                        <div className='Game-head-top'>
                            <img src=''/>
                            <h2></h2>

                        </div>
                    </div>
                    <div className='Game-body'>

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
