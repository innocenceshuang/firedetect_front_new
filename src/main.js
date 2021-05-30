import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false;
Vue.use(ElementUI)

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
Vue.use(VueVideoPlayer)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
