import React, {Component} from 'react';
import '../styles/SharePage.css';
import {weiXinShare} from '../service/utils';
import {Route} from 'react-router-dom';
import {items,sharePage01,sharePage02,sharePage08,sharePage05,
    person01,person02,person03,person04,character} from '../components/constant'


export default class SharePage extends Component {
    state={
        visible:false
    }

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

    render() {
        const {params} = this.props.match;
        return(
            <div className="sharePage">

                <div className={this.state.visible===false?"sharePage-scroll":"sharePage-unscroll"}>


                    <div className="sharePage-img">
                        <img src={sharePage01} alt="" />
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

                        <img src={sharePage08} alt="" />
                    </div>

                    {/*弹出问题框*/}
                    <Route path="/sharePage/question" component={Question}/>

                    <div className="fixed"></div>
                    <footer >

                        <div className="sharePage-btn">
                            <div className="sharePage-btn-question"
                                 onClick={() => {
                                     this.props.history.push("/sharePage/question")
                                     this.setState({
                                         visible: !this.state.visible
                                     })
                                 }}>
                                常见问题
                            </div>
                            {/*<div className="sharePage-btn-question" >*/}
                                {/*<Link to="/sharePage/question">*/}
                                    {/*常见问题*/}
                                {/*</Link>*/}
                            {/*</div>*/}
                            <div className="android-app-download"  onClick={() => {
                                this.props.history.push(`/race/${params.id}/${params.lang}/loadAPP`)
                            }}>
                                立即下载扑客
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

        )}

}

const Question=()=>(

    <div className="questions-unScroll">
        <div className="questions">

            <div className="question-nav">
                <a>常见问题</a>
                <a onClick={() => {
                    this.props.history.push("/sharePage")
                    this.setState({
                        visible: !this.state.visible
                    })
                }}>关闭</a>
            </div>

            <div className="content">
                {
                    items.map((value,key) =>
                        <div key={key} className="box">
                            <div className="question">
                                <div className="image1">Q</div>
                                <div className="question1">{value.question1}</div>
                            </div>
                            <div className="question">
                                <div className="image2">A</div>
                                <div className="question2">{value.question2}</div>
                            </div>
                        </div>
                    )
                }
                <div style={{height:"60px"}}></div>
            </div>
        </div>
    </div>
)