<template>
  <div id="app">
    <keep-alive><router-view></router-view></keep-alive>
    <div class="footer">
      <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png"  size='2rem' @click="go_login"/>
      <van-icon name="setting-o" size='2rem' @click="setting"/>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
         user:[{name:'',password:''}], //已登录用户信息
      }
    },
    methods:{
      //路由跳转
      go_login(){
        this.$router.push({path:'/login'})
      },
      setting(){
        this.user =JSON.parse(this.$route.query.use);
        console.log(this.user)
        
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


</style>