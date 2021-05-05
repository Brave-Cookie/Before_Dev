<template>
  <div id="nav">
      <!-- 아래서 불러온 컴포넌트 별명대로 쓰면됨. -->
    <Header />
  <router-view>
  </router-view>
  </div>

</template>

<script>
import { Header } from '@/components/Header.vue'
export default {
  // 이 폴더의 별명 지정(필수아님)
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #7b68ee;
}
</style>
