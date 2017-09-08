import React, {Component} from 'react';
import {default_img} from '../components/constant';
import {weiXinShare} from '../service/utils';
import '../styles/Download.css';

export default class Download extends Component {

    componentDidMount(){
        //微信二次分享
        // const url = {url: "http://www.deshpro.com:3000/race/91/zh/loadApp"};
        const message = {
            title: 'PokerPro',
            desc: '德州扑客下载',//分享描述
            link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: default_img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        }
        const url = {url: window.location.href};
        weiXinShare(url,message);
    }


    render(){
        return(
            <div className="Download">
                <div className="black">
                </div>
                <a className="ios-app-a" href="https://itunes.apple.com/cn/app/pokerpro/id1248197">
                    <div className="ios-app">
                        ios-app
                    </div>
                </a>
                <a className="android-app-a" href="http://sj.qq.com/myapp/detail.htm?apkName=com.deshpro.pokerpro">
                    <div className="android-app">
                        android-app
                    </div>
                </a>
            </div>
        )
    }
}