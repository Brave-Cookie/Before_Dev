import librosa, librosa.display
import matplotlib.pyplot as plt
import numpy as np
import os

wav='1_0050.wav'
#(file_dir, file_id) = os.path.split(wav)

y, sr = librosa.load(wav) # sampling rate(sr)은 default 22500
time = np.linspace(0, len(y)/sr, len(y)) # time axis

fig, ax1 = plt.subplots() # plot
ax1.plot(time, y, color = 'b', label='speech waveform')
ax1.set_ylabel("Amplitude") # y 축
ax1.set_xlabel("Time [s]") # x 축
#plt.title(file_id) # 제목
#plt.savefig(file_id+'.png')
plt.show()