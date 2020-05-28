<template>
  <div class="ui-javascript">
    <h1 class="quick-title">{{ msg }}</h1>
    <h2 class="quick-doc">
      <a class="quick-doc"
         href="https://docs.analysys.cn/ark/integration/sdk/android">{{msgText}}</a>
    </h2>
    <!-- 输入框位置 -->
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             class="container-box">
      <el-form-item label="1，请输入项目的appid（方舟项目唯一标示）:"
                    prop="appid">
        <el-input v-model="ruleForm.appid"></el-input>
      </el-form-item>
      <el-form-item label="2，请输入项目的uploadUrl（数据接收地址）:"
                    prop="uploadURL">
        <el-input v-model="ruleForm.uploadURL"></el-input>
      </el-form-item>
      <el-form-item label="3，SDK文件存放地址（相对于app.js或绝对路径）:"
                    prop="SDKURL">
        <el-input v-model="ruleForm.SDKURL"></el-input>
      </el-form-item>
      <el-form-item label="4，是否开启页面的自动采集"
                    prop="auto"
                    class="ui-pageView">
        <el-checkbox-group v-model="ruleForm.auto"
                           class="ui-pageView-box">
          <el-checkbox label="0"
                       name="auto">禁止</el-checkbox>
          <el-checkbox label="1"
                       name="auto">采集页面浏览事件（打开页面发送$pageview）</el-checkbox>
          <el-checkbox label="2"
                       name="auto">采集绑定事件元素点击（全埋点需要选择这个）</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="5，选择iOS SDK集成方式"
                    prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="1">Cocoapods集成</el-radio>
          <el-radio label="2">CommonJS规范集成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">一键生成初始化代码</el-button>
        <el-button @click="resetForm('ruleForm')">复制代码</el-button>
      </el-form-item>
      <el-form-item label="初始化代码"
                    prop="desc">
        <el-input type="textarea"
                  v-model="ruleForm.desc"
                  id="copyText"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'Android',
  data () {
    return {
      msg: '易观方舟iOSSDK快速接入',
      msgText: 'iOSSDK说明文档',
      time: new Date().getTime(),
      autoFidden: false,
      autoPageView: false,
      autoTrack: false,
      ruleForm: {
        appid: '',
        uploadURL: '',
        SDKURL: '',
        auto: [],
        resource: '',
        desc: ''
      },
      rules: {
        appid: [
          { required: true, message: '请输入项目的appid', trigger: 'blur' },
          { min: 1, max: 10000, message: '', trigger: 'blur' }
        ],
        uploadURL: [
          { required: true, message: '请输入项目的uploadUrl', trigger: 'blur' },
          { min: 1, max: 10000, message: '', trigger: 'blur' }
        ],
        SDKURL: [
          { required: true, message: 'SDK文件的存放地址', trigger: 'blur' },
          { min: 1, max: 10000, message: '', trigger: 'blur' }
        ],
        auto: [
          { type: 'array', required: false, message: '', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择集成方式', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.autoFidden = false;
          this.autoPageView = false;
          this.autoTrack = false;
          // 是否开启自动采集
          let autoArray = this.ruleForm.auto;
          if (autoArray.indexOf("1") > -1) this.autoPageView = true;
          if (autoArray.indexOf("2") > -1) this.autoTrack = true;
          if (autoArray.indexOf("0") > -1) {
            this.autoFidden = false;
            this.autoPageView = false;
            this.autoTrack = false;
          }
          //获取data 生成代码  集成方式
          let integrationMethods = this.ruleForm.resource
          //es6 集成
          if (integrationMethods == 1) {
            this.ruleForm.desc = " //app.js \n" +
              "import AnalysysAgent from \"" + this.ruleForm.SDKURL + "/AnalysysAgent_WX_SDK.min.js\"  //基础版本 sdk \n" +
              "import AnalysysEncryption from \"" + this.ruleForm.SDKURL + "/AnalysysAgent_encryption.min.js\"   //加密板块，需要的话单独引入。\n" +
              "AnalysysAgent.encrypt = AnalysysEncryption;\n" +
              "AnalysysAgent.debugMode = 2 \n" +
              "AnalysysAgent.appkey = " + this.ruleForm.appid + "\n" +
              "AnalysysAgent.uploadURL = " + this.ruleForm.uploadUR + "\n" +
              "AnalysysAgent.auto = " + this.autoPageView + "\n" +
              "AnalysysAgent.autoTrack = " + this.autoTrack;
            console.log(this.ruleForm.desc);

          }
          //非es6 集成
          if (integrationMethods == 2) {
            this.ruleForm.desc = " //app.js \n" +
              "let AnalysysAgent = require(\"" + this.ruleForm.SDKURL + "/AnalysysAgent_WX_SDK.min.js\")  //基础版本版本 sdk \n" +
              "let AnalysysEncryption = require(\"" + this.ruleForm.SDKURL + "/AnalysysAgent_encryption.min.js\")   //加密板块，需要的话单独引入。\n" +
              "AnalysysAgent.encrypt = AnalysysEncryption;\n" +
              "AnalysysAgent.debugMode = 2 \n" +
              "AnalysysAgent.appkey = " + this.ruleForm.appid + "\n" +
              "AnalysysAgent.uploadURL = " + this.ruleForm.uploadUR + "\n" +
              "AnalysysAgent.auto = " + this.autoPageView + "\n" +
              "AnalysysAgent.autoTrack = " + this.autoTrack;
            console.log(this.ruleForm.desc);
          }
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      let copyText = document.getElementById("copyText")
      copyText.select();
      document.execCommand("Copy");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-box {
  max-width: 1000px;
  margin: 0 auto 10px !important;
}
.quick-title {
  width: 100%;
  height: 100px;
  background: #0097e0;
  text-align: center;
  color: #fff;
  line-height: 100px;
  font-size: 24px;
  font-weight: normal;
}

.quick-doc {
  display: block;
  width: 100%;
  height: 30px;
  background: #0097e0;
  color: #fff;
  line-height: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
}
/* 输入框 */
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  min-width: 350px;
}
.form-item {
  height: 40px;
}
.form-item-title {
  height: 100%;
  line-height: 40px;
}
/* 适配下移动端UI */
@media all and (min-width: 768px) and (max-width: 1024px) {
  .ele-form.container-box {
    max-width: 90%;
    margin: 0 auto 10px !important;
  }
}
/*  */
@media screen and (min-width: 320px) and (max-width: 750px) {
  .container-box {
    max-width: 90%;
    margin: 0 auto 10px !important;
  }
  .el-checkbox-group {
    display: inline-block;
  }
  .el-radio {
    line-height: 3;
  }
}
</style>
