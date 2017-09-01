import React, {Component} from 'react';

import '../styles/Download.css';

export default class Download extends Component {
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