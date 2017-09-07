import React, {Component} from 'react';
import {items} from '../components/constant'
var  class_name2 = 'questions-fixed name';
var  class_name1 = 'questions-fixed';
var  class_name4 = 'name2';
var  class_name5 = 'content';
var  class_name6 = 'content name6';


export default class Download extends Component {
    state = {
        item:0,
    };

    questionNav =()=>{
        if(this.state.item===0){
            return (
            <div className="question-nav">
                <a>常见问题</a>
                <a onClick={() => {
                    this.props.history.push("/sharePage")
                }}>关闭</a>
            </div>)
        }
    }
    judge=()=>{
        return this.state.item===0?class_name1:class_name2;
    }
    judge2=()=>{
        return this.state.item===0?"":class_name4;
    }
    judgeContent=()=>{
        return this.state.item===0?class_name5:class_name6;
    }
    render(){

        return(
            <div className="questions">
                <div className="questions-img">

                </div>
                <div className={this.judge()}>
                    <div className={this.judge2()}>
                        {this.questionNav()}
                    </div>
                </div>

                <div className={this.judgeContent()}>
                    {
                        items.map((value,key) =>
                            <div className="box">
                                <div className="question">
                                    <div className="image1">Q</div>
                                    <div className="question1">{value.question1}</div>
                                </div>
                                <div className="question">
                                    <div className="image2">A</div>
                                    <div className="question2">{value.question2}</div>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        )
    }
}

