<template>
  <div id="myChart" :style="{ width: '500px', height: '400px' }"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "Echarts",
  data() {
    return {
      devices: [],
      times: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      axios.get("http://127.0.0.1:8081/fire/messageCount/", {}).then((res) => {
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: { text: "报警统计" },
          tooltip: {},
          xAxis: {
            data: res.data.devices,
          },
          yAxis: {},
          series: [
            {
              name: "发生次数",
              type: "bar",
              data: res.data.data,
            },
          ],
        });
      });
    },
  },
};
</script>