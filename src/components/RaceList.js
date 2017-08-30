/**
 * Created by lorne on 2017/8/30.
 */
import React, {PureComponent} from 'react';
import moment from 'moment';
import '../styles/RaceInfo.css';
import I18n from '../service/I18n';


export default class RaceList extends PureComponent {

    state = {
        selectInfo: 0,

    };

    render() {
        return (<div>
            {this.mainInfoView()}
        </div>)
    }


    mainInfoView = () => {

        const {selectInfo} = this.state;
        return <div className="infoView">
            <div className="infoView-nav">
                <div className={selectInfo === 0 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectInfo: 0
                    })
                }}>
                    <span>{I18n.t('Schedule')}</span>
                </div>
                <div className="clo_line"/>
                <div className={selectInfo === 1 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectInfo: 1
                    })
                }}>
                    <div>{I18n.t('Blind')}</div>
                </div>
            </div>

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
        switch (this.state.selectInfo) {
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
        return <td>{schedule}</td>
    };
    scheduleMessageTwo = (schedule1, schedule2) => {
        return <td>{schedule1}<br/>{schedule2}</td>
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