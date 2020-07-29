<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
       <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="address" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
            <el-table-column prop="address" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="info" v-else>否</el-button>
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
      :page-size="goodsSize"
      :total="goodsTotal"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestGoodsDelete} from "../../../util/request"
import { successAlert, warningAlert } from '../../../util/alert';
export default {
  computed: {
    ...mapGetters({
      goodsList: "goods/list",
      goodsTotal: "goods/total",
      goodsSize: "goods/size",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "goods/requestList",
      requestTotal: "goods/requestTotal",
      changePage: "goods/changePage",
    }),
   
     edit(id){
       this.$emit('edit',id)
     },

    del(id){
      requestGoodsDelete({id:id}).then(res=>{
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