<template>
  <div class="ui-javascript">
    <h1 class="quick-title">{{ msg }}</h1>
    <h2 class="quick-doc">
      <a class="quick-doc"
         href="https://docs.analysys.cn/ark/integration/sdk/ios">{{msgText}}</a>
    </h2>
    <!-- 输入框位置 -->
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             class="container-box">
      <el-form-item label="1、请输入项目的appid（方舟项目唯一标示）:"
                    prop="appid">
        <el-input v-model="ruleForm.appid"></el-input>
      </el-form-item>
      <el-form-item label="2、请输入项目的uploadUrl（数据接收地址）:"
                    prop="uploadURL">
        <el-input v-model="ruleForm.uploadURL"></el-input>
      </el-form-item>
      <el-form-item label="3、设置是否追踪新用户的首次属性"
                    prop="interMet">
        <el-radio-group v-model="ruleForm.interMet">
          <el-radio label="1">追踪</el-radio>
          <el-radio label="2">不追踪</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="4、选择iOS SDK集成方式"
                    prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="1">Objective-C 集成</el-radio>
          <el-radio label="2">Swift 集成</el-radio>
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
  name: 'iOS',
  data () {
    return {
      msg: '易观方舟iOSSDK快速接入',
      msgText: 'iOS SDK说明文档',
      time: new Date().getTime(),
      autoFidden: false,
      autoPageView: false,
      autoTrack: false,
      interMetStr: "",
      ruleForm: {
        appid: '',
        uploadURL: '',
        SDKURL: '',
        interMet: '',
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
        interMet: [
          { required: true, message: '请选择追踪新用户的首次属性', trigger: 'change' }
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
          // 查看是否追踪 
          let autoProfile = this.ruleForm.interMet;

          //获取data 生成代码  集成方式
          let integrationMethods = this.ruleForm.resource
          //Cocoapods集成
          if (integrationMethods == 1) {
            if (autoProfile == 1) {
              this.interMetStr = "YES"
            } else {
              this.interMetStr = "NO"
            }
            this.ruleForm.desc = "//  1.导入头文件：#import <AnalysysAgent/AnalysysAgent.h> 2.调用方法：\n" +
              "- (void)_initAnalysysSDKWithOptions:(NSDictionary *)launchOptions { \n" +
              "     // AnalysysAgent 配置信息 \n" +
              "     AnalysysConfig.appKey = @\"" + this.ruleForm.appid + "\";\n" +
              "     AnalysysConfig.channel = @\"App Store\"; // 设置渠道\n" +
              "     AnalysysConfig.autoProfile = " + this.interMetStr + "; // 设置追踪新用户的首次属性 \n" +
              "     [AnalysysAgent startWithConfig:AnalysysConfig];\n\n" +
              "     #ifdef DEBUG \n" +
              "         [AnalysysAgent setDebugMode:AnalysysDebugButTrack];\n" +
              "     #else \n" +
              "         [AnalysysAgent setDebugMode:AnalysysDebugOff];\n" +
              "     #endif \n" +
              "     // 设置上传地址 \n" +
              "     [AnalysysAgent setUploadURL:@\"" + this.ruleForm.uploadURL + "\"];\n" +
              "} ";
            console.log(this.ruleForm.desc)
          }
          //手动导入集成
          if (integrationMethods == 2) {
            if (autoProfile == 1) {
              this.interMetStr = true
            } else {
              this.interMetStr = false
            }
            this.ruleForm.desc = "//  1.桥接文件中导入SDK：#import <AnalysysAgent/AnalysysAgent.h> 2.调用方法：\n" +
              "func _initAnalysysSDK(_ options: [UIApplication.LaunchOptionsKey: Any]?) { \n" +
              "     // AnalysysAgent 配置信息 \n" +
              "     AnalysysAgentConfig.shareInstance()?.appKey = \"" + this.ruleForm.appid + "\"\n" +
              "     AnalysysAgentConfig.shareInstance()?.channel = \"App Store\" // 设置渠道\n" +
              "     AnalysysAgentConfig.shareInstance()?.autoProfile = " + this.interMetStr + " // 设置追踪新用户的首次属性\n" +
              "     AnalysysAgent.start(with: AnalysysAgentConfig.shareInstance())\n\n" +
              "     #if DEBUG \n" +
              "     AnalysysAgent.setDebugMode(.butTrack)\n" +
              "     #else\n" +
              "     AnalysysAgent.setDebugMode(.off)\n" +
              "     #endif\n" +
              "     // 设置上传地址 \n" +
              "     AnalysysAgent.setUploadURL(\"" + this.ruleForm.uploadURL + "\")\n" +
              "}"
            console.log(this.ruleForm.desc)
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
