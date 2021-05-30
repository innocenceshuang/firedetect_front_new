<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="id">
        <el-input v-model="formInline.device_id"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status">
          <!-- <el-option label="onfire" value="onfire"></el-option> -->
          <el-option label="online" value="online"></el-option>
          <el-option label="offline" value="offline"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="formInline.location"></el-input>
      </el-form-item>
      <el-form-item label="流地址">
        <el-input v-model="formInline.video_addr"></el-input>
      </el-form-item>
      <el-form-item label="敏感度">
        <el-input v-model="formInline.sensitive"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="devices" style="width: 100%" >
      <el-table-column label="ID" prop="device_id"> </el-table-column>
      <el-table-column label="Status" prop="status"> </el-table-column>
      <el-table-column label="Location">
        <template slot-scope="scope">
          <el-button @click="openvideo(scope.row)" type="info">
            {{ scope.row.location }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Sensitive" prop="sensitive"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, devices)"
            type="text"
            size="small"
          >
            移除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editRow(scope.$index)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "Devices",
  data() {
    return {
      devices: [],
      dialogFormVisible: false,
      formInline: {
        device_id: "",
        status: "",
        location: "",
        video_addr: "",
        sensitive: "",
      },
      formOriginal: {
        device_id: "",
        status: "",
        location: "",
        video_addr: "",
        sensitive: "",
      },
    };
  },
  methods: {
    openvideo(row) {
      console.log(row.device_id);
      this.$router.push({
        name: "About",
        path: "/about",
        params: { addr: row.video_addr, device_id: row.device_id },
      });
    },
    addDevice() {
      this.dialogFormVisible = true;
    },

    async onSubmit() {
      console.log("submit");
      console.log(this.formInline);
      axios
        .post("http://127.0.0.1:8081/fire/device/", {
          device_id: this.formInline.device_id,
          status: this.formInline.status,
          sensitive: this.formInline.sensitive,
          location: this.formInline.location,
          video_addr: this.formInline.video_addr,
        })
        .then(() => {
          this.formInline = this.formOriginal;
          this.fetchDevices();
        });
    },

    async deleteRow(index, rows) {
      axios
        .delete(
          "http://127.0.0.1:8081/fire/device/" + rows[index].device_id + "/",
          {}
        )
        .then(() => {
          this.fetchDevices();
        });
    },

    async editRow(index) {
      this.$prompt("请选择设备敏感度", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[123]/,
        inputErrorMessage: "敏感度格式不正确",
      })
        .then(({ value }) => {
          axios
            .put(
              "http://127.0.0.1:8081/fire/device/" +
                this.devices[index].device_id +
                "/",
              {
                device_id: this.devices[index].device_id,
                sensitive: value,
              }
            )
            .then((res) => {
              this.$message({
                type: "success",
                message: "设备敏感度被置为: " + value,
              });
              this.fetchDevices();
              console.log(res.data);
            });
          // this.devices[index].sensitive=value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    fetchDevices() {
      // const res = fetch(`http://127.0.0.1:8081/fire/device/`);
      // const data = res.json();
      // return data;
      axios.get("http://127.0.0.1:8081/fire/device/", {}).then((res) => {
        // console.log("update")
        this.devices = res.data;
        // console.log(res.data)
      });
    },
  },
  created() {
    this.fetchDevices();
    // console.log(this.devices)
  },
};
</script>
