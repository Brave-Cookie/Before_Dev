from imutils import paths
import os
import librosa
forder='C:/Jeonbar2/Capstone/최종 DB(3차년도)/cut'
files=paths.list_files(forder)

dataset=[]
label=[]

for i in files:
    y, sr = librosa.load(i, sr = 16000)
    dataset.append([y, sr])
    label.append((os.path.basename(i)).split('_')[3])

