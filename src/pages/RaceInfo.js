/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component,response} from 'react';
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
        wxData:{},
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
            console.log('subItems', this.state.subItems)
        }, err => {

        })

        //微信二次分享
        getWeiXinSign(url, data => {
            console.log('WeiXinSignInfo', data)
            this.setState({
                wxData: data
            });

            window.wx.ready(function(){
                alert("ready");
                window.wx.onMenuShareTimeline({//分享到朋友圈
                    title: '我是标题',
                    desc: '',
                    link: window.location.href,
                    imgUrl: ''
                });
                window.wx.onMenuShareAppMessage({//分享给朋友
                    title: '我是标题',
                    desc: '我是标题我是标题我是标题我是标题',
                    link: window.location.href,
                    imgUrl: '',
                    type: '',
                    dataUrl: '',
                    success: function () {
                        alert("success");
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }

                });
                window.wx.onMenuShareQQ({//分享到QQ
                    title: '我是标题',
                    desc: '我是标题',
                    link: '',
                    imgUrl: ''
                });
                window.wx.onMenuShareWeibo({//分享到腾讯微博
                    title: '我是标题',
                    desc: '',
                    link: '',
                    imgUrl: ''
                });
                window.wx.onMenuShareQZone({//分享到QQ空间
                    title: '我是标题',
                    desc: '',
                    link: '',
                    imgUrl: ''
                });
            });

            const {appId, nonceStr,timestamp, signature, rawString} = data;
            console.log("wxData:",data)
            window.wx.config({
                debug: true,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo',"onMenuShareQZone"]
            });

        }, err => {

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

    content = () => {

        if (!this.isEmptyObject(this.state.data.race)) {
            const {
                name, location,begin_date, end_date, logo
            } = this.state.data.race;

            return (
                <div className='content'>
                    <div className="mainNav">
                        <div className="ul-1">
                            <div className="title">{name}</div>
                            <img src={logo}/>
                            <ul className="ul-1-2">
                                <li><Time value={begin_date} format="YYYY:MM:DD"/>—<Time value={end_date}
                                                                                         format="YYYY:MM:DD"/></li>
                                <li>{location}</li>
                                <li className="li-4">
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

