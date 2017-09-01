import React, {Component} from 'react';
import '../styles/SharePage.css';
import sharePage01 from '../assets/images/H5SahrePage01.png';
import sharePage02 from '../assets/images/H5SahrePage02.png';
import sharePage04 from '../assets/images/H5SahrePage04.png';
import sharePage05 from '../assets/images/H5SahrePage05.png';
import sharePage07 from '../assets/images/H5SahrePage07.png';
import sharePage08 from '../assets/images/H5SahrePage08.png';
import person01 from '../assets/images/person01.png';
import person02 from '../assets/images/person02.png';
import person03 from '../assets/images/person03.png';
import person04 from '../assets/images/person04.png';
import character from '../assets/images/h5-character.png';


export default class SharePage extends Component {

    render() {
        const {params} = this.props.match;
      return(
        <div className="sharePage">

            <div></div>


            <div className="sharePage-img">
                <img src={sharePage01} alt="" />
                <img src={sharePage02} alt="" />
                <img src={sharePage04} alt="" />
                <img src={sharePage05} alt="" />
            </div>
            <div className="name">
                <img src={character} alt="" />
            </div>
            <div className="sharePage-person">

                <div className="scroll-box">
                    <div className="box-item">
                        <img src={person01} alt="" />
                    </div>
                    <div className="box-item">
                        <img src={person02} alt="" />
                    </div>
                    <div className="box-item">
                        <img src={person03} alt="" />
                    </div>
                    <div className="box-item">
                        <img src={person04} alt="" />
                    </div>
                </div>
            </div>
            <div className="sharePage-img">
                <img src={sharePage07} alt="" />
                <img src={sharePage08} alt="" />
            </div>
            <br/>

            <div className="fixed"></div><br/>
            <footer >
            <div className="sharePage-btn">

                <div className="sharePage-btn-question">
                    常见问题
                </div>
                <div className="android-app-download"  onClick={() => {
                    this.props.history.push(`/race/${params.id}/${params.lang}/loadAPP`)
                }}>
                    立即下载德州扑克
                </div>
            </div>
            </footer>
        </div>
      )}
}