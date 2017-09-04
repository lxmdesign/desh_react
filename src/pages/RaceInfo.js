/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {getRaceInfo, setLang, getSubRace} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
import moment from 'moment';
import I18n from '../service/I18n';
import RaceBlindList from '../components/RaceBlindList';


export default class RaceInfo extends Component {

    state = {
        data: {},
        menu: 0,
        subItems: [],
        class_name1: 'txtMenu imgMe',
        class_name2: 'txtMenu',
        class_name3: 'txtMenu'
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
                name, location,begin_date, end_date, logo
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
                                <li className="li-4">
                                    {/*<span>{raceStatusConvert(status)}</span><span>{ticketStatusConvert(ticket_status)}</span>*/}
                                </li>
                            </ul>
                        </div>

                        <div className="fixed">
                            <div className="menu">
                                <div className="menu1" onClick={() => {
                                    this.setState({
                                        menu: 0,
                                        class_name1: 'txtMenu' + ' ' + 'imgMe',
                                        class_name2: 'txtMenu',
                                        class_name3: 'txtMenu'
                                    })
                                }}>
                                    <span className={this.state.class_name1}>{I18n.t('Introduction')}</span>
                                    {/*<img src={imgMenu} className="imgMe"/>*/}
                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 1,
                                             class_name1: 'txtMenu',
                                             class_name2: this.state.class_name2 + ' ' + 'imgMe',
                                             class_name3: 'txtMenu'
                                         })
                                     }}>
                                    <span className={this.state.class_name2}>{I18n.t('MainInformation')}</span>

                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 2,
                                             class_name1: 'txtMenu',
                                             class_name2: 'txtMenu',
                                             class_name3: this.state.class_name3 + ' ' + 'imgMe'
                                         })
                                     }}>
                                    <span className={this.state.class_name3}>{I18n.t('SideInformation')}</span>

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
        const {description} = this.state.data.race;

        switch (this.state.menu) {
            case 0:
                console.log(this.state.class_name)
                return this.introView(description);
            case 1:

                return this.mainInfoView();
            case 2:

                return this.sideView();
        }
    };


    introView = (description) => {

        return <div className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}></div>;
    };

    mainInfoView = () => {
        const {schedules, blinds, ranks} = this.state.data;
        return <RaceBlindList
            ranks={ranks}
            schedules={schedules}
            blinds={blinds}/>

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
        const {params} = this.props.match;
        return (
            <div className='content'>

                {this.content()}

                <footer><a onClick={() => {
                    this.props.history.push(`/race/${params.id}/${params.lang}/loadAPP`)
                }}>

                    {I18n.t('app_plant')}<span>{I18n.t('load_app')}</span></a></footer>

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
            <div className="dark"/>

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
                <span className="sideStart">{I18n.t('start_time')}:{item.begin_time}</span>
                <span className="sidePrize">{item.ticket_price}</span>

            </div>

        </div>)
    }
}

