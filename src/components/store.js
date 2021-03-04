import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'vant'
import router from '@/router'
Vue.use(Vuex,router)

//进入页面读取本地存储数据
var car =JSON.parse(localStorage.getItem('car') || '[]')

const state = {
    active:2,
    user:new Map,
    user_name:'',   //用户名
    user_password:'',   //注册密码
    twice_password:'',  //确认注册密码
    login_name:'',      //登录 用户名
    login_password:'',  //登录密码
    car:car, //购物车
    

    
}

const mutations = {
   
    CHANGE_NAME(state,newVal){
        state.user_name = newVal
    },
    CHANGE_PASSWORD(state,newVal){
        state.user_password = newVal
    },
    CHANGE_TWICE(state,newVal){
        state.twice_password= newVal
    }, 
    LOGIN_NAME(state,newVal){
        state.login_name = newVal
    },
    LOGIN_PASSWORD(state,newVal){
        state.login_password = newVal
    },
    REGISTER(state){
        if(!state.user_name){
            Toast('用户名不能为空')
        }else if(!state.user_password){
            Toast('密码不能为空')
        }else if(state.twice_password != state.user_password){
            Toast('两次密码不一致')
        }else if(state.user.has(`${state.user_name}`) === true){
            Toast('该用户名已经存在')
        }else{
            state.user.set(`${state.user_name}`,`${state.user_password}`);
            state.active =1;
        }               
    },

    USER_LOGIN(){
        const check_name = state.user.has(`${state.login_name}`);
        const check_password = state.user.get(`${state.login_name}`);
        if(check_name === false){
            Toast('用户名不存在');
        }else if(check_password != state.login_password ){
            Toast('密码不正确');
        }else{
           router.push({path:'/home',query:{}});    //use:JSON.stringify(state.user)
           console.log(state.user)
           Toast('登录成功')
       }
   },

   BUYBUTTON(state,data){
        var flag =false; 
        state.car.forEach(item => {
            if(item.id ==data.id){
                item.count += parseInt(data.count)
                flag =true  
                return true
            }
        });
        if(!flag){
            state.car.push(data);
        }
        //本地存储购物车商品信息
        localStorage.setItem('car',JSON.stringify(state.car))
        Toast('已加入购物车')
   },
   //购物车商品更新数量
   UPCOUNT(state,update){
        state.car.forEach(item =>{
            if(item.id === update.id){
                item.count = update.count;
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
   },
   //购物车商品是否被选中
   ACCOUNT(state,upcheck){
        state.car.forEach(item=>{
            if(item.id ===upcheck.id){
                item.checked = upcheck.checked;
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))

   }

}

const actions = {
    increment({commit}){
        commit('INCREMENT')
    },
    register({commit}){
        commit('REGISTER')
    },
    user_login({commit}){
        commit('USER_LOGIN')
    },
}

const getters ={
    //相当于计算属性和filters
    //结算购物车总价
    getGoodsAmount(state){
        var o ={
            amount:0,
        }
        state.car.forEach(item=>{
            if(item.checked ===true){
                o.amount += (item.price * item.count)*100;
            }
        })
        return o
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})