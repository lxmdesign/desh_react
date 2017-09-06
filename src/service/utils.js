import I18n from '../service/I18n';
import {getWeiXinSign} from '../service/RaceDao';

export function getGetOrdinal(n) {
    let s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
/*金额千分转换*/
export function moneyFormat(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    console.log(result)
    return result;
}

    /*对象是否为空对象*/
    export function isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }

export function strNotNull(str) {
    if (str == undefined || str == null || str.length == 0)
        return false;
    else
        return true;
}

export function modify(str,str2) {
    var demoClassName = str;
    if (this.props.active) {
        demoClassName += str2;
    }
    return (
        demoClassName
    )
}

/*赛事状态*/
export function raceStatusConvert(status) {
    switch (status) {
        case 'unbegin':
            return I18n.t('races_unstart');
        case 'go_ahead':
            return I18n.t('donging');
        case 'ended':
            return I18n.t('ended');
        case 'closed':
            return I18n.t('closed');
    }
}
/*票务状态*/
export function ticketStatusConvert(status) {
    switch (status) {
        case 'unsold':
            return I18n.t('ticket_unsold');
        case 'selling':
            return I18n.t('ticket_selling');
        case 'end':
            return I18n.t('ticket_end');
        case 'sold_out':
            return I18n.t('ticket_sold_out');
    }
}

//微信二次分享
export function weiXinShare(url,message){
    getWeiXinSign(url, data => {
        console.log('WeiXinSignInfo', data)
        // this.setState({
        //     wxData: data
        // });

        window.wx.ready(() =>{
            window.wx.onMenuShareTimeline(message);//分享朋友圈
            window.wx.onMenuShareAppMessage(message);//分享给朋友
            window.wx.onMenuShareQQ(message);//分享到QQ
            window.wx.onMenuShareWeibo(message);//分享到腾讯微博
            window.wx.onMenuShareQZone(message);//分享到QQ空间
        });

        window.wx.config({
            debug: true,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo',"onMenuShareQZone"]
        });

    }, err => {

    });
}

