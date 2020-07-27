import axios from 'axios'
import qs from 'qs'
import { data } from 'autoprefixer'

axios.interceptors.response.use(res=>{
    console.group('本次路径为'+res.config.url)
    console.log(res)
    return res
})
const baseUrl='/api'

// 添加数据
  export  const  menuAdd=(data)=>{
     return axios({
      url:baseUrl+'/api/menuadd',
      method:'post',
      data:qs.stringify(data)
  })}

//   菜单列表
  export const menuList=(params)=>{
      return axios({
          url:baseUrl+"/api/menulist",
          method:'GET',
          params
      })
  }
//   获取一条菜单
  export const menuInfo=(params)=>{
      return axios({
          url:baseUrl+"/api/menuinfo",
          method:'GET',
          params
      })
  }
  //菜单修改
  export const requestMenuUpdate=(data)=>{
      return axios({
          url:baseUrl+"/api/menuedit",
          method:'post',
          data:qs.stringify(data)
      })
  }
//   菜单删除
  export const requestMenuDelete=(data)=>{
      return axios({
          url:baseUrl+"/api/menudelete",
          method:'post',
          data:qs.stringify(data)
      })
  }
//  角色添加
export  const requestRoleAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(data)
    })}
    export const requestRoleList=()=>{
        return axios({
            url:baseUrl+'/api/rolelist',
            method:'get'
        })
    }
//获取一条角色信息
export const requestRoleDetail=(params)=>{
 return axios({
     url:baseUrl+'/api/roleinfo',
     method:'get',
     params:params
 })
}

//修改角色
export const requestRoleUpdate=(data)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:qs.stringify(data)
    })
}
//删除角色 
export const requestRoleDelete=(data)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:qs.stringify(data)
    })
}
// 添加管理员 
export const requestManageAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(data)
    })
}
//管理员列表
export const requestManageList=(params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:"GET",
        params:params
    })
}
// 管理员总数
export const requestManageCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'GET'
    })
}
//一条管理员数据
export const requestManageDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:"get",
        params:params
    })
}
//管理员修改
export const requestManageUpdate=(data)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:qs.stringify(data)
    })
}
// 管理员删除
export const requestManageDelete=(data)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:qs.stringify(data)
    })
}
//管理员登录 
export const requestManageLogin=(data)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(data)
    })
}
// 商品规格添加
export const requestCateAdd=(data)=>{
    var fromData=new FormData
     for(let i in data){
         fromData.append(i,data[i])
     }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:fromData
    })
}
// 商品分类列表
export const requestCateList=(params)=>{
 return axios({
     url:baseUrl+'/api/catelist',
     method:'get',
     params:params
 })
}
//获取一条商品数据
export const requestCateDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:params
    })
}
//商品分类修改
export const requestCateUpdate=(data)=>{
    var fromData=new FormData
    for(let i in data){
        fromData.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:fromData
    })
}
// 商品分类删除
export const requestCateDelete=(data)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify(data)
    })
}
// 商品规格添加
export const requestSpecAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(data)
    })
}
// 商品规格列表
export const requestSpecList=(params)=>{
 return axios({
     url:baseUrl+'/api/specslist',
     method:'get',
     params:params
 })
}
//获取一条商品规格数据
export const requestSpecDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:params
    })
}
//商品规格修改
export const requestSpecUpdate=(data)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:qs.stringify(data)
    })
}
// 商品规格删除
export const requestSpecDelete=(data)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:qs.stringify(data)
    })
}
// 商品规格总数
export const requestSpecCount=()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'GET'
    })
}
