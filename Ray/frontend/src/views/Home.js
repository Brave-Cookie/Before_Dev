import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    return(
        <div>
            <h3>FLOG를 통해 감정이 담긴 회의록을 만나보세요.</h3>
            <Link to="/login">시작하기</Link>
        </div>
    )
}

export default Home;