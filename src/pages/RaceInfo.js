/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {getRaceInfo, setLang, getSubRace, getLang} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
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
        subItems: [],
        class_name1:'txtMenu imgMe',
        class_name2:'txtMenu',
        class_name3:'txtMenu'
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
                                        menu: 0,
                                        class_name1 :'txtMenu'+' '+'imgMe',
                                        class_name2 :'txtMenu',
                                        class_name3 :'txtMenu'
                                    })
                                }}>
                                    <span className={this.state.class_name1}>简介</span>
                                    {/*<img src={imgMenu} className="imgMe"/>*/}
                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 1,
                                             class_name1 :'txtMenu',
                                             class_name2 :this.state.class_name2+' '+'imgMe',
                                             class_name3 :'txtMenu'
                                         })
                                     }}>
                                    <span className={this.state.class_name2}>主赛信息</span>

                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 2,
                                             class_name1 :'txtMenu',
                                             class_name2 :'txtMenu',
                                             class_name3 :this.state.class_name3 +' '+'imgMe'
                                         })
                                     }}>
                                    <span className={this.state.class_name3}>边塞信息</span>

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
                console.log(this.state.class_name)
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
    }

    scheduleMessageOne=(schedule)=>{
        return <td>{schedule}</td>
    }
    scheduleMessageTwo = (schedule1,schedule2)=>{
        return <td>{schedule1}<br/>{schedule2}</td>
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

                <div className="schedule-nav">
                    <div>赛程</div>
                    <div>日期</div>
                    <div>开始时间</div>
                </div>
                <div className="schedule-items">
                {schedules.map((schedule,i) =>{

                    return <div className='schedule-info'>
                        <span>
                             {this.scheduleMessage(schedule.schedule)}
                        </span>

                        <span>
                            {moment(schedule.begin_time).format('MM-DD')}
                        </span>
                        <span>
                            {moment(schedule.begin_time).format('hh:mm')}
                        </span>

                    </div>
                })}
                </div>

        </div>
    }

    blindStructureView=()=>{
        const {
            blinds
        } = this.state.data;
        return <div className="blindStructure">
            <div className="blindStructure-nav">
                <span>级别</span>
                <span>盲注</span>
                <span>前注</span>
                <span>时间</span>
            </div>
            <div>
                {blinds.map((blind, i) => <BlindStructureInfo key={i} blind={blind}/>)}

            </div>

        </div>
    }



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

            <div className="sideInfo">
                <span className="sideTitle">{item.name}</span>
                <span className="sideStart">起始时间:{item.begin_time}</span>
                <span className="sidePrize">{item.ticket_price}</span>

            </div>

        </div>)
    }
}

class BlindStructureInfo extends Component {

    render() {
        const {blind} = this.props;
        return (blind.blind_type === "blind_struct"? <div  className="blindStructure-info">
            <div className="info-class">
                {blind.level}
            </div>

            <div className="info-blinds">
                {blind.small_blind}-{blind.big_blind}
            </div>
            <div className="info-beforeNote">
                {blind.ante}
            </div>

            <div className="info-time">
                {blind.race_time}
            </div>

        </div>:<div className="info-content">
                {blind.content}
            </div>)
    }
}