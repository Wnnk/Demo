// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { Button,Col,Row,Tab,Tabs,Swipe,SwipeItem,Slider,Icon,Collapse,CollapseItem,Rate,Search,PullRefresh } from 'vant';

Vue.use(Button).use(Col).use(Row).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Slider)
Vue.use(Icon).use(Collapse).use(CollapseItem).use(Rate).use(Search).use(PullRefresh)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
