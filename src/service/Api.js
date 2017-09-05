/**
 * Created by lorne on 2017/8/24.
 */
export default {
    race_list: 'u/0/recent_races',
    race_info: race_info,
    news_info: news_info,
    player_info: player_info,
    game_info: game_info,
    rank_info: rank_info,
    sub_races: sub_races,
    sub_race_info: sub_race_info,
    weixin_js_sign: '/v10/weixin/js_sign'


}

function sub_race_info(body) {
    const {raceId, subId} = body;
    return 'races/' + raceId + '/sub_races/' + subId;
}


function sub_races(body) {
    const {raceId} = body;
    return 'races/' + raceId + '/sub_races';

}

function race_info(body) {
    const {raceId} = body;
    return 'u/0/races/' + raceId;
}
function news_info(body) {
    const {newsId} = body;
    return 'news/infos/' + newsId;
}
function player_info(body) {
    const {playerId} = body;
    return 'players/' + playerId;
}
function game_info(body) {
    const {gameId} = body;
    return 'u/0/races/' + gameId;
}
function rank_info(body) {
    const {playerId} = body;
    return 'players/' + playerId + '/ranks';
}

