import React, {Component} from 'react';
import markdown from 'marked';


export default class MarkDown extends Component {


    desc = (description) => {
        var des = markdown(description)
        return {__html: des}
    }


    render(){
        const {description} =this.props;
        return (
            <div dangerouslySetInnerHTML={this.desc(description)}></div>
        );
    }
}