import speech_recognition as sr

# microphone에서 auido source를 생성합니다
r = sr.Recognizer()
with sr.Microphone() as source:
    print("Say something!")
    audio = r.listen(source)
    print("goodbye")

with open("microphone-results.wav", "wb") as f:
    f.write(audio.get_wav_data())