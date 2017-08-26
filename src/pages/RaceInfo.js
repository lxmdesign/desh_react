/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getRaceInfo,setLang} from '../service/RaceDao';
import '../styles/RaceInfo.css';
import I18n from '../service/I18n';

export default class RaceInfo extends Component {

    state = {
        dataStr: '',
        data: {}
    };

    componentDidMount() {
        const {id,lang} = this.props.match.params;
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
        return {__html:des}
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
                path: "/"

            }, {
                name: "主赛信息",
                path: "/"
            }, {
                name: "边赛信息",
                path: "/"
            }];

            return (
                <div className='content'>
                    {/*Head*/}
                    <div className="mainNav">
                        <div className="ul-1">
                            <div className="title">{name}</div>
                            <img src={logo}/>
                            <ul className="ul-1-2">
                                <li>{begin_date}—{end_date}</li>
                                <li>{location}</li>
                                <li className="li-4"><span>{status}</span><span>{ticket_status}</span></li>
                            </ul>
                        </div>
                        <ul className="ul-2" style={{margin: 0}}>
                            {
                                navs.map((value, key) =>
                                    (<li key={key}>
                                        <NavLink className="navLink" activeClassName="active" to={value.path} >
                                            {value.name}
                                        </NavLink>
                                    </li>))
                            }
                            {/*<li onClick={this.changeClass(0)} >简介</li>*/}
                            {/*<li onClick={this.changeClass(1)} >主赛信息</li>*/}
                            {/*<li onClick={this.changeClass(2)} >边塞信息</li>*/}
                        </ul>
                    </div>

                    <div className="introduceGame"  dangerouslySetInnerHTML={this.desc(description)}></div>
                    {/*<div className="mainGame"  dangerouslySetInnerHTML={this.desc(schedules)}></div>*/}

                    {/*info*/}

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