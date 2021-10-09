<template>
<div class="q-pa-lg" style="height: 92vh">
  <!--页面标题开始-->
  <p class="text-h5 q-m-lg">单据接收(消杀-理化)</p>
  <!--页面标题结束-->

  <!--列表组件开始-->
  <List :list-options="listOptions"></List>
  <!--列表组件结束-->
</div>
</template>

<script>
import List from "../../components/List";
export default {
  name: "xsdjjsxslh",
  components:{
    List
  },
  data(){
    return{
      listOptions:{
        listName:'xswpdList',
        listParams:{wpdlx:'理化', zt:'未接收'},
        listEdit:'receive',
        listColumns: this.$store.state.pages.wpdListColumns,
        listFilters:  this.$store.state.pages.wpdListFilters,
      }
    }
  },
}
</script>

<style scoped>

</style>
