<template>

  <div id="home">
    
   <van-tabs v-model="active" class="music">
  <van-tab title="播放">
    <hr>
    <!--data实例代替audio-->
    <!--<audio id="audioId" ref="audioRef" :src="defaultSong.song_url"></audio> --> 
    
    <!--轮播图-->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="(image,index) in banner_List" :key="index">
          <img :src="image.pic" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <br>

    <!--进度条-->
    <div class="slideSty">
      <van-slider v-model="slide_value" @change="onChange" />
    </div>
    <br>

   

    <!--歌曲名-->
    <div class="songName">
      <span>歌曲：{{defaultSong.name}}</span>
      <br>
    </div>
    
   

    <!--播放 暂停 上一首 下一首按钮-->
    <div class="play" >
      <van-row type="flex" justify="space-between">
        <van-col span="6" offset="4"><van-icon name="arrow-left" size="1.4em" style="margin-top:0.3em;" @click="isPrveBtn"/></van-col>
        <van-col span="6"><van-icon :name="playBtnName" size="2em" @click="playFn()"/></van-col>
        <van-col span="6"><van-icon name="arrow" size="1.4em" style="margin-top:0.3em" @click="isNextBtn"/></van-col>
      </van-row>
      <span class="iconfont" @click="keep_song" v-show="keep==true">&#xe6ae;</span>
      <span class="iconfont" @click="keep_song" v-show="keep==false">&#xe60a;</span>
      
    </div>
    <!--评分-->
    <div class="bom">
      <span>给我们评分吧</span>
      <van-rate v-model="value" @change='v_us' /> 
    </div>

    <!--歌曲列表-->
    <van-collapse v-model="activeNames">
      <van-collapse-item title="歌曲列表"  name='1' class="list1">
         <div class="slist">
           <ul>
             <li v-for="(song_item,index)  in song_List" :key="index" >
               <img :src="song_item.song_pic" alt="" v-if="song_List" style="height:5em;display:inline-block" @click="clickSong(index)">
               <span v-if="song_List"  class="song_Name" @click="clickSong(index)">{{song_item.name}}</span>
               <van-icon name="close" size="2rem" class="close" @click="delete_song(index)"/>
               <van-icon name="label-o" size="1.8rem" style="position:absolute;right:0%; bottom:5%"/>
               <hr>
             </li>
           </ul>
               
         </div>
      </van-collapse-item>
      
    </van-collapse>

    
  </van-tab>
 

  <van-tab title="歌曲推荐">
    <hr>
    <van-search v-model="s_value" placeholder="请输入搜索关键词" @keypress='use_search'/>
    <div ref="search_songlist">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="搜索列表" name="1">
          <ul>
            <li v-for="(item,index) in Search_List" :key="index">
              <span>{{item.name}}</span>
              <span>{{item.artists[0].name}}</span>
              <hr>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <hr>
    <h2 class="random_title" style="margin-left: 8px;">随机歌曲</h2>
    <van-icon name="music" size="3rem" @click="get_random"/>
    <span>(获取歌曲)</span>
    <div class="Ran" style="display:none;" ref="add_song" >
      <img :src="random_song.data.picurl" alt="" style="height:5em;" v-if="random_song.data">
      <span v-if="random_song.data" style="margin-left: 25%;">{{random_song.data.name}}</span>
      <van-icon name="add-o" size="1.8rem" @click="add" class="ad"/>
    </div>
    <hr>
    <h2>热歌榜</h2>
    <van-icon name="fire" size="3rem" />
    


  </van-tab>
</van-tabs>


  </div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
