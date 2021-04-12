from imutils import paths
import os
import librosa
import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


def getMFCC(i):
  hop_length = 512
  n_fft = 512
  signal, sr = librosa.load(i, sr=16000)

  # Extract 13 MFCCs
  MFCCs = librosa.feature.mfcc(signal, sr, n_fft=n_fft, hop_length=hop_length, n_mfcc=13 )
  return MFCCs

forder = '/content/drive/MyDrive/cut'
files = paths.list_files(forder)

dataset=[]
label=[] 

k=0

for i in files:
  mfcc=getMFCC(i)
  dataset.append(mfcc.reshape(-1))
  label.append((os.path.basename(i)).split('_')[3])



# 인코더 생성
encoder = LabelEncoder()

encoder.fit(label)
y = encoder.transform(label)



X_train, X_val, y_train, y_val = train_test_split(dataset, y, test_size = 0.2, random_state = 42, shuffle = True)

clf = SVC(kernel = 'rbf', probability=True)

clf.fit(X_train, y_train)

clf.predict(X_val)

#print(accuracy_score(clf.predict(X_val), y_val))
