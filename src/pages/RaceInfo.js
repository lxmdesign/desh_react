/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {getRaceInfo} from '../service/RaceDao';
import '../styles/RaceInfo.css';

export default class RaceInfo extends Component {

    state = {
        dataStr: '',
        data: {}
    };

    componentDidMount() {
        const body = {raceId: 91};
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

    desc = (description) => {
        var des = markdown(description)
        return {__html:des}
    }


    content = () => {
        if (!this.isEmptyObject(this.state.data.race)) {
            const navs = [
                {name: '简介', path: "/"},
                {name: '主赛信息', path: "/"},
                {name: '边塞信息', path: "/"}
            ];
            const {
                name, location, status, ticket_status, begin_date, end_date, logo, RaceIntro, MainInformation, SideInformation
                , mainMark, description, Blind, Ranks
            } = this.state.data.race;
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
                                        <Link className="gameActive" to={value.path}>
                                            {value.name}
                                        </Link>
                                    </li>))
                            }
                            {/*<li onClick="changeClass(0)" >简介</li>*/}
                            {/*<li onClick='changeClass(1)' >主赛信息</li>*/}
                            {/*<li onClick='changeClass(2)' >边塞信息</li>*/}
                        </ul>
                    </div>

                    <div class="introduceGame"  dangerouslySetInnerHTML={this.desc(description)}></div>
                    {/**/}
                    {/*<div className="mainGame">*/}
                    {/*<ul className="gameList">*/}
                    {/*<li onClick='gameClass(0)' >{description}</li>*/}
                    {/*<li onClick='gameClass(1)' >{Blind} </li>*/}
                    {/*<li onClick='gameClass(2)' >{Ranks}</li>*/}
                    {/*</ul>*/}
                    {/*</div>*/}
                    {/*info*/}
                    <div in>

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