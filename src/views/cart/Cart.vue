<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <template v-slot:center>
        <div class="">
          购物车({{cartLength}})
        </div>
      </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

export default {
  name: "Cart",
  components: {CartBottomBar, CartList, NavBar},
  component: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
  activated() {

  }
}
</script>

<style scoped>
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
