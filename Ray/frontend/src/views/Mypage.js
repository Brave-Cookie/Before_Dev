import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
import Modal from '../components/Modal';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router';


function Mypage(props) {
    let name = jwt_decode(localStorage.accessToken).user_name;
    const [user, set_user] = useState(name);
    const [modalOpen, set_modal] = useState(false);
    const [project_name, set_project] = useState("");
    const [meeting_code, set_code] = useState("");

    const onUserHandler = (event) => {
        set_user(event.currentTarget.value);
    }
    const onModalHandler = (event) => {
        set_modal(event.currentTarget.value);
    }
    const onProjectHandler = (event) => {
        set_project(event.currentTarget.value);
    }
    const onCodeHandler = (event) => {
        set_code(event.currentTarget.value);
    }

    const openModal = () => {
        set_modal(true);
    }
    const closeModal = () => {
        set_modal(false);
    }

    return(
        <div>
            <HeaderAuth />

            <h3>'{user}'님 환영합니다 :)</h3> 
            <button onClick={openModal}>프로젝트 생성</button>
            <Modal open={ modalOpen } close={ closeModal } header="프로젝트 생성하기" footer="생성하기" footer_fuction="">
            프로젝트의 이름을 입력해주세요.
            <input type="text" value={project_name} onChange={onProjectHandler} />
            </Modal>

            <button onClick={openModal}>회의 참여하기</button>
            <Modal open={ modalOpen } close={ closeModal } header="회의 참여하기" footer="입장하기" footer_fuction="">
            회의 코드를 입력해주세요.
            <input type="text" value={meeting_code} onChange={onCodeHandler} />
            </Modal>

        </div>
        
    )
}

export default Mypage;