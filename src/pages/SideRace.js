/**
 * Created by lorne on 2017/8/29.
 */
import '../styles/SideRace.css';
import React, {PureComponent} from 'react';
import {getSubInfo} from '../service/RaceDao'
import moment from 'moment';


export default class SideRace extends PureComponent {

    state = {
        data: {},
        selectBtn:0,
        selectBtn_menu:0
    };

    componentDidMount() {
        const {id, lang, subId} = this.props.match.params;
        const body = {
            raceId: id,
            subId: subId
        };

        getSubInfo(body, data => {
            console.log('sub', data)
            const {name} = data;
            document.title = name;
            this.setState({
                data: data
            })
        }, err => {

        })
    }


    render() {
        const {name, location, ticket_price, begin_date, end_date, participants, prize, blind} = this.state.data;
        return (<div className="sideRace">

            <div className="subInfo">
                <span className="title">{name}</span>
                <span
                    className="time">时间：{moment(begin_date).format('YYYY.MM.DD')}-{moment(end_date).format('YYYY.MM.DD')}</span>
                <span className="location">地点：{location}</span>

            </div>

            <div className="subInfo1">
                <span>金额：¥{prize}</span>
                <span>参赛人数：{participants}</span>
                <span>入场资格：{ticket_price}</span>
                <span>起始记分牌：{blind}</span>
            </div>

            <div className="sideRace-body">
                <div className="body-nav">
                    {this.mainInfoView()}
                </div>
            </div>
        </div>)
    }

    mainInfoView = () => {

        const {selectBtn,selectBtn_menu} = this.state;
        return <div className="infoView">
            <div className="infoView-nav">
                <div className={selectBtn === 0 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectBtn:0,
                        selectBtn_menu:0
                    })
                }}>
                    <span>赛程表</span>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === 1 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectBtn:1,
                        selectBtn_menu:1
                    })
                }}>
                    <div>盲注结构</div>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === 2 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectBtn:2,
                        selectBtn_menu:2
                    })
                }}>
                    <div>赛事结果</div>
                </div>
            </div>

            {this.select_mainInfoMenu()}
        </div>
    };



}