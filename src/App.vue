<template>
  <div id="app">
<!--      <keep-alive>-->
<!--      <router-view></router-view>-->
<!--      </keep-alive>-->

    <router-view v-slot="{ Component }">
      <keep-alive exclude="HomeSwiper">
        <component :is="Component" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"/>
    </router-view>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
import Home from "@/views/home/Home";


export default {
  name: 'app',
  components: {
    MainTabBar,
    Home
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
