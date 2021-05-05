<template>
    <div class='h_div'>FLOG
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/mypage">Mypage</router-link>
    </div>
</template>

<script>
export default {
}
</script>

<!-- scoped 형태로 클래스 선언하면 해당 컴포넌트 내에서만 사용가능  -->
<style scoped>
  .h_div{
    text-align: right;
    background-color: #A390EE;
    width:auto;
    height:2rem;
    margin-bottom:3rem;
  }
  #nav a {
    text-align: left;
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    text-align: left;
    color: #7b68ee;
  }
</style>