/**
 * Created by lorne on 2017/8/29.
 */
import '../styles/SideRace.css';
import React, {PureComponent} from 'react';
import {getSubInfo} from '../service/RaceDao'
import moment from 'moment';
import I18n from '../service/I18n';

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
                    className="time">{I18n.t('time')}：{moment(begin_date).format('YYYY.MM.DD')}-{moment(end_date).format('YYYY.MM.DD')}</span>
                <span className="location">{I18n.t('address')}：{location}</span>

            </div>

            <div className="subInfo1">
                <span>{I18n.t('prize')}：¥{prize}</span>
                <span>{I18n.t('peoples')}：{participants}</span>
                <span>{I18n.t('Admission')}：{ticket_price}</span>
                <span>{I18n.t('beginChip')}：{blind}</span>
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
                    <span>{I18n.t('Schedule')}</span>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === 1 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectBtn:1,
                        selectBtn_menu:1
                    })
                }}>
                    <div>{I18n.t('Blind')}</div>
                </div>
                <div className="clo_line"/>
                <div className={selectBtn === 2 ? 'btn2' : 'btn1'} onClick={() => {
                    this.setState({

                        selectBtn:2,
                        selectBtn_menu:2
                    })
                }}>
                    <div>{I18n.t('GameResult')}</div>
                </div>
            </div>

            {/*{this.select_mainInfoMenu()}*/}
        </div>
    };



}