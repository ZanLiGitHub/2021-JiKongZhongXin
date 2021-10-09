<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">结果录入(消杀-理化)</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <List :list-options="listOptions"></List>
    <!--列表组件结束-->
  </div>
</template>

<script>
import List from "../../components/List";

export default {
  name: "xsjglrxslh",
  components: {
    List
  },
  data() {
    return {
      listOptions: {
        listName: 'xsjyList',
        listParams: {wpdlx: '理化', zt:['未录入','已退回']},
        listVisibleColumns:['sjdwcy','jymd', 'jcdx', 'jcrq', 'zt', 'opt'],
        listEdit: 'result',
        listColumns: this.$store.state.pages.jybgListColumns,
        listFilters: this.$store.state.pages.jybgListFilters
      }
    }
  },
}
</script>

<style scoped>

</style>
