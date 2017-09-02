import React from "react"
import { withRouter } from 'react-router-dom';

const Footer = ({ history, match: { params } }) => <footer >
    <div className="sharePage-btn">
        <div className="sharePage-btn-question" onClick={() => {
            history.push(`/race/${params.id}/${params.lang}/question`)
        }}>
            <div className="image" />
            <div className="char">
                常见问题
            </div>
        </div>
        <div className="android-app-download" onClick={() => {
            history.push(`/race/${params.id}/${params.lang}/loadAPP`)
        }}>
            立即下载扑客
        </div>
    </div>
</footer>

export default withRouter(Footer)
