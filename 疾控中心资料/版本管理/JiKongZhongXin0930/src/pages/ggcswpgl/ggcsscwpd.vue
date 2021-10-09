<template>
  <div class="q-pa-lg">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">公共场所委派-生成委派单</p>
    <!--页面标题结束-->

    <!--委派单组件开始-->
    <div>
      <Wpd :wpd-list-name="wpdListName" :wpd-options="wpdOptions"></Wpd>
    </div>
    <!--委派单组件结束-->
  </div>
</template>

<script>
import Wpd from "../../components/Wpd";

export default {
  name: "ggcsscwpd",
  components:{
    Wpd
  },
  data(){
    return{
      wpdOptions: {
        wpdListName:'ggcswpdList',
        wpdInputs:JSON.parse(JSON.stringify(this.$store.state.pages.ggcswpdTemplate))
      },
      wpdListName:'ggcswpdList'
    }
  },
}
</script>

<style scoped>

</style>
