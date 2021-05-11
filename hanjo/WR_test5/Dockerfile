# node.js 이미지 생성
FROM node:14.16.1

# 도커 컨테이너 내부의 경로 지정
WORKDIR /myfolder

# 첫번째 . >>> docker 명령어 실행한 로컬 폴더 기준 (여기부터 하위 파일 모두 복사)
# 두번째 /myfolder/ >>> linux 폴더 기준 (이 폴더에 복사)
COPY . /myfolder/

# 
RUN npm install

# 도커 내부에서 열어둘 포트 지정
EXPOSE 8000 80

#
CMD ["node", "server.js"]


# docker build . -t nodetest
# docker run -d --name nodetest_con -p 8000:8000 nodetest