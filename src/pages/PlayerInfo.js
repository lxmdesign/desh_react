import React, {Component} from 'react';
import {getPlayerInfo,setLang} from '../service/RaceDao';
import {moneyFormat,getGetOrdinal,strNotNull} from '../service/utils';
import Time from 'react-time-format';
import {getRankInfo} from '../service/RaceDao';
import '../styles/PlayerInfo.css';
import I18n from '../service/I18n';
import {weiXinShare} from '../service/utils';

export default class PlayerInfo extends Component {

    state = {
        player: {},
        items: []
    };

    componentDidMount() {
        const {id, lang} = this.props.match.params;
        setLang(lang);
        const body = {playerId: id};
        document.title = I18n.t('app_name');
        getPlayerInfo(body, data => {
            console.log('PlayerInfo', data)
            this.setState({
                player: data
            })
        }, err => {

        })
        getRankInfo(body, data => {
            console.log('RankInfo', data)
            this.setState({
                items: data
            })
        }, err => {

        })

        //微信二次分享
        // const url = {url: "http://www.deshpro.com:3000/race/91/zh"};
        const url = {url: "http://h5-react.deshpro.com:3000/race/91/zh"};
        const message = {
            title: this.state.data.race.name,
            desc: this.desc(this.state.data.race.description),
            link: encodeURIComponent(window.location.href),
            imgUrl: this.state.data.logo
        }
        weiXinShare(url,message);
    }

    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
    //click事件


    content = () => {
        const {
            avatar, country, dpi_total_score, dpi_total_earning,
            name, ranking
        } = this.state.player;
            console.log("avatar:"+avatar);
            return (
                <div className="player">
                    <div className='player-head'>
                        <div className='player-head-top'>
                            {/*<img alt='' src={返回图标}/>*/}
                            {/*<img alt='' src={Group2x}/>*/}
                            {/*<h2>{I18n.t('domestic_ranking')}</h2>*/}
                            <h2></h2>
                            {/*<img alt='' src={Group}/>*/}
                        </div>
                        {this.image()}

                        <span className="personName">{name}</span><br/>
                        <span className="country">{country}</span>

                        <div className="player-head-nav">
                            <div className="nav-rank">
                                <span>{strNotNull(ranking)?ranking:'--'}</span>
                                <span>{I18n.t('ranking')}</span>
                            </div>
                            <div className="nav-score">
                                <span>{strNotNull(dpi_total_score)?dpi_total_score:'--'}</span>
                                <span>{I18n.t('integral')}</span>
                            </div>
                            <div className="nav-prize">
                                <span>¥{moneyFormat(dpi_total_earning)}</span>
                                <span>{I18n.t('bonus')}</span>
                            </div>
                        </div>

                    </div>

                    <div className='player-body'>
                        {this.body()}
                    </div>

                </div>

            );
    }
    image=()=>{
        const {
            avatar
        } = this.state.player;
        if(!this.isEmptyObject(avatar)){
            return(
            <img className='personImg' src={avatar} />
            )
        }else{
            return(
                <img className='personImgHidden' src={avatar} />
            )
        }
    }
    body = () => {

        const {
            items
        } = this.state;

        if (!this.isEmptyObject(this.state.player)) {
            return (
                <table >
                    <tbody>
                    {items.map(item =>{
                        const {race,rank} = item;

                        console.log('list',race,rank)
                        return <tr>
                            <td>
                                <a>
                                    <div className="table-header">
                                        <span>{race.name}</span>
                                        <span>{getGetOrdinal(rank.ranking)}</span>
                                    </div>
                                    <div className="table-detail">
                                        <div className="table-num">
                                            <span>{I18n.t('buy')}</span>
                                            <span>{race.ticket_price}</span>
                                        </div>
                                        <div className="table-person">
                                            <span>{I18n.t('peoples')}</span>
                                            <span>{race.participants}</span>
                                        </div>
                                        <div className="table-prize">
                                            <span>{I18n.t('bonus')}</span>
                                            <span>¥{moneyFormat(rank.earning)}</span>
                                        </div>
                                        <div className="table-score">
                                            <span>{I18n.t('integral')}</span>
                                            <span>{rank.score}</span>
                                        </div>
                                    </div>
                                    <div className="table-time"><Time value={race.begin_date} format="YYYY:MM:DD" />-<Time value={race.end_date} format="YYYY:MM:DD" /></div>
                                    <div className="table-location">{race.location}</div>
                                </a>
                            </td>
                        </tr>
                    })}

                    </tbody>
                </table>
            )
        }
    }

    render() {
        return (
            <div className='content'>

                {this.content()}

            </div>
        )
    };
}
