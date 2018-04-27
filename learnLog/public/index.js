/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-01-07 15:02:31
 * @version $Id$
 */

require('./css/main.css');
import Vue from './vue'

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello vue!'
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: '#app3',
    data: {
        seen: true
    }
})

let app4 = new Vue({
    el: '#app4',
    data: {
        todos: [{
            text: '学习javascript'
        }, {
            text: '学习Vue'
        }, {
            text: '学习项目'
        }]
    }
})

let app5 = new Vue({
    el: '#app5',
    data: {
        message: 'Hello Vue.js'
    },
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

let app6 = new Vue({
    el: '#app6',
    data: {
        message: 'hello vue'
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [{
            id: 0,
            text: '蔬菜'
        }, {
            id: 1,
            text: '奶酪'
        }, {
            id: 2,
            text: '随便其它什么人吃的东西'
        }]
    }
})

let obj = {
    foo: 'bar'
}

//Object.freeze(obj); // 防止修改现有的属性

let app8 = new Vue({
    el: '#app8',
    data() {
        return {
            obj
        }
    },
    created: function() {
        console.log('obj.foo is:' + this.obj.foo);
    }
})

app8.$watch('obj.foo', function(newValue, oldValue) {
    console.log(newValue, oldValue);
})


var Child = {
    // 声明 props
    props: ['myMessage'],
    // 就像 data 一样，prop 也可以在模板中使用
    // 同样也可以在 vm 实例中通过 this.message 来使用
    template: '<span>{{ myMessage }}</span>'
}
let app9 = new Vue({
    el: '#app9',
    // 该用法不推荐 容易导致XSS攻击
    data: {
        rawHtml: '<span style="color: red">This should be red.</span>',
        isActive: true,
        hasError: true,
        classObject: {
            'testClass': true
        }
    },
    computed: {
        now: function() {
            return Date.now()
        }
    },
    components: {
        'child': Child
    }
})

// 动态props
let app10 = new Vue({
    el: '#app10',
    data: {
        parentMsg: 'Hello Vue',
        bool: true,
        obj: {},
        numbers: [1, 2, 3, 4, 5]
    },
    components: {
        'child': Child,
    },
    methods: {
        boolSwitch: function() {
            this.bool = this.bool ? false : true
        }
    },
    computed: {
        Numbers: function() {
            return this.numbers.filter(function(number) {
                return number % 2 === 0
            })
        }
    }
})

// es6给对象新增多个属性
Object.assign(app10.$data, {
    age: 27,
    test: 'ok'
})

// 推荐使用这个方法
app10.obj = Object.assign({}, app10.obj, {
    qwe: '这种也可以'
})

Vue.component('todo-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
    props: ['title']
})

new Vue({
    el: '#todo-list',
    data: {
        newTodoText: '',
        todos: [{
            id: 1,
            title: 'Do the dishes'
        }, {
            id: 2,
            title: 'Take out the trash'
        }, {
            id: 3,
            title: 'Mow the lawn'
        }],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function() {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
})

new Vue({
    el: '#example-3',
    data: {
        checkedNames: []
    }
})

new Vue({
    el: '#example-5',
    data: {
        selected: ''
    }
})

Vue.component('example', {
    // props验证
    props: {
        // 基础类型检测(`null` 指允许任何类型)
        propA: Number,
        // 可能是多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
            type: String,
            required: true
        },
        // 数值且有默认值
        propD: {
            type: Number,
            default: 100
        },
        // 数组/对象的默认值应当由一个工厂函数返回
        propE: {
            type: Object,
            default: function() {
                return {
                    message: 'hello'
                }
            }
        },
        // 自定义验证函数
        propF: {
            validator: function(value) {
                return value > 10
            }
        }
    },
    template: `<div>{{ propC }}</div>`
})

new Vue({
    el: '#example2',
    data: {
        propD: 120,
        propC: 'test'
    }
})


// const AsyncComp = () => ({
//   // 需要加载的组件。应当是一个 Promise
//   component: import('./MyComp.vue'),
//   // 加载中应当渲染的组件
//   loading: LoadingComp,
//   // 出错时渲染的组件
//   error: ErrorComp,
//   // 渲染加载中组件前的等待时间。默认：200ms。
//   delay: 200,
//   // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
//   timeout: 3000
// })
// 

// 组件间的循环引用 暂未实现
Vue.component('tree-folder-contents', {
    template: `
    <ul>
      <li v-for="folder in folders">
        <tree-folder v-bind:folder="folder"></tree-folder>
      </li>
    </ul>
    `,
    props: ['folder'],
    beforeCreate: function() {
        // this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
    }
})

new Vue({
    el: '#demo',
    data: {
        show: true,
        show1: true,
        show3: true,
        isEditing: true,
        docState: 'saved'
        // 组件间的循环引用 暂未实现
        // folders: [{
        //         name: 'folder1',
        //         children: [{
        //             name: 'folder1 - folder1',
        //             children: [{
        //                 name: 'folder1 - folder1 - folder1'
        //             }]
        //         }, {
        //             name: 'folder1 - folder2',
        //             children: [{
        //                 name: 'folder1 - folder2 - folder1'
        //             }, {
        //                 name: 'folder1 - folder2 - folder2'
        //             }]
        //         }]
        //     },
        //     {
        //         name: 'folder 2',
        //         children: [{
        //             name: 'folder2 - folder1',
        //             children: [{
        //                 name: 'folder2 - folder1 - folder1'
        //             }]
        //         }, {
        //             name: 'folder2 - folder2',
        //             children: [{
        //                 name: 'folder2-content1'
        //             }]
        //         }]
        //     },
        //     {
        //         name: 'folder 3',
        //         children: [{
        //             name: 'folder3 - folder1',
        //             children: [{
        //                 name: 'folder3 - folder1 - folder1'
        //             }]
        //         }, {
        //             name: 'folder3 - folder2',
        //             children: [{
        //                 name: 'folder3-content1'
        //             }]
        //         }]
        //     }
        // ],
    },
    computed: {
        buttonMessage: function() {
            switch (this.docState) {
                case 'saved':
                    return 'Edit'
                case 'edited':
                    return 'Save'
                case 'editing':
                    return 'Cancel'
            }
        }
    },
    // 动画 JavaScript 钩子
    methods: {
        beforeEnter: function(el) {
            el.style.opacity = 0
            el.style.transformOrigin = 'left'
        },
        enter: function(el, done) {
            Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
            Velocity(el, { fontSize: '1em' }, { complete: done })
        },
        leave: function(el, done) {
            Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
            Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
            Velocity(el, {
                rotateZ: '45deg',
                translateY: '30px',
                translateX: '30px',
                opacity: 0
            }, { complete: done })
        },
        switchStatus: function() {
            this.docState = this.docState === 'saved' ? 'edited' : 'editing'
        }

    }
})

// 函数组件 
Vue.component("my-special-transition", {
    functional: true,
    render: function(createElement, context) {
        var data = {
            props: {
                name: 'very-special-transition',
                mode: 'out-in'
            },
            on: {
                beforeEnter: function(el) {

                },
                afterEnter: function(el) {

                }
            }
        }
        return createElement('transition', data, context.children)
    }
})

new Vue({
    el: "#staggered-list-demo",
    data: {
        query: '',
        list: [
            { msg: 'Bruce Lee' },
            { msg: 'Jackie Chan' },
            { msg: 'Chuck Norris' },
            { msg: 'Jet Li' },
            { msg: 'Kung Fury' }
        ]
    },
    computed: {
        computedList: function() {
            var vm = this
            return this.list.filter(function(item) {
                return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
            })
        }
    },
    methods: {
        beforeEnter: function(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function(el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function() {
                Velocity(el, { opacity: 1, height: '1.6em' }, { complete: done }, delay)
            })
        },
        leave: function(el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function(){
                Velocity(el, {opacity:0, height:0}, {complete: done}, delay)
            })
        }
    }
})