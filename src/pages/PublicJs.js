import React, {Component} from 'react';
import markdown from 'marked';
import {getPlayerInfo,setLang} from '../service/RaceDao';
import {moneyFormat,getGetOrdinal,strNotNull} from '../service/utils';
import Time from 'react-time-format';

select_mainInfoMenu = () => {
    switch (this.state.selectInfo_menu) {
        case 0:
            return this.scheduleView();
        case 1:
            return this.blindStructureView();
    }
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



