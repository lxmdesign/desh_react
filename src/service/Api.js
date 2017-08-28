/**
 * Created by lorne on 2017/8/24.
 */
export default {
    race_list:'u/0/recent_races',
    race_info:race_info,
    news_info:news_info,
    player_info:player_info,
    game_info:game_info,
    rank_info:rank_info
}


function race_info(body){
    const {raceId} = body;
    return 'u/0/races/'+raceId;
}
function news_info(body){
    const {newsId} = body;
    return 'news/infos/'+newsId;
}
function player_info(body){
    const {playerId} = body;
    return 'players/'+playerId;
}
function game_info(body){
    const {gameId} = body;
    return 'rankGame/'+gameId;
}
function rank_info(body){
    const {playerId} = body;
    return 'players/'+playerId+'/ranks';
}

