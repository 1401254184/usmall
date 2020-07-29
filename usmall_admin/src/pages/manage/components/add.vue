<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in RoleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态 " :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#ff4949"
            inactive-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {requestManageAdd,requestManageDetail,requestManageUpdate} from '../../../util/request'
import{successAlert,warningAlert} from '../../../util/alert'
export default {
  props:['info'],
    computed:{
        ...mapGetters({
            RoleList:'role/list'
        })
    },
  components: {},
  data() {
    return {
      form: {
        roleid:"",
        password: "",
        username: "",
        status: 1,
      },

    
      dialogFormVisible: true,
      formLabelWidth: "80px",
    };
  },
  methods: {
      ...mapActions({
          requestRoleList:"role/requestList",
            requestManageList:"manage/requestList",
      requestTotal:"manage/requestTotal"
      }),
      //取消
    cancel(){
      this.info.show=false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    
    //重置
    empty(){
       this.form={
        roleid:"",
        password: "",
        username: "",
        status: 1,
      }
    },
    // 添加
  add(){
      for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
           requestManageAdd(this.form).then(res=>{
             if(res.data.code==200){
           successAlert(res.data.msg);
             this.empty();
             this.cancel();
             this.requestManageList();
             this.requestTotal();
             }else{
               warningAlert(res.data.msg)
             }
           })      
  },
  //一条信息
  getDetail(id){
    requestManageDetail({uid:id}).then(res=>{
      this.form=res.data.list;
       this.form.password=""
    })
  },
// 修改
update(){
    for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
  requestManageUpdate(this.form).then(res=>{
    if(res.data.code==200){
      successAlert(res.data.msg);
      this.empty();
      this.cancel();
       this.requestManageList();
    }else{
      warningAlert(res.data.msg)
    }
  })
}

  },
    mounted() {
      if (this.RoleList.length === 0) {
      this.requestRoleList()}
  },
};
</script>
<style scoped>
</style>