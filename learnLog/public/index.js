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
        boolSwitch: function() {
            this.bool = this.bool ? false : true
        }
    }
})

// 自定义事件
Vue.component('button-counter', {
    template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
    data: function() {
        return {
            counter: 0
        }
    },
    // props:{foo: {type: Object}},
    props: ['foo'],
    methods: {
        incrementCounter: function() {
            this.counter += 1
            this.$emit('increment')
            this.$emit('update:foo', 'newValue')
            this.$emit('update:bar', '321')
        }
    }
})

// 使用自定义事件的表单输入组件
Vue.component('currency-input', {
    template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
    props: ['value'],
    methods: {
        // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
        updateValue: function(value) {
            var formattedValue = value
                // 删除两侧的空格符
                .trim()
                // 保留 2 位小数
                .slice(
                    0,
                    value.indexOf('.') === -1 ?
                    value.length :
                    value.indexOf('.') + 3
                )
            // 如果值尚不合规，则手动覆盖为合规的值
            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue
            }
            // 通过 input 事件带出数值
            this.$emit('input', Number(formattedValue))
        }
    }
})

// 自定义组件的v-model
Vue.component('my-checkbox', {
    template: `<input @click="cqlick"/>`,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean,
        value: String
    },
    data: function() {
        return {
            myChecked: this.checked // 创建一个checked属性副本
        }
    },
    mounted: function() {
        this.$el.checked = this.checked
    },
    watch: {
        checked(val) {
            this.myChecked = val // 监听对props的更改并同步给myChecked
        },
        myChecked(val) {
            this.$emit("updata", val) // 组件内对myChecked变更后对外部发送事件通知
        }
    },
    methods: {
        cqlick: function() {
            this.myChecked = this.$el.checked;
        }
    }
})


// 插槽
Vue.component('my-component', {
    template: `
	<div>
	  <h2>我是子组件的标题</h2>
	  <slot>
	    只有在没有要分发的内容时才会显示。
	  </slot>
	</div>`,

})

// 具名插槽
Vue.component('app-layout', {
    template: `
	<div class="container">
	  <header>
	    <slot name="header"></slot>
	  </header>
	  <main>
	    <slot></slot>
	  </main>
	  <footer>
	    <slot name="footer"></slot>
	  </footer>
	    <slot text="hello from child"></slot>
	</div>`,

})

// 列表组件 配合作用域插槽
Vue.component('my-awesome-list', {
    template: `
	<ul>
	  <slot name="item"
	    v-for="item in items"
	    :text="item.text">
	  </slot>
	</ul>`,
	props: ['items']
})

new Vue({
    el: '#counter-event-example',
    data: {
        total: 0,
        q: { foo: 1, bar: 2 },
        something: 1,
        price: 321,
        foo: true,
		items: [{text: 1,id:1},
        {text: 2,id:2},
        {text: 3,id:3},
        {text: 4,id:4}],
        currentView: 'home'
    },
    methods: {
        incrementTotal: function() {
            this.total += 1
        },
        upFoo: function(val) {
            this.foo = val;
        }
    },
    created: function() {
    	Math.random() > 0.5 ? this.currentView = 'posts' : ""
    },
    components: {
    	home: {
    		template: `<div>随机数小于0.5</div>`
    	},
    	posts: {
    		template: `<div>随机数大于0.5</div>`
    	}
    }
})

