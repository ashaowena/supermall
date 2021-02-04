<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :cartList="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  mounted() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
