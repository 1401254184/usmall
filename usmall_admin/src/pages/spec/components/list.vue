<template>
  <div>
    <el-table :data="specList" border style="width: 100%">
       <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性" width="180">
         <template slot-scope="scope">
           <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
         <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn type="danger" @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="specSize"
      :total="specTotal"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestSpecDelete} from "../../../util/request"
import { successAlert, warningAlert } from '../../../util/alert';
export default {
  computed: {
    ...mapGetters({
      specList: "spec/list",
      specTotal: "spec/total",
      specSize: "spec/size",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
      changePage: "spec/changePage",
    }),
   
     edit(id){
       this.$emit('edit',id)
     },

    del(id){
      requestSpecDelete({id:id}).then(res=>{
                if(res.data.code==200){
                      successAlert('删除成功')
                       this.requestList();
                    this.requestTotal();
                }else{
                  warningAlert(res.data.mag)
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