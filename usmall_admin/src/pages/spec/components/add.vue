<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
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
import { mapGetters, mapActions } from "vuex";
import {
  requestSpecAdd,
  requestSpecDetail,
  requestSpecUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      RoleList: "role/list",
    }),
  },
  components: {},
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
    ...mapActions({
      requestSpecList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    //重置
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    // 添加
    add() {
        for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestSpecList();
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //一条信息
    getDetail(id) {
      requestSpecDetail({ id:id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
     
      });
    },
    // 修改
    update() {
        for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
        if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestSpecList();
          //  this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}
</style>