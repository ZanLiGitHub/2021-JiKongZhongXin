<template>
  <div class="q-pa-lg">
    <!--页面标题开始-->
    <p class="text-h5 q-m-lg">消杀委派-生成委派单</p>
    <!--页面标题结束-->

    <!--委派单组件开始-->
    <div>
      <Wpd :wpd-list-name="wpdListName"></Wpd>
    </div>
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
      wpdListName:'xswpdList'
    }
  },
}
</script>

<style scoped lang="scss">
</style>
