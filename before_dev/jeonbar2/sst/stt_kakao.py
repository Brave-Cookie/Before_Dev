import requests
import json

url = "https://kauth.kakao.com/oauth/token"

data = {
    "grant_type" : "authorization_code",
    "client_id" : "484f69c2137f8b747001f5e17af5f256",
    "redirect_uri" : "https://localhost.com",
    "code"         : "r7Rm80Qcgj3KsPmBu6L-qKUYkF_pqqCKlccMWgpYQOE4CBgYmbiIwDhGkBnf3QtX-pxDpAo9dGkAAAF4NkluQQ"
    
}
response = requests.post(url, data=data)

tokens = response.json()

print(tokens)