// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './components/store'


import { Button,Col,Row,Tab,Tabs,Swipe,SwipeItem,Slider,Icon,Collapse,CollapseItem,Rate,Search,PullRefresh,SubmitBar, GoodsAction, GoodsActionIcon, GoodsActionButton,Checkbox, CheckboxGroup, Card,  
  Switch,Stepper, Skeleton} from 'vant';

Vue.use(Button).use(Col).use(Row).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Slider)
Vue.use(Icon).use(Collapse).use(CollapseItem).use(Rate).use(Search).use(PullRefresh).use(SubmitBar).use(GoodsAction).use( GoodsActionIcon).use(GoodsActionButton)
Vue.use(Checkbox).use(CheckboxGroup).use(Card).use(Switch).use(Stepper).use(Skeleton)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //所有的组件对象都多了一个属性：$store
  components: { App },
  template: '<App/>',
})
