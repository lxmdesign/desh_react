import React, {Component} from 'react';

import {getGameInfo, getRankInfo, setLang} from '../service/RaceDao';
import '../styles/GameInfo.css';
import Time from 'react-time-format';
import Clamp from '../utils/Clamp';
import {isEmptyObject} from '../service/utils';
import I18n from '../service/I18n';
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
        }, err => {

        })
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
