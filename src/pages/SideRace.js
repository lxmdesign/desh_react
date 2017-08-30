/**
 * Created by lorne on 2017/8/29.
 */
import '../styles/SideRace.css';
import React, {PureComponent} from 'react';
import {getSubInfo, setLang} from '../service/RaceDao'
import moment from 'moment';
import I18n from '../service/I18n';
import RaceBlindList from '../components/RaceBlindList';
import {isEmptyObject} from '../service/utils'

export default class SideRace extends PureComponent {

    state = {
        data: {},
        selectBtn: 0,
        selectBtn_menu: 0
    };

    componentDidMount() {
        const {id, lang, subId} = this.props.match.params;
        setLang(lang);
        const body = {
            raceId: id,
            subId: subId
        };

        getSubInfo(body, data => {

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
                    className="time">{I18n.t('time')}：{moment(begin_date).format('YYYY.MM.DD')}-{moment(end_date).format('YYYY.MM.DD')}</span>
                <span className="location">{I18n.t('address')}：{location}</span>

            </div>

            <div className="subInfo1">
                <span>{I18n.t('prize')}：¥{prize}</span>
                <span>{I18n.t('peoples')}：{participants}</span>
                <span>{I18n.t('Admission')}：{ticket_price}</span>
                <span>{I18n.t('beginChip')}：{blind}</span>
            </div>
            <div className="line"></div>
            <div className="sideRace-body">
                <div className="body-nav">
                    {this.mainInfoView()}
                </div>
            </div>
        </div>)
    }

    mainInfoView = () => {

        const {schedules, blinds, ranks} = this.state.data;
        console.log('side',this.state.data)
        if (!isEmptyObject(this.state.data))
            return <RaceBlindList
                ranks={ranks}
                schedules={schedules}
                blinds={blinds}/>

    };


}