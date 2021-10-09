<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">检测类型维护</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <data-list :list-options="listOptions" ></data-list>
    <!--列表组件结束-->
  </div>
</template>

<script>
import dataList from "../../components/List";
export default {
  name: "jclxwh",
  components:{
    dataList,
  },
  data() {
    return {
      listOptions:{
        listName: 'jclxList',
        listEdit: 'popup',
        listInputs: {
          bm:"",
          name: "",
          bz:"",
          id:"",
        },
        listColumns: [
          {name: 'bm', align: 'left', label: '编码', field: 'bm', sortable: true},
          {name: 'name', align: 'left', label: '名字', field: 'name', sortable: true},
          {name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          {name: "opt", align: "center", label: "操作",  columns: true}
        ],
      },
    }
  },
}
</script>

<style scoped>

</style>
