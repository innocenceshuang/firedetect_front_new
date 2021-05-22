<template>
  <el-table
    :data="messages"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column label="time" prop="timestamp"> </el-table-column>
    <el-table-column label="Device" prop="device_id"> </el-table-column>
    <el-table-column label="Content" prop="text"> </el-table-column>

    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button
          :disabled=messages[scope.$index].dealed
          @click.native.prevent="transformRow(scope.$index, messages)"
          type="text"
          size="small"
        >
          已读
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import axios from "axios";
export default {
  name: "Messages",
  data() {
    return {
      messages: [],
      dialogFormVisible: false,
      
    };
  },
  methods: {
    tableRowClassName({row, /*rowIndex*/}) {
        if (row.dealed === false) {
          return 'alarm-row';
        }
        else{
        // console.log(rowIndex);
        return 'info-row';
        }
      },
    transformRow(index,rows){
      axios.put("http://127.0.0.1:8081/fire/message/"+rows[index].id+'/',{
        id: rows[index].id,
        dealed: true,
      }).then(()=>{
        this.fetchMessages()
      })
    },

    fetchMessages() {
      axios.get("http://127.0.0.1:8081/fire/message/",{

      }).then((res)=>{
        this.messages = res.data;
      })
  },
},
created() {
    this.fetchMessages()
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .alarm-row {
  background: #ffe9e9;
}

.el-table .info-row {
  background: #d2d2d4;
}
</style>