var spawn = require("child_process").spawn;
var process = spawn('python',["test.py", "한", "예지"]);


process.stdout.on('data', function (data){
    // Do something with the data returned from python script
    console.log(data.toString('utf-8'));
});
