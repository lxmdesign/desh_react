/**
 * Created by lorne on 2017/8/29.
 */
import '../styles/SideRace.css';
import React, {PureComponent} from 'react';
import {getSubInfo} from '../service/RaceDao'
import moment from 'moment';


export default class SideRace extends PureComponent {

    state = {
        data: {}
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
        return (<div className="container">

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

        </div>)
    }
}