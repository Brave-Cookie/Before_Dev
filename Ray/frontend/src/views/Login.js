import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'


function Login(props) {
    



    return(
        <div>
            <h3>로그인</h3>
            <form>
                <input id="user_id" name="user_id" placeholder="ID" /> <br></br>
                <input id="user_pw" name="user_pw" type="password" placeholder="Password" /> <br></br>
                
                <button>로그인</button>
            </form>
            <br></br>
            <Link to="/signup">회원가입</Link>
        </div>
    )
}

export default Login;