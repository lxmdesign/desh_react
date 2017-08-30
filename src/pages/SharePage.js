import React, {Component} from 'react';
import {getGameInfo, getRankInfo, setLang} from '../service/RaceDao';
import '../styles/SharePage.css';
import Time from 'react-time-format';
import I18n from '../service/I18n';
import sharePage01 from '../assets/images/H5SahrePage01.png';
import sharePage02 from '../assets/images/H5SahrePage02.png';
import sharePage04 from '../assets/images/H5SahrePage04.png';
import sharePage05 from '../assets/images/H5SahrePage05.png';
import sharePage07 from '../assets/images/H5SahrePage07.png';
import sharePage08 from '../assets/images/H5SahrePage08.png';
import sharePage09 from '../assets/images/H5SahrePage09.png';
import person01 from '../assets/images/person01.png';
import person02 from '../assets/images/person02.png';
import person03 from '../assets/images/person03.png';
import person04 from '../assets/images/person04.png';
import questionMark from '../assets/images/questionMark.png';


export default class SharePage extends Component {

    render() {
      return(
        <div className="sharePage">

            <div></div>


            <div className="sharePage-img">
                <img src={sharePage01} alt="" />
                <img src={sharePage02} alt="" />
                <img src={sharePage04} alt="" />
                <img src={sharePage05} alt="" />
            </div>
            <div className="sharePage-person">
                <img src={person01} alt="" />
                <img src={person02} alt="" />
                <img src={person03} alt="" />
                <img src={person04} alt="" />
            </div>
            <div className="sharePage-img">
                <img src={sharePage07} alt="" />
                <img src={sharePage08} alt="" />
                <img src={sharePage09} alt="" />
            </div>

        </div>
      )}
}