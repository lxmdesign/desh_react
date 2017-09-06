import React, {Component} from 'react';
import '../styles/SharePage.css';
import {weiXinShare,convertDate} from '../service/utils';

var image_url   = 'http://cdn.deshpro.com';  //生产环境cdn地址
// var image_url   = 'http://localhost:3000';  //本地环境 
var sharePage01 = image_url + '/static/images/H5SahrePage01.png';
var sharePage02 = image_url + '/static/images/H5SahrePage02.png';
var sharePage05 = image_url + '/static/images/H5SahrePage05.png';
var sharePage08 = image_url + '/static/images/H5SahrePage08.png';
var person01    = image_url + '/static/images/person01.png';
var person02    = image_url + '/static/images/person02.png';
var person03    = image_url + '/static/images/person03.png';
var person04    = image_url + '/static/images/person04.png';
var character   = image_url + '/static/images/h5-character.png';


export default class SharePage extends Component {

    componentDidMount() {
        //微信二次分享
        // const url = {url: "http://www.deshpro.com:3000/race/91/zh"};
        const message = {
            title: 'PokerPro',
            desc: '',//分享描述
            link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        }
        const url = {url: window.location.href};
        weiXinShare(url,message);
    }
    message_desc = (location,begin_date,end_date) => {
        var time=convertDate(begin_date,"YYYY.MM.DD")+"-"+convertDate(end_date,"YYYY.MM.DD");
        return (location+'\n'+time);
    }

    render() {
        const {params} = this.props.match;
        return(
            <div className="sharePage">

                <div></div>


                <div className="sharePage-img">
                    <img src={sharePage01} alt="" />
                    {/*<img src={sharePage04} alt="" />*/}
                    <img src={sharePage05} alt="" />

                </div>
                <div className="name">
                    <img src={character} alt="" />
                </div>
                <div className="sharePage-person">

                    <div className="scroll-box">
                        <div className="box-item">
                            <img src={person03} alt="" />
                        </div>
                        <div className="box-item">
                            <img src={person01} alt="" />
                        </div>
                        <div className="box-item">
                            <img src={person02} alt="" />
                        </div>
                        <div className="box-item">
                            <img src={person04} alt="" />
                        </div>
                    </div>
                </div>
                <div className="sharePage-img">
                    <img src={sharePage02} alt="" />

                    {/*<img src={sharePage07} alt="" />*/}
                    <img src={sharePage08} alt="" />
                </div>


                <div className="fixed"></div>
                <footer >
                    <div className="sharePage-btn">


                        <div className="sharePage-btn-question" onClick={() => {
                            this.props.history.push("/question")
                        }}>
                            <div className="image"></div>
                            <div className="char">常见问题</div>
                        </div>
                        <div className="android-app-download"  onClick={() => {
                            this.props.history.push(`/race/${params.id}/${params.lang}/loadAPP`)
                        }}>
                            立即下载扑客
                        </div>
                    </div>
                </footer>
            </div>
        )}
}