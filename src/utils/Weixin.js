

export default class Weixin extends Component {

    state = {
        wxDate:{}
    };

    componentDidMount() {
        //微信二次分享
        const uri = document.location.href;
        getWeiXinSign(body, data => {
            const uri = document.location.href;
            console.log('WeiXinSignInfo', data)
            this.setState({
                wxDate: data
            });
        }, err => {

        });

        const {appId, nonceStr,timestamp, url, signature, rawString} = this.state.wxDate.date;

        window.wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: timestamp, // 必填，生成签名的时间戳c
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ', 'onMenuShareWeibo',"onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        window.wx.ready(function(){
            alert("进入");
            window.wx.onMenuShareTimeline({//分享到朋友圈
                title: '我是标题', // 分享标题
                desc: '', // 分享描述
                link: url, // 分享链接
                imgUrl: '' // 分享图标
            });
            window.wx.onMenuShareAppMessage({//分享给朋友

                title: '我是标题', // 分享标题
                desc: '我是标题', // 分享描述
                link: 'http://localhost:12121/race/91/zh/2313131', // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: url, // 如果type是music或video，则要提供数据链接，默认为空
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
            alert("AppMessage");
        });

    }

}
