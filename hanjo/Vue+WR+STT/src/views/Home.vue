<template>
  <div id = 'body'>
    <h2 id='name'>FLOG</h2>

    <router-link to="/login">시작하기</router-link>

    <!-- hanjo -->
    <br><br><br>
    <router-link to="/WebRTC">WR 테스트하기</router-link>
    <br>
    <router-link to="/stt">STT 테스트</router-link>

  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #body {
    text-align: center;
  }
  #name {
    color: #6D43F3;
  }
</style>