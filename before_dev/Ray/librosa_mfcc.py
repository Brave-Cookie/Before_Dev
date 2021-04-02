import librosa, librosa.display
import matplotlib.pyplot as plt
import numpy as np
import os

FIG_SIZE = (15, 10)
hop_length = 512
n_fft = 2048
wav = '/content/1_0025.wav'
(file_dir, file_id) = os.path.split(wav)
signal, sr = librosa.load(wav)

# Extract 13 MFCCs
MFCCs = librosa.feature.mfcc(signal, sr, n_fft=n_fft, hop_length=hop_length, n_mfcc=13 )
print('MFCCs.shape:',MFCCs.shape)
#--> MFCCs.shape : (13, 1293)

# Display MFCCs
plt.figure(figsize=FIG_SIZE)
librosa.display.specshow(MFCCs, sr=sr,hop_length=hop_length)
plt.xlabel("Time")
plt.ylabel("MFCC Coefficients")
plt.colorbar()
plt.title(file_id + "MFCCs")
plt.savefig(file_id+'_MFCCs.jpg')


