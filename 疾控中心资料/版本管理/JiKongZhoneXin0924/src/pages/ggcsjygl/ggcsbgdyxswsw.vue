<template>
  <div  class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">报告打印(公共场所-微生物)</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <List :list-options="listOptions"></List>
    <!--列表组件结束-->
  </div>
</template>

<script>
import List from "../../components/List";
export default {
  name: "ggcsbgdyxswsw",
  components:{
    List
  },
  data(){
    return{
      listOptions:{
        listName:'ggcsjyList',
        listParams:{wpdlx:'微生物', zt:'已完成'},
        listEdit:'review',
        listColumns: this.$store.state.pages.jybgListColumns,
        listFilters: this.$store.state.pages.jybgListFilters
      }
    }
  },
}
</script>

<style scoped>

</style>
