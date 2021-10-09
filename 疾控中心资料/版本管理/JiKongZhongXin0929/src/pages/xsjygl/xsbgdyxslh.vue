<template>
  <div  class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">报告打印(消杀-理化)</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <List :list-options="listOptions"></List>
    <!--列表组件结束-->
  </div>
</template>

<script>
import List from "../../components/List";
export default {
  name: "xsbgdyxslh",
  components:{
    List
  },
  data(){
    return{
      listOptions:{
        listName:'xsjyList',
        listParams:{wpdlx:'理化', zt:'已审核'},
        listVisibleColumns:['sjdwcy','jymd', 'jcdx', 'shz', 'shrq', 'dycs', 'opt'],
        listEdit:'review',
        listColumns: this.$store.state.pages.jybgListColumns,
        listFilters: {jymd:""}
      }
    }
  },
}
</script>

<style scoped>

</style>
