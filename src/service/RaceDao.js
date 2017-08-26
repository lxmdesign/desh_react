/**
 * Created by lorne on 2017/8/24.
 */
import Api from './Api';
import {get, post, setDpLang} from './HttpUtil';

export function setLang(lang) {
    setDpLang(lang)
}

export function getRaceList(resolve, reject) {
    get(Api.race_list, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function getRaceInfo(body, resolve, reject) {
    get(Api.race_info(body), (ret) => {
        resolve(ret.data);
    }, reject);
}