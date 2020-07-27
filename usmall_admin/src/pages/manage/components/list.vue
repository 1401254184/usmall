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
          <del-btn type="danger" @confirm="del(scope.row.uid)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="manageSize"
      :total="manageTotal"
    ></el-pagination>
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
      manageTotal: "manage/total",
      manageSize: "manage/size",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
      requestTotal: "manage/requestTotal",
      changePage: "manage/changePage",
    }),
   
     edit(uid){
       this.$emit('edit',uid)
     },

    del(uid){
      requestManageDelete({uid:uid}).then(res=>{
                if(res.data.code==200){
                      successAlert('删除成功')
                       this.requestList();
                    this.requestTotal();
                }else{
                  warningAlert
                }
      })
    },

    cPage(a) {
      this.changePage(a);
      this.requestList();
    },
  },
  mounted() {
    this.requestList();
    this.requestTotal();
  },
};
</script>
<style scoped>
</style>