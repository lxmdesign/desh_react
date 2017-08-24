/**
 * Created by lorne on 2017/8/24.
 */
export default {
    race_list:'u/0/recent_races',
    race_info:race_info
}


function race_info(body){
    const {raceId} = body;
    return 'u/0/races/'+raceId;
}