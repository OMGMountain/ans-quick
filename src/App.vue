<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
#app {
  font-family: "PingFangSC-Light,Helvetica Neue,Helvetica,Microsoft Yahei,Arial,Hiragino Sans GB,tahoma,SimSun,sans-serif";
}
</style>
