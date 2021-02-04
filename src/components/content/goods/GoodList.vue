<template>
  <div class="goods">
    <GoodListItem v-for="item in goods" :goods-item="item"></GoodListItem>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/goods/GoodListItem";

export default {
  name: "GoodList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
