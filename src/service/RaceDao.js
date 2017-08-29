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

export function getNewsInfo(body, resolve, reject) {
    get(Api.news_info(body), ret => {
        resolve(ret.data);
    }, reject);
}
export function getPlayerInfo(body, resolve, reject) {
    get(Api.player_info(body), ret => {
        resolve(ret.data);
    }, reject);
}
export function getGameInfo(body, resolve, reject) {
    get(Api.game_info(body), ret => {
        resolve(ret.data);
    }, reject);
}
export function getRankInfo(body, resolve, reject) {
    get(Api.rank_info(body), ret => {
        resolve(ret.data);
    }, reject);
}

