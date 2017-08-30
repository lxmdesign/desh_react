/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {getRaceInfo, setLang, getSubRace, getLang} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
import I18n from '../service/I18n';
import {modify} from '../service/utils';
import imgMenu from '../assets/images/Triangle@3x.png';
import moment from 'moment';
import {withRouter} from "react-router-dom";

export default class RaceInfo extends Component {

    state = {
        dataStr: '',
        data: {},
        menu: 0,
        selectInfo: 0,
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

                    {this.selectMenu()}

                </div>

            );
        }
    }
    selectMenu = () => {
        const {
            name, location, status, ticket_status, begin_date, end_date, logo,
            schedules, description, Blind, Ranks
        } = this.state.data.race;

        switch (this.state.menu) {
            case 0:
                return this.introView(description);
            case 1:
                return this.infoView();
            case 2:
                return this.sideView();
        }
    }

    introView = (description) => {

        return <div className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}></div>;
    };

    infoView = () => {

        const {selectInfo} = this.state;
        return <div className="infoView">
            <div className="infoView-nav">
                <div className={selectInfo === 0 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectInfo: 0
                    })
                }}>
                    <span>赛程表</span>
                </div>
                <div className="clo_line"/>
                <div className={selectInfo === 1 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectInfo: 1
                    })
                }}>
                    <div>盲注结构</div>
                </div>
            </div>
        </div>
    };


    sideView = () => {

        const {subItems} = this.state;
        const {params} = this.props.match;

        return (
            <div>
                {subItems.map((item, i) => <SideItem key={i} item={item}
                                                     history={this.props.history}
                                                     params={params}/>)}

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
        const {item, params} = this.props;
        return ( <div className="sideView" onClick={() => {
            this.props.history.push(`/race/${params.id}/${params.lang}/sidedetail/${item.race_id}`)

        }}>
            <div className="sideTime">
                <span className="txtMonth">
                    {moment(item.begin_date).format('YYYY-MM')}
                </span>

                <span className="txtDay">
                    {item.days} Days
                </span>

            </div>

            <div className="sideTime">
                <span className="sideTitle">{item.name}</span>
                <span className="sideStart">起始时间:{item.begin_time}</span>
                <span className="sidePrize">{item.ticket_price}</span>

            </div>

        </div>)
    }
}