import React, { useState } from 'react';
import HeaderAuth from '../components/HeaderAuth';
//import Modal from '../components/Modal';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router';

import Modal from 'react-awesome-modal';


function Mypage(props) {
    let name = jwt_decode(localStorage.accessToken).user_name;
    const [user, set_user] = useState(name);
    const [projectModal, set_projectModal] = useState(false);
    const [codeModal, set_codeModal] = useState(false);
    const [project_name, set_project] = useState("");
    const [meeting_code, set_code] = useState("");

    const onUserHandler = (event) => {
        set_user(event.currentTarget.value);
    }
    const onModalHandler = (event) => {
        set_projectModal(event.currentTarget.value);
        set_codeModal(event.currentTarget.value);
    }
    const onProjectHandler = (event) => {
        set_project(event.currentTarget.value);
    }
    const onCodeHandler = (event) => {
        set_code(event.currentTarget.value);
    }

    const openProjectModal = () => {
        set_projectModal(true);
    }
    const openCodeModal = () => {
        set_codeModal(true);
    }
    const closeModal = () => {
        set_projectModal(false);
        set_codeModal(false);
    }

    const registProject = () => {
        if(project_name!==""){
            alert(project_name);

            // clear
            set_project("");
            set_projectModal(false);

        }

        else {
            alert('프로젝트명을 입력해주세요.')
        }
        
    }
    const enterMeeting = () => {
        if(meeting_code!==""){
            alert(meeting_code);

            set_code("");
            set_codeModal(false);
        }

        else {
            alert('코드를 입력해주세요');
        }
    }

    return(
        <div>
            <HeaderAuth />

            <h3>'{user}'님 환영합니다 :)</h3> 
            <button onClick={openProjectModal}>프로젝트 생성</button>           
            <Modal visible={projectModal} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                    프로젝트의 이름을 입력해주세요.
                    <input type="text" value={project_name} onChange={onProjectHandler} />

                    <button className="close" onClick={registProject}>생성하기</button>
                    <button className="close" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>
            
            <button onClick={openCodeModal}>회의 참여하기</button>           
            <Modal visible={codeModal} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                    회의 코드를 입력해주세요.
                    <input type="text" value={meeting_code} onChange={onCodeHandler} />

                    <button className="close" onClick={enterMeeting}>입장하기</button>
                    <button className="close" onClick={closeModal}>창 닫기</button>
                </div>
            </Modal>


        </div>
        
    )
}

export default Mypage;