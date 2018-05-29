// const util = require('util');

const Koa = require('koa');
const app = new Koa();

const fs =  require('fs');
let io = require('socket.io');

let server = app.use(async ctx => {
    // ctx.response.type = 'html';
    // ctx.body = fs.createReadStream(__dirname + '/index.html');
}).listen(8033);
console.log(`server start at http://localhost:8033`)

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
            avatar: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
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

let news = io.of('/news').on('connection', (socket) => {
    socket.emit('item', { news: 'item' });
    socket.on('message', (data) => {
        console.log(`来自news聊天房的消息：${data}`)
    })
})
