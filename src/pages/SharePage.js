import React, {Component} from 'react';
import '../styles/SharePage.css';
import sharePage01 from '../assets/images/H5SahrePage01.png';
import sharePage02 from '../assets/images/H5SahrePage02.png';
import sharePage05 from '../assets/images/H5SahrePage05.png';
import sharePage08 from '../assets/images/H5SahrePage08.png';
import person01 from '../assets/images/person01.png';
import person02 from '../assets/images/person02.png';
import person03 from '../assets/images/person03.png';
import person04 from '../assets/images/person04.png';
import character from '../assets/images/h5-character.png';
// var test_img = 'https://cdn.deshpro.com/static/media/background.472dab1f.png'
// var sharePage01 =  'https://cdn.deshpro.com/static/media/H5SahrePage01.960c9a11.png';
// var sharePage02 =  'https://cdn.deshpro.com/static/media/H5SahrePage02.afb910c0.png';
// var sharePage05 = 'https://cdn.deshpro.com/static/media/H5SahrePage05.53b1c185.png';
// var sharePage08 = 'https://cdn.deshpro.com/static/media/H5SahrePage08.8ee6c40a.png';
// var person01 =  'https://cdn.deshpro.com/static/media/person01.838c24f3.png';
// var person02 = 'https://cdn.deshpro.com/static/media/person02.9419de85.png';
// var person03 = 'https://cdn.deshpro.com/static/media/person03.ec4918ec.png';
// var person04 = 'https://cdn.deshpro.com/static/media/person04.87521f50.png';
// var character = 'https://cdn.deshpro.com/static/media/';


export default class SharePage extends Component {

    render() {
        const {params} = this.props.match;
        return(
            <div className="sharePage">

                <div></div>


                <div className="sharePage-img">
                    {/*<img src={test_img} alt="" />*/}
                    <img src={sharePage01} alt="" />
                    {/*<img src={sharePage04} alt="" />*/}
                    <img src={sharePage05} alt="" />

                </div>
                <div className="name">
                    <img src={character} alt="" />
                </div>
                <div className="sharePage-person">

                    <div className="scroll-box">
                        <div className="box-item">
                            <img src={person03} alt="" />
                        </div>
                        <div className="box-item">
                            <img src={person01} alt="" />
                        </div>
                        <div className="box-item">
                            <img src={person02} alt="" />
                        </div>
                        <div className="box-item">
                            <img src={person04} alt="" />
                        </div>
                    </div>
                </div>
                <div className="sharePage-img">
                    <img src={sharePage02} alt="" />

                    {/*<img src={sharePage07} alt="" />*/}
                    <img src={sharePage08} alt="" />
                </div>


                <div className="fixed"></div>
                <footer >
                    <div className="sharePage-btn">


                        <div className="sharePage-btn-question" onClick={() => {
                            this.props.history.push("/question")
                        }}>
                            <div className="image"></div>
                            <div className="char">常见问题</div>
                        </div>
                        <div className="android-app-download"  onClick={() => {
                            this.props.history.push(`/race/${params.id}/${params.lang}/loadAPP`)
                        }}>
                            立即下载扑客
                        </div>
                    </div>
                </footer>
            </div>
        )}
}