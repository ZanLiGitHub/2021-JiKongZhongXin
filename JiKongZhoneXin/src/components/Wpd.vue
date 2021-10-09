<template>
  <q-card style="padding: 2%; height: 95%;">

    <!--退回原因开始-->
    <q-card-section v-if="inputs.zt === '已退回'">
      <div class="row items-center bg-negative" style="color: white; border-radius: 5px; height: 50px;">
        <div class="col-1 text-center text-body1">退回原因:</div>
        <div class="col-10 text-body1">{{ inputs.reason }}</div>
      </div>
      <q-separator style="margin: 20px 0"/>
    </q-card-section>
    <!--退回原因结束-->

    <!--表单开始-->
    <q-form id="form" class="row text-right text-body1" @submit="submitItem" @reset="resetItem">
      <!--提交按钮-->
      <div class="col-12" style="text-align:center;">
        <q-btn label="历史记录" color="teal" style="margin-right: 8px" @click="popupHistoryWindow"/>

        <q-btn label="确定" type="submit" color="teal"/>

        <q-btn :label="editing? '重置' : '清除'" type="reset" color="teal" class="q-ml-sm"/>
      </div>

      <q-separator style="margin: 20px 0"/>

      <!--输入框部分开始-->
      <div class="col-6 row">
        <!--一个表单项开始，占6格-->
        <div class="col-6 row" v-for="(value,key) in wpdOptions.wpdInputs" :key="key" style="margin-bottom: 10px">
          <!--表单项标题开始，占表单项里的4格-->
          <!--不显示状态，id，委派单类型，检测对象，检测项目-->
          <div class="col-4" v-if="!['zt','id', 'wpdlx', 'jcdx', 'jcxm'].includes(key)" style="margin-top: 7px; font-size: 14px">
            {{ $store.state.pages.chineseNames[key] }}
          </div>
          <!--表单项标题结束-->
          <!--表单项输入框开始，占表单项里的8格-->
          <!--不显示状态，id，委派单类型，检测对象，检测项目-->
          <div class="col-8" style="padding-left: 5px" v-if="!['zt','id', 'wpdlx', 'jcdx', 'jcxm'].includes(key)">
            <!--日期选择框开始-->
            <!--如果日期类属性，则显示日期选择框-->
            <q-input v-if="['scyrq','slrq','sdwcrq'].includes(key)" style="margin-bottom:-20px;" outlined color="teal"
                     v-model="inputs[key]" mask="date" :rules="['date']" dense>
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="inputs[key]">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat/>
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!--日期选择框结束-->
            <!--选择框开始-->
            <!--如果是报告是否评价，则显示选择框-->
            <q-select v-else-if="['bgsfpj'].includes(key)" :options="['是','否']" outlined dense color="teal"
                      v-model="inputs[key]"></q-select>
            <!--选择框结束-->
            <q-input ref="bgbh" v-else-if="key === 'bgbh'" v-model=inputs[key] placeholder="请输入" dense outlined color="teal"
                     :disable="editing" :rules=[validateDuplication] style="margin-bottom: -20px"></q-input>
            <!--输入框开始-->
            <!--如果是其他属性，则显示输入框-->
            <!--如果是修改为派单状态，则报告编号不可修改-->
            <q-input v-else v-model=inputs[key] placeholder="请输入" dense outlined color="teal"></q-input>
            <!--输入框结束-->
          </div>
          <!--表单项输入框结束-->
        </div>
        <!--一个表单项结束-->
      </div>
      <!--输入框部分结束-->

      <!--列表组件部分开始-->
      <div class="col-6 row">
        <!--List组件开始-->
        <div class="col-2"><p style="font-size: 14px">检测对象</p></div>
        <div class="col-10" style="height: 300px">
          <List :list-options="listOptions1" @submitSelectEvent="submitSelect1"></List>
        </div>
        <!--List组件结束-->

        <!--List组件开始-->
        <div class="col-2"><p style="font-size: 14px">检测项目</p></div>
        <div class="col-10" style="height: 300px">
          <List :list-options="listOptions2" @submitSelectEvent="submitSelect2"></List>
        </div>
        <!--List组件结束-->
      </div>
      <!--列表组件部分结束-->
    </q-form>
    <!--表单结束-->

    <!--历史记录弹窗开始-->
    <q-dialog v-model="popup">
      <q-card style="max-width: 70%; max-height: 70%">
        <p class="text-h6 q-ml-md q-mt-sm">委派单历史记录</p>
        <List :list-options="listOptions3" @submitSelectEvent="submitSelect3"></List>
      </q-card>
    </q-dialog>
    <!--历史记录弹窗开始-->

  </q-card>
