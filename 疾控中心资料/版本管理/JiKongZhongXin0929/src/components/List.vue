<template>
  <div style="height: 95%">
    <!--页面主体开始-->
    <q-card style="height:100%">
      <q-table
        title="列表"
        style="max-height: 100%"
        virtual-scroll
        separator="cell"
        @update:selected="submitSelect"
        :row-key="row => row.id"
        :data="list"
        :dense="listOptions.listDense"
        :columns="listOptions.listColumns"
        :visible-columns="listOptions.listVisibleColumns"
        :selection="listOptions.listSelection"
        :selected.sync="selected"
        :loading="loading"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :table-header-style="{backgroundColor: 'rgba(1,1,1,.1)'}"
      >
        <!--列表顶部插件开始-->
        <template v-slot:top>
          <!--新增按钮开始-->
          <div
            v-if="listOptions.listEdit==='popup' || listOptions.listEdit==='redirect' || listOptions.listEdit==='multipleAdd'"
            style="margin-right: 1%">
            <q-btn icon="add" color="teal" dense round @click="addItem"></q-btn>
            <span class="text-body1 q-ml-sm">新增</span>
          </div>
          <!--新增按钮结束-->

          <!--复核与审核按钮开始-->
          <div
            v-if="listOptions.listEdit==='receive' && listOptions.listSelection==='multiple'"
            style="margin-right: 1%">
            <q-btn icon="check" color="teal" dense round @click="receiveItem"></q-btn>
            <span v-if="listOptions.listParams.zt.includes('未复核')" class="text-body1 q-ml-sm">复核</span>
            <span v-else class="text-body1 q-ml-sm">审核</span>
          </div>
          <!--复核与审核按钮结束-->

          <!--筛选器开始-->
          <div style="display: flex" v-if="listOptions.listFilters">
            <q-select
              v-for="(item, index) in Object.keys(listOptions.listFilters)" :key="index" outlined
              v-model="listOptions.listFilters[item]"
              @focus="buildFilterList(item)" @input="searchItem"
              :options="filterList" :label="'请选择' + listOptions.listColumns.find(obj => obj.name===item).label"
              style="margin-right: 1%; width: 200px;" dense color="teal">
            </q-select>
          </div>
          <!--筛选器结束-->

          <q-space/>

          <!--关键字搜索开始-->
          <q-input style="width: 20%;" standout="bg-teal text-white" v-model="searchKey" label="请输入关键字" dense
                   @keyup="searchItem">
            <template v-slot:prepend>
              <q-icon name="search"/>
            </template>
          </q-input>
          <!--关键字搜索结束-->
        </template>
        <!--列表顶部插件结束-->

        <!--状态栏开始-->
        <template #body-cell-zt="props">
          <td style="text-align: center; width: 110px !important;">
            <q-chip v-if="props.row.zt === '未接收'" square color="orange-5" text-color="white">
              {{ props.row.zt }}
            </q-chip>
            <q-chip v-if="props.row.zt === '已接收'" square color="grey" text-color="white">
              {{ props.row.zt }}
            </q-chip>
            <q-chip v-if="props.row.zt === '未录入'" square color="green" text-color="white">
              {{ props.row.zt }}
            </q-chip>
            <q-chip v-if="props.row.zt === '未复核'" square color="secondary" text-color="white">
              {{ props.row.zt }}
            </q-chip>
            <q-chip v-if="props.row.zt === '已复核'" square color="primary" text-color="white">
              {{ listOptions.listParams.zt.includes('未复核') ? '已复核' : '未审核' }}
            </q-chip>
            <q-chip v-if="props.row.zt === '已审核'" square color="grey" text-color="white">
              {{ props.row.zt }}
            </q-chip>
            <q-chip v-if="props.row.zt === '已退回'" square color="negative" text-color="white">
              {{ props.row.zt }}
            </q-chip>
          </td>
        </template>
        <!--状态栏结束-->

        <!--操作按钮栏开始-->
        <template #body-cell-opt="props">
          <td style="text-align: center;width: 5% !important;">
            <!--修改按钮开始-->
            <q-btn
              v-if="(listOptions.listEdit==='popup' || listOptions.listEdit==='redirect') && (listOptions.listName.includes('jcdxList') || props.row.zt === '未接收' || props.row.zt === '已退回')"
              icon="create" flat round
              dense color="teal"
              @click="editItem(props)">
              <q-tooltip>修改</q-tooltip>
            </q-btn>
            <!--修改按钮结束-->

            <!--删除按钮开始-->
            <q-btn
              v-if="(listOptions.listEdit==='popup' || listOptions.listEdit==='redirect') && (listOptions.listName.includes('jcdxList') || props.row.zt === '未接收' || props.row.zt === '已退回')"
              icon="delete_forever" flat
              round dense color="teal" @click="deleteItem(props.key)">
              <q-tooltip>删除</q-tooltip>
            </q-btn>
            <!--删除按钮结束-->

            <!--查看按钮开始-->
            <q-btn v-if="listOptions.listEdit==='review' || listOptions.listEdit==='receive'" icon="preview" flat round
                   dense color="teal"
                   @click="reviewItem">
              <q-tooltip>查看</q-tooltip>
            </q-btn>
            <!--查看按钮结束-->

            <!--接收按钮开始-->
            <q-btn
              v-if="listOptions.listEdit==='receive' && (listOptions.listName.includes('wpd') || (listOptions.listParams.zt.includes('未复核') && props.row.zt==='未复核') || (listOptions.listParams.zt.includes('已审核') && props.row.zt==='已复核'))"
              icon="check_circle" flat round dense color="teal"
              @click="receiveItem(props.key)">
              <q-tooltip>接收</q-tooltip>
            </q-btn>
            <!--接收按钮结束-->

            <!--退回按钮开始-->
            <q-btn
              v-if="listOptions.listEdit==='receive' && (listOptions.listName.includes('wpd') || (listOptions.listParams.zt.includes('未复核') && props.row.zt==='已复核') || (listOptions.listParams.zt.includes('已审核') && props.row.zt==='已审核'))"
              icon="cancel" flat round dense color="teal"
              @click="rejectItem(props.key)">
              <q-tooltip>退回</q-tooltip>
            </q-btn>
            <!--退回按钮结束-->

            <!--录入结果按钮开始-->
            <q-btn v-if="listOptions.listEdit==='result'" icon="create" flat round dense color="teal"
                   @click="resultItem(props.key)">
              <q-tooltip>录入结果</q-tooltip>
            </q-btn>
            <!--录入结果按钮结束-->
          </td>
        </template>
        <!--操作按钮栏结束-->
      </q-table>
    </q-card>
    <!--页面主体结束-->

    <!--修改信息弹出框开始-->
    <q-dialog v-if="listOptions.listEdit==='popup'" v-model="popup">
      <q-card style="min-width: 20%;max-width: 70%; max-height: 70%">
        <q-form @submit="submitItem">
          <!--弹出框主体部分开始-->
          <q-card-section style="max-height: 80vh" class="scroll">
            <div class="row q-ma-md">
              <!--遍历inputs获取key-->
              <div class="col-6 row" v-for="(item,index) in Object.keys(inputs)" :key="index">
                <!--标题开始-->
                <div class="col-3" v-if="item!=='id' && item!=='jyjg'">
                  <p style="margin:7%" class="text-body1 text-right">
                    <!--使用key在columns数组中寻找对应的中文名-->
                    {{ listOptions.listColumns.find(obj => obj.name === item).label }}
                  </p>
                </div>
                <!--标题结束-->

                <!--输入部分开始-->
                <div class="col-8">
                  <!--检测类型和科室种类是选择框-->
                  <q-select v-if="item==='jclx' || item==='kszl'" outlined dense color="teal" v-model="inputs[item]"
                            @focus="buildOptionList(item)"
                            :options="optionList" label="请选择"/>
                  <!--id和检验结果不显示-->
                  <div v-else-if="item === 'id' || item === 'jyjg'"></div>
                  <!--其他都为输入框-->
                  <q-input v-else dense outlined color="teal" v-model=inputs[item] label="请输入"
                           :rules="[ val => val && val.length > 0 && val.replace(/\s/g, '').length!==0|| '请输入']"></q-input>
                </div>
                <!--输入部分结束-->
              </div>
            </div>
          </q-card-section>
          <!--弹出框主体部分结束-->

          <q-separator/>

          <!--弹出框按钮部分开始-->
          <q-card-section>
            <q-btn flat label="取消" color="teal" v-close-popup/>
            <q-btn flat label="确认" color="teal" type="submit"/>
          </q-card-section>
          <!--弹出框按钮部分结束-->
        </q-form>
      </q-card>
    </q-dialog>
    <!--修改信息弹出框结束-->

    <!--多项添加信息弹出框开始-->
    <q-dialog v-if="listOptions.listEdit==='multipleAdd'" v-model="popup">
      <q-card style="min-width: 400px;max-width: 70%; max-height: 70%">
        <q-form @submit="submitItem">
          <!--弹出框主体部分开始-->
          <q-card-section>
            <!--输入新增对象数量开始-->
            <div class="row q-ma-md">
              <div class="col-3 text-body1 text-left"><p style="margin: 7px 0 0 -7px">对象数量</p></div>
              <div class="col-9">
                <q-input dense outlined color="teal" style="width: 307px;margin:0 62px 0 0" placeholder="请输入"
                         v-model=inputs.number type="number" @input="addItem"></q-input>
              </div>
            </div>
            <!--输入新增对象数量结束-->

            <q-separator/>

            <!--输入新增对象详情开始-->
            <div class="row q-ma-md" v-for="(jcdx,index) in Object.keys(inputs)" :key="index">
              <div v-if="jcdx!=='number'" class="col-1 text-body1 text-right">
                <p style="margin: 7px 0 0 -25px; width: 60px">对象{{ parseInt(jcdx) + 1 }}</p>
              </div>
              <div v-if="jcdx!=='number'" class="col-5">
                <q-input dense outlined color="teal" style="width: 160px; margin:0 15px 0 5px" v-model=inputs[jcdx].name
                         placeholder="请输入"></q-input>
              </div>
              <div v-if="jcdx!=='number'" class="col-1 text-body1 text-right"><p style="margin-top: 7px">备注</p></div>
              <div v-if="jcdx!=='number'" class="col-5">
                <q-input dense outlined color="teal" style="width: 160px; margin:0 15px 0 5px" v-model=inputs[jcdx].bz
                         placeholder="请输入"></q-input>
              </div>
            </div>
            <!--输入新增对象详情结束-->
          </q-card-section>
          <!--弹出框主体部分结束-->

          <q-separator/>

          <!--弹出框按钮部分开始-->
          <q-card-section>
            <q-btn flat label="取消" color="teal" v-close-popup/>
            <q-btn flat label="确认" color="teal" type="submit"/>
          </q-card-section>
          <!--弹出框按钮部分结束-->
        </q-form>
      </q-card>
    </q-dialog>
    <!--多项添加信息弹出框结束-->

    <!--退回原因弹出框开始-->
    <q-dialog v-if="listOptions.listEdit==='receive'" v-model="popup">
      <q-card style="min-width: 40%;max-width: 70%; max-height: 70%">
        <!--弹出框主体部分开始-->
        <q-card-section style="max-height: 80vh" class="scroll">
          <div class="row q-ma-md">
            <!--标题开始-->
            <div class="col-3">
              <p style="margin-top: 30%" class="text-body1 text-left">
                请输入退回原因
              </p>
            </div>
            <!--标题结束-->

            <!--输入部分开始-->
            <div class="col-9">
              <q-input type="textarea" outlined color="teal" v-model=inputs.reason></q-input>
            </div>
            <!--输入部分结束-->
          </div>
        </q-card-section>
        <!--弹出框主体部分结束-->

        <q-separator/>

        <!--弹出框按钮部分开始-->
        <q-card-section>
          <q-btn flat label="确认" color="teal" v-close-popup @click="rejectItem"/>
        </q-card-section>
        <!--弹出框按钮部分结束-->
      </q-card>
    </q-dialog>
    <!--退回原因弹出框结束-->

    <!--录入结果弹出框开始-->
    <q-dialog v-if="listOptions.listEdit==='result'" v-model="popup">
      <q-card style="max-width: 70%; max-height: 90%; padding: 2%">
        <!--表单主体开始-->
        <q-card-section>
          <q-form id="form" class="row text-left text-body1" @submit="submitItem">
            <div>
              <!--&lt;!&ndash;标题内容开始&ndash;&gt;-->
              <!--<div class="col-12"><h5 class="text-center">长春市朝阳区疾病预防控制中心</h5></div>-->
              <!--<div class="col-12"><h6 class="text-bold text-center">检 测 报 告 书</h6></div>-->
              <!--<div class="col-12"><h6 class="text-bold text-center">{{ `(${inputs.wpdlx}部分)` }}</h6></div>-->
              <!--<div class="col-2"><p>证书编号</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.zsbh dense color="teal" :disable="editing" :rules="[validateDuplication]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>长朝(公卫)检字</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.ccgwjz dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"></div>-->
              <!--<div class="col-4"></div>-->
              <!--<div class="col-2"><p>受理编号</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.slbh dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--&lt;!&ndash;标题内容结束&ndash;&gt;-->
              <!--<q-separator/>-->
              <!--&lt;!&ndash;委派单内容开始&ndash;&gt;-->
              <!--<div class="col-2"><p>样品名称</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.ypmc dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>样品商标</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.ypsb dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>样品数量</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.ypsl dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>样品包装及状态</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.ypbzjzt dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>生产单位</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.scdw dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>生产日期(批号)</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.scrq dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>送检单位(采样)</p></div>-->
              <!--<div class="col-9">-->
              <!--  <q-input v-model=inputs.sjdwcy dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>送(采)样人</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.scyr dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>送(采)样日期</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.scyrq dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>检验目的</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.jymd dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>检验日期</p></div>-->
              <!--<div class="col-4">-->
              <!--  <q-input v-model=inputs.jyrq dense color="teal" mask="date" :rules="['date']">-->
              <!--    <template v-slot:prepend>-->
              <!--      <q-icon name="event" class="cursor-pointer">-->
              <!--        <q-popup-proxy-->
              <!--          ref="qDateProxy"-->
              <!--          transition-show="scale"-->
              <!--          transition-hide="scale"-->
              <!--        >-->
              <!--          <q-date v-model="inputs.jyrq">-->
              <!--            <div class="row items-center justify-end">-->
              <!--              <q-btn v-close-popup label="Close" color="primary" flat/>-->
              <!--            </div>-->
              <!--          </q-date>-->
              <!--        </q-popup-proxy>-->
              <!--      </q-icon>-->
              <!--    </template>-->
              <!--  </q-input>-->
              <!--</div>-->
              <!--<div class="col-2"><p>执行标准</p></div>-->
              <!--<div class="col-9">-->
              <!--  <q-input v-model=inputs.zxbz dense color="teal" :rules="[validate]"></q-input>-->
              <!--</div>-->
              <!--&lt;!&ndash;委派单内容结束&ndash;&gt;-->
              <!--<q-separator/>-->
              <!--<div class="col-2" style="margin-bottom: 3%"><p>检测结果</p></div>-->
            </div>
            <!--检测结果开始-->
            <div class="row col-12" style="margin-left: -20px">
              <div class="col-12 row text-left" style="padding-left: 10.3%">
                <div class="col-3 bordered"><span>样品名称</span></div>
                <div class="col-2 bordered"><span>检测项目</span></div>
                <div class="col-2 bordered"><span>检验单位</span></div>
                <div class="col-2 bordered"><span>检验结果</span></div>
                <div class="col-2 bordered"><span>标准值</span></div>
              </div>
              <div v-for="jcdx in inputs.jcdx" class="col-12 row text-left" style="padding-left: 10.3%">
                <div class="col-3 bordered"><span>{{ jcdx }}</span></div>
                <div class="col-8">
                  <div v-for="jcxm in jcxmList" class="row">
                    <div class="col-3 bordered"><span>{{ jcxm.name }}</span></div>
                    <div class="col-3 bordered"><span>{{ jcxm.dw }}</span></div>
                    <div class="col-3 bordered">
                      <q-input placeholder="请输入" :rules="[validate]" dense color="teal"
                               style="width: 165px; height: 50px;"
                               v-model="inputs.jyjg[`${jcdx}-${jcxm.name}`]"></q-input>
                    </div>
                    <div class="col-3 bordered"><span>{{ jcxm.xzbz1 }}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <!--检测结果结束-->

            <q-separator/>

            <!--检测者与日期开始-->
            <div class="row" style="padding-right: 80px">
              <div class="col-2"><p>检测日期</p></div>
              <div class="col-1">
                <q-input v-model=inputs.jcrq dense color="teal" mask="date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="inputs.jcrq">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-2"><p>检测者</p></div>
              <div class="col-1">
                <q-input style="margin-left: -50px; width: 150px;" v-model=inputs.jcz dense color="teal"></q-input>
              </div>
              <div class="col-2"><p>检测者1</p></div>
              <div class="col-1">
                <q-input style="margin-left: -50px; width: 150px;" v-model=inputs.jcz1 dense color="teal"></q-input>
              </div>
              <div class="col-2"><p>检测者2</p></div>
              <div class="col-1">
                <q-input style="margin-left: -50px; width: 150px;" v-model=inputs.jcz2 dense color="teal"></q-input>
              </div>
              <div class="col-2"><p>复核日期</p></div>
              <div class="col-1">
                <q-input v-model=inputs.fhrq dense color="teal" mask="date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="inputs.fhrq">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-2"><p>复核者</p></div>
              <div class="col-1">
                <q-input style="margin-left: -50px; width: 150px;" v-model=inputs.fhz dense color="teal"></q-input>
              </div>
              <div class="col-2"><p>审核日期</p></div>
              <div class="col-1">
                <q-input v-model=inputs.shrq dense color="teal" mask="date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="inputs.shrq">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-2"><p>审核者</p></div>
              <div class="col-1">
                <q-input style="margin-left: -50px; width: 150px;" v-model=inputs.shz dense color="teal"></q-input>
              </div>
            </div>
            <!--检测者与日期结束-->

            <q-separator/>

            <!--操作按钮开始-->
            <q-btn flat label="取消" color="teal" v-close-popup/>
            <q-btn flat label="确认" color="teal" type="submit"/>
            <!--操作按钮结束-->
          </q-form>
        </q-card-section>
        <!--表单主体结束-->
      </q-card>
    </q-dialog>
    <!--录入结果弹出框结束-->
  </div>
