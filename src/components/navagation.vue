<template>
  <div class="nav">
    <div class="ui-tab">
      <router-link to="wx">
        <div class="ui-tab-item">
          <div class="ui-tab-item-img">
            <img src="@/assets/miniProgram.png">
          </div>
          <p class="ui-tab-item-text">{{miniProgreeam}}</p>
        </div>
      </router-link>
      <router-link to="js">
        <div class="ui-tab-item">
          <div class="ui-tab-item-img">
            <img src="@/assets/H5.png">
          </div>
          <p class="ui-tab-item-text">{{H5}}</p>
        </div>
      </router-link>
      <router-link to="ios">
        <div class="ui-tab-item">
          <div class="ui-tab-item-img">
            <img src="@/assets/apple.png">
          </div>
          <p class="ui-tab-item-text">{{ios}}</p>
        </div>
      </router-link>
      <router-link to="android">
        <div class="ui-tab-item">
          <div class="ui-tab-item-img">
            <img src="@/assets/android.png">
          </div>
          <p class="ui-tab-item-text">{{android}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navagation',
  data () {
    return {
      miniProgreeam: "微信小程序",
      H5: "Javascript",
      ios: "iOS客户端",
      android: "Android客户端"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 头部导航 */
.ui-tab {
  width: 1000px;
  height: 40px;
  margin: 0 auto 10px;
}
.ui-tab-item {
  float: left;
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;
}
.ui-tab-item:hover {
  color: #0097e0;
}
.ui-tab-item-img {
  width: 40px;
  height: 40px;
  float: left;
  margin-left: 50px;
}
.ui-tab-item-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.ui-tab-item-text {
  float: left;
  margin-left: 20px;
  line-height: 40px;
  font-size: 14px;
}
a {
  color: #333;
}
.router-link-exact-active {
  color: #0097e0;
}
</style>
