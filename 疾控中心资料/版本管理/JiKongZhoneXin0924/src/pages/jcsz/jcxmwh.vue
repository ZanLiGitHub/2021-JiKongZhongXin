<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">检测项目维护</p>
    <!--页面标题结束-->

    <!--列表组件开始-->
    <data-list :list-options="listOptions"></data-list>
    <!--列表组件结束-->
  </div>
</template>

<script>
import dataList from "../../components/List"
export default {
  name: "jcxmwh",
  components:{
    dataList,
  },
  data() {
    return {
      listOptions:{
        listName: 'jcxmList',
        listEdit: 'popup',
        listInputs: {
          bm:"",
          name: "",
          wpdsx:"",
          lrsx:"",
          jclx:"",
          cs:"",
          dw:"",
          xzbz1:"",
          xzbz2:"",
          jyff:"",
          jyyj:"",
          bz:"",
          zcjg:"",
          jyjg:"",
          id:"",
        },
        listColumns: [
          {name: 'bm', align: 'left', label: '编码', field: 'bm', sortable: true},
          {name: 'name', align: 'left', label: '名字', field: 'name', sortable: true},
          {name: 'wpdsx', align: 'left', label: '委派单顺序', field: 'wpdsx', sortable: true},
          {name: 'lrsx', align: 'left', label: '录入顺序', field: 'lrsx', sortable: true},
          {name: 'jclx', align: 'left', label: '检测类型', field: 'jclx', sortable: true},
          {name: 'cs', align: 'left', label: '场所', field: 'cs', sortable: true},
          {name: 'dw', align: 'left', label: '单位', field: 'dw', sortable: true},
          {name: 'xzbz1', align: 'left', label: '限值标准一', field: 'xzbz1', sortable: true},
          {name: 'xzbz2', align: 'left', label: '限值标准二', field: 'xzbz2', sortable: true},
          {name: 'jyff', align: 'left', label: '检验方法', field: 'jyff', sortable: true},
          {name: 'jyyj', align: 'left', label: '检验依据', field: 'jyyj', sortable: true},
          {name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          {name: 'zcjg', align: 'left', label: '正常结果', field: 'zcjg'},
          {name: 'jyjg', align: 'left', label: '检验结果', field: 'jyjg'},
          {name: "opt", align: "center", label: "操作",  columns: true}
        ],
        listVisibleColumns: ['bm','name','jclx','cs','dw','xzbz1','xzbz2','jyff','jyyj','bz','opt'],
        listFilters:{
          jclx:"", cs:""
        }
      },
    }
  },
}
</script>

<style scoped>

</style>
