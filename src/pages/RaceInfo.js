/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import {getRaceInfo, setLang, getSubRace} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
import I18n from '../service/I18n';
import {modify} from '../service/utils';
import imgMenu from '../assets/images/Triangle@3x.png';
import moment from 'moment';

export default class RaceInfo extends Component {

    state = {
        dataStr: '',
        data: {},
        schedules:[],
        blinds:[],
        menu: 0,
        selectInfo:0,
        selectInfo_menu:0,
        subItems: []
    };

    componentDidMount() {
        const {id, lang} = this.props.match.params;
        setLang(lang);
        const body = {raceId: id};

        getRaceInfo(body, data => {
            console.log('RaceInfo', data)
            this.setState({
                data: data
            });
            const {name} = data.race;
            document.title = name;
        }, err => {

        });


        getSubRace(body, data => {
            this.setState({
                subItems: data.items
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


                        <div className="menu-fixed">
                            <div className="menu">
                                <div className="menu1" onClick={() => {
                                    this.setState({
                                        menu: 0
                                    })
                                }}>
                                    <span className='txtMenu imgMe'>简介</span>
                                    {/*<img src={imgMenu} className="imgMe"/>*/}
                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 1
                                         })
                                     }}>
                                    <span className='txtMenu imgMe'>主赛信息</span>

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

                    </div>

                    {this.selectMenu()}

                </div>

            );
        }
    }
    //导航信息选择显示页面
    selectMenu = () => {
        const {
            name, location, status, ticket_status, begin_date, end_date, logo,
            schedules, description, Blind, Ranks
        } = this.state.data.race;

        switch (this.state.menu) {
            case 0:
                return this.introView(description);
            case 1:
                return this.mainInfoView();
            case 2:
                return this.sideView();
        }
    }

    //主赛信息选择显示页面
    select_mainInfoMenu = () => {
        switch (this.state.selectInfo_menu) {
            case 0:
                return this.scheduleView();
            case 1:
                return this.blindStructureView();
        }
    }

    //赛程格式化
    scheduleMessage = (schedule) => {
        if (schedule.indexOf('|') == -1) {
            return this.scheduleMessageOne(schedule);
        } else {

            var sch = schedule.split('|')

            return this.scheduleMessageTwo(sch[0],sch[1]);

        }
        //
        // console.log('sch:'+sch)
        // return sch;
    }
    scheduleMessageOne=(schedule)=>{
        return <span>{schedule}</span>
    }
    scheduleMessageTwo = (schedule1,schedule2)=>{
        return <span>{schedule1}<br/>{schedule2}</span>
    }

    introView = (description) => {

        return <div className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}></div>;
    };

    mainInfoView = () => {

        const {selectInfo,selectInfo_menu} = this.state;
        return <div className="infoView">
            <div className="infoView-nav">
                <div className={selectInfo === 0 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectInfo:0,
                        selectInfo_menu:0
                    })
                }}>
                    <span>赛程表</span>
                </div>
                <div className="clo_line"/>
                <div className={selectInfo === 1 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectInfo:1,
                        selectInfo_menu:1
                    })
                }}>
                    <div>盲注结构</div>
                </div>
            </div>

            {this.select_mainInfoMenu()}
        </div>
    };


    scheduleView=()=>{
        const {
            schedules
        } = this.state.data;

        return <div className="schedule">
            <table>
                <thead className="schedule-nav">
                    <span>赛程</span>
                    <span>日期</span>
                    <span>开始时间</span>
                </thead>
                <tbody>
                {schedules.map(schedule =>{

                    console.log('list',schedule)
                    return <tr>
                        <td>
                            {this.scheduleMessage(schedule.schedule)}
                            <span><Time value={schedule.begin_time} format="MM-DD" /></span>
                            <span><Time value={schedule.begin_time} format="hh:mm" /></span>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    }

    blindStructureView=()=>{

    }


    sideView = () => {

        const {subItems} = this.state;


        return (
            <div>
                {subItems.map((item, i) => <SideItem key={i} item={item}/>)}

            </div>
        )
    };


    render() {
        return (
            <div className='content'>

                {this.content()}

            </div>
        )
    };
}


class SideItem extends Component {

    render() {
        const {item} = this.props;
        return ( <div className="sideView">
            <div className="sideTime">
                <span className="txtMonth">
                    {moment(item.begin_date).format('YYYY-MM')}
                </span>

                <span className="txtDay">
                    {item.days} Days
                </span>

            </div>

            <div className="sideInfo">
                <span className="sideTitle">{item.name}</span>
                <span className="sideStart">起始时间:{item.begin_time}</span>
                <span className="sidePrize">{item.ticket_price}</span>

            </div>

        </div>)
    }
}