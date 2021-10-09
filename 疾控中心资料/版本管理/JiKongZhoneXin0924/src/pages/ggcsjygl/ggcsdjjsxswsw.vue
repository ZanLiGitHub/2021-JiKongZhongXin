<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">单据接收(公共场所-微生物)</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <List :list-options="listOptions"></List>
    <!--列表组件结束-->
  </div>
</template>

<script>
import List from "../../components/List";

export default {
  name: "ggcsdjjsxswsw",
  components: {
    List
  },
  data() {
    return {
      listOptions: {
        listName: 'ggcswpdList',
        listParams: {wpdlx: '微生物', zt: '未接收'},
        listEdit: 'receive',
        listColumns: this.$store.state.pages.wpdListColumns,
        listFilters: this.$store.state.pages.wpdListFilters,
      }
    }
  },
}
</script>

<style scoped>

</style>
