<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in secondCateArr" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!=0">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple="">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
import { requestGoodsAdd , requestGoodsDetail, requestGoodsUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      //一级分类
      cateList:"cate/list",
      //商品规格
      specList:'spec/list'
    }),
  },
  data() {
    return {
      //编辑器对象
      editor:null,
       //二级分类的数组
      secondCateArr: [],
      //商品规格属性值
      attrsArr: [],
      //图片地址
      imageUrl: "",
      //提交给后端的数据
      form: {
     first_cateid:'',
     second_cateid:'',
     goodsname:'',
     price:0,
     market_price:0,
     img:null,
     description:"",
     specsid:"",
     specsattr:[],
     isnew:1,
     ishot:1,
     status:1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      //获取分类列表
      requestCateList: "cate/requestList",
      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品总数
      requestGoodsCount:"goods/requestTotal",
       //获取商品列表
      requestGoodsList: "goods/requestList",
    }),

   //修改了图片
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
//修改了一级分类
changeFirstCateId(bool){
let index =this.cateList.findIndex(
  (item)=>item.id=this.form.first_cateid
) 
this.secondCateArr=this.cateList[index].children;
if(!bool){
this.form.second_cateid=''
}
},
// 修改了商品规格
changeSpecsId(bool){
    let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.attrsArr = this.specList[index].attrs;
      if(!bool){
        this.form.specsattr = [];
      }
},
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置内容
    empty() {
        //二级分类的数组
      this.secondCateArr= []
      //商品规格属性值
      this.attrsArr=[]
      //图片地址
      this.imageUrl= ""
      //提交给后端的数据
      this.form={
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: "",
      }
      this.editor.txt.html('')

    },
     //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description)
    },

    //添加数据
    add() {
        for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
      this.form.description=this.editor.txt.html();
      this.form.specsattr=JSON.stringify(this.form.specsattr)
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          this.requestGoodsCount();
          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取某一条数据
    getDetail(id) {
      
      requestGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
          this.imageUrl=this.$imgPre+this.form.img;
        //根据一级分类计算出二级分类的数组
        this.changeFirstCateId(true)
        //根据商品规格计算出商品属性
        this.changeSpecsId(true)
        this.form.specsattr=JSON.parse(this.form.specsattr)
      });
    },
    update() {
        for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
        this.form.description=this.editor.txt.html();
      this.form.specsattr=JSON.stringify(this.form.specsattr)
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestGoodsCount();
          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {
     if (this.cateList.length == 0) {
      this.requestCateList();
    }
      //获取所有的规格数据
    this.requestSpecList(true);
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

// 穿透
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>