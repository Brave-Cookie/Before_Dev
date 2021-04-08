
 //express를 설치했기 때문에 가져올 수 있다.
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello dfads!')
})

app.listen(8000)