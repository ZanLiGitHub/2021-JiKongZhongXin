<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">科室维护</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <List :list-options="listOptions"></List>
    <!--列表组件结束-->
  </div>
</template>

<script>
import List from "../../components/List";

export default {
  name: "kswh",
  components:{
    List,
  },
  data() {
    return {
      listOptions:{
        listName: 'ksList',
        listEdit: 'popup',
        listInputs: {
          bm:"",
          name: "",
          kszl:"",
          sort:"",
          bz:"",
          id:"",
        },
        listColumns: [
          {name: 'bm', align: 'left', label: '编码', field: 'bm', sortable: true},
          {name: 'name', align: 'left', label: '名字', field: 'name', sortable: true},
          {name: 'kszl', align: 'left', label: '种类', field: 'kszl', sortable: true},
          {name: 'sort', align: 'left', label: '顺序', field: 'sort', sortable: true},
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
