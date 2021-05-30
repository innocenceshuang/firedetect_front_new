<template>
  <el-container>
    <el-header style="text-align: middle; font-size: 30px">
      <span>实时火源检测报警系统 </span>
      <span> --设备{{device_id}}</span>
    </el-header>
    <el-main>
      <div class="view-warp"  style="text-align:center">
        <component
          :is="this.currentComponent"
          :options="this.videoOptions"
        ></component>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios";
export default {
  name: "view",
  data() {
    return {
      device_id:'0',
      currentComponent: null,
      videoOptions: {
        autoplay: false,
        controls: true,
        techOrder: ["html5"],
        poster: "",
        sources: [
          {
            src: "",
            type: "application/x-mpegURL",
          },
        ],
      },
    };
  },
  methods: {
    loadData() {
      this.videoOptions.poster = "";
      // this.videoOptions.sources[0].src = this.$route.params.addr;
      this.videoOptions.sources[0].src =
        "http://127.0.0.1:8085/live/stream.m3u8";
      // this.videoOptions.sources[0].src =
      // "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8";
      console.log(this.$route.params.addr);
      this.device_id = this.$route.params.device_id;
      this.currentComponent = VideoPlayer;
    },
    unloadHandler() {
      // 停止推流
      console.log("beforeDestroy");
      axios.get("http://127.0.0.1:8081/fire/stop/", {}).then(() => {
        // console.log("update")
        console.log("stop");
      });
    },
  },
  mounted() {
    this.loadData();
    // 监听系统退出窗口事件，发生时触发unloadHandler
    window.addEventListener("beforeunload", (e) => this.unloadHandler(e));
    // 触发指定设备开始推流
    axios
      .get(
        "http://127.0.0.1:8081/fire/device/" +
          this.$route.params.device_id +
          "/",
        {}
      )
      .then(() => {
        // console.log("update")
        console.log("gogo");
      });
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    axios.get("http://127.0.0.1:8081/fire/stop/", {}).then(() => {
      // console.log("update")
      console.log("stop");
    });
    // log('beforeDestroy')
  },
};
</script>

<style lang="scss">
.video-js {
  width: 1024px;
  height: 720px;
}
.vjs-big-play-button {
  left: 50%;
  top: 50%;
  margin-left: -2em;
  margin-top: -1.3em;
}
.video-warp {
  display: flex;
}
.view-warp {
  padding: 0;
  margin: 0 auto;
  display: flex;
  .desc {
    margin-left: 10px;
  }
}
</style>