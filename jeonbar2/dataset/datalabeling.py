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
from sklearn.metrics import accuracy_score




forder='C:/Jeonbar2/Capstone/최종 DB(3차년도)/cut'
files=paths.list_files(forder)

dataset=[]
label=[]
label_n=[]

for i in files:
    y, sr = librosa.load(i, sr = 16000)
    dataset.append([y, sr])
    label.append((os.path.basename(i)).split('_')[3])
    '''
    if ((os.path.basename(i)).split('_')[3] == 'anger'):
        label_n.append(0)
    elif os.path.basename(i).split('_')[3]=='neutral':
        label_n.append(1)
    elif os.path.basename(i).split('_')[3]=='sadness':
        label_n.append(2)
    elif os.path.basename(i).split('_')[3]=='happiness':
        label_n.append(3)
    elif (os.path.basename(i)).split('_')[3]=='fear':
        label_n.append(4)
    '''
mfcc_dataset=[]
hop_length = 512  # 전체 frame 수
n_fft = 2048  # frame 하나당 sample 수
for data in dataset:
    MFCCs = librosa.feature.mfcc(data[0], data[1], n_fft=n_fft, hop_length=hop_length, n_mfcc=13)
    mfcc_dataset.append(MFCCs.reshape(-1))
    
from sklearn.preprocessing import LabelEncoder

# 인코더 생성
encoder = LabelEncoder()

encoder.fit(label)
y = encoder.transform(label)

x = mfcc_dataset


x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.2, random_state = 42)

parameters = {'kernel':['linear'], 'C':[50], 'gamma':['scale']}
svc = SVC()
clf = GridSearchCV(svc, parameters, cv = 5)
clf.fit(x_train, y_train)

print(clf.best_params_)


print(accuracy_score(clf.predict(x_test), y_test))

y_predict = clf.predict(x_test)
print(accuracy_score(y_test, y_predict))