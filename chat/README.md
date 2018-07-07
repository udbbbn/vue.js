# chat

> vue + node 聊天室
>  
> 请先启动 node_chatServer 文件夹下的 app.js 

	该项目登录使用的是 cookies 所以测试效果需要用多个浏览器或无痕
	模式。
	因为主要是对 socket 跟 vue 的应用，对登录没有验证，随意登录。
	
---

 `node_chatServer`文件夹内还有两个 `usestudio`文件，是ajax长轮询方案，支持**离线消息**跟**redis**。 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
