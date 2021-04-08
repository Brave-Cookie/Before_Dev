import librosa, librosa.display
import matplotlib.pyplot as plt
import numpy as np
import os

def getMFCC(i):
  hop_length = 512
  n_fft = 512
  wav = i
  signal, sr = librosa.load(wav)

  time = np.linspace(0, len(signal)/sr, len(signal)) # time axis

  # Extract 13 MFCCs
  MFCCs = librosa.feature.mfcc(signal, sr, n_fft=n_fft, hop_length=hop_length, n_mfcc=13 )
  print('MFCCs.shape:',MFCCs.shape)

  # Display MFCCs
  librosa.display.specshow(MFCCs, sr=sr,hop_length=hop_length)
  plt.xlabel("Time")
  plt.ylabel("MFCC Coefficients")
  plt.colorbar()
  plt.title(wav + "MFCCs")

def getWaveform(i):
  hop_length = 512
  n_fft = 512
  wav = i
  signal, sr = librosa.load(wav)

  time = np.linspace(0, len(signal)/sr, len(signal)) # time axis

  fig, ax1 = plt.subplots() # plot
  ax1.plot(time, signal, color = 'b', label='speech waveform')
  ax1.set_ylabel("Amplitude") # y 축
  ax1.set_xlabel("Time [s]") # x 축
  plt.title(wav) # 제목
  plt.show()


anger = '/content/drive/MyDrive/files/s1_anger_M_a1.wav'
anger2 = '/content/drive/MyDrive/files/s1_anger_M_a2.wav'
neutral = '/content/drive/MyDrive/files/s1_neutral_M_n10.wav'
neutral2 = '/content/drive/MyDrive/files/s1_neutral_M_n11.wav'
sad = '/content/drive/MyDrive/files/s1_sadness_M_s6.wav'
happy = '/content/drive/MyDrive/files/s3_happiness_M_h4.wav'

data = [anger,anger2, neutral, neutral2, sad, happy]

for i in data: 
    getWaveform(i)
    getMFCC(i)




