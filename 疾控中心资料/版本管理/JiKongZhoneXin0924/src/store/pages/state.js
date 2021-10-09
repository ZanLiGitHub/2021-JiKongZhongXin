export default function () {
  return {
    //在App.vue中获取的文件树
    folders: [],
    //文件树的设置，排序，中文名，图标
    folderSettings: {
      //消杀委派管理
      "xswpgl": {
        "sort": 0,
        "chineseName": "消杀委派管理",
        "icon": "fas fa-notes-medical",
        "children": {
          "xsscwpd": {
            "sort": 0,
            "chineseName": "生成委派单",
            "icon": 'far fa-file'
          },
          "xsxgwpd": {
            "sort": 1,
            "chineseName": "修改委派单",
            "icon": "far fa-file-alt"
          },
          "xsckwpd": {
            "sort": 2,
            "chineseName": "查看委派单",
            "icon": "far fa-file-pdf"
          },
          "xsjcdxwh": {
            "sort": 3,
            "chineseName": "消杀检测对象维护",
            "icon": "fas fa-list-ul"
          },


        }
      },
      //公共场所委派管理
      "ggcswpgl": {
        "sort": 1,
        "chineseName": "公共场所委派管理",
        "icon": "fas fa-hospital",
        "children": {
          "ggcsscwpd": {
            "sort": 0,
            "chineseName": "生成委派单",
            "icon": "far fa-file"
          },
          "ggcsxgwpd": {
            "sort": 1,
            "chineseName": "修改委派单",
            "icon": "far fa-file-alt"
          },
          "ggcsckwpd": {
            "sort": 2,
            "chineseName": "查看委派单",
            "icon": "far fa-file-pdf"
          },
          "ggcsjcdxwh": {
            "sort": 3,
            "chineseName": "公共场所检测对象维护",
            "icon": "fas fa-list-ul"
          },

        }
      },
      //消杀检验管理
      "xsjygl": {
        "sort": 2,
        "chineseName": "消杀检验管理",
        "icon": "fas fa-clipboard-check",
        "children": {
          "xsdjjsxslh": {
            "sort": 0,
            "chineseName": "单据接收（消杀理化）",
            "icon": "far fa-file"
          },
          "xsdjjsxswsw": {
            "sort": 1,
            "chineseName": "单据接收（消杀微生物）",
            "icon": "far fa-file"
          },
          "xsjglrxslh": {
            "sort": 2,
            "chineseName": "结果录入（消杀理化）",
            "icon": "far fa-file-alt",
            "separator": true
          },
          "xsjglrxswsw": {
            "sort": 3,
            "chineseName": "结果录入（消杀微生物）",
            "icon": "far fa-file-alt"
          },
          "xsbgfhxslh": {
            "sort": 4,
            "chineseName": "报告复核（消杀理化）",
            "icon": "far fa-file-excel",
            "separator": true
          },
          "xsbgfhxswsw": {
            "sort": 5,
            "chineseName": "报告复核（消杀微生物）",
            "icon": "far fa-file-excel"
          },
          "xsbgshqfxslh": {
            "sort": 6,
            "chineseName": "报告审核签发（消杀理化）",
            "icon": "far fa-file-pdf",
            "separator": true
          },
          "xsbgshqfxswsw": {
            "sort": 7,
            "chineseName": "报告审核签发（消杀微生物）",
            "icon": "far fa-file-pdf"
          },
          "xsbgdyxslh": {
            "sort": 8,
            "chineseName": "报告打印（消杀理化）",
            "icon": "far fa-file-powerpoint",
            "separator": true
          },
          "xsbgdyxswsw": {
            "sort": 9,
            "chineseName": "报告打印（消杀微生物）",
            "icon": "far fa-file-powerpoint"
          },
        }
      },
      //公共场所检验管理
      "ggcsjygl": {
        "sort": 3,
        "chineseName": "公共场所检验管理",
        "icon": "fas fa-clipboard-check",
        "children": {
          "ggcsdjjsxslh": {
            "sort": 0,
            "chineseName": "单据接收（公共场所理化）",
            "icon": "far fa-file"
          },
          "ggcsdjjsxswsw": {
            "sort": 1,
            "chineseName": "单据接收（公共场所微生物）",
            "icon": "far fa-file"
          },
          "ggcsjglrxslh": {
            "sort": 2,
            "chineseName": "结果录入（公共场所理化）",
            "icon": "far fa-file-alt",
            "separator": true
          },
          "ggcsjglrxswsw": {
            "sort": 3,
            "chineseName": "结果录入（公共场所微生物）",
            "icon": "far fa-file-alt"
          },
          "ggcsbgfhxslh": {
            "sort": 4,
            "chineseName": "报告复核（公共场所理化）",
            "icon": "far fa-file-excel",
            "separator": true
          },
          "ggcsbgfhxswsw": {
            "sort": 5,
            "chineseName": "报告复核（公共场所微生物）",
            "icon": "far fa-file-excel"
          },
          "ggcsbgshqfxslh": {
            "sort": 6,
            "chineseName": "报告审核签发（公共场所理化）",
            "icon": "far fa-file-pdf",
            "separator": true
          },
          "ggcsbgshqfxswsw": {
            "sort": 7,
            "chineseName": "报告审核签发（公共场所微生物）",
            "icon": "far fa-file-pdf"
          },
          "ggcsbgdyxslh": {
            "sort": 8,
            "chineseName": "报告打印（公共场所理化）",
            "icon": "far fa-file-powerpoint",
            "separator": true
          },
          "ggcsbgdyxswsw": {
            "sort": 9,
            "chineseName": "报告打印（公共场所微生物）",
            "icon": "far fa-file-powerpoint"
          },
        }
      },
      //基础设置
      "jcsz": {
        "sort": 4,
        "chineseName": "基础设置",
        "icon": "fas fa-book",
        "children": {
          "dybswh": {
            "sort": 5,
            "chineseName": "打印标识维护",
            "icon": "fas fa-list-ul"
          },
          "jclxwh": {
            "sort": 1,
            "chineseName": "检测类型维护",
            "icon": "fas fa-list-ul"
          },
          "jcxmwh": {
            "sort": 2,
            "chineseName": "检测项目维护",
            "icon": "fas fa-list-ul"
          },
          "kswh": {
            "sort": 0,
            "chineseName": "科室维护",
            "icon": "fas fa-list-ul"
          },
          "yblxwh": {
            "sort": 3,
            "chineseName": "样本类型维护",
            "icon": "fas fa-list-ul"
          },
          "ybmcwh": {
            "sort": 4,
            "chineseName": "样本名称维护",
            "icon": "fas fa-list-ul"
          },
          "cswh": {
            "sort": 6,
            "chineseName": "场所维护",
            "icon": "fas fa-list-ul"
          }
        }
      },
      //系统设置
      "xtsz": {
        "sort": 5,
        "chineseName": "系统设置",
        "icon": "fas fa-cog",
        "children": {
          "xgmm": {
            "sort": 0,
            "chineseName": "修改密码",
            "icon": "far fa-eye-slash"
          },
          "yhqx": {
            "sort": 1,
            "chineseName": "用户权限",
            "icon": "far fa-id-badge"
          }
        }
      },
    },

    //当前登录者
    user: "系统测试者",

    //委派单列表公用的列表内容格式
    wpdListColumns: [
      {
        name: 'bgbh',
        align: 'left',
        required: true,
        label: '报告编号',
        field: 'bgbh',
        sortable: true,
        style: 'max-width: 70px'
      },
      {name: 'yply', align: 'left', label: '样品来源', field: 'yply', sortable: true},
      {name: 'scydw', align: 'left', label: '送(采)样单位', field: 'scydw', sortable: true},
      {name: 'scyr', align: 'left', label: '送(采)样人', field: 'scyr', sortable: true},
      {name: 'scyrq', align: 'left', label: '送(采)样日期', field: 'scyrq', sortable: true},
      {name: 'jymd', align: 'left', label: '检验目的', field: 'jymd', sortable: true},
      //{name: 'syr', align: 'left', label: '收样人', field: 'syr', sortable: true},
      {name: 'zxbz', align: 'left', label: '执行标准', field: 'zxbz', sortable: true},
      {name: 'sllb', align: 'left', label: '受理类别', field: 'sllb', sortable: true},
      {name: 'slrq', align: 'left', label: '受理日期', field: 'slrq', sortable: true},
      //{name: 'jcdx', align: 'left', label: '检测对象', field: 'jcdx', sortable: true},
      //{name: 'jcxm', align: 'left', label: '检测项目', field: 'jcxm', sortable: true},
      {name: 'wpdlx', align: 'left', label: '委派单类型', field: 'wpdlx', sortable: true},
      {name: 'zt', align: 'left', label: '状态', field: 'zt', sortable: true},
      {name: "opt", label: "操作", align: "center", columns: true}
    ],
    //委派单列表公用的列表筛选器内容
    wpdListFilters: {
      jymd: "", sllb: "", wpdlx: "", zt: ""
    },
    //检验报告列表公用的列表内容格式
    jybgListColumns: [
      {name: 'sjdwcy', align: 'left', label: '送检单位(采样)', field: 'sjdwcy', sortable: true},
      //{name: 'scyr', align: 'left', label: '送(采)样人', field: 'scyr', sortable: true},
      //{name: 'scyrq', align: 'left', label: '收(采)样日期', field: 'scyrq', sortable: true},
      {name: 'jymd', align: 'left', label: '检验目的', field: 'jymd', sortable: true},
      {name: 'jcdx', align: 'left', label: '检测对象', field: 'jcdx', sortable: true},
      {name: 'jcrq', align: 'left', label: '检测日期', field: 'jcrq', sortable: true},
      {name: 'fhz', align: 'left', label: '复核者', field: 'fhz', sortable: true},
      {name: 'fhrq', align: 'left', label: '复核日期', field: 'fhrq', sortable: true},
      {name: 'shz', align: 'left', label: '审核者', field: 'shz', sortable: true},
      {name: 'shrq', align: 'left', label: '审核日期', field: 'shrq', sortable: true},

      {name: 'zt', align: 'left', label: '状态', field: 'zt', sortable: true, style: 'max-width: 30px'},
      {name: "opt", label: "操作", align: "center", columns: true}
    ],
    //检验报告列表公用的列表筛选器内容
    jybgListFilters: {
      jymd: "", zt: ""
    }
  }
}
