/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getRaceInfo, setLang} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
import I18n from '../service/I18n';
import {modify} from '../service/utils';
import imgMenu from '../assets/images/Triangle@3x.png';

export default class RaceInfo extends Component {

    state = {
        dataStr: '',
        data: {},
        menu: 0
    };

    componentDidMount() {
        const {id, lang} = this.props.match.params;
        setLang(lang);
        const body = {raceId: id};
        document.title = '扑客';
        getRaceInfo(body, data => {
            console.log('RaceInfo', data)
            this.setState({
                data: data
            })
        }, err => {

        })
    }

    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }

    //html to markDown
    desc = (description) => {
        var des = markdown(description)
        return {__html: des}
    }
    //click事件


    content = () => {
        if (!this.isEmptyObject(this.state.data.race)) {
            const {
                name, location, status, ticket_status, begin_date, end_date, logo,
                schedules, description, Blind, Ranks
            } = this.state.data.race;
            const navs = [{
                exact: true,
                name: I18n.t('load_ipnone'),
                path: "/",
                activeClassName: "active"

            }, {
                name: "主赛信息",
                path: "/",
                activeClassName: ""
            }, {
                name: "边赛信息",
                path: "/",
                activeClassName: ""
            }];

            return (
                <div className='content'>
                    {/*Head*/}
                    <div className="mainNav">
                        <div className="ul-1">
                            <div className="title">{name}</div>
                            <img src={logo}/>
                            <ul className="ul-1-2">
                                <li><Time value={begin_date} format="YYYY:MM:DD"/>—<Time value={end_date}
                                                                                         format="YYYY:MM:DD"/></li>
                                <li>{location}</li>
                                <li className="li-4"><span>{status}</span><span>{ticket_status}</span></li>
                            </ul>
                        </div>


                        <div className="menu">
                            <div className="menu1" onClick={() => {
                                this.setState({
                                    menu: 0
                                })
                            }}>
                                <span className='txtMenu'>简介</span>
                                {/*<img src={imgMenu} className="imgMe"/>*/}
                            </div>
                            <div className="menu1"
                                 onClick={() => {
                                     this.setState({
                                         menu: 1
                                     })
                                 }}>
                                <span className='txtMenu'>主赛信息</span>

                            </div>
                            <div className="menu1"
                                 onClick={() => {
                                     this.setState({
                                         menu: 2
                                     })
                                 }}>
                                <span className='txtMenu'>边塞信息</span>

                            </div>

                        </div>

                    </div>

                    {this.selectMenu()}

                </div>

            );
        }
    }
    selectMenu = ()=>{
        const {
            name, location, status, ticket_status, begin_date, end_date, logo,
            schedules, description, Blind, Ranks
        } = this.state.data.race;

        switch (this.state.menu){
            case 0:
                return this.introView(description);
            case 1:
                return this.infoView();
            case 2:
                return this.infoView();
        }
    }

    introView = (description) => {

        return <div className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}></div>;
    };

    infoView = () => {
        return <div className="infoView"> </div>
    };


    render() {
        return (
            <div className='content'>

                {this.content()}

            </div>
        )
    };
}