import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function Test6(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['']);

    function open_room(){
        const join_code = (Math.random() * new Date().getTime()).toString(32).toUpperCase().replace(/\./g, '-');
        console.log(join_code)
        // 쿠키에 호스트라고 알려줄 정보를 넣어줌
        
        // 생성된 코드 url로 이동
        window.location = `/meetingRoom/${join_code}`
    }

    function join_room(event){
        event.preventDefault();

        // 입력된 초대 코드
        const input_code = event.target.input_code.value

        // 방이 있는지 확인 => 어떻게 확인하지??? => DB에 잠시 생성..?
        // 방이 있다면 
        if(1){
            // 해당 url로 이동
            window.location = `/meetingRoom/${input_code}`
            // 쿠키에 join 정보를 넣어 이동
        }
        // 방이 없다면
        else{
            alert('해당 초대코드로 생성된 회의방이 없습니다.');
        }
        
    }

    return(
        <div>
            
            <p>최종 테스트</p>

            <br/>
            <hr/>
            <br/>
            
            <button onClick={open_room}>방 만들기</button>

            <br/>
            <br/>
            <hr/>
            <br/>
    
            <form onSubmit={join_room}>
                <input type='text' name='input_code' placeholder='초대코드 입력'/>
                <br/><br/>
                <button type='submit'>방 입장하기</button>
            </form>

            <br/>
            <hr/>
          </div>
    )
}
export default Test6;



/*
class Test6 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            joinCode : ''
        };
      }

      
    open_room(){
        // 참여 해시코드 생성
        let newjoinCode = (Math.random() * new Date().getTime()).toString(32).toUpperCase().replace(/\./g, '-');
        this.setState({
            joinCode : newjoinCode
        });
        // URL 생성후 창 이동
    }

    componentDidMount() {
    }

    render() {

        


      return (
          <div>
            
            <p>최종 테스트</p>

            <br/>
            <hr/>
            <br/>
            
            <Link to={`/meetingRoom/${this.state.joinCode}`}>
                <button onClick={this.open_room}>방 만들기</button>
            </Link>
            

            <br/>
            <br/>
            <hr/>
            <br/>
    
            <form>
                <input type='text' placeholder='초대코드 입력'/>
                <br/><br/>
                <button type='submit'>방 입장하기</button>
            </form>

            <br/>
            <hr/>
              
        
        
          </div>
      );
    }
}

export default Test6;

*/