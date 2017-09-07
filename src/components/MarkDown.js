import React, {Component} from 'react';
import markdown from 'marked';
import './css/MarkDown.css';


export default class MarkDown extends Component {


    desc = (description) => {
        var des = markdown(description)
        return {__html: des}
    }


    render(){
        const {description} =this.props;
        return (
            <div className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}></div>
        );
    }
}