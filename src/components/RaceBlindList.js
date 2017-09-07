/**
 * Created by lorne on 2017/8/30.
 */
import React, {PureComponent} from 'react';
import moment from 'moment';
import '../styles/RaceInfo.css';
import I18n from '../service/I18n';
import {isEmptyObject} from '../service/utils';


export default class RaceBlindList extends PureComponent {

    state = {
        selectBtn: 0,
        btns: []
    };

    render() {
        return (<div>
            {this.mainInfoView()}
        </div>)
    }


    btnActive = () => {
        const {selectBtn, btns} = this.state;
        if (btns.length === 1) {

            return (<div className="infoView-nav">
                <div className={selectBtn === btns[0] ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectBtn: btns[0]
                    })
                }}>
                    <span>{this._btnName(btns[0])}</span>
                </div>
            </div>)
        }
        if (btns.length === 2) {

            return (<div className="infoView-nav">
                <div className={selectBtn === btns[0] ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectBtn: btns[0]
                    })
                }}>
                    <span>{this._btnName(btns[0])}</span>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === btns[1] ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectBtn: btns[1]
                    })
                }}>
                    <span>{this._btnName(btns[1])}</span>
                </div>
            </div>)

        }

        if (btns.length === 3) {

            return (<div className="infoView-nav">
                <div className={selectBtn === 0 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectBtn: 0
                    })
                }}>
                    <span>{this._btnName(0)}</span>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === 1 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectBtn: 1
                    })
                }}>
                    <span>{this._btnName(1)}</span>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === 2 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({
                        selectBtn: 2
                    })
                }}>
                    <span>{this._btnName(2)}</span>
                </div>
            </div>);
        }


    };


    _btnName = (index) => {
        switch (index) {
            case 0:
                return I18n.t('Schedule');
            case 1:
                return I18n.t('Blind');
            case 2:
                return I18n.t('GameResult');
        }
    };

    componentDidMount() {
        const {schedules, blinds, ranks} = this.props;
        let btns = [];
        if (!isEmptyObject(schedules) && schedules.length > 0) {
            btns.push(0)
        }
        if (!isEmptyObject(blinds) && blinds.length > 0) {
            btns.push(1)
        }
        if (!isEmptyObject(ranks) && ranks.length > 0) {
            btns.push(2)
        }
        this.setState({
            selectBtn: btns[0],
            btns: btns
        })
    }

    mainInfoView = () => {


        return <div className="infoView">
            {this.btnActive()}

            {this.select_mainInfoMenu()}
        </div>
    };


    scheduleView = () => {
        const {
            schedules
        } = this.props;

        return <div className="schedule">

            <div className="schedule-nav">
                <div>{I18n.t('race_day')}</div>
                <div>{I18n.t('date')}</div>
                <div>{I18n.t('beginDate')}</div>
            </div>
            <div className="schedule-items">
                {schedules.map((schedule, i) => {

                    return <div className='schedule-info' key={i}>

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
    };

    blindStructureView = () => {
        const {
            blinds
        } = this.props;
        return <div className="blindStructure">
            <div className="blindStructure-nav">
                <span>{I18n.t('Level')}</span>
                <span>{I18n.t('Level')}</span>
                <span>{I18n.t('Ante')}</span>
                <span>{I18n.t('time')}</span>
            </div>
            <div>
                {blinds.map((blind, i) => <BlindStructureInfo key={i} blind={blind}/>)}

            </div>

        </div>
    }

    //主赛信息选择显示页面
    select_mainInfoMenu = () => {
        switch (this.state.selectBtn) {
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

            return this.scheduleMessageTwo(sch[0], sch[1]);

        }
    };

    scheduleMessageOne = (schedule) => {
        return schedule
    };
    scheduleMessageTwo = (schedule1, schedule2) => {
        return <span>{schedule1}<br/>{schedule2}</span>
    }
}

class BlindStructureInfo extends PureComponent {

    render() {
        const {blind} = this.props;
        return (blind.blind_type === "blind_struct" ? <div className="blindStructure-info">
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

        </div> : <div className="info-content">
            {blind.content}
        </div>)
    }
}