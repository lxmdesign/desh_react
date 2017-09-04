import React, {Component} from 'react';

import '../styles/Question.css';
import '../styles/footer.css';

export default class Download extends Component {
    state = {
        item:0,
        class_name2: 'questions-fixed name',
        class_name1: 'questions-fixed',
        class_name4: 'name2',
        class_name5: 'content',
        class_name6: 'content name6'
    };

    items = [
        {"question1":'德州扑客是什么样的平台呢？',
        "question2":'《德州扑客》为德州扑克牌手及德州扑克爱好者提供一系列服务的平台，平台内含国内外海量资讯及视频，出售赛事相关旅游套票。'
        },
        {"question1":'怎么注册app账号',
          "question2":'微信可以直接登录，但是需要手机号验证，以后可以直接用微信登陆。\n' +
        '   手机号直接注册登录，也可以通过微信登陆绑定用手机注册过的账号。'
        },
        {"question1":'购买票务后怎么收到购买的套餐。',
        "question2":"1.实体票，工作人会通过您填写的地址寄送 实体票给你。\n" +
        "                                2.电子票，工作人员会发送电子邀请函到您填写的邮箱。您到比赛现场后，出示您的电子邀请函给工作人员即可。\n" +
        "                                套餐内的酒店等服务，工作人员也会通过您提供的身份证信息进行给您预订酒店。"
        },
        {"question1":'在扑客购买的票务能够转手吗？',
            "question2":'通过在扑客平台下单的票务，暂时无法转授予他人，因为已经登记了您的实名信息以便您参赛。'
        },
        {"question1":'购买票务后能退款吗？',
            "question2":'目前扑客平台的套餐购买后是无法退单的，因为购买套餐后，这边会帮自动预订套餐内的服务，目前是无法退单的。若遇不可抵挡因为导致赛事无法进行，才可以进行退款。'
        },
        {"question1":'实名认证可以修改吗？',
            "question2":'实名认证后是无法修改的。若您有填写有误，可以联系客服进行修改。'
        },
        {"question1":'票务有保障吗？',
            "question2":'这个是有保障的，我们这里是各大官方举行的比赛，权威机构认证。'
        },
        {"question1":'为什么要身份证认证跟护照认证?',
            "question2":'因为参加国内比赛的需要实名认证，所以需要填写身份证信息进行实名认证。\n' +
            '   海外的比赛则需要提供护照的信息了。而且购票时候会需要您的证件信息进行预订酒店车票等。'
        }
    ]

    questionNav =()=>{
        if(this.state.item===0){
            return (
            <div className="question-nav">
                <a>常见问题</a>
                <a onClick={() => {
                    this.setState({
                        item: 1,
                    })
                    {/*Component.forceUpdate("/sharePage")*/}
                    this.props.history.push("/sharePage")
                }}>关闭</a>
            </div>)
        }if(this.state.item===0){
            return (
                <div className="question-nav">
                    <a>常见问题</a>
                    <a onClick={() => {
                        this.setState({
                            item: 0,
                        })
                        {/*Component.forceUpdate("/sharePage")*/}
                        this.props.history.push("/sharePage")
                    }}>关闭</a>
                </div>)
        }
    }
    judge=()=>{
        return this.state.item===0?this.state.class_name1:this.state.class_name2;
    }
    judge2=()=>{
        return this.state.item===0?"":this.state.class_name4;
    }
    judgeContent=()=>{
        return this.state.item===0?this.state.class_name5:this.state.class_name6;
    }
    render(){
        const {params} = this.props.match;
        return(
            <div className="questions">
                <div className="questions-img">

                </div>
                <div className={this.judge()}>
                    <div className={this.judge2()}>
                        {/*<div className="question-nav">*/}
                            {/*<a>常见问题</a>*/}
                            {/*<a onClick={() => {*/}
                                {/**/}
                                {/*this.props.history.push("/question")*/}
                            {/*}}>关闭</a>*/}
                        {/*</div>*/}
                        {this.questionNav()}
                    </div>
                </div>

                <div className={this.judgeContent()}>
                    {
                        this.items.map((value,key) =>
                            <div className="box">
                                <div className="question">
                                    <div className="image1">Q</div>
                                    <div className="question1">{value.question1}</div>
                                </div>
                                <div className="question">
                                    <div className="image2">A</div>
                                    <div className="question2">{value.question2}</div>
                                </div>
                                {/*<div className="Line">*/}

                                {/*</div>*/}
                            </div>
                        )
                    }
                </div>

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
        )
    }
}

