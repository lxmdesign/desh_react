import React, {Component} from 'react';

import {getGameInfo, setLang} from '../service/RaceDao';
import '../styles/GameInfo.css';
import Time from 'react-time-format';
import {isEmptyObject} from '../service/utils';
import I18n from '../service/I18n';
import {weiXinShare,convertDate} from '../service/utils';

import {

    Link
} from 'react-router-dom'

export default class GameInfo extends Component {

    state = {
        game: {},
        items: []
    };

    componentDidMount() {

        const {id, lang} = this.props.match.params;
        setLang(lang);

        const body = {gameId: id};
        document.title = I18n.t('app_name');
        getGameInfo(body, data => {
            console.log('GameInfo', data)
            this.setState({
                game: data
            })

            //微信二次分享
            // const url = {url: "http://www.deshpro.com:3000/race/91/zh"};
            // const url = {url: "http://h5-react.deshpro.com:3000/race/91/zh"};
            const{name,logo,location,begin_date,end_date} =data.race;
            const message = {
                title: name,
                desc: this.message_desc(location,begin_date,end_date),//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: logo, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
            const url = {url: window.location.href};
            weiXinShare(url,message);
        }, err => {

        })
    }
    message_desc = (location,begin_date,end_date) => {
        var time=convertDate(begin_date,"YYYY.MM.DD")+"-"+convertDate(end_date,"YYYY.MM.DD");
        return (location+'\n'+time);
    }
    render() {

        const {
            race, ranks
        } = this.state.game;

        if (isEmptyObject(race))
            return <div/>;
        return (
            <div className="container">
                <Link to={'/race/' + race.race_id + '/zh'}>
                    <div className="top-race">
                        <img className="img-logo"
                             src={race.big_logo} alt="Big"/>

                        <div className="race-info">
                            <p className="title">{race.name}</p>
                            <div className="div_flex"/>

                            <span className="race-info-time"><Time value={race.begin_date} format="YYYY.MM.DD"/>-<Time
                                value={race.end_date} format="YYYY.MM.DD"/></span>
                            <span className="race-info-location "> {race.location}</span>

                        </div>

                    </div>
                </Link>
                <div className="line"/>

                <div className="race-massage">
                    <div className="race-buy">
                        <span>{I18n.t('buy')}</span>
                        <span>{race.ticket_price}</span>
                    </div>
                    <div className="race-prize">
                        <span>{I18n.t('prize_pool')}</span>
                        <span>{race.prize}</span>
                    </div>
                    <div className="race-person">

                        <span>{I18n.t('peoples')}</span>
                        <span>{race.participants}</span>
                    </div>
                </div>

                <div>
                    <table className="race-table">
                        <thead>
                        <tr>
                            <th>{I18n.t('ranking')}</th>
                            <th>{I18n.t('contestant')}</th>
                            <th>{I18n.t('bonus')}</th>
                            <th>{I18n.t('integral')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ranks.map((item, key) => {
                            return <tr >
                                <td>{item.ranking}</td>
                                <td className="table-name">{item.player.name}</td>
                                <td>{item.earning}¥</td>
                                <td>{item.score}</td>
                            </tr>
                        })}

                        </tbody>
                    </table>
                </div>

            </div>
        )
    };
}
