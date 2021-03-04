<template>
  
  <div id="app">
    <keep-alive><router-view></router-view></keep-alive>
    <transition name="slide-fade">
      <div class="user_detail" v-show="isShow">
        <h2>用户设置</h2>
        <table class="info-card">
            <tr>
              <td>账号</td><td>{{list[0]}}</td>
            </tr>
            
            <tr>
              <td>密码</td><td>{{list[1]}}</td>
            </tr>
        </table>
      </div>
    </transition>
    <div class="footer">
      <van-icon name="service-o" size="2rem" @click="home"/>
      <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png"  size='2rem' @click="go_login"/>
      <van-icon name="setting-o" size='2rem' @click="setting"/>
      <van-icon name="shop-o" size="2rem" @click="shop"/>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState,mapActions,mapGetters} from 'vuex'


export default {
    data(){
      return{
         //user:[{name:'',password:''}], //已登录用户信息
         isShow:false,
         newuser:this.$store.state.user,
         list:[]
      }
    },
    components:{
      
    },
    computed:{
     // ...mapState(['gg_go']),//mapState()返回值:{count(){return this.$store.state['gg_go']}}
     ...mapState(['user'])
    },
    methods:{
      ...mapActions(['increment']),
      //路由跳转
      home(){
        this.$router.push({path:'/home'})
      },
      go_login(){
        this.$router.push({path:'/login'})
      },
      setting(){
        if(this.newuser.size === 0){
          Toast('个人设置请先登录/注册')
        }else{
          this.list = this.newuser.entries().next().value; 
          this.isShow =!this.isShow
        } 
      },
      shop(){
        this.$router.push({path:'/shop'})
      }
    }
}
</script>

<style>
/*底部 */
.footer{
  width:100%;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0%;
  z-index: 20;
  background: white;
}

.user_detail{
  z-index: 10;
  width: 100vw;
  height: 200vh;
  background: white;
  position: absolute;
  top: 0%;
  left: 0%;
}

.info-card{
  width: 100%;
}
.slide-fade-enter-active{
  transition: all .3s ease;
}
.slide-fade-leave-active{
  transition: all .3s ;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(100vw);
  opacity: 0;
}
h2{
  text-align: center;
}
.user_detail .info-card tr td:nth-child(2){
  text-align: right;
  padding-right:3.2vw;
  color: #999;
  max-width: 48vw;
}
</style>