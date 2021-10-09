<template>
  <q-card style="padding: 2%; height: 100%;">

    <!--退回原因开始-->
    <q-card-section v-if="inputs.zt === '已退回'">
      <div class="row items-center bg-negative" style="color: white; border-radius: 5px; height: 50px;">
        <div class="col-1 text-center text-body1">退回原因:</div>
        <div class="col-10 text-body1">{{inputs.reason}}</div>
      </div>
      <q-separator style="margin: 20px 0" />
    </q-card-section>
    <!--退回原因结束-->

    <!--表单开始-->
    <q-form id="form" class="row text-right text-body1" @submit="submitItem" @reset="resetItem">
      <div class="col-1"><p>报告编号</p></div>
      <div class="col-5">
        <q-input v-model=inputs.bgbh placeholder="请输入报告编号" dense outlined color="teal"
                 :disable="editing" :rules="[validateDuplication]"
        ></q-input>
      </div>
      <div class="col-1"><p>样品来源</p></div>
      <div class="col-5">
        <q-input v-model=inputs.yply placeholder="请输入样品来源" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>送(采)样单位</p></div>
      <div class="col-5">
        <q-input v-model=inputs.scydw placeholder="请输入送(采)样单位" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>送(采)样人</p></div>
      <div class="col-5">
        <q-input v-model=inputs.scyr placeholder="请输入送(采)样人" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>送(采)样日期</p></div>
      <div class="col-5">
        <q-input style="margin-bottom:-20px;" outlined v-model="inputs.scyrq" mask="date" :rules="['date']" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="inputs.scyrq">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-1"><p>检验目的</p></div>
      <div class="col-5">
        <q-input v-model=inputs.jymd placeholder="请输入检验目的" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>收样人</p></div>
      <div class="col-5">
        <q-input v-model=inputs.syr placeholder="请输入收样人" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>执行标准</p></div>
      <div class="col-5">
        <q-input v-model=inputs.zxbz placeholder="请输入执行标准" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>受理类别</p></div>
      <div class="col-5">
        <q-input v-model=inputs.sllb placeholder="请输入受理类别" dense outlined color="teal"
                 :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入正确值']"></q-input>
      </div>
      <div class="col-1"><p>受理日期</p></div>
      <div class="col-5">
        <q-input style="margin-bottom:-20px;" outlined v-model="inputs.slrq" mask="date" :rules="['date']" dense>
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="inputs.slrq">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <!--表单结束-->

      <!--List组件开始-->
      <div class="col-1" style="margin-top: 20px;"><p>检测对象</p></div>
      <div class="col-11" style="height: 500px; margin-top: 20px">
        <List :list-options="listOptions1" @submitSelectEvent="submitSelect1"></List>
      </div>
      <!--List组件结束-->

      <!--List组件开始-->
      <div class="col-1" style="margin-top: 20px"><p>检测项目</p></div>
      <div class="col-11" style="height: 500px; margin: 20px 0 30px 0">
        <List :list-options="listOptions2" @submitSelectEvent="submitSelect2"></List>
      </div>
      <!--List组件结束-->

      <!--提交按钮-->
      <div class="col-12" style="text-align:center;">
        <q-btn label="历史记录" color="teal" style="margin-right: 8px" @click="popupHistoryWindow"/>

        <q-btn label="确定" type="submit" color="teal"/>

        <q-btn :label=this.resetButton type="reset" color="teal" class="q-ml-sm"/>
      </div>
    </q-form>
    <!--表单结束-->

    <!--历史记录弹窗开始-->
    <q-dialog v-model="popup">
      <q-card style="max-width: 70%; max-height: 70%">
        <List :list-options="listOptions3" @submitSelectEvent="submitSelect3"></List>
      </q-card>
    </q-dialog>
    <!--历史记录弹窗开始-->

  </q-card>
</template>

<script>
import List from "./List";
import {addList, getList, editList} from "../network/data";

