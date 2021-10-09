<template>

  <div class="kindeditor">
    <editor
      style="margin-bottom: 40px"
      :id="id"
      :height="height"
      :width="width"
      :content="content"
      :items="items"
      :resizeType="resizeType"
      pluginsPath="/static/kindeditor/plugins/"
      :loadStyleMode="false"
      :fullscreenMode="fullscreenMode"
      :afterCreate="afterCreate"
      @on-content-change="onContentChange"
    ></editor>
    <!--:uploadJson=" rootDir + '/api/Upload/uploadImg2'"-->
    <!-- :uploadJson=" rootDir + '/api/Upload/uploadImg'" -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
Vue.use(VueKindEditor);

export default {
  name: "kindeditor",
  data() {
    return {
      items: [
        "fontsize",
        "forecolor",
        "bold",
        "italic",
        "underline",
        "undo",
        "redo",
        "justifyleft",
        "justifycenter",
        "justifyright",
        "justifyfull",
        "wordpaste",
        //"selectall",
        //"image",
        "link",
        //"subscript",
        //"superscript",
        "insertorderedlist",
        "insertunorderedlist",
        //"fullscreen",
      ],
      resizeType:0,
      random:Math.random(),
    };
  },
  props:{
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    content:{
      type: String,
    },
    id:{
      type:String,
      default:'editor_id'
    },
    fullscreenMode:{
      type:Boolean,
      default:false
    },
    afterCreate:Function,
    isDeletImg:{
      type:Boolean,
      default:false
    },
  },
  created(){
    if(this.isDeletImg){
      this.items = [
        "fontsize",
        "forecolor",
        "bold",
        "italic",
        "underline",
        "undo",
        "redo",
        "justifyleft",
        "justifycenter",
        "justifyright",
        "justifyfull",
        "wordpaste",
        "selectall",
        "link",
        "subscript",
        "superscript",
        "insertorderedlist",
        "insertunorderedlist",
        "fullscreen",
      ]

    }
  },
  methods: {
    onContentChange(val) {
      this.editorText = val;
      this.$emit("kindeditorChange", this.editorText);
    },
  }
};
</script>

<style scoped>

</style>
