import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import JavaScript from '@/pages/JavaScript/JavaScript'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            name: 'JavaScript',
            component: JavaScript
        }
    ]
})
