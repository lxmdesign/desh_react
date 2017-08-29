/**
 * Created by lorne on 2017/8/29.
 */
import '../styles/SideRace.css';
import React, {PureComponent} from 'react';


export default class SideRace extends PureComponent {


    render() {
        return (<div className="container">

            <div className="subInfo">
                <span className="title">WSOP国际扑克竞标赛-澳门站</span>
                <span className="time">时间：2017年4月12日-2017年5月4日</span>
                <span className="location">地点：澳大利亚墨尔本皇冠娱乐场澳大 利亚墨尔本皇</span>

            </div>

            <div className="subInfo1">
                <span>金额：¥5656</span>
                <span>参赛人数：¥5600,000</span>
                <span>入场资格：</span>
                <span>起始记分牌：</span>
            </div>

        </div>)
    }
}