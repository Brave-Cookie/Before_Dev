db = {
    'user'     : 'root',
    'password' : '11111111',
    'host'     : 'flogdb.csbcfamkafav.ap-northeast-2.rds.amazonaws.com',
    'port'     : '3306',
    'database' : 'flog'
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"