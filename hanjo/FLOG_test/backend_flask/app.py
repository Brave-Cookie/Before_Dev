# -*- conding: utf-8 -*-
from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from model import *

# flask app에 라이브러리 설정하기
app = Flask(__name__)
# CORS 설정
CORS(app)

# DB 연동하는 부분
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:11111111@flogdb.csbcfamkafav.ap-northeast-2.rds.amazonaws.com:3306/flog'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# localhost:5000 으로 접속



# ++++++++++++++++++++++++++++++++++++++++++++++++ hanjo ++++++++++++++++++++++++++++++++++++++++++++++++

from flask_socketio import SocketIO

# 소켓 객체 생성
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('connect')
def connect():
    print('@@@@@@@@@@@@@@@@ 소켓 연결됨 @@@@@@@@@@@@@@@@')
    socketio.emit('connect_res', {'msg' : '연결완료'})


@socketio.on('dummy')
def dummy(req):
    print(req)
    # 응답 보내기
    socketio.emit('dummy', {'msg' : '더미 응답'})


@socketio.on('disconnect')
def disconnect():
    print('@@@@@@@@@@@@@@@ 소켓 연결중단 @@@@@@@@@@@@@@@')


# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import librosa
import joblib
import numpy as np
from pydub import AudioSegment, silence

# pkl 파일 load
clf_from_joblib = joblib.load('./pkl/model.pkl') 
scaler_from_joblib = joblib.load('./pkl/scaler.pkl')

def emotion_recognition(audio_len, reform_signal, sr):
    global clf_from_joblib, scaler_from_joblib
    emotions = []
    for i in range(0, audio_len - 3):
        # 0~4 / 1~5 /.... 슬라이스
        sliced_signal = reform_signal[i*16000 : (i+4)*16000]
        # 음성 전처리 실시
        mfcc = librosa.feature.mfcc(sliced_signal, sr, n_fft=400, hop_length=160, n_mfcc=36)
        mfcc = mfcc.reshape(-1)
        mfcc = scaler_from_joblib.transform([mfcc])
        print(mfcc)
        # 감정분석 결과 추출
        result = clf_from_joblib.predict(mfcc)
        if result[0] == 0:
            emotion = 'anger'
        elif result[0] == 1:
            emotion = 'fear'
        elif result[0] == 2:
            emotion = 'happy'
        elif result[0] == 3:
            emotion = 'neutral'
        elif result[0] == 4:
            emotion = 'sad'
        emotions.append(emotion)
    return max(emotions, key=emotions.count)


@app.route('/api/record',methods=['POST'])
def record():

    print('-------------------------------------- 요청완료 => 분석시작 --------------------------------------')

    # 넘어온 wav 음성 데이터 
    fs = request.files['for_silence']
    f = request.files['for_librosa']

    # librosa 변환
    signal, sr = librosa.load(f, sr=16000)

    # 묵음감지 전 길이 측정
    if int(librosa.get_duration(signal, sr)) < 4 :
        print(' XXXXXXXXXXX 4초 미만 음성 XXXXXXXXXXX ')
        return jsonify({ 'message' : '4초 미만 음성'}) 

    # 묵음구간 추출
    myaudio = AudioSegment.from_wav(fs)
    dBFS=myaudio.dBFS
    silence_section = silence.detect_silence(myaudio, min_silence_len=1000, silence_thresh=dBFS-16)
    silence_section = [((start/1000),(stop/1000)) for start,stop in silence_section]
    print(silence_section)

    # 묵음 구간을 없앤 실제 음성 구간 파싱
    section_list = []
    for start, end in silence_section:
        section_list.extend([start, end])
    section_list = section_list[1:-1]

    # 실제 음성 구간에서 2개씩 묶어준다.
    new_section = []
    for i, section in enumerate(section_list):
        if i%2 ==0:
            new_section.append([section, section_list[i+1]])
    print(signal)

    # 실제 음성 구간을 추출, 모두 합쳐줌
    reform_signal = []
    for start, end in new_section:
        reform_signal.extend(signal[int(start*16000) : int(end*16000)])
    reform_signal = np.array(reform_signal)

    # 묵음제거 음성 길이 측정
    audio_len = int(librosa.get_duration(reform_signal, sr))
    print(audio_len)

    if audio_len < 4 :
        print(' XXXXXXXXXXX 묵음제거 후 4초 미만 XXXXXXXXXXX ')
        return jsonify({ 'message' : '묵음제거 후 4초 미만'}) 

    else:
        emotion_result = emotion_recognition(audio_len, reform_signal, sr)
        print(emotion_result)
        return jsonify({ 'msg' : '분석완료'})
    


    '''
    # 처음의 가장 긴 묵음 구간만 제거
    if silence_section:
        signal = signal[ int(silence_section[0][1]*16000) : ]
        
    # 몇 초인지 추출 => 정수로 변환
    audio_len = int(librosa.get_duration(signal, sr))
    print('묵음제거 음성 길이 : ', audio_len)
    
    if audio_len < 4:
        print(' XXXXXXXXXXX 4초 미만 음성은 분석하지 않음 XXXXXXXXXXX ')
        return jsonify({ 'message' : '4초 이내 음성은 분석X'})
    else :
        global clf_from_joblib, scaler_from_joblib

        emotions = []
        for i in range(0, audio_len - 3):
            # 0~4 / 1~5 /.... 슬라이스
            sliced_signal = signal[i*16000 : (i+4)*16000]
            # 음성 전처리 실시
            mfcc = librosa.feature.mfcc(sliced_signal, sr, n_fft=400, hop_length=160, n_mfcc=36)
            mfcc = mfcc.reshape(-1)
            mfcc = scaler_from_joblib.transform([mfcc])
            print(mfcc)
            # 감정분석 결과 추출
            result = clf_from_joblib.predict(mfcc)
            if result[0] == 0:
                emotion = 'anger'
            elif result[0] == 1:
                emotion = 'fear'
            elif result[0] == 2:
                emotion = 'happy'
            elif result[0] == 3:
                emotion = 'neutral'
            elif result[0] == 4:
                emotion = 'sad'
            emotions.append(emotion)

        
        print('@@@@@@ 감정 결과 : ', emotions)
        
        return jsonify({ 'msg' : '분석 성공'})
    '''

    ''' wav로 저장하는 부분
    with open('temp.wav', 'wb') as audio:
        f.save(audio)
    '''
    


# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++












# ---------------------------------------- 처음 index page 시작 ----------------------------------------
@app.route('/')
def index():
    return render_template('index.html')
    
# ---------------------------------------- DB 연동 테스트 ----------------------------------------
@app.route('/DB_chk')
def DB_chk():
    
    # user_info 테이블의 모든 값 출력해보기

    # user_info 테이블 쿼리셋 생성
    ui = UserInfo.query.all()

    # for로 모두 출력
    for row in ui :
        print(row.user_id, row.user_name, row.user_pw, row.user_email)

    return redirect(url_for('index'))

# ---------------------------------------- 삽입하기 ----------------------------------------
@app.route('/insert')
def insert():
    # 데이터 삽입
    query = UserInfo(user_id = '아이디삽입', user_name='이름삽입', user_pw='1', user_email='이메일삽입')
    db.session.add(query)
    db.session.commit()
    print('삽입 성공~!')

    return redirect(url_for('index'))

@app.route('/insert_log')
def insertLog():
    # 데이터 삽입
    temp = [
        '우리가 지금까지 프로젝트하면서 해놓은 결과가 어떻게 되지',
        '일단 우리 프로젝트가 화상회의 기반 감정분석 서비스 잖아',
        '화상회의 구현 부분이 일단 한 40프로 정도 된거같아',
        '감정분석 해주는 인공지능은 구현이 완료되었어',
        '그러면 그다음 부분은 어떻게 되가고 있어',
        '화상회의 중에 말하는 음성들은 자동으로 텍스트로 변경해주는건 거의 끝났어',
        '그럼 그 화상회의로 만든 텍스트를 이용하는 서비스는 어덯게 되',
        '이제 그 텍스트로는 워드클라우드 생성하는건 일부분 성공했어',
        '그리고 화상회의 텍스트를 자동으로 요약해주는 기능도 구현했다고 할 수 있어',
        '오 수고했네 그러면 프론트 부분은 어떻게 되가고 있지',
        '프론트부분은 일단 뷰를 사용하고 있었는데 가장 중요한 화상회의부분이 호환이 안되서 어제 리액트로 바꿨어',
        '리액트로 바꾸고 나서 뷰로 했던 내용들은',
        '지금 리액트로 다 바꾸고 있는 중이고 일단 회원가입 까지는 구현 했어',
        '고생이 많네 좀더 화이팅해서 에이쁠 맞자 다들',
        '그래서 딱 이주만 고생해보자',
        '그래 모두 수고하고 있네 오늘 회의는 여기서 끝내자 수고'

    ]

    
    for i in temp:
       query = LogInfo(meeting_id=2,user_id = 'test', log_time='00:00',log_feeling='happy', log_text=i)
       db.session.add(query)
       db.session.commit()
    print('삽입 성공~!')

    return redirect(url_for('index'))
