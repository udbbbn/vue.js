
var http = require("http");

var obj = {
    message: []
};

setInterval(function() {
    var random = Math.floor(Math.random() * 10); //随机取 0-2 整数
    var result = {
        data: random,
        time: new Date().valueOf(),
        state: 0
    }
    obj.message.push(result)
    console.log(result)
}, 780)

function selectMessage() {
    for (var i in obj.message) {
        if (obj.message[i].data >= 8 && obj.message[i].state === 0) {
            obj.message[i].state = 1
            return obj.message[i]
        }
    }
}

var server = http.createServer(function (req, res) {
    if (req.url !== "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "text/html;application/json;charset=utf-8", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With' });
        var result
        //超时直接回调
        var restimeout = res.setTimeout(10000, function () {
            clearInterval(timeout)
            res.end('暂无消息');
        });
        
        var timeout = setInterval(function () {
            result = JSON.stringify(selectMessage())
            if (result) {
                clearInterval(timeout)
                clearTimeout(restimeout)
                console.log(result)
                res.end(result);
            } 
        }, 800);
    }
});
server.listen(1347, "localhost", function () {
    console.log("开始监听" + server.address().port + "......");
});