import React, { Component } from "react"
class Nav extends Component {
    state = {
        height: null
    }
    onClick = () => this.setState({ height: 0 })
    render() {
        const { height } = this.state
        return <div className="question-nav" style={{ height }}>
            <a>常见问题</a>
            <a onClick={this.onClick}>
                关闭
                </a>
        </div>
    }
}

export default Nav