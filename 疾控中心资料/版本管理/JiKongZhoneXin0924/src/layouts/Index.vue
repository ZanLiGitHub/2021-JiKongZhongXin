<template>
  <div class="bg-main q-img__image q-col-gutter-md absolute-full" style="background-color:#e4f5fc">
    <img src="img/main_map.jpg" alt="1" style="position: absolute; top: 50%; left: 50%; transform: translate(-36%,-60%); width: 50%;" >
    <div class="row items-center justify-center" style="margin-top:28%; margin-left: 10%">
      <div class="col col-md-8">
        <div class="row justify-center">
          <div class="col-md-2 q-px-xl text-center" to="/main">
            <router-link to="">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
          <div class="col-md-2 q-px-xl text-center" to="/main">
            <router-link to="">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
          <div class="col-md-2 q-px-xl text-center" to="/main">
            <router-link to="">
              <q-img style="width:171px;"
                     src="/img/icon1.png"
                     :ratio="1"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      url: '',
    }
  }
}
</script>