# 요약문 코드 해보는곳 --------------------------
@app.route('/summarize_log')
def summarizeLog():
    li = LogInfo.query.all()
    text=''
    # for로 모두 출력
    for row in li :
        if row.meeting_id==2:
            text = text + row.log_text+'\n'
   
   
    print(text)
  
    rat=len(text)
    
    from gensim.summarization.summarizer import summarize
    
    print(summarize(text))

    return redirect(url_for('index'))
# -----------------------------------------------
# -------워드클라우드 하는곳----------------------
@app.route('/word')
def wordCloud():
    li = LogInfo.query.all()
    text=''

    # for로 모두 출력
    for row in li :
        if row.meeting_id==2:
            text = text + row.log_text+'\n'
   

   
    '''c
    from wordcloud import WordCloud, STOPWORDS
    import matplotlib.pyplot as plt 

    
    wordcloud = WordCloud(font_path='C:\Jeonbar2\git_workspace\Brave_cookie\Before_Dev\jeonbar2\Flask_Test\BMDOHYEON_ttf.ttf', background_color='white').generate(text)

    plt.figure(figsize=(22,22)) #이미지 사이즈 지정
    plt.imshow(wordcloud, interpolation='lanczos') #이미지의 부드럽기 정도
    plt.axis('off') #x y 축 숫자 제거
    plt.show() 
    plt.savefig()
    '''
    try:
        import jpype
        import jpype1
        print('1')
    except:
        import jpype
        print(2)
    from konlpy.tag import Okt
    from collections import Counter
    from wordcloud import WordCloud
    import matplotlib.pyplot as plt 

    okt = Okt()
    noun = okt.nouns(text)
    count = Counter(noun)

    # 명사빈도 카운트 most_common(뽑아주고 싶은 단어의 갯수)
    noun_list = count.most_common(100)
    print('제일 많이 나온단어:',noun_list[0][1])
    wc = WordCloud(font_path ='C:\Jeonbar2\git_workspace\Brave_cookie\Before_Dev\jeonbar2\Flask_Test\BMDOHYEON_ttf.ttf',background_color="white",width=1000,
    height=1000,
    max_words=100,max_font_size=300)
    wc.generate_from_frequencies(dict(noun_list))
    wc.to_file('keyword.jpg')
    print(noun_list)

   
    return redirect(url_for('index'))

# ----------------------------------- REST API URL ----------------------------------------


# -----------------------------
@app.route('/api/test',methods=['POST'])
def test():
    print('요청 잘 왔어요!!!')
    return jsonify({ 'message' : '요청테스트'})


@app.route('/api/log/summary/<int:meeting_id>')
def summary(meeting_id):
    print('sss')
    print('미팅아이디',meeting_id)
    li = LogInfo.query.all()
    text=''
    # for로 모두 출력
    for row in li :
        if row.meeting_id==(meeting_id):
            text = text + row.log_text+'\n' 
   
    print(text)
    
    from gensim.summarization.summarizer import summarize
    summary_text=summarize(text)
    print('요약회의록 전송 성공')
    print(summary_text)
    return jsonify({ 'message' : '서머리테스트'},summary_text)





# -----------------------------------------------



# flask 서버를 5000번 포트로 구동
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
    socketio.run(app, debug=True)



'''

app.config.from_pyfile("config.py")
app.config['SQLALCHEMY_DATABASE_URL'] = config.DB_URL
database= create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
app.database = database

connection = database.connect()
metadata = sqlalchemy.MetaData()

table = sqlalchemy.Table('user_info',metadata,autoload=True,autoload_with=database)


print(table.columns.keys())

query = sqlalchemy.select([table])

# 이때 query의 내용을 출력해보면 sql query인 것을 알 수 있음
print(query)
result_proxy = connection.execute(query)
result_set = result_proxy.fetchall()

query = sqlalchemy.insert(table).values(user_id='내가',user_pw='이걸',user_email='했네',user_name='s') # 이때 values는 table의 column의 순서와 갯수가 일치해야 함
result_proxy = connection.execute(query)
result_proxy.close()
# 쿼리 실행

# 결과 print 이때 10개만 출력하도록 함. 단순한 set 자료구조의 형태를 하고 있음.
print(result_set)
@app.route("/")


def hello():
    print()
    return "z"

'''
