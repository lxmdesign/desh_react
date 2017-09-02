import React, { Component } from 'react';
import Nav from './Nav'
import Footer from "./Footer"
import Body from "./Body"
import Head from './Head'
import '../../styles/Question.css';
import '../../styles/footer.css';

const Question = () => <div className="questions">
    <Head />
    <Body />
    <Footer />
</div>

export default Question