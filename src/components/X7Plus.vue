<template>
    <div class="X7Plus">
        <div class="display">
            <van-swipe class="my-swipe"  @change="onChange">
                <van-swipe-item v-for="(image,i) in X7Plus " :key="i"   >
                    <img :src="image.url" alt="">
                 </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">{{ current + 1}}/2</div>
                </template>
            </van-swipe>
            </div>


            <p class="name">X7Plus 运动磁吸蓝牙耳机脖挂式半入耳超长待机</p>
            <p class="promotion">连续听歌20小时；智能降噪；狂甩不掉；超长续航；磁吸设计</p>
            <p class="price">
                <span class="fu">￥</span>
                <span class="my_price">{{ X7Plus_detail.price}}</span>
            </p>

            

            <div class="serive">
                
                <div class="tit_f-fl">
                    服务:
                </div>
                <div class="cnt" @click="into_serive">
                    <ul>
                        <li v-for="(item,index) in serive" :key="index">
                              {{item.name}}
                        </li>
                    </ul>
                    <div class="into">
                        >
                    </div>
                   
                </div>
            </div>

            <div class="bac" @click="leave_serive" v-show="bac"></div>
            <transition name="user-serive">
                <div class="explain" v-show="isShow">
                    <div class="into-detail">
                        <h3>服务</h3>
                        <ul>
                            <li v-for="(item,index) in serive" :key="index">
                                <h5>{{item.name}}</h5>
                                <p>{{item.pro}}</p>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </transition>

            <div  class="buy_count">
                <p>购买数量</p>
                <button @click="reduce_count">-</button>
                <p>{{defaultcount}}</p>
                <button @click="add_count">+</button>
            </div>

            
            <van-goods-action class="bottom_buy">
                <van-goods-action-icon icon="cart-o" text="购物车" @click="My_cart" />
                <van-goods-action-button
                    type="danger"
                    text="加入购物车"
                    @click="BuyButton()"
                />
            </van-goods-action> 
            
            
    </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
     data(){
         return{
            isShow:false,
            bac:false,
            X7Plus:[],
            current:0,
            serive:[],
            X7Plus_detail:{
                price:149.00,
                name:'X7Plus',
                url:require('../../static/img/digital_goods01.jpg'),
                checked:true,
            },
            defaultcount:1,
            id:0
         }
    },
    created:function(){
        
    },
    mounted(){
        this.X7Plus =[
            {
                url:require('../../static/img/X7Plus01.jpg'),
            },
            {
                url:require('../../static/img/X7Plus02.jpg')
            }
        ]
        this.serive = [
            {
                name:'自营商品',
                pro:'该商品均为自营，品质保证'
            },
            {
                name:'满119包邮',
                pro:'单笔订单金额（不含运费）满119元享受包邮服务'
            },
            {
                name:'7天无理由退货',
                pro:'该商品支持7天无理由退货，买家在商品签收日起7天内可在线发起退货申请',
            },
           
        ]
    },
    methods:{
    onChange(index) {
        this.current = index;
    },
    into_serive(){
        this.isShow =true;
        this.bac =true
    },
    leave_serive(){
        this.isShow =false;
        this.bac =false;
    },
    My_cart(){
        this.$router.push({path:'/mycart'})
    },
    BuyButton(){
        var X7Plus_detail ={
            id : this.id,
            count : this.defaultcount,
            price : this.X7Plus_detail.price,
            name  : this.X7Plus_detail.name,
            checked : this.X7Plus_detail.checked,
            url : this.X7Plus_detail.url
        }
        this.$store.commit('BUYBUTTON',X7Plus_detail)
        
    },
    add_count(){
        this.defaultcount++
    },
    reduce_count(){
        if(this.defaultcount<=1){
            Toast('商品数量不少于1')
        }else{
            this.defaultcount--
        }
    }



    }

}
</script>
   
<style>

.my-swipe img{
    width: 100%;
}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
}
.name{
    line-height: 1.3;
    font-size: 17px;
}
.promotion{
    margin: 6px 0 10px;
    font-size: 14px;
    color: #d33a31;
}
.fu{
    font-size: 17px;
    color: #d33a31;   
}
.my_price{
    font-size: 24px;
    color: #d33a31;
    
}
/*服务简明 */
.serive{
    margin-top: -5%;
    height: 3rem;
    border: 1px solid #f1f2f6;
    padding-top: 5%;
}
.tit_f-fl{
   float: left;
}
.cnt{
    position: relative;
}
.cnt ul{
   
    list-style-type:disc;
    padding-left: 1rem;
    color: #d33a31;
}
.cnt ul li{
    display: inline-block;
    padding-left: 1rem;
}
.into{
    position: absolute;
    right: 0%;
    top: 0%;
    font-size: 26px;
    color: #888;
}
/* 服务说明 */
.bac{
    position: fixed;
    top: 0%;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.7;
    z-index: 999;
   
}
.explain h3{
    text-align: center;
    font-size: 18px;
}
.explain{
    position: absolute;
    bottom: 0;
    background: white;
    width: 100%;
    z-index: 1000;
    border: 2px;
    border-radius: 5% 5% 0 0;
}
.explain p{
    color: #888;
    font-size: 13px;
}

.user-serive-enter-active{
    transition: all .3s ease;
}
.user-serive-leave-active{
    transition: all .3s;
}
.user-serive-enter, .user-serive-leave-to{
    transform: translateY(100%);
    opacity: 10;
}
.buy_count button{
    float: left;
    padding-top: 1rem;
    padding-right: 0.8rem;
}
.buy_count p{
    float: left;
    
}
/*底部 */
.bottom_buy{
    position:fixed;
    bottom: 5%;
}


</style>