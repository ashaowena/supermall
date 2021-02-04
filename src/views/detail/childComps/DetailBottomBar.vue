<template>
  <div class="bottom-bar">
    <div class="bottom-bar-other">
      <div class="bottom-bar-service">
        <div class="img"></div>
        <p>客服</p>
      </div>
      <div class="bottom-bar-shop">
        <div class="img"></div>
        <p>店铺</p>
      </div>
      <div class="bottom-bar-collect">
        <div class="img"></div>
        <p>收藏</p>
      </div>
    </div>
    <div class="bottom-bar-order">
      <div class="bottom-bar-cart" @click="addToCart">加入购物车</div>
      <div class="bottom-bar-buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  display: flex;
  background-color: #FFFFFF;
  text-align: center;
  .bottom-bar-other {
    flex: 1;
    display: flex;
    div {
      flex: 1;
    }
    .bottom-bar-service .img {
      height: 60%;
      background: url("~assets/img/detail/detail_bottom.png") no-repeat 50% 40% ;
      background-size: 43%;
    }
    .bottom-bar-shop .img {
      height: 60%;
      background: url("~assets/img/detail/detail_bottom.png") no-repeat 50% 78% ;
      background-size: 43%;
    }
    .bottom-bar-collect .img {
      height: 60%;
      background: url("~assets/img/detail/detail_bottom.png") no-repeat 50% 17% ;
      background-size: 43%;
    }

  }
  .bottom-bar-order {
    flex: 1;
    display: flex;
    text-align: center;
    line-height: 55px;
    font-size: 15px;
    div {
      flex: 1;
    }
    .bottom-bar-cart {
      background-color: #F9CD0B;
      color: #000000;
    }
    .bottom-bar-buy {
      background-color: var(--color-tint);
      color: #ececec;
    }
  }
}
</style>
