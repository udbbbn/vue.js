const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const route = require('koa-route')

const fs =  require('fs');
let io = require('socket.io');

// 微信通信方案
const obj = {
    user: [],
    message: []
}; // 消息对象
app.use(cors()); // 跨域
app.use(koaBody()); // 获取参数
app.use(route.post('/polling', async (ctx) => {
    let maxTimeOut = 25000;
    let oneTimeOut = 800;
    let timeRecording = 0;
    let acount = ctx.request.body.acount;

    let timeOutHandler = await new Promise((resolve, reject) => {
        let interval = setInterval((() => {
            timeRecording += oneTimeOut
            if (timeRecording > maxTimeOut) {
                    resolve(false)
                    clearInterval(interval)
                } else {
                    let newData = selectMessage(acount)
                    if (newData) {
                        clearInterval(interval)
                        resolve(JSON.stringify(newData))
                    }
                }
        }), oneTimeOut)
    })

    if (!timeOutHandler) {
        let data = selectMessage(acount)
        if (data === undefined) {
            ctx.body = '暂无消息'
        } else {
            ctx.body = JSON.stringify(data)
        }
    } else {
        ctx.body = timeOutHandler
    }
}))

function selectMessage(acount) {
    for (let i of obj.message) {
        if (i.receiver === acount && i.state === 0) {
            i.state = 1
            return i
        }
    }
}

app.use(route.post('/login', function (ctx) {
    let user = {
        name: ctx.request.body.acount,
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528184091&di=7bcb42fa3f4807b048e25f2f1f3dde09&imgtype=jpg&er=1&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201308%2F01%2F20130801113450_nBEQF.jpeg',
        sign: '默认签名'
    }
    obj.user[obj.user.length] = user
    ctx.body = JSON.stringify(obj.user)
}))

app.use(route.post('/leave', function (ctx) {
    let acount = ctx.request.body.acount
    obj.user.forEach((item, index) => {
        if (item.name === acount) {
            obj.user.splice(index, 1)
        }
    })
    ctx.body = JSON.stringify(obj.user)
}))

app.use(route.post('/send', function(ctx) {
    let sendSetting = JSON.parse(ctx.request.body.sendSetting)
    obj.message.push(sendSetting)
    ctx.body = '发送成功'
}))


let server = app.use(async ctx => {
    // ctx.response.type = 'html';
    // ctx.body = fs.createReadStream(__dirname + '/index.html');
}).listen(8033);
console.log(`server start at http://localhost:8033`)


// socket方案
io = io.listen(server);

const allUser = []; // 用于返回前台用户数组
const systemUser = []; // 用于处理信息发送

let chat = io.of('/chat').on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(`来自chat聊天房的消息：${data}`)
        receData = JSON.parse(data)
        for(let i of systemUser) {
            if (i.userId === receData.receiver) {
                i.socket.emit('message', data)
            }
        }
    })
    socket.on('login', (data) => {
        let system = {
            userId: data.userId,
            ip: socket.handshake.address,
            socket: socket
        }
        let user = {
            name: data.userId,
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528184091&di=7bcb42fa3f4807b048e25f2f1f3dde09&imgtype=jpg&er=1&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201308%2F01%2F20130801113450_nBEQF.jpeg',
            sign: '默认签名'
        }
        systemUser.push(system)
        allUser.push(user)
        console.log(allUser)
        socket.emit('userLogin', JSON.stringify(allUser))
        socket.broadcast.emit('userLogin', JSON.stringify(allUser))
    })

    socket.on('disconnect', () => {
        // 断开连接 删除用户
        for (let i in systemUser) {
            if (socket === systemUser[i].socket) {
                systemUser.splice(i, 1)
                allUser.splice(i, 1)
            }
        }
        if (systemUser.length !== 0) {
            socket = systemUser[0].socket
            socket.emit('userLeave', JSON.stringify(allUser))
            socket.broadcast.emit('userLeave', JSON.stringify(allUser))
        }
    })
})

