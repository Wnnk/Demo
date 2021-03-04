import Vue from 'vue'
import Router from 'vue-router'
import  Login from '../components/Login'
import  Home  from '../../src/Home'
import  Shop from '../components/Shop'
import X7Plus from '../components/X7Plus'
import MyCart from '../components/MyCart'
import E43 from '../components/E43'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/home',
      component:Home,
    },
    {
      path:'/',
      redirect:"/home"
    },
    {
      path:'/shop',
      component:Shop
    },
    {
      path:'/mycart',
      component:MyCart
    },
    {
      path:'/X7Plus',
      component:X7Plus
    },
    {
      path:'/E43',
      component:E43
    }
    
  ]
})
