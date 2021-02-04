<template>
  <div>
    <div class="cart-list-main flex" >
      <div class="item-selector">
        <check-button :is-checked="cartList.checked" @click.native="checkClick"></check-button>
      </div>
      <div class="cart-list-left flex">
        <img :src="cartList.image" alt="" class="goods-img">
      </div>
      <div class="cart-list-right">
        <div class="goods-name one-txt-cut">{{cartList.title}}</div>
        <div class="goods-desc one-txt-cut">
          {{cartList.desc}}
        </div>
        <div class="goods-info flex">
          <span class="price">￥{{cartList.price}}</span><span>x{{cartList.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    cartList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.cartList.checked = !this.cartList.checked
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.cart-list-main {
  padding: 10px;
  border-bottom: 2px solid #ececec;
  height: 105px;
}

.item-selector {
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-list-left {
  width: 30%;
  align-items: center;
  .check {
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 100%;
    border: 1px solid #ececec;
  }
  .check:checked {
    background: url('/src/assets/img/cart/tick.svg') no-repeat center;
    background-size: cover;
  }
  .goods-img {
    width: 76px;
    height: 86px;
    overflow: hidden;
    border: 1px solid #ececec;
    margin:0 10px;
    border-radius: 6px;
    vertical-align: middle;
  }
}
.cart-list-right {
  width: 60%;
  position: relative;
  .goods-name {
    width: 100%;
    color: black;
  }
  .goods-desc {
    font-size: 5px;
    color: var(--color-text);
    margin: 10px 0;
  }
  .goods-info {
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .price {
      color: orange;
    }
  }
}
</style>
