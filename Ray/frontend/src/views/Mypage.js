import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import jwt_decode from 'jwt-decode';

function Mypage(props) {
    let name = jwt_decode(localStorage.accessToken).user_name;
    const [user, set_user] = useState(name);
    var [modalOpen, set_modal] = useState(false);

    const onUserHandler = (event) => {
        set_user(event.currentTarget.value);
    }
    const onModalHandler = (event) => {
        set_modal(event.currentTarget.value);
    }

    const openModal = () => {
        modalOpen = true;
    }
    const closeModal = () => {
        modalOpen = false;
    }

    return(
        <div>
            <HeaderAuth />

            <h3>'{user}'님 환영합니다 :)</h3> 
            <button onClick={openModal}>프로젝트 생성</button>
            <button onClick={openModal}>회의 참여하기</button>

        </div>
        
    )
}

export default Mypage;