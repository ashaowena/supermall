<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @title-click="titleClick" ref="bar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="2">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="refresh()"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommends" ref="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import {getDetail,getRecommend, Goods, Shop, GoodsParam} from "@/network/detail.js"
import {debounce} from "@/common/utils";
import {backTopMixin} from "@/common/mixin";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodList from "@/components/content/goods/GoodList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import Toast from "@/components/common/toast/Toast";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      imageListener: null,
      themeTopY: [0],
      show: false,
      message: ''
    }
  },
  components: {
    DetailCommentInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    GoodList,
    DetailBottomBar,
    Toast,
    Scroll
  },
  mixins: [backTopMixin],
  methods: {
    refresh() {
      if(this.$refs.scroll) this.$refs.scroll.refresh()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,this.themeTopY[index])
    },
    scroll(position) {
      if (position.y >= this.themeTopY[1]) this.$refs.bar.currentIndex = 0
      else if (position.y >= this.themeTopY[2]) this.$refs.bar.currentIndex = 1
      else if (position.y >= this.themeTopY[3]) this.$refs.bar.currentIndex = 2
      else this.$refs.bar.currentIndex = 3
      this.isShowBackTop = position.y < -1000
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.price
      product.iid = this.iid
      this.$store.dispatch('addCart',product).then(res => {
        this.show = true
        this.message = res

        setTimeout(() => {
          this.show = false
          this.message = ''
        },1500)
      })
    }
  },
  mounted() {
    this.imageListener = debounce(() => {
      this.$refs.scroll.refresh()
      this.themeTopY[1]= -this.$refs.param.$el.offsetTop
      this.themeTopY[2] = -this.$refs.comment.$el.offsetTop
      this.themeTopY[3] = -this.$refs.recommends.$el.offsetTop
    })
    this.bus.$on('itemImageLoad', this.imageListener)

  },
  unmounted() {
    this.bus.$off('itemImageLoad',this.imageListener)
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品详细信息
      this.detailInfo= data.detailInfo;
      console.log('goods',data.itemInfo)
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    })

    getRecommend().then(res => {
        this.recommends = res.data.list
    })
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px - 55px);
    /*height: 100%;*/
    overflow: hidden;
  }
</style>
