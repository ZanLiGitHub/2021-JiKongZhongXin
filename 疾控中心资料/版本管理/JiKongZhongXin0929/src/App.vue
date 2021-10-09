<template>
  <div id="q-app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import {addList} from "../src/network/data";
export default defineComponent({
  name: 'App',

  //给子组件提供刷新方法，在更新数据后使用
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      //刷新页面
      isRouterAlive: true
    }
  },
  methods:{
    //刷新页面
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function (){
        this.isRouterAlive = true
      })
    }
  },


  beforeCreate() {
    const context = require.context('./pages', true, /\.vue$/);

    //获取所有文件
    let pages:any[] = []
    context.keys().forEach(key => {
      pages.push(
        {
          id:context(key).default.name,
          path:`src/pages${key.toString().substring(1,key.toString().length)}`
        }
      )
    })

    //获取所有文件夹
    let folders:any[] = []
    let foldersSetting = {}
    for(let index in pages){
      let page = pages[index]
      let pageIndex:any = 0
      let folderName
      //提取文件夹放入folders
      folderName = page.path.match(/src\/pages\/([\s\S]*?)\//)[1]
      if(folders.find(item => {return item.id === folderName}) === undefined) {
        folders.push({
          id: folderName,
          children: []
        })
        foldersSetting[folderName] = {
          sort: 0,
          chineseName: '',
          icon: '',
          children: {}}
        pageIndex = folders.length-1
      }else{
        for(let index in folders){
          if(folderName === folders[index].id){
            pageIndex = index
          }
        }
      }

      //把页面插入相应的文件夹内
      folders[pageIndex].children.push({
        id: page.id,
        path: page.path,
      })
      foldersSetting[folderName].children[page.name]={
        sort:0,
        chineseName:'',
        icon:''
      }
    }
    //把文件树上传到state和后端
    this.$store.commit('pages/updateFolders', folders)
    addList('foldersSetting', foldersSetting)

    // 添加路由
    this.$router.addRoutes([
      {
        path: '/main',
        component: () => import('layouts/MainLayout.vue'),
        children: this.$store.getters[`pages/routes`]
      },
      {
        path: '*',
        component: () => import('layouts/Error404.vue')
      }
    ])
  }
})
</script>
<style>
</style>
