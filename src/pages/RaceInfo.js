/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import markdown from 'marked';
import {getRaceInfo, setLang, getSubRace,getWeiXinSign} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
import moment from 'moment';
import I18n from '../service/I18n';
import RaceBlindList from '../components/RaceBlindList';




export default class RaceInfo extends Component {

    state = {
        data: {},
        wxDate:{},
        menu: 0,
        subItems: [],
        class_name1: 'txtMenu imgMe',
        class_name2: 'txtMenu',
        class_name3: 'txtMenu'

    };

    componentDidMount() {

        const {id, lang} = this.props.match.params;
        setLang(lang);
        const body = {raceId: id};
        const url = {url: "http://www.deshpro.com/h5"};

        getRaceInfo(body, data => {
            console.log('RaceInfo', data)
            this.setState({
                data: data
            });
            const {name} = data.race;
            document.title = name;
        }, err => {

        });

        getSubRace(body, data => {
            this.setState({
                subItems: data.items
            })
        }, err => {

        })

        //微信二次分享
        getWeiXinSign(url, data => {
            // const uri = document.location.href;
            console.log('WeiXinSignInfo', data)
            this.setState({
                wxDate: data
            });
        }, err => {

        });

        window.wx.ready(function(){
            // alert("ready");
            window.wx.onMenuShareTimeline({//分享到朋友圈
                title: '我是标题', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接
                imgUrl: '' // 分享图标
            });
            window.wx.onMenuShareAppMessage({//分享给朋友
                title: '我是标题', // 分享标题
                desc: '我是标题', // 分享描述
                link: 'http://localhost:12121/race/91/zh/2313131', // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            window.wx.onMenuShareQQ({//分享到QQ
                title: '我是标题', // 分享标题
                desc: '我是标题', // 分享描述
                link: '', // 分享链接
                imgUrl: '' // 分享图标
            });
            window.wx.onMenuShareWeibo({//分享到腾讯微博
                title: '我是标题', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接
                imgUrl: '' // 分享图标
            });
            window.wx.onMenuShareQZone({//分享到QQ空间
                title: '我是标题', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接
                imgUrl: '' // 分享图标
            });
        });
        const {appId, nonceStr,timestamp, signature, rawString} = this.state.wxDate;
        console.log("wxDate:",this.state.wxDate)
        window.wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: timestamp, // 必填，生成签名的时间戳c
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo',"onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

    }

    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }

    //html to markDown
    desc = (description) => {
        var des = markdown(description)
        return {__html: des}
    }

    //click事件


    content = () => {
        if (!this.isEmptyObject(this.state.data.race)) {
            const {
                name, location,begin_date, end_date, logo
            } = this.state.data.race;

            return (
                <div className='content'>
                    {/*Head*/}
                    <div className="mainNav">
                        <div className="ul-1">
                            <div className="title">{name}</div>
                            <img src={logo}/>
                            <ul className="ul-1-2">
                                <li><Time value={begin_date} format="YYYY:MM:DD"/>—<Time value={end_date}
                                                                                         format="YYYY:MM:DD"/></li>
                                <li>{location}</li>
                                <li className="li-4">
                                    {/*<span>{raceStatusConvert(status)}</span><span>{ticketStatusConvert(ticket_status)}</span>*/}
                                </li>
                            </ul>
                        </div>

                        <div className="fixed">
                            <div className="menu">
                                <div className="menu1" onClick={() => {
                                    this.setState({
                                        menu: 0,
                                        class_name1: 'txtMenu' + ' ' + 'imgMe',
                                        class_name2: 'txtMenu',
                                        class_name3: 'txtMenu'
                                    })
                                }}>
                                    <span className={this.state.class_name1}>{I18n.t('Introduction')}</span>
                                    {/*<img src={imgMenu} className="imgMe"/>*/}
                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 1,
                                             class_name1: 'txtMenu',
                                             class_name2: this.state.class_name2 + ' ' + 'imgMe',
                                             class_name3: 'txtMenu'
                                         })
                                     }}>
                                    <span className={this.state.class_name2}>{I18n.t('MainInformation')}</span>

                                </div>
                                <div className="menu1"
                                     onClick={() => {
                                         this.setState({
                                             menu: 2,
                                             class_name1: 'txtMenu',
                                             class_name2: 'txtMenu',
                                             class_name3: this.state.class_name3 + ' ' + 'imgMe'
                                         })
                                     }}>
                                    <span className={this.state.class_name3}>{I18n.t('SideInformation')}</span>

                                </div>

                            </div>
                        </div>
                    </div>

                    {this.selectMenu()}

                </div>

            );
        }
    }
    //导航信息选择显示页面

    selectMenu = () => {
        const {description} = this.state.data.race;

        switch (this.state.menu) {
            case 0:
                console.log(this.state.class_name)
                return this.introView(description);
            case 1:

                return this.mainInfoView();
            case 2:

                return this.sideView();
        }
    };


    introView = (description) => {

        return <div className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}></div>;
    };

    mainInfoView = () => {
        const {schedules, blinds, ranks} = this.state.data;
        return <RaceBlindList
            ranks={ranks}
            schedules={schedules}
            blinds={blinds}/>

    };


    sideView = () => {

        const {subItems} = this.state;
        const {params} = this.props.match;

        return (
            <div>
                {subItems.map((item, i) => <SideItem key={i} item={item}
                                                     history={this.props.history}
                                                     params={params}/>)}

            </div>
        )
    };


    render() {
        const {params} = this.props.match;
        return (
            <div className='content'>

                {this.content()}

                <footer><a onClick={() => {
                    this.props.history.push(`/race/${params.id}/${params.lang}/loadAPP`)
                }}>

                    {I18n.t('app_plant')}<span>{I18n.t('load_app')}</span></a></footer>

            </div>
        )
    };
}


class SideItem extends Component {

    render() {
        const {item, params} = this.props;
        return ( <div className="sideView" onClick={() => {
            this.props.history.push(`/race/${params.id}/${params.lang}/sidedetail/${item.race_id}`)

        }}>
            <div className="dark"/>

            <div className="sideTime">
                <span className="txtMonth">
                    {moment(item.begin_date).format('YYYY-MM')}
                </span>

                <span className="txtDay">
                    {item.days} Days
                </span>

            </div>

            <div className="sideInfo">
                <span className="sideTitle">{item.name}</span>
                <span className="sideStart">{I18n.t('start_time')}:{item.begin_time}</span>
                <span className="sidePrize">{item.ticket_price}</span>

            </div>

        </div>)
    }
}

