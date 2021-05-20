import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';

function Home(props) {
    return(
        <div className="content">
            <Header />
            
            <h3>FLOG를 통해 감정이 담긴 회의록을 만나보세요.</h3>
            <Link to="/login">시작하기</Link>


            {/* jeonbar */}
            <br/>
            <Link to="/test">테스트창으로 이동</Link>
        </div>
    )
}

export default withRouter(Home);