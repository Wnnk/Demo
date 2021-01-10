<template>
    <div class="Login">
        <div class="nav">
            <span class="my-icon" @click="go_home">&#xe625;</span>
        </div>
        <div class="form">
            <van-tabs v-model="active">
                <van-tab title="注册">
                    <div class="register">
                         <div action="" class="register-form">
                            <h2>注册</h2>
                            <input type="text" 
                            name="username"
                            placeholder="用户名"
                            v-model="user_name"
                            >
                            <input type="password"
                            name="password"
                            placeholder="密码"
                            v-model="user_password">
                            <input type="password"
                            name="userword"
                            placeholder="确认密码"
                            v-model="twice_password">
                            <button  @click="register()">注册</button>
                         </div>
                    </div>
                   
                </van-tab>
                <van-tab title="登录">
                    <div class="register">
                         <div action="" class="register-form">
                            <h2>登录</h2>
                            <input type="text" 
                            name="username"
                            placeholder="用户名"
                            v-model="login_name"
                            >
                            <input type="password"
                            name="password"
                            placeholder="密码"
                            v-model="login_password">
                            <button type="submit" @click="user_login">登录</button>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    data(){
        return{
            active:2,   //tab
            user:new Map,    //用户列表
            user_name:'',   //用户名
            user_password:'',   //注册密码
            twice_password:'',  //确认注册密码
            login_name:'',      //登录 用户名
            login_password:'',  //登录密码

        }
    },
    mounted(){
    },
    methods:{
        go_home(){
            this.$router.push({path:'/home'})     
        },
        
        register(){
            if(!this.user_name){
                Toast('用户名不能为空')
            }else if(!this.user_password){
                Toast('密码不能为空')
            }else if(this.twice_password != this.user_password){
                Toast('两次密码不一致')
            }else if(this.user.has(`${this.user_name}`) === true){
                Toast('该用户名已经存在')
            }else{
                this.user.set(`${this.user_name}`,`${this.user_password}`);
                this.active =1;
                
            }
                        
        },
        user_login(){
             const check_name = this.user.has(`${this.login_name}`);
             const check_password = this.user.get(`${this.login_name}`);
             if(check_name === false){
                 Toast('用户名不存在');
             }else if(check_password != this.login_password ){
                 Toast('密码不正确');
             }else{
                this.$router.push({path:'/home',query:{use:JSON.stringify(this.user)}});
                console.log(this.user)
                Toast('登录成功')
            }
        },

    }
}
</script>

<style>
@font-face {
  font-family: 'my-icon';
  src: url('../../static/css/font/iconfont.eot');
  src: url('../../static/css/font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('../../static/css/font/iconfont.woff2') format('woff2'),
      url('../../static/css/font/iconfont.woff') format('woff'),
      url('../../static/css/font/iconfont.ttf') format('truetype'),
      url('../../static/css/font/iconfont.svg#iconfont') format('svg');
}
.my-icon {
  font-family: "iconfont" !important;
  font-size: 28px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
/*样式 */
.register{
    width: 100%;
    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;    
}
.register-form{
    width: 70%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    padding: 3rem;
    z-index: 100;
    background: inherit;
    border-radius: 18px;
    border: solid 1px;
    overflow: hidden;
}
.register-form h2{
    font-size: 18px;
    font-weight: 400;
    color: #3d5245;
}
.register-form input,
.register-form button{
    margin: 1rem 0;
    height: 2rem;
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 0 1rem;
}






</style>