

const req = require('bd-require')
const urllib = req('./node_modules/urllib')
const JsSHA = require('jssha')

const appInfo = {
    appID: 'wx0a27fb1118713d94',
    appsecret: 'c97ac34f98acc25335c94ada42669257'
}

// 接口每日调用有限制,需做缓存
const cacheInfo = {}

// 时间戳
const timeStamp = () => parseInt(new Date().getTime() / 1000)

// 获取签名
const sign = (ticket, noncestr, timestamp, url) => {
    const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
    const shaObj = new JsSHA(str, 'TEXT')

    return shaObj.getHash('SHA-1', 'HEX')
}

// 获取jsapi_ticket
function * getTicket (accessToken) {
    let result = yield urllib.request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`, {
        dataType: 'json',
        timeout: 2000
    })

    if (Number(result.status) !== 200) {
        return null
    }

    return result.data.ticket
}

// 获取token
module.exports = function * (url) {
    let ticket
    // 如果第一次启动，或者该ticket已经存在了超过7200秒，则重新获取ticket
    if (!cacheInfo.startTime || !cacheInfo.ticket || (timeStamp() - 7200) > cacheInfo.startTime) {
        console.log('通过wxAPI获取token', new Date().valueOf(), url)
        let result = yield urllib.request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appInfo.appID}&secret=${appInfo.appsecret}`, {
            dataType: 'json',
            timeout: 2000
        })

        if (Number(result.status) !== 200) {
            return null
        }
        let ticketInfo = yield getTicket(result.data.access_token)

        if (!ticketInfo) {
            return null
        }

        cacheInfo.startTime = timeStamp()
        ticket = cacheInfo.ticket = ticketInfo
    } else {
        ticket = cacheInfo.ticket
    }

    // 随机字符串
    let nonceStr = Math.random().toString(36).substr(2, 15)
    let timestamp = timeStamp()
    let signature = sign(ticket, nonceStr, timestamp, url)
    return { ticket, nonceStr, timestamp, url, signature, appId: appInfo.appID }
}
