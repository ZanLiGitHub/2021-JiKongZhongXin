<template>
  <div style="position: relative">
    <div id="background">
      <img src="img/bg.jpg" width="100%"/>
    </div>

    <div id="loginBox">
      <!--背景图片-->
      <img src="img/loginbox.png" style="width: 100%" />
      <div id="inputs">
        <!--用户名-->
        <q-input  v-model="username" outlined style="width: 100%; margin-bottom: 20px">
          <template v-slot:prepend style="color: blue;">
            <img src="icons/person.png" style="color: rgb(0,171,148); width: 25px;"/>
          </template>
        </q-input>
        <!--密码-->
        <q-input  v-model="password" outlined :type="isPwd ? 'password' : 'text'" style="width: 100%; margin-bottom: 20px">
          <template v-slot:prepend>
            <img src="icons/sey-key-b.png" style="color: rgb(0,171,148); width: 25px;"/>
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <!--记住账号，忘记密码-->
        <div style="display: flex">
          <q-checkbox color="teal" v-model="remember" label="记住账号" style="margin: -10px auto 10px -10px"/>
          <router-link to="/xtgl/forgetPassword">忘记密码？</router-link>
        </div>
        <!--登录按钮-->
        <q-btn flat to="/main">
          <span>登&nbsp&nbsp&nbsp&nbsp&nbsp录</span>
        </q-btn>
      </div>
    </div>

    <div id="copyRight" >
      <p>©疾控中心管理信息系统</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password:"",
      remember:false,
      check: false,
      isPwd: true,
    }
  },
}
</script>

<style scoped lang="scss">
a{
  text-decoration: none;
  color: black;
}

#background{
  width: 100%;
  height: 100%;
  background: rgb(230,235,241);
}

#loginBox{
  background: white;
  width: 45%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0.5vw 0.5vw 1vw rgba(0,0,0,.5);
  overflow: hidden;
  #inputs{
    height: 60%;
    width: 50%;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
    .q-btn{
      width: 100%;
      height: 20%;
      background: rgb(0,171,148);
      span{
        font-family: "sans serif", tahoma, verdana, helvetica;
        color: white;
        font-size: 1vw;
        line-height: 100%;
      }

    }
  }
}

#copyRight{
  width: 10%;
  height: 3%;
  position:absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 0.9vw;
  color: rgba(0,0,0,.5)
}
</style>
