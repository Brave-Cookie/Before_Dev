// components/Home.vue

<template>
  <div>
    <h2>Home</h2>
    <div>{%raw%}{{greeting}}{%endraw%}</div>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      return {
        greeting: "",
      }
    },
    created() {
      axios
        .get("flog.cdamle1eaipy.ap-northeast-2.rds.amazonaws.com")
        .then(result => (this.greeting = result.data.greeting))
    },
  }
</script>