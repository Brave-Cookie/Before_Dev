from imutils import paths
import os
import librosa
forder='C:/Jeonbar2/Capstone/최종 DB(3차년도)/cut'
files=paths.list_files(forder)

dataset=[]
label=[]
label_n=[]

for i in files:
    y, sr = librosa.load(i, sr = 16000)
    dataset.append([y, sr])
    label.append((os.path.basename(i)).split('_')[3])
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
print(label)
print(label_n)
print(len(label))