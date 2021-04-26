import requests
import json

url = "https://kakaoi-newtone-openapi.kakao.com/v1/recognize"

rest_api_key = '484f69c2137f8b747001f5e17af5f256'

headers = {
    "Content-Type": "application/octet-stream",
    "X-DSS-Service": "DICTATION",
    "Authorization": "KakaoAK " + rest_api_key,
}
import speech_recognition as sr
r = sr.Recognizer()
with sr.Microphone(sample_rate=16000) as source:
    print("say something!")
    audio=r.listen(source)
    audio.get_raw_data()
res=requests.post(url, headers=headers , data=audio.get_raw_data())

result_json_string = res.text[res.text.index('{"type":"finalResult"'):res.text.rindex('}')+1]
result = json.loads(result_json_string)

print(result)
print(result['value'])