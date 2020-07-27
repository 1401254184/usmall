<template>
  <div>
    <el-table :data="manageList" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="roleid" label="所属角色"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
         <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestManageDelete} from "../../../util/request"
import { successAlert, warningAlert } from '../../../util/alert';
export default {
  computed: {
    ...mapGetters({
      manageList: "manage/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
    }),
   
     edit(uid){
       this.$emit('edit',uid)
     },

},

  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
</style>