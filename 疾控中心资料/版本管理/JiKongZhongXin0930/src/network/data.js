import {request} from './request';

//获取项目列表
export function getList(list ,params){
  return request({
    url:`/${list}`,
    method:'get',
    params: params,
  })
}
//添加项目列表
export function addList(list, data){
  return request({
    url:`/${list}`,
    method:'post',
    data:data
  })
}
//删除项目列表
export function deleteList(list, id){
  return request({
    url:`/${list}/${id}`,
    method:'delete',
  })
}
//修改项目列表
export function editList(list, id, data){
  return request({
    url:`/${list}/${id}`,
    method:'put',
    data:data
  })
}

//消杀检测对象
export function getxsjcdxList(params){
  return request({
    url:'/xsjcdxList.json',
    method:'get',
    params: params
  })
}
export function addxsjcdxList(data){
  return request({
    url:'/xsjcdxList.json',
    method:'post',
    data: data
  })
}
export function deletexsjcdxList(id){
  return request({
    url:`/xsjcdxList.json/${id}`,
    method:'delete',
  })
}
export function editxsjcdxList(id, data){
  return request({
    url:`/xsjcdxList.json/${id}`,
    method:'put',
    data:data
  })
}

//公共场所检测对象
export function getggcsjcdxList(params){
  return request({
    url:'/ggcsjcdxList.json',
    method:'get',
    params: params
  })
}
export function addggcsjcdxList(data){
  return request({
    url:'/ggcsjcdxList.json',
    method:'post',
    data: data
  })
}
export function deleteggcsjcdxList(id){
  return request({
    url:`/ggcsjcdxList.json/${id}`,
    method:'delete',
  })
}
export function editggcsjcdxList(id, data){
  return request({
    url:`/ggcsjcdxList.json/${id}`,
    method:'put',
    data:data
  })
}

//消杀委派单
export function getxswpdList(params){
  return request({
    url:'/xswpdList.json',
    method:'get',
    params: params
  })
}
export function addxswpdList(data){
  return request({
    url:'/xswpdList.json',
    method:'post',
    data: data
  })
}
export function deletexswpdList(id){
  return request({
    url:`/xswpdList.json/${id}`,
    method:'delete',
  })
}
export function editxswpdList(id, data){
  return request({
    url:`/xswpdList.json/${id}`,
    method:'put',
    data:data
  })
}

//公共场所委派单
export function getggcswpdList(params){
  return request({
    url:'/ggcswpdList.json',
    method:'get',
    params: params
  })
}
export function addggcswpdList(data){
  return request({
    url:'/ggcswpdList.json',
    method:'post',
    data: data
  })
}
export function deleteggcswpdList(id){
  return request({
    url:`/ggcswpdList.json/${id}`,
    method:'delete',
  })
}
export function editggcswpdList(id, data){
  return request({
    url:`/ggcswpdList.json/${id}`,
    method:'put',
    data:data
  })
}

//消杀检验
export function getxsjyList(params){
  return request({
    url:'/xsjyList.json',
    method:'get',
    params: params
  })
}
export function addxsjyList(data){
  return request({
    url:'/xsjyList.json',
    method:'post',
    data: data
  })
}
export function deletexsjyList(id){
  return request({
    url:`/xsjyList.json/${id}`,
    method:'delete',
  })
}
export function editxsjyList(id, data){
  return request({
    url:`/xsjyList.json/${id}`,
    method:'put',
    data:data
  })
}

//公共场所检验
export function getggcsjyList(params){
  return request({
    url:'/ggcsjyList.json',
    method:'get',
    params: params
  })
}
export function addggcsjyList(data){
  return request({
    url:'/ggcsjyList.json',
    method:'post',
    data: data
  })
}
export function deleteggcsjyList(id){
  return request({
    url:`/ggcsjyList.json/${id}`,
    method:'delete',
  })
}
export function editggcsjyList(id, data){
  return request({
    url:`/ggcsjyList.json/${id}`,
    method:'put',
    data:data
  })
}

//科室
export function getksList(params){
  return request({
    url:'/ksList.json',
    method:'get',
    params: params
  })
}
export function addksList(data){
  return request({
    url:'/ksList.json',
    method:'post',
    data: data
  })
}
export function deleteksList(id){
  return request({
    url:`/ksList.json/${id}`,
    method:'delete',
  })
}
export function editksList(id, data){
  return request({
    url:`/ksList.json/${id}`,
    method:'put',
    data:data
  })
}

//检测类型
export function getjclxList(params){
  return request({
    url:'/jclxList.json',
    method:'get',
    params: params
  })
}
export function addjclxList(data){
  return request({
    url:'/jclxList.json',
    method:'post',
    data: data
  })
}
export function deletejclxList(id){
  return request({
    url:`/jclxList.json/${id}`,
    method:'delete',
  })
}
export function editjclxList(id, data){
  return request({
    url:`/jclxList.json/${id}`,
    method:'put',
    data:data
  })
}

//检测项目
export function getjcxmList(params){
  return request({
    url:'/jcxmList.json',
    method:'get',
    params: params
  })
}
export function addjcxmList(data){
  return request({
    url:'/jcxmList.json',
    method:'post',
    data: data
  })
}
export function deletejcxmList(id){
  return request({
    url:`/jcxmList.json/${id}`,
    method:'delete',
  })
}
export function editjcxmList(id, data){
  return request({
    url:`/jcxmList.json/${id}`,
    method:'put',
    data:data
  })
}

//样本类型
export function getyblxList(params){
  return request({
    url:'/yblxList.json',
    method:'get',
    params: params
  })
}
export function addyblxList(data){
  return request({
    url:'/yblxList.json',
    method:'post',
    data: data
  })
}
export function deleteyblxList(id){
  return request({
    url:`/yblxList.json/${id}`,
    method:'delete',
  })
}
export function edityblxList(id, data){
  return request({
    url:`/yblxList.json/${id}`,
    method:'put',
    data:data
  })
}

//样本名称
export function getybmcList(params){
  return request({
    url:'/ybmcList.json',
    method:'get',
    params: params
  })
}
export function addybmcList(data){
  return request({
    url:'/ybmcList.json',
    method:'post',
    data: data
  })
}
export function deleteybmcList(id){
  return request({
    url:`/ybmcList.json/${id}`,
    method:'delete',
  })
}
export function editybmcList(id, data){
  return request({
    url:`/ybmcList.json/${id}`,
    method:'put',
    data:data
  })
}

//打印标识
export function getdybsList(params){
  return request({
    url:'/dybsList.json',
    method:'get',
    params: params
  })
}
export function adddybsList(data){
  return request({
    url:'/dybsList.json',
    method:'post',
    data: data
  })
}
export function deletedybsList(id){
  return request({
    url:`/dybsList.json/${id}`,
    method:'delete',
  })
}
export function editdybsList(id, data){
  return request({
    url:`/dybsList.json/${id}`,
    method:'put',
    data:data
  })
}

//场所
export function getcsList(params){
  return request({
    url:'/csList.json',
    method:'get',
    params: params
  })
}
export function addcsList(data){
  return request({
    url:'/csList.json',
    method:'post',
    data: data
  })
}
export function deletecsList(id){
  return request({
    url:`/csList.json/${id}`,
    method:'delete',
  })
}
export function editcsList(id, data){
  return request({
    url:`/csList.json/${id}`,
    method:'put',
    data:data
  })
}
