<template>
    <div class="My">
       <!--购物车物品-->
        <div class="cart"  v-for="(item,index) in Arr" :key="index" v-show="Arr!=null"> 
             <van-card
                :num="item.count"
                tag="热品"
                :price="item.price"
                desc="描述信息"
                :title="item.name"
                :thumb="item.url"
                />     
            <van-switch v-model="item.checked" class="switch" @change="upCheck(item)"/>
            <van-stepper v-model="item.count"  class="stepper" @change="upCount(item)"/>  
            
        </div>
        
        <div class="account">
            <van-submit-bar :price="$store.getters.getGoodsAmount.amount" button-text="提交订单" @submit="onSubmit" />
        </div>
    </div>
    
</template>

<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
           Arr:[]
        }
    },
    beforeMount(){
        this.$store.state.car.forEach(item => this.Arr.push(item));
        if(this.Arr.length <= 0){
            return;
        }
      
    },
    methods:{
        //修改购物车物品数量
        upCount(update){
            this.$store.commit('UPCOUNT',update)
        },
        //更新商品是否选中
        upCheck(upcheck){
            this.$store.commit('ACCOUNT',upcheck)
        },
        //提交订单
        onSubmit(){
            Toast('暂')
        }
    }
}
</script>

<style>
.My{
    background: #eee;
}
.cart{
    margin-bottom: 10%;
}
.switch{
    float: left;
}
.stepper{
    position: absolute;
    right: 0%;
}
</style>