<template>
<div>
<v-add  :info='info' ref='add'></v-add>
   <v-list @edit='edit'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{
    vAdd,
    vList
},
data(){
return {
  info:{
     show:false,
     title:"",
     isAdd:true
  }
}
},
methods:{
  edit(id){
    this.info.show=true
    this.info.title='管理员修改'
    this.info.isAdd=false
    this.$refs.add.getDetail(id)
  }
},
mounted(){},
}
</script>
<style scoped>
</style>