export default {
  name: "Wpd",
  components: {
    List
  },
  props: {
    //委派单名字
    wpdListName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      inputs: {
        bgbh: "",//报告编号
        yply: "",//样品来源
        scydw: "",//送(采)样单位
        scyr: "",//送(采)样人
        scyrq: "2021/01/01",//送(采)样日期
        jymd: "",//检验目的
        syr: "",//收样人
        zxbz: "",//执行标准
        sllb: "",//受理类别
        slrq: "2021/01/01",//受理日期
        jcxm: [],//检测项目
        jcdx: [],//检测对象
        wpdlx:"",//委派单类型
        zt:"未接收",//状态
        id: "",
      },
      preInputs: {},//用于重置委派单
      editing: false,//委派单编辑状态
      timer: null,//计时器
      popup: false,//弹窗状态

      //列表配置：
      //列表1：检测对象
      listOptions1:{
        listName: `${this.wpdListName.substring(0,this.wpdListName.indexOf('wpd'))}jcdxList`,
        listEdit: 'multipleAdd',
        listSelection: "multiple",
        listDense: true,
        listInputs:{
          number:"",
        },
        listSelected: [],
        listColumns:[
          {name: 'name', align: 'left', required: true, label: '名字', field: 'name', sortable: true},
          {name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          {name: 'number', align: 'left', label: '数量', field: 'number', sortable: true},
        ],
        listVisibleColumns: ['name','bz']
      },
      //列表2：检测项目
      listOptions2:{
        listName: 'jcxmList',
        listEdit: 'none',
        listSelection: "multiple",
        listDense: true,
        listSelected: [],
        listParams:{},
        listColumns:
          [
            {name: 'bm', align: 'left', label: '编码', field: 'bm', sortable: true},
            {name: 'name', align: 'left', label: '名字', field: 'name', sortable: true},
            {name: 'jclx', align: 'left', label: '检测类型', field: 'jclx', sortable: true},
            {name: 'cs', align: 'left', label: '场所', field: 'cs', sortable: true},
            {name: 'dw', align: 'left', label: '单位', field: 'dw', sortable: true},
            {name: 'xzbz1', align: 'left', label: '限值标准一', field: 'xzbz1', sortable: true},
            {name: 'xzbz2', align: 'left', label: '限值标准二', field: 'xzbz2', sortable: true},
            {name: 'jyff', align: 'left', label: '检验方法', field: 'jyff', sortable: true},
            {name: 'jyyj', align: 'left', label: '检验依据', field: 'jyyj', sortable: true},
            {name: 'bz', align: 'left', label: '备注', field: 'bz', sortable: true},
          ],
        listFilters: {jclx: "", cs: ""},
      },
      //列表3：历史记录
      listOptions3: {
        listName: this.wpdListName,
        listEdit: 'none',
        listSelection: "single",
        listDense: true,
        listColumns: this.$store.state.pages.wpdListColumns,
        listFilters: this.$store.state.pages.wpdListFilters,
      }
    }
  },
  computed: {
    //重置按钮的名字
    resetButton: function () {
      return this.editing === true ? '重置' : '清除'
    },
  },

  methods: {
    //检测报告编号是否重复
    validateDuplication(val) {
      if(!this.editing){
        if (this.timer) clearTimeout(this.timer)
        return new Promise((resolve, reject) => {
          if (!val) resolve('请输入正确值')
          else {
            this.timer = setTimeout(() => {
              getList('xswpdList').then(res => {
                for(let item of res){
                  if(item.bgbh === val){
                    resolve('编号重复')
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
        editList(this.wpdListName, this.inputs.id, this.inputs)
      } else {
        //后端通信
        let wpdlxList = {}
        getList('jcxmList').then(res => {
          for(let jcxm of this.inputs.jcxm){
            for(let item of res){
              if(item.name === jcxm){
                wpdlxList[item.jclx] = !!wpdlxList[item.jclx]?wpdlxList[item.jclx] : []
                wpdlxList[item.jclx].push(jcxm)
                break;
              }
            }
          }
          let index = 0;
          for(let wpdlx in wpdlxList){
            let inputs = JSON.parse(JSON.stringify(this.inputs))
            inputs.jcxm = wpdlxList[wpdlx]
            inputs.wpdlx = wpdlx
            inputs.id = `${this.wpdListName}${Math.random()}`
            addList(this.wpdListName, inputs)
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
        this.$router.push({path: `${this.wpdListName.substring(0,this.wpdListName.indexOf('wpd'))}ckwpd`})
      }, 1000)
    },

    //重置委派单
    resetItem() {
      this.$q.dialog({
        title: `确认${this.resetButton}`,
        message: `将${this.resetButton}所有输入`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        //如果是修改页
        if (this.editing) {
          //深拷贝恢复原数据
          this.inputs = JSON.parse(JSON.stringify(this.preInputs))
        }
        //如果是新增页
        else {
          this.inputs = {
            bgbh: "",//报告编号
            yply: "",//样品来源
            scydw: "",//送(采)样单位
            scyr: "",//送(采)样人
            scyrq: "2021/01/01",//送(采)样日期
            jymd: "",//检验目的
            syr: "",//收样人
            zxbz: "",//执行标准
            sllb: "",//受理类别
            slrq: "2021/01/01",//受理日期
            jcxm: [],//检测项目
            jcdx: [],//检测对象
            wpdlx:"",//委派单类型
            zt:"未接收",//状态
            id: "",
          }
        }
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
      getList(this.wpdListName, {id:e}).then(res => {
        this.inputs = res[0]
        this.inputs.bgbh = ""
        this.listOptions1.listSelected = this.inputs.jcdx
        this.listOptions2.listSelected = this.inputs.jcxm
      })
      this.popup = false
    }
  },

  mounted() {
    //如果有传入id,说明这是一个修改页面，则从后端获取信息自动填表
    if (this.$route.query.id) {
      //开启编辑模式
      this.editing = true
      getList(this.wpdListName, {id: this.$route.query.id}).then(res => {
        this.inputs = res[0]
        //用于重置输入
        this.preInputs = JSON.parse(JSON.stringify(this.inputs))
        //向检测对象列表组件传输选择结果
        this.listOptions1.listSelected = this.inputs.jcdx
        //向检测项目列表组件传输选择结果
        this.listOptions2.listSelected = this.inputs.jcxm
      })
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
