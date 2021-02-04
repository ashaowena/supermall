import { createApp }from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from "@/common/bus";

const mount = createApp(App);
mount.use(store).use(router).mount('#app');

mount.config.globalProperties.bus = bus
