import React, {Component} from 'react';
import {getActivitiesInfo,setLang} from '../service/RaceDao';
import {weiXinShare,isEmptyObject} from '../service/utils';
import MarkDown from '../components/MarkDown';

export default class activitiesInfo extends Component {
    state = {
        data: {}
    };

    componentDidMount(){
        const {id, lang} = this.props.match.params;
        setLang(lang);
        const body = {activitiesId: id};

        getActivitiesInfo(body, data => {
            console.log('activitiesInfo', data)
            this.setState({
                data: data
            });
            const {title,banner,description} = data.activity;
            document.title = title;

            //微信二次分享
            // const url = {url: "http://www.deshpro.com:3000/race/91/zh"};
            // const url = {url: "http://h5-react.deshpro.com:3000/race/91/zh"};
            const message = {
                title: title,
                desc: description,//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: banner, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
            const url = {url: window.location.href};
            console.log("message:",message);
            weiXinShare(url,message);
        }, err => {

        });

    }

    render(){
        if(isEmptyObject(this.state.data.activity)) {
            return <div></div>;
        }
        const {description} = this.state.data.activity;
        return(

            <div className="activitiesInfo">
                <MarkDown description={description}/>
            </div>
        );
    }
}