<template>
  <div>
    <swiper>
      <template v-slot:default>
        <swiper-item v-for="item in banner">
          <template v-slot:default>
            <a :href="item.link">
              <img :src="item.image" alt="" @load="imageLoad()">
            </a>
          </template>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>

import {Swiper, SwiperItem} from "@/components/swiper"

export default {
  name: "HomeSwiper",
  data() {
    return {isLoad: false}
  },
  props: {
    banner: Array
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  // created() {
  //   console.log("滚轮加载")
  // },
  // unmounted() {
  //   console.log("销毁")
  // }


}


</script>

<style scoped>


.slide img {
  width: 100%;
}

</style>
