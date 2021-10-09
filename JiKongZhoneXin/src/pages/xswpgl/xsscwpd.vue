<template>
  <div class="q-pa-lg" style="height: 92vh">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">消杀委派-生成委派单</p>
    <!--页面标题结束-->

    <!--委派单组件开始-->
    <Wpd :wpd-list-name="wpdListName" :wpd-options="wpdOptions"></Wpd>
    <!--委派单组件结束-->
  </div>
</template>

<script>
import Wpd from "../../components/Wpd";

export default {
  name: "xsscwpd",
  components:{
    Wpd
  },
  data(){
    return{
      wpdOptions: {
        wpdListName:'xswpdList',
        wpdInputs:JSON.parse(JSON.stringify(this.$store.state.pages.xswpdTemplate))
      },
      wpdListName:'xswpdList'
    }
  },
}
</script>

<style scoped lang="scss">
</style>
