import librosa, librosa.display
import matplotlib.pyplot as plt
import numpy as np
import os

FIG_SIZE = (15, 10)
hop_length = 512
n_fft = 522

wav = '/content/1_0025.wav'
(file_dir, file_id) = os.path.split(wav)
signal, sr = librosa.load(wav)

time = np.linspace(0, len(signal)/sr, len(signal)) # time axis

fig, ax1 = plt.subplots() # plot
ax1.plot(time, signal, color = 'b', label='speech waveform')
ax1.set_ylabel("Amplitude") # y 축
ax1.set_xlabel("Time [s]") # x 축
plt.title(file_id) # 제목
plt.savefig(file_id+'Waveform(n_fft: 522).jpg')
plt.show()

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
plt.savefig(file_id+'_MFCCs(n_fft: 522).jpg')


