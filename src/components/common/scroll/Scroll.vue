<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      observeDOM: false,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动事件
    if (this.probeType > 1) { // probeType为2或3才需要监听
      this.scroll.on('scroll', (position) => {
        this.$emit("scroll", position)
      })
    }
    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    scrollTo(x,y,t = 200) {
      this.scroll.scrollTo(x,y,t)
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
