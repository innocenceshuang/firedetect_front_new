<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button type="warning" size="default"> FUCK</el-button> -->
    <el-container>
      <el-header style="text-align: middle; font-size: 30px">
        <span>实时火源检测报警系统</span>
      </el-header>
      <el-main>
        <div class="row">
          <div class="column_left">
            <div class="left-top">
              <Devices />
            </div>
            <div class="left-bottom">
              <Echarts />
            </div>
          </div>
          <div class="column_right" >
            <Messages />
          </div>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Devices from "../components/Devices"
import Messages from "../components/Messages"
import Echarts from "../components/Echarts"
export default {
  name: "Home",
  components: {
    // HelloWorld,
    Devices,
    Messages,
    Echarts,
  },
};
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  
  .row {
      content: "";
      display: flex;
      clear: both;
      overflow:hidden;
      /* background-color: rgb(192, 255, 226); */
    }
  .column_left{
      Flex:1;
      border: 1px solid steelblue;
      height: 90vh;
      display: flex;
      flex-direction:column;
      align-items: stretch;
      padding: 4px;
      overflow:auto;
    }

    .column_right{
      Flex:1;
      border: 1px solid steelblue;
      height: 90vh;
      overflow:auto;
    }

     .left-top{
      Flex:1;
      border: 1px solid pink;
      overflow:auto;
    }
    
    .left-bottom{
      Flex:1;
      border: 1px solid pink;
      overflow:auto;
    }
</style>