export default {
  data(){
    return{
      active:2, //选项切换值
      banner_List:[], //轮播图信息
      slide_value: 0,  //进度条
      song_List:[], //歌曲信息
      activeNames: ['1'],
      value: 3, //评价星值
      playBtnName:'play-circle-o', //播放暂停class
      isPlayTrue:0, //播放 暂停值
      defaultSong:'', //默认歌曲
      s_value:'', //搜索关键词
      SearchActive:['1'], //搜索下拉列表
      Search_List:[], //搜索返回的歌曲列表
      orderNum:0, //上，下首切换索引
      audioObj:null,//音频实例
      start:0,  //触发watch的进度条跟随音频改变事件
      random_song:[],//随机歌曲信息列表
      keep:false,   //单曲循环和循环切换
    };
  },
  mounted(){
    
    this.banner_List = [
      {
        pic:require('../static/img/banner1.jpg'),
      },
      {
        pic:require('../static/img/banner2.jpg'),
      },
      {
        pic:require('../static/img/banner3.jpg'),
      },
      {
        pic:require('../static/img/banner4.jpg'),
      },
      {
        pic:require('../static/img/banner5.jpg'),
      },
    ]
    //默认歌曲列表
    this.song_List =[
      {
        name:'我愿意',
        song_url:'../static/music/我愿意.mp3',
        song_pic:'http://p2.music.126.net/mZDaokBAXRLUdVFXKFjAQQ==/109951165511346138.jpg?param=130y130',
        singer:'摩登兄弟',
      },
      {
        name:'是但求其爱',
        song_url:'../static/music/是但求其爱.mp3',
        song_pic:'http://p1.music.126.net/flFrObLA9GZdj8B0b6ni1A==/109951165480807278.jpg?param=130y',
        singer:'陈奕迅',
      },
      {
        name:'去见你',
        song_url:'../static/music/去见你.mp3',
        song_pic:'http://p2.music.126.net/yI7Pf2XGAitw5OuImEyuRg==/109951163954891400.jpg?param=130y130',
        singer:'徐秉龙',
      },

    ]

    
    //读取本地存储音乐
    this.song_List = JSON.parse(localStorage.getItem('str_song'));

    //加载默认音乐
    this.get_song();
    this.start =1;

  },




  methods:{
    //加载mouned 创建audioObj实例
    get_song(){
       
      this.defaultSong = this.song_List[0];
      if(this.audioObj ===null){
        this.audioObj =new Audio(this.song_List[this.orderNum].song_url);
      }else{
        this.audioObj.src = this.song_List[this.orderNum].song_url;
      }
     

    },
    //拖动进度条事件
    onChange(slide_value) {
      //Toast('当前值：' + slide_value);
      //改变进度条 当前音频时间改变
      this.audioObj.currentTime = (slide_value/100) * this.audioObj.duration;
      this.audioObj.play();
      this.playBtnName = 'pause-circle-o';
      this.isPlayTrue =1;
      //测试
      //console.log("当前时间"+this.audioObj.currentTime);
      //console.log('总时间' + this.audioObj.duration);
      //console.log('进度' + slide_value);

    },
  
    //点击歌曲列表切换歌曲
    clickSong(index){
      this.orderNum = index;
      this.swichSong();
    },
    //评价事件
    v_us(value){
        Toast('感谢你的' + value + '星!!!');
    },
    //播放 暂停
    playFn(){
      
        if(this.isPlayTrue === 0){
            this.audioObj.play();
            this.playBtnName = 'pause-circle-o';
            this.isPlayTrue =1;
            //this.slide_value =this.slide_value + 0.000001;
        }else{
            this.audioObj.pause();
            this.playBtnName = 'play-circle-o';
            this.isPlayTrue =0;
        }
    },
    //下一首歌曲
    isNextBtn(){
        this.orderNum++;
        if(this.orderNum > this.song_List.length -1){
          this.orderNum = 0;
        }
       // console.log(this.orderNum);
        //默认切换歌曲播放
        this.swichSong();
        
    },
    //上一首歌曲
    isPrveBtn(){
      this.orderNum--;
      if(this.orderNum < 0){
        this.orderNum = this.song_List.length -1;
      }
      //console.log(this.orderNum);
      this.swichSong();
    },
    //切换歌曲的变换封装
    swichSong(){
      this.playBtnName = 'pause-circle-o';
      this.isPlayTrue =1;
      //Audio.src 音频来源切换
      this.audioObj.src = this.song_List[this.orderNum].song_url;
      this.audioObj.play();
      this.defaultSong = this.song_List[this.orderNum];
      //进度条归零
      this.slide_value =0;
      
    },


    /*
    音乐推荐部JS
    */
    use_search(event){
      //用户输入完成，13为回车键
      if(event.keyCode == 13){
        if(!this.s_value){
          this.$refs.search_songlist.style.display = 'none'
        }
        else{ //阻止回车键的默认事件冒泡
            event.preventDefault();
            let rch_api =`https://v1.alapi.cn/api/music/search?keyword=${this.s_value}`
            axios.get(rch_api).then(Response=>{
              this.Search_List = Response.data.data.songs
              //console.log(this.Search_List);
              this.$refs.search_songlist.style.display = 'block'
            }).catch(error=>{
              console.log(error);
            })
        }
      }
       
    },


    //axios获取随机歌曲
    get_random(){
      const randon_api ='https://api.uomg.com/api/rand.music?sort=热歌榜&format=json';
      axios.get(randon_api).then(Response=>{
        this.random_song = Response.data
        console.log(this.random_song)
      }).catch(error =>{
        console.log(error);
      })
      //点击图标后显示
      this.$refs.add_song.style.display = "block"
    },
    //增加随机歌曲
    add(){
       const song_have= this.song_List.find(this.find_song);
       if( !song_have ){
           this.song_List.push({name:`${this.random_song.data.name}`,song_url:`${this.random_song.data.url}`,song_pic:`${this.random_song.data.picurl}`});
           Toast(`已将${this.random_song.data.name}加入歌曲列表` );
           this.storage_song();
       }else{
         Toast('该歌曲已存在列表');
       }
      
    },
    //判断列表是否存在该歌曲
    find_song(fruit){
      return fruit.name ===`${this.random_song.data.name}`
    },
    //删除该歌曲
    delete_song(index){
      //删除歌曲列表指定的歌曲
      this.song_List.splice(index,1);
      //通过本地重新存储来删除该歌曲
      this.storage_song();
      
    },
    //localStorage 储存歌曲
    storage_song(){
      localStorage.setItem('str_song',JSON.stringify(this.song_List));
    },
    //单曲循环切换
    keep_song(){
      this.keep= !this.keep;
    },
   
  },
  watch:{
    
   start(){
      const timer = setInterval(()=>{
        const numbers =this.audioObj.currentTime/this.audioObj.duration; 
        let prenumber = (numbers * 100);//进度条的百分比
        //console.log(prenumber);
       //自动跳转下一首
        if(prenumber >= 100 && this.keep ===false){
          this.isNextBtn();
        }else if(prenumber >=100 && this.keep ===true){//单曲循环实现
          prenumber =0;
          this.swichSong();
        }
        this.slide_value = prenumber;
        //console.log(prenumber)
      },1000)
   }
  }
 
}
</script>

