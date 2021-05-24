FROM python:3.9

# 도커 컨테이너 내부의 경로 지정
WORKDIR /myfolder

# pip 명령어 실행
RUN pip install scikit-learn==0.24.2

# 첫번째 . >>> docker 명령어 실행한 로컬 폴더 기준 (여기부터 하위 파일 모두 복사)
# 두번째 /myfolder/ >>> linux 폴더 기준 (이 폴더에 복사)
COPY . /myfolder/

# docker build . -t test