<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">公共场所检测对象维护</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <List :list-options="listOptions"></List>
    <!--列表组件结束-->
  </div>
</template>

<script>
import List from "../../components/List"
export default {
  name: "ggcsjcdxwh",
  components:{
    List,
  },
  data() {
    return {
      listOptions:{
        listName: 'ggcsjcdxList',
        listEdit: 'popup',
        listInputs: {
          name: "",
          bz: "",
          id:""
        },
        listColumns: [
          {
            name: 'name',
            align: 'left',
            required: true,
            label: '名字',
            field: 'name',
            sortable: true,
            style: 'max-width: 70px'
          },
          {name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          {name: "opt", label: "操作", align: "center", columns: true}
        ],
      },
    }
  },

}
</script>

<style scoped>

</style>
