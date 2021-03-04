<template>
    <div class="shop">
        <h3>数码产品</h3>
        
            <van-row type="flex"  justify="space-between" >
                <van-col span='12' v-for="(item,id) in digital_gooods" :key='id'>
                    <div class="detail">
                        <img :src="item.goods_url" @click="into_detail(item.id)">
                        <span class="detail-under">￥{{item.price}}</span>
                    </div>
                        <span class="detail-title">{{item.title}}</span>
                </van-col>
            </van-row>
        

        <h3>今日特价</h3>
            <van-row type="flex"  justify="space-between" >
                <van-col span='12' v-for="(item,id) in hot_goods" :key='id'>
                    <div class="detail">
                        <img :src="item.hot_url">
                        <span class="f-pa">
                            <span class="origin">￥{{item.price}}</span>
                            <span class="cut">
                                <del>
                                     ￥{{item.del_price}}
                                </del>
                            </span>
                        </span>
                        <span class="under">￥{{item.price}}</span>
                    </div>
                    <span class='detail-title'>{{item.title}}</span>
                </van-col>
            </van-row>
        <br>
        <br>        
    </div>

   
</template>


<script>
import { Toast } from 'vant'
export default {
    data(){
        return{
            digital_gooods:[],
            hot_goods:[],
        }
    },
    mounted(){
        this.digital_gooods = [
            {
                id:0,
                goods_url:require('../../static/img/digital_goods01.jpg'),
                title:'X7Plus 运动磁吸蓝牙耳机脖挂式半入耳超长待机',
                price:149,
            },
            {
                id:1,
                goods_url:require('../../static/img/digital_goods02.jpg'),
                title:'E43真无线蓝牙耳机蓝牙5.0超长待机安卓苹果通用双耳通话',
                price:299,
            },
        ]

        this.hot_goods =[
            {
                id:0,
                hot_url:require('../../static/img/01.jpg'),
                title:'蜡笔小新正版可爱灯芯绒斜挎包',
                price:49,
                del_price:99,
            },
            {
                id:1,
                hot_url:require('../../static/img/02.jpg'),
                title:'正义联盟iphonex苹果6/7/8Plus液体流沙手机壳',
                price:32,
                del_price:69,
            },
            {
                id:2,
                hot_url:require('../../static/img/03.jpg'),
                title:'哆啦A梦杯垫',
                price:39,
                del_price:69,
            },
            {
                id:3,
                hot_url:require('../../static/img/04.jpg'),
                title:'正义联盟蝙蝠侠高硼硅魔术变色玻璃杯',
                price:29,
                del_price:99,
            }
        ]
    },
    methods:{
        into_detail(id){
            if(id === 0){
                this.$router.push({path:'/X7Plus'})
            }else if(id === 1){
                console.log(id)
                this.$router.push({path:'/E43'})
            }else if(id >=2){
                Toast('暂第1.2个可进物品详细信息')
            }
        },
        
    }
}
</script>

<style>

.detail{
    border: 1px solid white;
    border-radius: 10px;
    background: #f1f2f6;
    position: relative;
}

.detail img{
    width: 100%;
    position: relative;
}
.detail-under{
    text-align: center;
    color: red;
    display: block;
}
.detail-title{
    text-align: center;
    color: black;
    display: block;
}
.under{
    text-align: center;
    color: red;
    display: block;
}
.f-pa{
    border-radius: 50%;
    background: red;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    width: 3rem;
    height: 3rem;
}
.origin{
    color: #fff;
    display: block;
    text-align: center;
}
.cut{
    display: block;
    text-align: center;
    color:#fff ;
}
</style>