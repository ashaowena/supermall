<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pulling-up="loadMore">
      <template v-slot:default>
        <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabClick" ref="tabControl2" ></tab-control>
        <good-list :goods="showGoods"></good-list>

      </template>
    </scroll>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import {backTopMixin} from "@/common/mixin";
import Scroll from "@/components/common/scroll/Scroll";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll
  },
  data() {
    return {
      banner: [],
      recommends: [],
      goods: {
        'pop': {page: 1, list: []},
        'new': {page: 1, list: []},
        'sell': {page: 1, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      imageListener: null
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  mixins: [
    backTopMixin
  ],
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000
      this.isTabFixed = position.y < - this.tabOffsetTop
    },
    finishPullUp() {
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求
     * @param type
     */
    getHomeGoods(type) {
      let page = this.goods[type].page
      console.log(page)
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 结束上拉事件
        this.finishPullUp()
      })

    }

  },
  // watch: {
  //   goods: {
  //     handler(n,o) {
  //       try {
  //         this.$refs.scroll.scroll.refresh()
  //       } catch (e){}
  //
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  created() {
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    console.log('created')
  },
  // mounted() {
    // this.imageListener = debounce(this.$refs.scroll.refresh)
    // this.bus.$on('itemImageLoad', this.imageListener)

  // },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.imageListener = debounce(this.$refs.scroll.refresh)
    this.bus.$on('itemImageLoad', this.imageListener)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    this.bus.$off('itemImageLoad', this.imageListener)
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/

}



/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/

.tab-control {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.content {
  /*height: calc(100% - 98px);*/

  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.fixed {*/
/*  position: fixed;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 0;*/
/*}*/

</style>
