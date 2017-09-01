import React, {Component} from 'react';

import '../styles/Question.css';

export default class Download extends Component {
    render(){
        return(
            <div className="question">
                <div className="question-img">

                </div>
                <div className="question-nav">
                    <a>常见问题</a>
                    <a >关闭</a>
                </div>
                <div className="content">
                    <div className="question">
                        <div className="image1">Q</div>
                        <div className="question1">德州扑客是什么样的平台呢？</div>
                        <div className="image2">A</div>
                        <div className="question2">《德州扑客》为德州扑克牌手及德州扑克爱好者提供一系列服务的平台，平台内含国内外海量资讯及视频，出售赛事相关旅游套票。
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="question">
                        <div className="image1">Q</div>
                        <div className="question1">德州扑客是什么样的平台呢？</div>
                        <div className="image2">A</div>
                        <div className="question2">《德州扑客》为德州扑克牌手及德州扑克爱好者提供一系列服务的平台，平台内含国内外海量资讯及视频，出售赛事相关旅游套票。
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
            </div>
        )
    }
}