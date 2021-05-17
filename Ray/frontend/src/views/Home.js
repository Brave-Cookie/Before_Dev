import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return(
            <div>
                <h3>FLOG를 통해 감정이 담긴 회의록을 만나보세요.</h3>
                <Link to="/login">시작하기</Link>
            </div>
        )
    }
}

export default Home;