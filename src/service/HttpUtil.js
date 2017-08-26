/**
 * Created by lorne on 2017/8/24.
 */
import {create} from 'apisauce';

let TAG = 'PuKeHttp:';


// define the api
const client = create({
    baseURL: 'https://api.deshpro.com/v10',
    headers: {
        'X-DP-APP-KEY': '467109f4b44be6398c17f6c058dfa7ee',
        'X-DP-CLIENT-IP': '192.168.2.231'
    },
    timeout: 20000,
});


export function setDpLang(lang) {
    client.setHeader('X-DP-LANG', lang)
}

export var DEFAULT_LOCALE = client.headers['X-DP-LANG'] ? client.headers['X-DP-LANG'] : 'zh';


export function setAccessToken(token) {
    client.setHeader('X-DP-ACCESS-TOKEN', token)
}

export function removeToken() {
    delete client.headers['X-DP-ACCESS-TOKEN']
}


const naviMonitor = (response) => console.log(TAG, response);
client.addMonitor(naviMonitor);
client.addRequestTransform(request => {
    console.log(TAG, request)
});


export function post(url, body, resolve, reject) {

    client.post(url, body)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }


        }).catch((error) => {
        reject('Network response was not ok.');
    });
}


export function del(url, body, resolve, reject) {
    client.delete(url, body)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }

        }).catch((error) => {

        reject('Network response was not ok.');
    });
}


export function put(url, body, resolve, reject) {
    client.put(url, body)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }

        }).catch((error) => {
        reject('Network response was not ok.');
    });
}

export function get(url, resolve, reject) {

    client.get(url)
        .then((response) => {
            if (response.ok) {
                const {code, msg} = response.data;
                if (code === 0) {
                    resolve(response.data);
                } else {
                    reject(msg);
                }
            } else {
                netError(response, reject);
            }

        }).catch((error) => {
        reject('Network response was not ok.');
    });
}

/*token过期*/
function netError(response, reject) {

}