from imutils import paths
import os
import librosa
import numpy as np


def getMFCC(i):
  signal, sr = librosa.load(i, sr=16000)

  # MFCC를 통한 특징 벡터 추출 (n_mfcc=36)
  MFCCs = librosa.feature.mfcc(signal, sr, n_fft=400, hop_length=160, n_mfcc=36)
  return MFCCs

forder = '/content/drive/MyDrive/cut2'
files = paths.list_files(forder)

dataset=[]
label=[] 

for i in files:
  mfcc=getMFCC(i)
  dataset.append(mfcc.reshape(-1))
  label.append((os.path.basename(i)).split('_')[1])


from sklearn.preprocessing import LabelEncoder

# 라벨 인코더 생성
encoder = LabelEncoder()

encoder.fit(label)
y = encoder.transform(label)


from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 학습 데이터와 훈련 데이터 split
X_train, X_test, y_train, y_test = train_test_split(dataset, y, test_size = 0.2, random_state = 42, shuffle = True)

# 커널 설정
clf = SVC(kernel = 'linear', probability=True)


clf.fit(X_train, y_train)

# 정확도
print(accuracy_score(clf.predict(X_test), y_test))


import pickle
from sklearn.externals import joblib

# 학습한 모델 파일로 저장
joblib.dump(clf, 'model.pkl') 


# 파일로 저장된 모델 불러와서 예측
clf_from_joblib = joblib.load('model.pkl') 
clf_from_joblib.predict(X_test)
