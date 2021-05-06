const {PythonShell} = require('python-shell');
const iconv = require('iconv-lite');
const fs = require('fs');


// fs.readFile('test4.txt', 'utf8', function(err, data){
//   if (err) throw err;
//   //console.log(data);

//   const options = {
//     mode: 'text',
//     pythonPath: '',
//     pythonOptions: ['-u'],
//     scriptPath: '',
//     args: [escape(data)]
//   };

//   PythonShell.run('textrank.py', options, function (err, results) {
//     if (err) throw err;
//     //var str = iconv.decode(Buffer.from(results[0]), 'utf-8');
//     console.log('results: %s', unescape(results));
//   });

// });
//var data = "유명 커피전문점과 인터넷 쇼핑몰에서 판매되는 스테인리스 텀블러 일부 제품에서 유해물질인 납이 다량 검출됐다.한국소비자원은 시중에서 판매 중인 텀블러 가운데 페인트로 외부를 코팅한 제품 24개를 대상으로 안전성을 조사한 결과 4개 제품에서 다량의 납이 검출됐다고 16일 밝혔다.조사 대상 텀블러는 커피전문점(9개)과 생활용품점(3개), 문구·팬시점(3개), 대형마트(4개), 온라인쇼핑몰(5개)에서 판매되는 제품 가운데 용기 외부의 표면을 페인트로 마감 처리한 제품이었다.우선 온라인쇼핑몰에서 판매되는 엠제이씨의 ‘리락쿠마 스텐 텀블러’와 파스쿠찌에서 판매되는 ‘하트 텀블러’, 할리스커피에서 판매되는 ‘뉴 모던 진공 텀블러 레드’, 다이소에서 판매되는 ‘S2019 봄봄 스텐 텀블러’의 외부 표면에서 다량의 납이 검출됐다고 소비자원은 밝혔다.납은 어린이의 지능 발달을 저하하고 식욕부진, 근육 약화 등을 유발할 수 있으며 국제암연구소에서 인체발암 가능 물질로 분류하고 있다.금속 재질의 텀블러는 표면 보호나 디자인을 위해 표면을 페인트로 마감한다. 이때 색상을 선명하게 하고 점착력을 높일 목적으로 납과 같은 유해 중금속을 첨가하는 경우가 있다.특히 표면에 납이 함유돼있으면 피부나 구강과 접촉을 통해 벗겨진 페인트를 흡입·섭취해 인체에 납이 흡수될 수 있다.그러나 식품과 접촉하는 면이 아닌 텀블러의 외부 표면에 대한 별도의 유해물질 기준은 마련돼 있지 않다.소비자원은 국내에서도 어린이 제품과 온열팩, 위생물수건 등 피부 접촉 제품에 대해서는 납 함량을 규제하고 있는 만큼 텀블러와 같은 식품 용기의 외부 표면에 대해서도 유해물질 관리 기준 마련이 필요하다고 보고 식품의약품안전처에 이를 요청하기로 했다.또 납이 검출된 4개 제품의 경우, 소비자 안전 확보를 위해 업체에서 자발적으로 판매를 중지하고 회수하기로 결정했다.실제 다이소는 이날 홈페이지 공지를 통해 소비자원 안전기준을 충족하지 못한 해당제품의 판매 중단을 결정하고 이미 구입한 소비자를 상대로 환불을 실시한다고 밝혔다.다이소는 “상품을 가지고 매장을 방문하면 구매시점과 사용여부, 구입매장, 영수중 유무, 포장개봉 여부와 관계없이 환불 조치할 것”이라고 밝혔다.";
var data = fs.readFileSync('test4.txt');
// console.log(data.toString());


//한글도 데이터 오갈수 있음 test.py를 실행시키면 확인할 수 있음
  const options = {
    mode: 'text',
    pythonPath: '',
    encoding: 'utf8',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: [escape(data.toString())]
  };

  PythonShell.run('textrank.py', options, function (err, results) {
    if (err) throw err;
    //var str = iconv.decode(Buffer.from(results[0]), 'utf-8');
    console.log('results: %j', unescape(results));

  //   fs.writeFile("text.txt", unescape(results), 'utf-8', function(e){
  //     if(e){
  //         console.log(e);
  //     }else{
  //         console.log('01 WRITE DONE!');
  //     }
  //   });
  });

// const {PythonShell} = require('python-shell');
// const pyshell = new PythonShell('test.py');
// const iconv = require('iconv-lite');

// const buf = Buffer.from('안녕');
// console.log(buf.toString());

// // sends a message to the Python script via stdi
// pyshell.send('안녕');
 
// pyshell.on('message', function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
//   console.log(message);
// });
 
// // end the input stream and allow the process to exit
// pyshell.end(function (err,code,signal) {
//   if (err) throw err;
//   console.log('The exit code was: ' + code);
//   console.log('The exit signal was: ' + signal);
//   console.log('finished');
//   console.log('finished');
// });