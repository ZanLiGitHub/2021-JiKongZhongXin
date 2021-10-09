/*
export function someGetter (state) {
}
*/
//根据state的文件树生成的路由表
export function routes(state){
  let routes = []
  for(let index=0, length = state.folders.length; index<length; index++){
    for(let index2=0, length = state.folders[index].children.length; index2<length; index2++){
      let str = state.folders[index].children[index2].path.substring(4, state.folders[index].children[index2].path.indexOf('.'))
      routes.push(
        {
          path: `/${state.folders[index].children[index2].id}`,
          component: () => import('src/'+str+'.vue') /*()=>import延迟加载*/
        }
      )
    }
  }
  routes.unshift(
    {
      path: '',
      component: () => import('layouts/Index.vue') /*()=>import延迟加载*/
    },
  )
  routes.push({
    path: '*',
    component: () => import('layouts/Error404.vue')
  })

  return routes
}
//根据state的文件数生成的菜单表
export function menu(state){
  let menu = []
  for(let index=0, length = state.folders.length; index<length; index++){
    let folder = state.folders[index]
    let sort = state.folderSettings[folder.id].sort
    menu[sort] = {
      id: folder.id,
      pId: "home",
      icon: state.folderSettings[folder.id].icon,
      name:state.folderSettings[folder.id].chineseName,
      sort: state.folderSettings[folder.id].sort,
      type: "menu",
      children: []
    }
    for(let index2=0, length = folder.children.length; index2<length; index2++){
      let page = folder.children[index2]
      let sort2 = state.folderSettings[folder.id].children[page.id].sort
      menu[sort].children[sort2] = {
        id: page.id,
        pId: folder.id,
        icon: state.folderSettings[folder.id].children[page.id].icon,
        name: state.folderSettings[folder.id].children[page.id].chineseName,
        sort: state.folderSettings[folder.id].children[page.id].sort,
        separator: !!state.folderSettings[folder.id].children[page.id].separator,
        urlPath:page.id
      }
    }
  }

  return menu
}
