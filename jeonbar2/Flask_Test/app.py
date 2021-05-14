from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from model import *

# flask app에 라이브러리 설정하기
app = Flask(__name__)

# DB 연동하는 부분
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:11111111@flogdb.csbcfamkafav.ap-northeast-2.rds.amazonaws.com:3306/flog'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# localhost:5000 으로 접속

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














# flask 서버를 5000번 포트로 구동
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)


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
