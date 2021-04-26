import os
import numpy as np
from sklearn.preprocessing import LabelEncoder

forder = '/content/drive/MyDrive/cut'
files = paths.list_files(forder)

label=[] 

for i in files:
  label.append((os.path.basename(i)).split('_')[3])

# 라벨 인코더 생성
encoder = LabelEncoder()

encoder.fit(label)
y = encoder.transform(label)

print(y)
