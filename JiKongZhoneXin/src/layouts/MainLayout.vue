<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="text-white" style="background:linear-gradient(to right, #00ab94, #059579)">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>

        <q-toolbar-title style="position: relative">
          <img style="height: 60px;margin-left: 10px;margin-right: 5px" src="img/logo_m.png"/>
        </q-toolbar-title>
        <!--顶部导航-->
        <div class="self-stretch row no-wrap gt-md" style="float:left;">
          <q-btn flat :to="value.to" :label="value.label" v-for="(value,index) in com">
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup v-for="nav in value.child" :to="nav.to">
                  <q-item-section>
                    <q-item-label>{{ nav.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-btn flat round dense icon="person_outline" label="管理员" title="管理信息"/>
        <q-btn flat round dense icon="power_settings_new" class="q-ml-lg" label="退出" to="/"/>
      </q-toolbar>
    </q-header>

    <!-- 菜单 -->
    <q-drawer show-if-above v-model="left" side="left" elevated id="menu" style="background:#0CC">
      <q-list class="bg-primary-menu-BGColor" style="overflow:hidden">
        <template v-for="(item1, index1) in menuData.data">
          <!-- 一级有子集 -->
          <q-expansion-item v-if="item1.children!=undefined" group="one" :label="item1.name" :icon="item1.icon" expand-separator class="text-primary-column bg-primary-menu-BGColor">
            <template v-for="(item2, index2) in item1.children">
              <q-separator inset :key="'sep' + index2" v-if="item2.separator"/>
              <!-- 二级有子集 -->
              <q-expansion-item v-if="item2.children!=undefined" group="two" :label="item2.name" :icon="item2.icon" dense-toggle expand-separator :header-inset-level="0.2" class="text-primary-column">
                <template v-for="(item3, index3) in item2.children">
                  <!-- 三级有子集 -->
                  <q-expansion-item v-if="item3.children!=undefined" group="three" :label="item3.name"
                                    :icon="item3.icon" dense-toggle :header-inset-level="0.4"
                                    class="text-primary-column">
                    <template v-for="(item4, index4) in item3.children">
                      <!-- 四级只可以为菜单 -->
                      <q-item :to="item4.urlPath" :key="item4.id" clickable v-ripple
                              class="text-primary-menu-unselected">
                        <q-item-section avatar>
                          <q-icon :name="item4.icon" style="margin-left: 35px;margin-right: 15px;"/>
                        </q-item-section>
                        <q-item-section>
                          {{ item4.name }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-expansion-item>
                  <!-- 三级无子集 -->
                  <q-item v-if="item3.children==undefined" :to="item3.urlPath" :key="item3.id" clickable v-ripple
                          class="text-primary-menu-unselected">
                    <q-item-section avatar>
                      <q-icon :name="item3.icon" style="margin-left: 23px;margin-right: 15px;"/>
                    </q-item-section>
                    <q-item-section>
                      {{ item3.name }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-expansion-item>
              <!-- 二级无子集 -->
              <q-item v-if="item2.children==undefined" :to="item2.urlPath" :key="item2.id" clickable v-ripple
                      class="text-primary-menu-unselected">
                <q-item-section avatar>
                  <q-icon :name="item2.icon" style="margin-left: 12px;margin-right: 15px;"/>
                </q-item-section>
                <q-item-section>
                  {{ item2.name }}
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
          <!-- 一级无子集 -->
          <q-item v-if="item1.children==undefined" :to="item1.urlPath" :key="item1.id" clickable v-ripple
                  class="text-primary-menu-unselected">
            <q-item-section avatar>
              <q-icon :name="item1.icon"/>
            </q-item-section>
            <q-item-section>
              {{ item1.name }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      menuData: {
        data: this.$store.getters['pages/menu']
      }
    }
  },
  /*mounted() {
     this.leftDrawerOpen=false,
     this.disable=true
    },*/
  methods: {
    tabclick(index) {
      if (
        this.com[index].child != undefined &&
        this.com[index].child.length > 0
      ) {
        (this.leftDrawerOpen = true), (this.disabl = false);
      } else {
        (this.leftDrawerOpen = false), (this.disabl = true);
      }
    },
    changeColor(color) {
      colors.setBrand("primary", color);
      this.customizeColor = color;
    },
    changeCustomizeColor() {
      colors.setBrand("primary", this.customizeColor);
    }
  },

  computed:{
    //顶部导航列表
    com:function(){
      let com = []

      for(let key in this.menuData.data){
        let item = this.menuData.data[key]
        com.push({
          label: item.name,
          child: []
        })
        for(let subKey in item.children){
          com[key].child.push({
            label: item.children[subKey].name,
            to:item.children[subKey].urlPath
          })
        }
      }

      return com
    }


  }
}
</script>
