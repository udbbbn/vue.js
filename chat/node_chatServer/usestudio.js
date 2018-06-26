
var http = require("http");
var redis = require('redis');
var RDS_PORT = 6379
var RDS_HOST = '127.0.0.1'
var RDS_OPTS = {}
var client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS)

var user = [] // 用户数组

var userRes = { // 用户response对象

}

client.on('ready', () => {
    console.log('ready')
})

var server = http.createServer(function (req, res) {
    // 发送消息处理函数
    if (req.url === '/send' && req.method === "POST") {
        // 接收post数据
        var post = '';
        req.on('data', function (chunk) {
            post += chunk;
        });
        req.on('end', function () {
            post = JSON.parse(post);
            client.get(post.rece, function (err, val) {
                if (err) {
                    console.log(err)
                } else {
                    var result = userRes[post.rece].end(JSON.stringify(post))
                    // 第一条消息 初始化
                    if (val === null) {
                        var userObj = {}
                        userObj['msg'] = []
                        userObj['unread'] = []
                        if (result) {
                            // 已读消息
                            userObj['msg'].push(post)
                        } else {
                            // 若为false 证明连接失效 加入离线消息
                            userObj['unread'].push(post)
                        }
                    } else {
                        // 已经初始化过情况
                        var userObj = JSON.parse(val)
                        if (result) {
                            // 已读消息
                            userObj['msg'].push(post)
                        } else {
                            // 若为false 证明连接失效 加入离线消息
                            userObj['unread'].push(post)
                        }
                    }
                    client.set(post.rece, JSON.stringify(userObj), redis.print)
                }
            })

        });
        // 获取未读消息
    } else if (req.url === "/getUnread" && req.method === "POST") {
        res.writeHead(200, { "Content-Type": "text/html;application/json;charset=utf-8", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With' });
        // 接收post数据
        var post = '';
        req.on('data', function (chunk) {
            post += chunk;
        });
        req.on('end', function () {
            // 若有离线消息 直接发送
            client.get(post, function (err, val) {
                if (err) {
                    console.log(err)
                } else {
                    // 若redis存有该用户数据
                    if (val !== null) {
                        // 获取用户数据
                        var userObj = JSON.parse(val)
                        // 若有未读消息
                        if (userObj.unread.length !== 0) {
                            // 返回未读消息于前台
                            res.end(JSON.stringify(userObj.unread))
                            // 将未读消息添加到已读消息
                            userObj.msg = userObj.msg.concat(userObj.unread)
                            // 清空未读消息
                            userObj.unread = []
                            // 设置用户数据
                            client.set(post, JSON.stringify(userObj), redis.print)
                        } else {
                            res.end(0)
                            return
                        }
                    } else {
                        res.end(0)
                    }
                }
            })


        });
        // 轮询
    } else if (req.url === "/polling" && req.method === "POST") {
        res.writeHead(200, { "Content-Type": "text/html;application/json;charset=utf-8", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With' });
        // 接收post数据
        var post = '';
        req.on('data', function (chunk) {
            post += chunk;
        });
        req.on('end', function () {
            // 将response对象加入userRes对象中
            userRes[post] = res
            if (user.indexOf(post) === -1) {
                // 将用户加入user数组中
                user.push(post)
            }
        });
        // 获取当前在线用户
    } else if (req.url === "/getUser" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html;application/json;charset=utf-8", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With' });
        for (var i in userRes) {
            // 向所有用户发送用户数组
            userRes[i].end(JSON.stringify(user))
        }
    }
});
server.listen(1347, "localhost", function () {
    console.log("开始监听" + server.address().port + "......");
});