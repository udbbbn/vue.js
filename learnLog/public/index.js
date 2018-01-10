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
        todos: [
            { text: '学习javascript' },
            { text: '学习Vue' },
            { text: '学习项目' }
        ]
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
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
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
    	bool: true
    },
    components: {
    	'child': Child
    },
    methods: {
    	boolSwitch: function(){
    		 this.bool = this.bool ? false : true
    	}
    }
})