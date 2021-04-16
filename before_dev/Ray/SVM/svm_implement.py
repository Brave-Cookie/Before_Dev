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
  signal, sr = librosa.load(i, sr=16000)

  # Extract 13 MFCCs
  MFCCs = librosa.feature.mfcc(signal, sr, n_fft=400, hop_length=160, n_mfcc=34 )
  return MFCCs

forder = '/content/drive/MyDrive/cut2'
files = paths.list_files(forder)

dataset=[]
label=[] 

for i in files:
  mfcc=getMFCC(i)
  dataset.append(mfcc.reshape(-1))
  label.append((os.path.basename(i)).split('_')[2])


from sklearn.preprocessing import LabelEncoder

# 인코더 생성
encoder = LabelEncoder()

encoder.fit(label)
y = encoder.transform(label)

from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X_train, X_val, y_train, y_val = train_test_split(dataset, y, test_size = 0.2, random_state = 42, shuffle = True)

clf = SVC(kernel = 'rbf', probability=True)

clf.fit(X_train, y_train)                                                                                                                                                                                                                                                                                                                  
clf.predict(X_val)

print(accuracy_score(clf.predict(X_val), y_val))
print("----")

# Define the paramter grid for C from 0.001 to 10, gamma from 0.001 to 10
C_grid = [0.001, 0.01, 0.1, 1, 10]
gamma_grid = [0.001, 0.01, 0.1, 1, 10]
param_grid = {'C': C_grid, 'gamma' : gamma_grid}

grid = GridSearchCV(SVC(kernel='rbf'), param_grid, cv = 3, scoring = "accuracy")
grid.fit(X_train, y_train)

# 파라미터 최적화
print(grid.best_score_)
print(grid.best_params_)
print(grid.best_estimator_)


# 최적화
clf = SVC(kernel = 'rbf', C = 1, gamma = 0.1, probability=True)

clf.fit(X_train, y_train)
print("----")
print(accuracy_score(clf.predict(X_val), y_val))
