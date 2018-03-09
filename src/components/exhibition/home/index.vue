<template>
    <div class="home">
        <div class="home__card-cont">
            <div class="home__card-cont__card" v-for="(item, index) in project" :key="index">
                <div class="cover">
                    <img :src="item.pic" class="image" :class="{'s-code': !item.isWap}" v-if="!item.isWap">
                    <span v-else>{{item.title}}</span>
                </div> 
                <div class="bottom">
                    <span class="iconfont" v-if="item.isWap">&#xe603;</span>
                    <span class="iconfont" v-else>&#xe602;</span>
                    <span class="iconfont"></span>
                    <a :href="item.href" target="_blank">{{item.title}}</a> 
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import "components/exhibition/home/index.scss"

export default {
  name: 'Home',
  data() {
    return {
        project: [
            {
                'isWap': true,
                'title': '看盘惠州', 
                'date': '2016-11', 
                'href': 'http://housemarket.leanapp.cn',
                'pic': 'http://img.hb.aicdn.com/87cec5c3b74f5b3f3fa48f1d48f4868091295d7a454a-OWoYak_fw658'
            },
            {
                'isWap': false,
                'title': '博客小程序版',
                'date': '2017-11',
                'pic': 'http://img.hb.aicdn.com/f489f3124ca18a06d706da14fd2476a194d14cf016db-nm8fxK_fw658'
            },
            {
                'isWap': true,
                'title': '作品集',
                'date': '2018-03',
                'href': 'http://demos.leanapp.cn'

            }
        ] 
    }
  },
  mounted() {
    let vm= this;
  }
}
</script>
