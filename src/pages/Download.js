import React, {Component} from 'react';

import {getGameInfo, getRankInfo, setLang} from '../service/RaceDao';
import '../styles/Download.css';
import Time from 'react-time-format';

export default class Download extends Component {
    render(){
        return(
            <div className="Download">
                <div className="black">
                </div>
                <a className="ios-app-a" href="https://itunes.apple.com/us/app/pokerpro/id1248197817?l=zh&ls=1&mt=8">
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