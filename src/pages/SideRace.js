/**
 * Created by lorne on 2017/8/29.
 */
import '../styles/SideRace.css';
import React, {PureComponent} from 'react';
import {getSubInfo, setLang} from '../service/RaceDao'
import moment from 'moment';
import I18n from '../service/I18n';
import RaceBlindList from '../components/RaceBlindList';
import {convertDate,weiXinShare,isEmptyObject} from '../service/utils'
import {default_img} from '../components/constant';

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
            console.log('SideRace', data)
            const {name} = data;
            document.title = name;
            this.setState({
                data: data
            })

            //微信二次分享
            // const url = {url: "http://www.deshpro.com:3000/race/91/zh"};
            // const url = {url: "http://h5-react.deshpro.com:3000/race/91/zh"};
            const{logo,location,begin_date,end_date} =data;
            const message = {
                title: name,
                desc: this.message_desc(location,begin_date,end_date),//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(logo)?default_img:logo, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
            const url = {url: window.location.href};
            weiXinShare(url,message);
        }, err => {

        });
    }
    message_desc = (location,begin_date,end_date) => {
        var time=convertDate(begin_date,"YYYY.MM.DD")+"-"+convertDate(end_date,"YYYY.MM.DD");
        return (location+'\n'+time);
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