</template>

<script>
import {addList, deleteList, editList, getList} from "../network/data";

export default {
  name: "List",
  inject: ['reload'],
  props: {
    //列表的设置
    listOptions: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      list: [],//列表显示的信息
      inputs: {},//弹出输入框的内容
      preListInputs: {},//弹出输入框的初始化内容
      selected: [],//列表选择结果
      filterList: [],//筛选器列表
      optionList: [],//选择框列表
      searchKey: '',//关键字搜索
      id: "", //委派单或检验报告的id，在退回原因或录入结果时使用
      loading: false,//列表显示加载中
      editing: false,//弹出框是新增还是编辑
      popup: false,//弹出框状态
      multipleAdd: false,//弹出框是否为新增多个列表项
      pagination: {rowsPerPage: 0},//列表分页
      timer: null,//计时器
      jcxmList: [],//检测项目列表
    }
  },

  methods: {
    //以弹窗或跳转的方式进入新增列表项模式
    addItem() {
      //如果是弹出框
      if (this.listOptions.listEdit === 'popup') {
        //重置inputs
        this.inputs = JSON.parse(JSON.stringify(this.preListInputs))
        //打开弹窗
        this.popup = true
        //关闭修改状态
        this.editing = false
      }
      //如果是跳转
      else if (this.listOptions.listEdit === 'redirect' || this.listOptions.listEdit === 'review') {
        this.$router.push({path: `${this.listOptions.listName.substring(0, this.listOptions.listName.indexOf('wpd'))}scwpd`})
      }
      //如果是新增多个列表项
      else if (this.listOptions.listEdit === 'multipleAdd') {
        //如果窗口已打开，则覆盖原来的数量。如果是打开新窗口，则重置数量。
        let inputs = this.popup ? {number: this.inputs.number} : {number: ""}
        //添加输入框
        for (let index = 0, length = inputs.number; index < length; index++) {
          inputs[index] = {}
          inputs[index].id = Math.random()
          inputs[index].name = ""
          inputs[index].bz = ""
        }
        this.inputs = JSON.parse(JSON.stringify(inputs))
        //打开弹窗
        this.popup = true
      }
    },

    //删除列表项
    deleteItem(id) {
      this.$q.dialog({
        color:'teal',
        title: '确认删除',
        message: '将删除此项',
        cancel: true,
        persistent: true
      }).onOk(() => {
        deleteList(this.listOptions.listName, id)
        getList(this.listOptions.listName).then(res => {
          this.list = res
          this.reload()
        })
      })
    },

    //修改列表项
    editItem(props) {
      //如果是弹出框
      if (this.listOptions.listEdit === 'popup') {
        for (let key in this.inputs) {
          this.inputs[key] = props.row[key]
        }
        this.popup = true
        this.editing = true
      }
      //如果是跳转
      else if (this.listOptions.listEdit === 'redirect') {
        //根据列表名生成路径名，query是此列表项的id
        this.$router.push({
          path: `${this.listOptions.listName.substring(0, this.listOptions.listName.indexOf('wpd'))}scwpd`,
          query: {id: props.key}
        })
      }
    },

    //搜索列表项
    searchItem(value) {
      //开启加载动画
      this.loading = true
      //防抖，清空定时器
      if (this.timer) clearTimeout(this.timer)
      //重启定时器
      this.timer = setTimeout(() => {
        //构造查找列表的参数，如果筛选器的结果是“全部“或空，则参数为null
        let params = {}
        for (let key in this.listOptions.listFilters) {
          params[key] = this.listOptions.listFilters[key] === '全部' || this.listOptions.listFilters[key] === '' ? null : this.listOptions.listFilters[key]
        }
        //根据显示列表名和查找列表参数获取列表
        getList(this.listOptions.listName, {...params}).then(res => {
          let list = []
          //遍历每个列表项
          for (let key in res) {
            //遍历列表项里的每个属性
            for (let subKey in res[key]) {
              //如果属性名不是id，且属性内容包括了搜索关键字，则把这个列表项放入显示列表
              if (subKey !== 'id' && res[key][subKey].includes(this.searchKey)) {
                list.push(res[key])
                break;
              }
            }
          }
          this.list = list
          //结束加载动画
          this.loading = false
        })
        //输入完成后300毫秒再执行
      }, 300)
    },

    //上传列表项
    submitItem() {
      //如果是修改
      if (this.listOptions.listEdit === 'popup' && this.editing) {
        editList(this.listOptions.listName, this.inputs.id, this.inputs)
      }
      //如果是新增
      else if (this.listOptions.listEdit === 'popup' && !this.editing) {
        this.inputs.id = `${this.listOptions.listName}${new Date().getTime().toString()}`
        addList(this.listOptions.listName, this.inputs)
      }
      //如果是录入结果
      else if (this.listOptions.listEdit === 'result') {
        this.inputs.zt = '未复核'
        editList(this.listOptions.listName, this.id, this.inputs)
      }
      //如果是多项录入
      else if (this.listOptions.listEdit === 'multipleAdd') {
        //删除inputs中的number属性
        delete this.inputs.number
        for (let key in this.inputs) {
          this.list.push(this.inputs[key])
          this.selected.push(this.inputs[key])
        }
        this.popup = false
        //把选择结果传到父组件
        this.submitSelect()
      }

      //如果不是多项录入，则需要重新通信并刷新页面
      if (this.listOptions.listEdit !== 'multipleAdd') {
        getList(this.listOptions.listName, this.listOptions.listParams).then(res => {
          this.list = res
        })
        this.reload()
      }
    },

    //查看列表项
    reviewItem(props) {

    },

    //接收列表项
    receiveItem(id) {
      //用于获取当前日期
      let date = new Date()
      //如果是单选，传来的id会是string
      if (typeof id === 'string') {
        getList(this.listOptions.listName, {id: id}).then(res => {
          let item = JSON.parse(JSON.stringify(res[0]))
          switch (item.zt) {
            case "未接收":
              item.zt = '已接收';
              //向检验报告列表添加一个新的检验报告
              let jybg = {
                wpdlx: item.wpdlx,//委派单类型
                zsbh: "",//证书编号
                slbh: "",//受理编号
                ccgwjz: "",//长朝(公卫)检字：
                ypmc: "",//样品名称
                ypsb: "",//样品商标
                ypsl: "",//样品数量
                yply: "",//样品来源
                ypbzjzt: "",//样品包装及状态
                scdw: "",//生产单位
                scrq: "",//生产日期
                sjdwcy: item.scydw,//送检单位(采样)
                scyr: item.scyr,//送(采)样人
                scyrq: item.scyrq,//收(采)样日期
                jymd: item.jymd,//检验目的
                jyrq: "",//检验日期
                zxbz: item.zxbz,//执行标准
                jcdx: item.jcdx, //检测对象
                jcxm: item.jcxm, //检测项目
                jyjg: {}, //检验结果
                jcrq: "", //检测日期
                jcz: this.$store.state.pages.user, //检测者
                jcz1: "", //检测者1
                jcz2: "", //检测者2
                fhz: "", //复核者
                fhrq: "", //复核日期
                shz: "", //审核者
                shrq: "", //审核日期
                zt: "未录入", //状态
                dycs: 0, //打印次数
                id: `${this.listOptions.listName}${new Date().getTime().toString()}`
              }
              //赋值样品名称
              for (let jcdx of item.jcdx) {
                jybg.ypmc = jybg.ypmc.concat(jcdx + ',')
              }
              jybg.ypmc = jybg.ypmc.slice(0, jybg.ypmc.length - 1)
              //后端通信
              addList(`${this.listOptions.listName.substring(0, this.listOptions.listName.indexOf('wpd'))}jyList`, jybg)
              break;
            case "未复核":
              //设置复核者为当前登陆者
              item.fhz = this.$store.state.pages.user
              item.fhrq = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
              item.zt = '已复核';
              break;
            case "已复核":
              //设置审核者为当前登陆者
              item.shz = this.$store.state.pages.user
              item.shrq = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
              item.zt = '已审核';
              break;
          }
          editList(this.listOptions.listName, id, item)
        })
      }
      //如果是多选
      else {
        for (let item of this.selected) {
          if (this.listOptions.listParams.zt.includes('未复核') && item.zt === '未复核') {
            //设置复核者为当前登录者
            item.fhz = this.$store.state.pages.user
            item.fhrq = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
            item.zt = '已复核';
          } else if (this.listOptions.listParams.zt.includes('已审核') && item.zt === '已复核') {
            //设置审核者为当前登录者
            item.shz = this.$store.state.pages.user
            item.shrq = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
            item.zt = '已审核';
          }

          editList(this.listOptions.listName, item.id, item)
        }
      }

      //重新获取列表
      getList(this.listOptions.listName, this.listOptions.listParams).then(res => {
        this.list = res
        this.reload()
      })
    },

    //已退回列表项
    rejectItem(id) {
      if (this.popup) {
        getList(this.listOptions.listName, {id: this.id}).then(res => {
          let item = JSON.parse(JSON.stringify(res[0]))
          switch (item.zt) {
            case '已复核':
              item.zt = '未复核';
              break;
            case '已审核':
              item.zt = '已复核';
              break;
            case '未接收':
              item.zt = '已退回'
          }
          item.reason = this.inputs.reason
          editList(this.listOptions.listName, this.id, item)
          getList(this.listOptions.listName, this.listOptions.listParams).then(res => {
            this.list = res
            this.reload()
          })
        })
      } else {
        this.id = id
        this.inputs = {reason: ""}
        this.popup = true
      }
    },

    //录入列表项
    resultItem(id) {
      this.popup = true
      this.id = id
      getList(this.listOptions.listName, {id: id}).then(res => {
        //赋值委派单类型
        this.inputs = res[0]
        if (this.inputs.zsbh !== "") this.editing = true

        //赋值检测项目列表
        let jcxmList = []
        for (let jcxm of this.inputs.jcxm) {
          getList('jcxmList', {name: jcxm}).then(res => {
            jcxmList.push(res[0])
          })
        }
        this.jcxmList = jcxmList
      })
    },

    //生成下拉选项列表
    buildOptionList(item) {
      let optionList = []
      getList(`${item}List`).then(res => {
        for (let index = 0, length = res.length; index < length; index++) {
          optionList.push(res[index].name ? res[index].name : res[index])
        }
      })
      this.optionList = optionList
    },

    //生成筛选器列表
    buildFilterList(item) {
      let filterList = ['全部']
      getList(this.listOptions.listName).then(res => {
        for (let index = 0, length = res.length; index < length; index++) {
          //如果得到的数据是Object或Array，则进一步遍历
          if (typeof res[index][item] === 'object') {
            for (let key in res[index][item]) {
              if (filterList.indexOf(res[index][item][key]) < 0) {
                filterList.push(res[index][item][key])
              }
            }
          }
          //如果是基本数据
          else {
            if (filterList.indexOf(res[index][item]) < 0) {
              filterList.push(res[index][item])
            }
          }
        }
      })
      this.filterList = filterList
    },

    //列表向父组件传递选择结果
    submitSelect(newSelected) {
      console.log(newSelected);
      //把被选元素列表更新到最新
      if(newSelected){
        this.selected = JSON.parse(JSON.stringify(newSelected))
      }
      //传输computed中返回的被选项名字列表
      this.$emit('submitSelectEvent', this.selectedNameList)
    },

    //普通表单验证
    validate(val) {
      return new Promise((resolve, reject) => {
        if (!val || val.length === 0 || val.replace(/\s/g, '').length === 0) resolve(false)
        resolve(true)
      })
    },

    //检测证书编号是否重复
    validateDuplication(val) {
      if (!this.editing) {
        if (this.timer) clearTimeout(this.timer)
        return new Promise((resolve, reject) => {
          if (!val) resolve('请输入正确值')
          else {
            this.timer = setTimeout(() => {
              getList(this.listOptions.listName).then(res => {
                for (let item of res) {
                  if (item.zsbh === val) {
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
  },

  computed: {
    //备选项名字列表，用于传给父组件
    selectedNameList: function () {
      return this.selected.map(item => {
        return item.name ? item.name : item.id
      })
    }
  },

  watch: {
    listOptions: {
      handler(val) {
        //监听listSelected，把listSelected中的元素重新选择一边=遍
        for (let key in val.listSelected) {
          let item = this.list.find(item => item.name === val.listSelected[key])
          //如果原列表包含这个元素
          if (item) {
            this.selected.push({id: item.id, name: item.name})
          }
          //如果原列表不包含这个元素(比如用户在生成委派单时新增的检测对象)
          else {
            let id = Math.random()
            this.list.push({name: val.listSelected[key], id})
            this.selected.push({name: val.listSelected[key], id})
          }
        }
      },
      deep: true
    }
  },

  mounted() {
    //开启加载动画
    this.loading = true
    getList(this.listOptions.listName, this.listOptions.listParams).then(res => {
      this.list = res
    })
    //关闭加载动画
    this.loading = false

    //如果列表为可编辑模式
    if (this.listOptions.listInputs) {
      //复制传入的表单模板
      this.inputs = JSON.parse(JSON.stringify(this.listOptions.listInputs))
      //用于清空修改弹窗里的输入
      this.preListInputs = JSON.parse(JSON.stringify(this.inputs))
    }
  },
}
</script>

<style scoped lang="scss">
#form {
  h5 {
    margin: 10px;
  }

  h6 {
    margin: 10px;
  }

  p {
    margin: 5% 5% 0 0;
    margin-left: 70px;
  }

  .col-1 {
    .q-input {
      margin-left: -50px;
      width: 150px;
    }
  }

  .col-4 {
    margin-bottom: 0.5%;

    .q-input {
      width: 300px;
    }
  }

  .q-separator {
    background: black !important;
    margin: 2%;
  }

  .bordered {
    border: 1px solid rgba(0, 0, 0, .5);
    padding-left: 1%;
  }
}
</style>