<style>
.music{
  position: relative;
}
.my-swipe{
   margin: 0 3% 1% 3%;
}
.my-swipe img{
  width: 100%;
  height: 100%;
}
.slideSty{
 margin: 0 3% 1% 3%;
 background:#a4b0be ;
}
.songName {
 text-align: center;
 /*background:rgb(192, 191, 192);*/
 margin: 0 3% 0% 3%;
}
.play {
  margin: 0 3% 1% 3%;
  /*background:rgb(192, 191, 192);*/
}
.slist li{
  position: relative;
}
.slist img{
  border-radius: 50%;
}
.song_Name{
  margin-left: 25%;
}
.close{
  position: absolute;
  right: 0%;
 
}
.bom{
  margin-left: 20%; 
}
/*单曲循环样式 */
@font-face {
  font-family: 'iconfont';
  src: url('../static/css/font/iconfont.eot');
  src: url('../static/css/font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('../static/css/font/iconfont.woff2') format('woff2'),
      url('../static/css/font/iconfont.woff') format('woff'),
      url('../static/css/font/iconfont.ttf') format('truetype'),
      url('../static/css/font/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left:45% ;
  
}


/*第二部分 */
.comments{
  margin:0 3% 1% 3%;
}
.Ran{
  position: relative;
  
}
.ad{
  position: absolute;
  right: 0%;
  bottom:0%;
}




</style>
