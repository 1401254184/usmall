<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree :data="list" show-checkbox node-key="id" :props="defaultProps" ref="tree"    :default-checked-keys="defaultKey"></el-tree>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="change" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestRoleAdd, requestRoleDetail,requestRoleUpdate} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
  defaultKey:[],
      formLabelWidth: "80px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "menu/requestList",
      requestRoleList: "role/requestList",
    }),
    //取消
    cancel() {
      this.info.show = false;
    },
    // 重置
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          this.cancel();
          this.empty();
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  //  获取一条数据
     getDetail(id){
     requestRoleDetail({id:id}).then(res=>{
               this.form=res.data.list;
               this.form.id=id;
                this.defaultKey = JSON.parse(res.data.list.menus);
        })
     },
//修改
    change(){
       this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdate(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestRoleList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }



  },

  mounted() {
    if (this.list.length === 0) {
      this.requestList();
    }
  },
};
</script>
<style scoped>
</style>