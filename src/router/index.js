import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import JavaScript from '@/pages/JavaScript/JavaScript'
import wechatProgram from '@/pages/wechatProgram/wechatProgram'
import iOS from '@/pages/iOS/iOS'
import Android from '@/pages/Android/Android'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/js',
            name: 'JavaScript',
            component: JavaScript
        },
        {
            path: '/wx',
            name: 'wechatProgram',
            component: wechatProgram
        },
        {
            path: '/ios',
            name: 'iOS',
            component: iOS
        },
        {
            path: '/android',
            name: 'Android',
            component: Android
        }
    ]
})