</template>

<script>
import List from "./List";
import * as axios from "../network/data";

export default {
  name: "Wpd",
  components: {
    List
  },
  props: {
    wpdOptions: {
      type: Object,
      required: true,
    },

    //委派单名字
    wpdListName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      inputs: {},
      preInputs: {},//用于重置委派单
      editing: false,//委派单编辑状态
      timer: null,//计时器
      popup: false,//弹窗状态

      //列表配置：
      //列表1：检测对象
      listOptions1: {
        listName: `${this.wpdOptions.wpdListName.substring(0, this.wpdOptions.wpdListName.indexOf('wpd'))}jcdxList`,
        listEdit: 'multipleAdd',
        listSelection: "multiple",
        listDense: true,
        listInputs: {
          number: "",
        },
        listSelected: [],
        listColumns: [
          {name: 'name', align: 'left', required: true, label: '名字', field: 'name', sortable: true},
          {name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          {name: 'number', align: 'left', label: '数量', field: 'number', sortable: true},
        ],
        listVisibleColumns: ['name', 'bz']
      },
      //列表2：检测项目
      listOptions2: {
        listName: 'jcxmList',
        listEdit: 'none',
        listSelection: "multiple",
        listDense: true,
        listSelected: [],
        listParams: {},
        listColumns:
          [
            {name: 'bm', align: 'left', label: '编码', field: 'bm', sortable: true},
            {name: 'name', align: 'left', label: '名字', field: 'name', sortable: true},
            {name: 'jclx', align: 'left', label: '检测类型', field: 'jclx', sortable: true},
            {name: 'cs', align: 'left', label: '场所', field: 'cs', sortable: true},
            {name: 'dw', align: 'left', label: '单位', field: 'dw', sortable: true},
            //{name: 'xzbz1', align: 'left', label: '限值标准一', field: 'xzbz1', sortable: true},
            //{name: 'xzbz2', align: 'left', label: '限值标准二', field: 'xzbz2', sortable: true},
            //{name: 'jyff', align: 'left', label: '检验方法', field: 'jyff', sortable: true},
            //{name: 'jyyj', align: 'left', label: '检验依据', field: 'jyyj', sortable: true},
            //{name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          ],
        listFilters: {jclx: "", cs: ""},
      },
      //列表3：历史记录
      listOptions3: {
        listName: this.wpdOptions.wpdListName,
        listEdit: 'none',
        listSelection: "single",
        listDense: true,
        listColumns: this.$store.state.pages.wpdListColumns,
        listFilters: this.$store.state.pages.wpdListFilters,
      }
    }
  },

  computed:{
    getList: function () {
      return axios[`get${this.wpdOptions.wpdListName}`]
    },
    addList: function () {
      return axios[`add${this.wpdOptions.wpdListName}`]
    },
    deleteList: function () {
      return axios[`delete${this.wpdOptions.wpdListName}`]
    },
    editList: function () {
      return axios[`edit${this.wpdOptions.wpdListName}`]
    }
  },

  methods: {
    //检测报告编号是否重复
    validateDuplication(val) {
      if (!this.editing) {
        if (this.timer) clearTimeout(this.timer)
        return new Promise((resolve, reject) => {
          if (!val || val.length === 0 || val.replace(/\s/g, '').length === 0) resolve(true)
          else {
            this.timer = setTimeout(() => {
              this.getList().then(res => {
                for (let item of res) {
                  if (item.bgbh === val) {
                    resolve('')
                  }
                }
                resolve(true)
              })
            }, 300)
          }
        })
      }
    },

    //弹出历史记录窗口
    popupHistoryWindow() {
      this.popup = true
    },

    //上传委派单
    submitItem() {
      if (this.editing) {
        //后端通信
        this.inputs.zt = '未接收'
        this.editList(this.inputs.id, this.inputs)
      } else {
        //后端通信
        let wpdlxList = {}
        axios.getjcxmList().then(res => {
          for (let jcxm of this.inputs.jcxm) {
            for (let item of res) {
              if (item.name === jcxm) {
                wpdlxList[item.jclx] = !!wpdlxList[item.jclx] ? wpdlxList[item.jclx] : []
                wpdlxList[item.jclx].push(jcxm)
                break;
              }
            }
          }
          let index = 0;
          for (let wpdlx in wpdlxList) {
            let inputs = JSON.parse(JSON.stringify(this.inputs))
            inputs.jcxm = wpdlxList[wpdlx]
            inputs.wpdlx = wpdlx
            inputs.id = `${this.wpdOptions.wpdListName}${Math.random()}`
            this.addList(inputs)
          }
        })
      }
      //弹出通知
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "已提交"
      });
      //跳转
      setTimeout(() => {
        let st =
          this.$router.push({path: `${this.wpdOptions.wpdListName.substring(0, this.wpdOptions.wpdListName.indexOf('wpd'))}ckwpd`})
      }, 1000)
    },

    //重置委派单
    resetItem() {
      this.$q.dialog({
        title: `确认${this.editing ? '重置' : '清除'}`,
        message: `将${this.editing ? '重置' : '清除'}所有输入`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        //深拷贝恢复原数据
        this.inputs = JSON.parse(JSON.stringify(this.preInputs))
      })
    },

    //获取来自列表子组件的通信
    //获取选择的检测对象
    submitSelect1(e) {
      this.inputs.jcdx = e
    },
    //获取选择的检测项目
    submitSelect2(e) {
      this.inputs.jcxm = e
    },
    //获取选择的历史记录
    submitSelect3(e) {
      this.getList({id: e}).then(res => {
        this.inputs = res[0]
        this.inputs.bgbh = ""
        this.listOptions1.listSelected = this.inputs.jcdx
        this.listOptions2.listSelected = this.inputs.jcxm
      })
      this.popup = false
    }
  },

  mounted() {
    //先重置报告编号输入框的检测，防止刚打开页面就是红色框
    //this.$refs.bgbh[0].resetValidation();
    //如果有传入id,说明这是一个修改页面，则从后端获取信息自动填表
    if (this.$route.query.id) {
      //开启编辑模式
      this.editing = true
      this.getList({id: this.$route.query.id}).then(res => {
        this.inputs = res[0]
        //用于重置输入
        this.preInputs = JSON.parse(JSON.stringify(this.inputs))
        //向检测对象列表组件传输选择结果
        this.listOptions1.listSelected = this.inputs.jcdx
        //向检测项目列表组件传输选择结果
        this.listOptions2.listSelected = this.inputs.jcxm
      })
    } else {
      this.inputs = JSON.parse(JSON.stringify(this.wpdOptions.wpdInputs))
      this.preInputs = JSON.parse(JSON.stringify(this.inputs))

    }
  }
}
</script>

<style scoped lang="scss">
#form {
  p {
    margin: 5% 5% 0 0
  }

  .col-5 {
    margin-bottom: 0.5%;
  }
}
</style>
